import axios from 'axios';
const SERVER_ADDR = 'http://localhost'
const SERVER_PORT = 4000

export default class DataLoader {
    async getAgRegions() {
        let response = await axios.get(`${SERVER_ADDR}:${SERVER_PORT}/agRegions/`);
        response = JSON.parse(response.data)

        return response.features
    }

    async getStations() {
        let response = await axios.get(`${SERVER_ADDR}:${SERVER_PORT}/stations/`);
        
        return JSON.parse(response.data)
    }

    getData(selectedData, aggType) {

    }
}