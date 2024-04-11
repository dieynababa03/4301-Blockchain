from flask import Flask, request
import json
import mysql.connector
import sqlite3


app = Flask(__name__)

conn = sqlite3.connect('database.db', check_same_thread=False)
cursor = conn.cursor()

# Create a Users table if it doesn't exist
cursor.execute('''
    CREATE TABLE IF NOT EXISTS Users (
        Username,
        Password
    )
''')



#getting user info from frontend and query database to see if user exists
@app.route('/Login', methods=['GET', 'POST'])
def user_auth():
   if request.method == 'POST':
      data = json.loads(request.data)
      print(data)
      username = data['userInfo']['idNumber']
      password = data['userInfo']['password']
      if not username or not password:
         return json.dumps("False")
      query = "SELECT * FROM Users WHERE Username = ? AND Password = ?"
      cursor.execute(''' INSERT INTO Users (Username, Password) VALUES ('admin', 'admin') ''')
      cursor.execute(query, (username, password))
      result = cursor.fetchone()

      if(result):
         print("successfully authenticated")
         return json.dumps("True")
      else:
         print("User not found")
         return json.dumps("False")

   else:
      print('error with request method')
    



if __name__ == '__main__':
    app.run(debug=True)



