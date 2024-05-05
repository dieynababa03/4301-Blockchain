from flask import Flask, request, g, json
import sqlite3

app = Flask(__name__)

DATABASE = 'database.db'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE, check_same_thread=False)
    return db

def init_db():
    with app.app_context():
        db = get_db()
        cursor = db.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS UserID (
                id TEXT PRIMARY KEY,
                admin BOOLEAN    
            )
        ''')
        admin_hash = '0x2a359feeb8e488a1af2c03b908b3ed7990400555db73e1421181d97cac004d48'
        cursor.execute("SELECT id FROM UserID WHERE id = ?", (admin_hash,))
        if cursor.fetchone() is None:
            cursor.execute("INSERT INTO UserID (id, admin) VALUES (?, ?)", (admin_hash, True))
        db.commit()

@app.teardown_appcontext
def close_db(error):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

@app.route('/Login', methods=['POST'])
def user_auth():
    db = get_db()
    cursor = db.cursor()
    if request.method == 'POST':
        data = json.loads(request.data)
        user_id = data.get('userInfo', {}).get('idNumber', None)
        if not user_id:
            return json.dumps({"authenticated": False, "admin": False})

        cursor.execute("SELECT * FROM UserID WHERE id = ?", (user_id,))
        result = cursor.fetchone()
        if result:
            admin_status = bool(int(result[1]))  # Ensure the admin field is interpreted correctly
            return json.dumps({"authenticated": True, "admin": admin_status})
        else:
            cursor.execute("INSERT INTO UserID (id, admin) VALUES (?, ?)", (user_id, False))
            db.commit()
            return json.dumps({"authenticated": True, "admin": False})
    else:
        return 'Request method is not supported', 400

if __name__ == '__main__':
    init_db() 
    app.run(debug=True)
