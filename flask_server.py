from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
  return {
        "message": "Hello World",
        "traffic": [1200, 1900,4000],
        "earnings": [1200, 1090, 3000,5400,1220,3600,4800,4578,2566,8545,4587,9000],
        }

if __name__ == "__main__":
    #app.run(debug=False)
    app.run(host='0.0.0.0')