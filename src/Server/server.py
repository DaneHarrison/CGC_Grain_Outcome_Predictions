from flask import Flask, request, jsonify, render_template, Response, abort
from flask_restful import Resource, Api
import json, base64, sys, os

#from logic.worker.logic import Logic


# app = Flask(__name__)  # Flask server instance

app = Flask(__name__, template_folder='../presentation/build/', static_folder='../presentation/build/static/')
app.config['UPLOAD_FOLDER'] = './'

api = Api(app)         # Controls the Flask server API

HOST = '0.0.0.0'  # The workers address
PORT = 4000         # The workers port


# class Index(Resource):
#     def get(self,):
#         return Response(render_template('index.html'), mimetype='text/html')

class CGC_GRAIN_PREDICTIONS(Resource):
    def get(self,):
        response = None
        
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
    
        return jsonify(response)


#api.add_resource(Index, '/')
api.add_resource(CGC_GRAIN_PREDICTIONS, '/')
app.run(host=HOST, port=PORT, debug=True)