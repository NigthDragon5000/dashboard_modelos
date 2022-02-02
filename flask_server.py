from flask import Flask,jsonify
from flask_cors import CORS,cross_origin
from flask import request

app = Flask(__name__)
CORS(app)


class DataStore():
    modelo = None
dat = DataStore()

@app.route('/ajax', methods=['GET', 'POST'])
def ajax():
    data= request.data
    print(data)
    dat.modelo=data.decode("utf-8") 
    return jsonify({'result': 'OK', 'info': 'Hello World!'})  # send result to browser as JSON

@app.route("/dif")
def dif():
    modelo=dat.modelo
    if modelo=="Peque3":
        return {
        "message": "Peque3",
        "traffic": [1200, 1900,7000],
        "earnings": [1200, 1090, 3000,5400,1220,3600,4800,4578,2566,8545,4587,9000],
        }
    elif modelo=="Consumo":
        return {
        "message": "Consumo",
        "traffic": [3000, 5000,4000],
        "earnings": [200, 900, 300,540,122,360,480,457,256,854,458,900],
        }
    elif modelo=="Consumo":
        return {
        "message": "Consumo",
        "traffic": [3000, 5000,4000],
        "earnings": [200, 900, 300,540,122,360,480,457,256,854,458,900],
        }
    elif modelo=="Micro":
        return {
        "message": "Micro",
        "traffic": [1300, 1500,1400],
        "earnings": [600, 700, 800,590,122,380,480,457,956,854,458,900],
        }

'''
@app.route("/peque3")
def peque3():
  return {
        "message": "Peque3",
        "traffic": [1200, 1900,7000],
        "earnings": [1200, 1090, 3000,5400,1220,3600,4800,4578,2566,8545,4587,9000],
        }

@app.route("/consumo")
def consumo():
  return {
        "message": "Consumo",
        "traffic": [3000, 5000,4000],
        "earnings": [200, 900, 300,540,122,360,480,457,256,854,458,900],
        }
'''

if __name__ == "__main__":
    #app.run(debug=False)
    app.run(host='0.0.0.0', debug = True)