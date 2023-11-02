import { Data } from "./Interfaces.ts";
import MetaData from "./MetaData.ts";
import defaultDBMap from '../assets/defaultDBMap.json'
import axios from 'axios';

const SERVER_ADDR = 'http://localhost'
const SERVER_PORT = 4000


export default class DataLoader {
    _weatherStations: {}[];
    _agRegions: {};
    _aggType: string;
    _data: Data;
    _metaData: {
        'ergot': MetaData,
        'copernicus': MetaData,
        'soil': MetaData,
        'soilMoisture': MetaData,
        'weatherStations': MetaData, 
    }

    constructor(aggType: string = 'MONTH') {
        this._weatherStations = null;
        this._agRegions = null;
        this._aggType = aggType;
        this._data = {
            'ergot': [],
            'copernicus': [],
            'soil': [],
            'soilMoisture': [],
            'weatherStations': []
        }

        this._metaData = {
            'ergot': new MetaData(defaultDBMap.ergot.table, defaultDBMap.ergot.columns),
            'copernicus': new MetaData(defaultDBMap.copernicus.table, defaultDBMap.copernicus.columns),
            'soil': new MetaData(defaultDBMap.soil.table, defaultDBMap.soil.columns),
            'soilMoisture': new MetaData(defaultDBMap.soilMoisture.table, defaultDBMap.soilMoisture.columns),
            'weatherStations': new MetaData(defaultDBMap.weatherStations.table, defaultDBMap.weatherStations.columns)
        }
    }


    initAgRegions() {
        let data;

        return axios.get(`${SERVER_ADDR}:${SERVER_PORT}/data/init/`, {params: {'src': 'agRegions'}}).then((response) => {
            data = JSON.parse(response.data)
            this._agRegions = data
        });
    }

    initWeatherStations() {
        let data;

        return axios.get(`${SERVER_ADDR}:${SERVER_PORT}/data/init/`, {params: {'src': 'stations'}}).then((response) => {
            data = JSON.parse(response.data)
            this._weatherStations = data
        });
    }

    get weatherStations() {
        return this._weatherStations
    }

    get agRegions() {
        return this._agRegions
    }

    get aggType() {
        return this._aggType
    }

    set aggType(newAggType: string) {
        if(newAggType == 'DAY' || newAggType == 'WEEK' || newAggType == 'MONTH')
            this._aggType = newAggType
    }

    getMetaData(identifier: string) {
        return this._metaData[identifier]
    }

    getData(identifier: string) {
        return this._data[identifier]
    }

    async requestData() {
        let dataToPull, data

        for(let src in this._metaData) {
            dataToPull = this._metaData[src].dataToPull()

            if(dataToPull.length > 0)
                axios.get(`${SERVER_ADDR}:${SERVER_PORT}/data/load/`, {params: {'src': this._metaData[src].tableData.name, 'attrs': dataToPull.join(',')}}).then((response) => {
                    data = JSON.parse(response.data)
                    
                    this._loadData(src, data, this._data[src].length == 0)
                    this._metaData[src].setLoaded(dataToPull)
                })
        }
    }

    _loadData(src, newdata, isEmpty) {
        if(isEmpty) { 
            this._data[src] = newdata
        }
        else  {
            for(let i = 0; i < this._data[src].length; i++) {
                this._data[src][i] = {...this._data[src][i], ...newdata[i]}
            }
        }

        if(src=='ergot') {
            console.log(this._data[src])
        }
    }
}