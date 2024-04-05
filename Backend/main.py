from flask import Flask, request
import json
import mysql.connector

app = Flask(__name__)

#connecting to sql server
mydb = mysql.connector.connect(
  host="localhost",
  user="dieynaba",
  password="mushi",
  database='UserInfo'
)

mycursor = mydb.cursor()


#getting user info from frontend and query database to see if user exists
@app.route('/login', methods=['GET', 'POST'])
def user_auth():
    if request.method == 'POST':
      username = request.json['username']
      password = request.josn['password']

      query = f"SELECT * FROM Users WHERE Username={username} AND Password={password}"
      authReturnVal = mycursor.execute(query)

      if(authReturnVal):
         print("successfully authenticated")
         return json.dumps(True)
      else:
         print("User not found")
         return json.dumps(False)


    else:
       print('error with request method')
    



if __name__ == '__main__':
    app.run(debug=True)



