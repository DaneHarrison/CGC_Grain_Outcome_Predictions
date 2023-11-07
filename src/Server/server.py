from flask import Flask, request, jsonify, render_template, Response, abort
from flask_restful import Resource, Api
import sys, os
from flask_cors import CORS
import sqlalchemy as sq
import geopandas as gpd
import pandas as pd
import numpy as np
from shapely.geometry import Point, Polygon
sys.path.append(os.getcwd())

from Server.logic.modelLoader import getForestModels
from Shared.DataService import DataService
db = DataService()
conn = db.connect()

regionQuery = sq.text("SELECT district, geometry, color FROM public.census_ag_regions WHERE pr_uid = 46 OR pr_uid = 47 OR pr_uid = 48")
ag_regions = gpd.GeoDataFrame.from_postgis(regionQuery, conn, geom_col="geometry")
ag_regions = ag_regions.set_crs("EPSG:3347", allow_override=True)
ag_regions = ag_regions.to_crs(crs="EPSG:4326")

stationQuery = sq.text('SELECT province, latitude, longitude, elevation, MIN(hly_first_year) AS first_year, MAX(hly_last_year) AS last_year FROM public.stations_hly WHERE district IS NOT NULL GROUP BY latitude, longitude, elevation, province;')
stations = pd.read_sql_query(stationQuery, conn)

ergotQuery = sq.text('SELECT * FROM public.ergot_sample_feat_eng WHERE incidence = True;')
ergot = pd.read_sql_query(ergotQuery, conn)
ergot['x'] = None
ergot['y'] = None

models = getForestModels()
loadedModelInfo = []

for model in models:
    modelStatistics = {
        "accuracy": str(model['statistics']["accuracy"]),
        "loss": str(model['statistics']["loss"]),
        "precision": str(model['statistics']["precision"]),
        "recall": str(model['statistics']["recall"]),
        "f1": str(model['statistics']["f1"]),
        "auc": str(model['statistics']["auc"]),
        "importances": [f'{factor[1]}: {factor[0]}' for factor in model['statistics']["importances"]]
    } 

    loadedModelInfo.append({
        'type':  model['type'],
        'name': model['name'],
        'factors': [f'{factor}' for factor in model['factors']],
        'predictor': model['predictor'],
        'statistics': modelStatistics
    })

app = Flask(__name__, template_folder='../presentation/build/', static_folder='../presentation/build/static/')
app.config['UPLOAD_FOLDER'] = './'
CORS(app)

api = Api(app)         # Controls the Flask server API

HOST = '0.0.0.0'  # The workers address
PORT = 4000         # The workers port

def genRandomPointsInGeom(geometry, number):  
    dimensions = geometry.bounds
    x = np.random.uniform( dimensions['minx'], dimensions['maxx'], number )
    y = np.random.uniform( dimensions['miny'], dimensions['maxy'], number )
    
    return x, y

districtCount = ergot.groupby(["district"]).agg(count=("district", "count")).reset_index()
for row in districtCount.itertuples():  
    geometry = ag_regions.loc[ag_regions['district'] == row.district]
    relevantSamples = ergot.loc[ergot['district'] == row.district]

    x, y = genRandomPointsInGeom(geometry['geometry'], row.count)
    ergot.loc[ergot['district'] == row.district, ['x']] = x
    ergot.loc[ergot['district'] == row.district, ['y']] = y

# class Index(Resource):
#     def get(self,):
#         return Response(render_template('index.html'), mimetype='text/html')

class Init(Resource):
    def get(self):
        data = request.args.get('src')
        response = None

        if data == 'agRegions':
            response = ag_regions.to_json()
        elif data == 'stations':
            response = stations.to_json(orient='records')

        return response

class Load(Resource):
    def get(self):
        src = request.args.get('src')
        attrs = request.args.get('attrs')
        
        if src != 'ergot_sample_feat_eng':
            query = sq.text(f'''SELECT {attrs} FROM public.{src}''')
            data = pd.read_sql_query(query, conn)
        else:
            data = ergot

        data = data.to_json(orient='records')

        return data

class GetModels(Resource):
    def get(self):
        return jsonify(loadedModelInfo)


class Predict(Resource):
    def post(self):
        data = request.get_json()
        modelName = data.get('modelName')
        predictionInput = data.get('predictionInput')
        predictionInput = pd.DataFrame([predictionInput])
        predictionOutput = None

        for model in models:
            if model['name'] == modelName:
                predictionOutput = model['model'].predict(predictionInput)
                predictionOutput = predictionOutput[0]
                break

        return jsonify({'output': bool(predictionOutput)})

#api.add_resource(Index, '/')
api.add_resource(Init, '/data/init/')
api.add_resource(Load, '/data/load/')
api.add_resource(GetModels, '/models/load/')
api.add_resource(Predict, '/models/predict/')
app.run(host=HOST, port=PORT, debug=True)