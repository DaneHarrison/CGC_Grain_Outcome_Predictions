from flask import Flask, request, jsonify, render_template, Response, abort
from flask_restful import Resource, Api
import json, base64, sys, os
from flask_cors import CORS
import sqlalchemy as sq
import geopandas as gpd
sys.path.append(os.getcwd())

from Shared.DataService import DataService
db = DataService()
conn = db.connect()
#from logic.worker.logic import Logic


# app = Flask(__name__)  # Flask server instance

regionQuery = sq.text("select district, geometry, color FROM public.census_ag_regions WHERE pr_uid = 46 OR pr_uid = 47 OR pr_uid = 48")

ag_regions = gpd.GeoDataFrame.from_postgis(
    regionQuery, conn, geom_col="geometry"
)
ag_regions = ag_regions.set_crs("EPSG:3347", allow_override=True)

ag_regions = ag_regions.to_crs(crs="EPSG:4326")


app = Flask(__name__, template_folder='../presentation/build/', static_folder='../presentation/build/static/')
app.config['UPLOAD_FOLDER'] = './'
CORS(app)

api = Api(app)         # Controls the Flask server API

HOST = '0.0.0.0'  # The workers address
PORT = 4000         # The workers port


# class Index(Resource):
#     def get(self,):
#         return Response(render_template('index.html'), mimetype='text/html')

class CGC_GRAIN_PREDICTIONS(Resource):
    def get(self,):
        print(ag_regions)
        response = ag_regions.to_json()
        
        # if 'img' not in request.files:
        #     abort(400, description='img not found')
        # else:
        #     img = request.files['img']
        #     results = logic.runEigenFace(img.read())
            
        #     if results:
        #         response = {
        #             'name': results.Name,
        #             'photo': str(base64.b64encode(results.Photo)),
        #             'meanFace': str(base64.b64encode(results.MeanFace))
        #         }
    
        return response


#api.add_resource(Index, '/')
api.add_resource(CGC_GRAIN_PREDICTIONS, '/')
app.run(host=HOST, port=PORT, debug=True)