#!/usr/bin/env python
# coding: utf-8

# In[2]:


# Importamos lo 3 métodos que utilizaremos
from flask import Flask, request, jsonify
from flask import *
from waitress import serve
import pandas as pd
import numpy as np
from copy import copy
import csv as csv

# Clasificación
from sklearn.linear_model import LogisticRegression, SGDClassifier
from sklearn import tree
from xgboost import XGBClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC, LinearSVC, NuSVC
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, AdaBoostClassifier, GradientBoostingClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
from sklearn.discriminant_analysis import QuadraticDiscriminantAnalysis
from sklearn.naive_bayes import BernoulliNB

#exportar modelo
import joblib

#TPOT
#from tpot import TPOTClassifier
from tpot.builtins import StackingEstimator, ZeroCount
from tpot.export_utils import set_param_recursive

# Evaluación
from sklearn import metrics
from sklearn.metrics import classification_report,precision_recall_fscore_support, f1_score, roc_curve, roc_auc_score,auc, accuracy_score, confusion_matrix
from sklearn.model_selection import train_test_split, cross_val_predict, cross_val_score, LeaveOneOut

#preprocesamiento
from sklearn.preprocessing import FunctionTransformer, Normalizer, RobustScaler, StandardScaler

# selección de atributos
from sklearn.feature_selection import RFE
from sklearn.feature_selection import f_classif, mutual_info_classif, chi2
from sklearn.feature_selection import SelectPercentile, SelectKBest, SelectFromModel, VarianceThreshold

#pipeline
from sklearn.pipeline import Pipeline, make_pipeline, make_union


#warnings
import warnings
warnings.filterwarnings('ignore')

#para reentrenar
import time
import mysql.connector


# In[23]:


datos =  pd.read_csv('datos_one_hot.csv')
datos = datos.drop(['Unnamed: 0'], axis=1)


# In[24]:


#nos conectamos a la base de datos mysql y añadimos la fila cuyo indice sea mayor al dado por parámetro para no añadir todas las de la bd y evitar que esten repetidas
def añadirInstancias(indice):
    
    conexion1=mysql.connector.connect(host='127.0.0.1',
        user='root',
        password='password',
        database='injertosdb',
        port=3306,
        auth_plugin='mysql_native_password') 
    ultIndice = 0
    cursor1=conexion1.cursor()
    sentencia = "SELECT id, edad, sexo, imc, hta, dm, dlp, apm, apq, got, gpt, ggt, na,bbt, acvhc, acvhbc, dosisna, aminas, validez, ecografia_1, ecografia_2, ecografia_3 FROM injertos i LEFT OUTER JOIN valoraciones v ON  v.id_injerto = i.id where id>" + str(indice) + " and validez is not null"
    #tenemos que guardar por que indice nos hemos quedado
    cursor1.execute(sentencia)
    for fila in cursor1:
        ultIndice = fila[0]
        datos.loc[len(datos)] = list(fila)[1:]
    conexion1.close()
    datos.to_csv('datos_one_hot.csv') #actualizamos el dataset con las nuevas instancias
    return (ultIndice, len(datos))


# In[26]:


app = Flask(__name__)

app.secret_key = "tfgPAU_GUI22" #Secret Key

# Load the model
MODEL = joblib.load('./injertos-model.joblib')

# Las etiquetas con las cuales se clasificaran nuevos datos

MODEL_LABELS = ["Valido","No valido"]

"""
El método predict sera el encargado de clasificar y dar una respuesta
a cualquier IP que le envie una petición.
"""

@app.route('/predict')
def predict():
    """
    Declaramos cuales seran los parametros que recibe la petición
    
    """
    edad = request.args.get('edad')
    sexo = request.args.get('sexo')
    imc = request.args.get('imc')
    hta = request.args.get('hta')
    dm = request.args.get('dm')
    dlp = request.args.get('dlp')
    apm = request.args.get('apm')
    apq = request.args.get('apq')
    got = request.args.get('got')
    gpt = request.args.get('gpt')
    ggt = request.args.get('ggt')
    na = request.args.get('na')
    bbt = request.args.get('bbt')
    acvhc = request.args.get('acvhc')
    acvhbc = request.args.get('acvhbc')
    dosisna = request.args.get('dosisna')
    aminas = request.args.get('aminas')
    ecografia_1 = request.args.get('ecografia_1')
    ecografia_2 = request.args.get('ecografia_2')
    ecografia_3 = request.args.get('ecografia_3')


    # La lista de caracteristicas que se utilizaran
    # para la predicción
    features = [[edad, sexo, imc, hta, dm, dlp, apm, apq, got, gpt, ggt, na, bbt, acvhc, acvhbc, dosisna, aminas,ecografia_1, ecografia_2, ecografia_3]]
    
    for i in range(len(features[0])):
        features[0][i] = float(features[0][i])
    print(features)
    # Utilizamos el modelo para la predicción de los datos
    label_index = MODEL.predict(features)
    y_proba = MODEL.predict_proba(features)
    
    """
    La variable label contendra el resultado de la clasificación.
    """
    label = MODEL_LABELS[label_index[0]]
    prob = y_proba[0][label_index[0]]
   
    print("pasamos a devolverlo")
    print(label)
    # Creamos y enviamos la respuesta al cliente
    return jsonify(status='clasificado completado', clasificacion=str(label), probabilidad = str(prob))


@app.route("/reentrenar")
def reentrenar():
    print("reentrenamos")
    #declaramos los parametros que le vendran:
    indice = request.args.get('indice') #reentrenaremos añadiendo a partir de ese índice
    start = time.time()
    ultIndice, numInstancias = añadirInstancias(indice)
    #quitamos la clase del dataset, vamos a realizar 10-CV
    y = datos['class']
    X = datos.drop(['class'], axis=1)
    print(y)
    #vamos a devolver el auc y el acc
    y_pred = cross_val_predict(MODEL, X, y, cv=10)
    acc =  metrics.accuracy_score(y, y_pred)
    y_proba = cross_val_predict(MODEL, X, y, cv=10, method='predict_proba')
    y_proba_clase1 =  pd.Series(y_proba[:,1])
    fprs, tprs, umbrales = metrics.roc_curve(y, y_proba_clase1)
    auc = metrics.auc(fprs,tprs)
    end = time.time()
    tiempo = end-start
    
    return jsonify(status='reentrenado con exito', numeroInstancias=numInstancias, ultimaInstancia=ultIndice, valorAUC=auc, valorACC = acc, tiempoRequerido=tiempo)



@app.route("/")
def index():
    return "<h1>Página del clasificador!</h1>"

if __name__ == '__main__':
    # Iniciamos el servidor
    print("Serving on port 8080")
    serve(app, listen='localhost:8080')
