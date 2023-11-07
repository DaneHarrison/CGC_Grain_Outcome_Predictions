import axios from 'axios';

const SERVER_ADDR = 'http://localhost'
const SERVER_PORT = 4000


export default class ModelLoader {
    constructor() {
        this._models = []
    }


    get models() {
        return this._models
    }

    initModels() {
        let data;

        return axios.get(`${SERVER_ADDR}:${SERVER_PORT}/models/load/`).then((response) => {
            data = response.data    
            this._models = data;
        })
    }

    async predict(modelName, predictionInput) {
        let response = await axios.post(`${SERVER_ADDR}:${SERVER_PORT}/models/predict/`, {'modelName': modelName, 'predictionInput': predictionInput})

        return response.data.output
    }
}