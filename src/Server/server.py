from flask import Flask, request, jsonify, render_template, Response, abort
from flask_restful import Resource, Api
import json, base64, sys, os
from flask_cors import CORS
import sqlalchemy as sq
import geopandas as gpd
import pandas as pd
sys.path.append(os.getcwd())

from Shared.DataService import DataService
db = DataService()
conn = db.connect()

regionQuery = sq.text("SELECT district, geometry, color FROM public.census_ag_regions WHERE pr_uid = 46 OR pr_uid = 47 OR pr_uid = 48")
ag_regions = gpd.GeoDataFrame.from_postgis(regionQuery, conn, geom_col="geometry")
ag_regions = ag_regions.set_crs("EPSG:3347", allow_override=True)
ag_regions = ag_regions.to_crs(crs="EPSG:4326")

stationQuery = sq.text('SELECT province, latitude, longitude, elevation, MIN(hly_first_year) AS first_year, MAX(hly_last_year) AS last_year FROM public.stations_hly WHERE district IS NOT NULL GROUP BY latitude, longitude, elevation, province;')
stations = pd.read_sql_query(stationQuery, conn)

app = Flask(__name__, template_folder='../presentation/build/', static_folder='../presentation/build/static/')
app.config['UPLOAD_FOLDER'] = './'
CORS(app)

api = Api(app)         # Controls the Flask server API

HOST = '0.0.0.0'  # The workers address
PORT = 4000         # The workers port


# class Index(Resource):
#     def get(self,):
#         return Response(render_template('index.html'), mimetype='text/html')

class AgRegions(Resource):
    def get(self,):
        return ag_regions.to_json()

class Stations(Resource):
    def get(self,):
        return stations.to_json()


#api.add_resource(Index, '/')
api.add_resource(AgRegions, '/agRegions/')
api.add_resource(Stations, '/stations/')
app.run(host=HOST, port=PORT, debug=True)