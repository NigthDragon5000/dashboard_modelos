from flask import Flask,jsonify,redirect
from flask_cors import CORS,cross_origin
from flask import request
from werkzeug.utils import secure_filename
from io import BytesIO
import pandas as pd

app = Flask(__name__)
CORS(app)


class DataStore():
    modelo = None
dat = DataStore()

@app.route('/uploader', methods = ['GET', 'POST'])
def upload_file():
   if request.method == 'POST':
      f = request.files['file']
      try:
        df= pd.read_csv(BytesIO(f.read()),sep=";")
        print(df.head())
        #f.save(secure_filename(f.filename))
        #print(type(f))
        return "Exitoso"
      except:
        return "Error"

@app.route('/ajax', methods=['GET', 'POST'])
def ajax():
    data= request.data
    print(data)
    dat.modelo=data.decode("utf-8") 
    return jsonify({'result': 'OK', 'info': 'Servidor recibio modelo'})  # send result to browser as JSON

@app.route("/dif")
def dif():
    modelo=dat.modelo
    if modelo=="Peque3":
        return {
        "message": "Peque3",
        "variables_importantes": ["ln_mora_pagada","nro_meses_ok","nro_meses_ok_50000"],
        "importancia": [14.50, 13.20,12.80],
        "ivs": [20,18,17,13,13,10,10,10,10,9,8,7,7,7,7,7,7,7],
        "ivs_variables": ["ln_mora_pagada","nro_meses_ok","nro_meses_ok_50000","var","var","var","var","var","var","var","var","var","var","var","var","var","var","var"],
        "ks_historical": [25,22,20,21,20,20,20,20,20],
        "labels_ks_historical": ['Desarrollo','Validacion','Pre-Covid','CovidAgo20','CovidAgo20',
            'CovidSet20',
            'CovidOct20',
            'CovidNov20',
            'CovidDic20'],
        "corr_variables": ["ln_mora_pagada","nro_meses_ok","nro_meses_ok_50000"],
        "corr_values": [55,53,47],
        "ks":22,
        "gini": 35,
        "variables":22,
        "tiering":'1er',
        }
    elif modelo=="Peque2":
        return {
        "message": "Peque2",
        "traffic": [3000, 5000,4000],
        "earnings": [200, 900, 300,540,122,360,480,457,256,854,458,900],
        "ks":32,
        "gini": 40,
        "variables":32,
        "tiering":'1er',
        }
    elif modelo=="Consumo":
        return {
        "message": "Consumo",
        "traffic": [3000, 5000,4000],
        "earnings": [200, 900, 300,540,122,360,480,457,256,854,458,900],
        "ks":33,
        "gini": 43,
        "variables":33,
        "tiering":'1er',
        }
    elif modelo=="Micro":
        return {
        "message": "Micro",
        "traffic": [1300, 1500,1400],
        "earnings": [600, 700, 800,590,122,380,480,457,956,854,458,900],
        "ks":35,
        "gini": 45,
        "variables":35,
        "tiering":'1er',
        }
    elif modelo=="Admi20M":
        return {
        "message": "Admi20M",
        "traffic": [2300, 2500,2400],
        "earnings": [600, 700, 800,590,122,380,480,457,956,854,458,900],
        "ks_historical": [25,22,20,21,20],
        "labels_ks_historical": ['Desarrollo','Validacion','Pre-Covid','CovidAgo20','CovidAgo20',
            'CovidSet20',
            'CovidOct20',
            'CovidNov20',
            'CovidDic20'],
        "ks":20,
        "gini": 31,
        "variables":15,
        "tiering":'1er',
        }


if __name__ == "__main__":
    #app.run(debug=False)
    app.run(host='0.0.0.0', debug = True)