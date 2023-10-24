import React from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup, L, GeoJSON } from 'react-leaflet'
import DataPicker from './components/DataPicker.js'
import 'leaflet/dist/leaflet.css'
import './style/App.css';
import axios from 'axios';
import StationMarker from './components/StationMarker.js'
import DataLoader from './classes/DataLoader.js'


export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: new Date(),
            dataLoader: new DataLoader(),
            agRegions: null,
            stations: null,
            selectedData: [],
            aggType: 'MONTH',
            data: {}
        }
    }


    async componentDidMount() {
        this.state.dataLoader.getAgRegions().then((data) => {
            this.setState({ agRegions: data });
        })
        
        this.state.dataLoader.getStations().then((data) => {
            let stations = []


            for(let i = 0; i < Object.keys(data.province).length; i++) {
                stations.push({
                    'province': data.province[i], 
                    'latitude': data.latitude[i], 
                    'longitude': data.longitude[i], 
                    'elevation': data.elevation[i], 
                    'first_year': data.first_year[i], 
                    'last_year': data.last_year[i]
                })
            }

            this.setState({ stations: stations });
        })
    }

    setDate(newDate) {
        this.setState({date: newDate})
    }

    modSelectedData(data, removing=false) {
        let selectedData = [...this.state.selectedData]
        alert(removing)

        if(removing)
            selectedData = selectedData.filter((currData) => currData != data)
        else 
            selectedData.push(data)

        this.setState({selectedData: selectedData})
    }

    modAggType(newVal) {
        if(newVal == 'DAY' || newVal == 'WEEK' || newVal == 'MONTH')
            this.setState({aggType: newVal})
    }

    loadRegionPopUp = (feature, layer) => {
        layer.bindPopup('hi');
    };


    render() {
        return (
            <div className="App">
                <DataPicker date={this.state.date} setDate={(date) => this.setDate(date)} aggType={this.state.aggType} modAggType={(newVal) => this.modAggType(newVal)} modSelectedData={(data, removing) => this.modSelectedData(data, removing)}/>

                <MapContainer style={{ width: "100vw", height: "100vh" }} center={[55.3, -106.205]} zoom={6} minZoom={5} scrollWheelZoom={true}>
                    <TileLayer url='https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png' />

                    {this.state.agRegions && (<GeoJSON data={this.state.agRegions} style={(feature) => ({
                        color: 'black',
                        fillColor: feature.properties.color,
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.7,
                    })}
                        onEachFeature={this.loadRegionPopUp}
                    />)}

                    {this.state.stations && this.state.stations.map((station, i) => { 
                        return <StationMarker key={i} station={station} date={this.state.date}/>  
                    })}

                </MapContainer>
            </div>
        );
    }
}