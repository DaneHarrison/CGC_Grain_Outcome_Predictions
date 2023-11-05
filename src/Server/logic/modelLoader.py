import nbformat, sys

sys.path.append('./')

from Models.evaluator import ModelEvaluator

evaluator = ModelEvaluator()

PREDICTOR = 'downgrade'

BOOST_SATELLITE_FILE_PATH = './Models/Boost/BoostSatellite.ipynb'
BOOST_STATION_FILE_PATH = './Models/Boost/BoostStation.ipynb'
BOOST_TERM_SIG = "# set nan to 0\n"
boostModelNames = ['gradient_boosting_model', 'balanced_gradient_boosting_model', 'rusboost_model', 'balanced_rusboost_model', 'xgboost_model', 'balanced_xgboost_model']

FOREST_SATELLITE_FILE_PATH = './Models/Forest/ForestSatellite.ipynb'
FOREST_STATION_FILE_PATH = './Models/Forest/ForestStation.ipynb'
FOREST_TERM_SIG = "# set nan to 0\n"
forestModelNames = ['model_rf', 'model_nobalance_rf', 'balanced_model_rf', 'balanced_model_balanced_rf', 'model_xgbrf', 'model_balance_xgbrf']

KNN_SATELLITE_FILE_PATH = './Models/Forest/ForestSatellite.ipynb'
KNN_STATION_FILE_PATH = './Models/Forest/ForestStation.ipynb'
KNN_TERM_SIG = "Test the model on the testing dataset"
knnModelNames = ['knn_model', 'balanced_knn_model']

LSTM_SATELLITE_FILE_PATH = './Models/LSTM/LSTMSatellite.ipynb'
LSTM_STATION_FILE_PATH = './Models/Forest/LSTMStation.ipynb'
LSTM_TERM_SIG = "Test the model on the testing dataset"
lstmModelNames = ['model']

SVM_SATELLITE_FILE_PATH = './Models/SVM/SVMSatellite.ipynb'
SVM_STATION_FILE_PATH = './Models/Forest/SVMStation.ipynb'
SVM_TERM_SIG = "Test the model on the testing dataset"
svmModelNames = ['svm_model', 'balanced_svm_model']


def _loadModelFromNoteBook(file, modelType, names, termSignal, prependToName, predictor=PREDICTOR):
    models = []

    with open(file, 'r') as model_notebook:
        notebook_content = nbformat.read(model_notebook, as_version=4)

        for cell in notebook_content['cells']:
            if cell['cell_type'] != 'markdown':
                exec(cell['source'])
            if termSignal in cell['source']:
                break

        for name in names:
            model = {}

            try:
                print(f'{prependToName}: {name}')
                trainDF = locals().get('trainDf')
                testDF = locals().get('testDf')
                model['model'] = locals().get(name)

                model['type'] = modelType
                model['name'] = prependToName + name
                model['factors'] = trainDF.drop(columns=predictor).columns
                model['predictor'] = predictor
                model['statistics'] = evaluator.evaluateClassification(
                    model=model['model'],
                    yTrainSet=testDF.drop(columns=predictor),
                    yTrue=testDF[predictor],
                    hasFeatImportance=True
                )

                models.append(model)
            except Exception as e:
                print(f"Error: {e}")
    
    return models


def getBoostModels():
    models = []

    models.extend(_loadModelFromNoteBook(BOOST_SATELLITE_FILE_PATH, 'boost', boostModelNames, BOOST_TERM_SIG, 'satellite_'))
    models.extend(_loadModelFromNoteBook(BOOST_STATION_FILE_PATH, 'boost', boostModelNames, BOOST_TERM_SIG, 'station_'))

    return models

def getForestModels():
    models = []

    models.extend(_loadModelFromNoteBook(FOREST_SATELLITE_FILE_PATH, 'forest', forestModelNames, FOREST_TERM_SIG, 'satellite_'))
    models.extend(_loadModelFromNoteBook(FOREST_STATION_FILE_PATH, 'forest', forestModelNames, FOREST_TERM_SIG, 'station_'))

    return models

def getKNNModels():
    models = []

    models.extend(_loadModelFromNoteBook(KNN_SATELLITE_FILE_PATH, 'knn', knnModelNames, KNN_TERM_SIG, 'satellite_'))
    models.extend(_loadModelFromNoteBook(KNN_STATION_FILE_PATH, 'knn', knnModelNames, KNN_TERM_SIG, 'station_'))

    return models

def getLSTMModel():
    models = []

    models.extend(_loadModelFromNoteBook(LSTM_SATELLITE_FILE_PATH, 'lstm', lstmModelNames, LSTM_TERM_SIG, 'satellite_lstm_'))
    models.extend(_loadModelFromNoteBook(LSTM_SATELLITE_FILE_PATH, 'lstm', lstmModelNames, LSTM_TERM_SIG, 'station_lstm_'))

    return models

def getSVMModels():
    models = []
    
    models.extend(_loadModelFromNoteBook(SVM_SATELLITE_FILE_PATH, 'svm', svmModelNames, SVM_TERM_SIG, 'satellite_'))
    models.extend(_loadModelFromNoteBook(SVM_STATION_FILE_PATH, 'svm', svmModelNames, SVM_TERM_SIG, 'station_'))

    return models