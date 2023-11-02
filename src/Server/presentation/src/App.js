import React from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup, L, GeoJSON } from 'react-leaflet'
import DataPicker from './components/DataPicker.js'
import 'leaflet/dist/leaflet.css'
import './style/App.css';
import StationMarker from './components/StationMarker.js'
import SampleMarker from './components/SampleMarker.js'
import DataLoader from './classes/DataLoader.ts'


export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataLoader: new DataLoader(),
            date: new Date(),

            agRegions: null,
            stations: [],
            diseases: [] 
        }
    }


    async componentDidMount() {
        let promises = []
        
        promises.push(this.state.dataLoader.initAgRegions())
        promises.push(this.state.dataLoader.initWeatherStations())

        Promise.all(promises).then(() => {
            this.setState({agRegions: this.state.dataLoader.agRegions})
            this.setState({stations: this.state.dataLoader.weatherStations})
        })
    }

    setDate(newDate) {
        this.setState({date: newDate})
    }

    toggleDisease(diseaseName) {
        let currDiseases = this.state.diseases
        let index = currDiseases.indexOf(diseaseName)

        if(index == -1)
            currDiseases.push(diseaseName)
        else
            currDiseases.splice(index, 1);

        this.setState({diseases: currDiseases})
    }

    loadRegionPopUp = (feature, layer) => {
        layer.bindPopup('hi');
    };


    render() {
        return (
            <div className="App">
                <DataPicker date={this.state.date} setDate={(date) => this.setDate(date)} dataLoader={this.state.dataLoader} toggleDisease={(diseaseName) => this.toggleDisease(diseaseName)}/>

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

                    {this.state.stations.filter((station) => this.state.date.getFullYear() >= station.first_year && this.state.date.getFullYear() <= station.last_year)
                        .map((station, i) => (
                            <StationMarker key={i} station={station}/>
                        )  
                    )}

                    {this.state.diseases.map((disease) => (
                        this.state.dataLoader.getData(disease)
                            .filter((sample) => this.state.date.getFullYear() == sample.year)
                            .map((sample, i) => (
                                <SampleMarker key={i} sample={sample} date={this.state.date} diseaseName={disease}/>
                            )
                        )
                    ))}

                </MapContainer>
            </div>
        );
    }
}