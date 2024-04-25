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
                id TEXT,
                admin TEXT    
            )
        ''')
        # Check if the default user '12345' already exists to avoid duplicates
        cursor.execute("SELECT id FROM UserID WHERE id = ?", ('12345',))
        if cursor.fetchone() is None:
            cursor.execute("INSERT INTO UserID (id) VALUES (?)", ('12345',))
        db.commit()

@app.teardown_appcontext
def close_db(error):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

@app.route('/Login', methods=['GET', 'POST'])
def user_auth():
    db = get_db()
    cursor = db.cursor()
    if request.method == 'POST':
        data = json.loads(request.data)
        user_id = data.get('userInfo', {}).get('idNumber', None)
        if not user_id:
            return json.dumps("False")
        cursor.execute("SELECT * FROM UserID WHERE id = ?", (user_id,))
        result = cursor.fetchone()
        if result:
            print("successfully authenticated")
            return json.dumps("True")
        else:
            return json.dumps("False")
    else:
        return 'Request method is not supported', 400

if __name__ == '__main__':
    init_db()  # Initialize the database and insert default user if not exists
    app.run(debug=True)
