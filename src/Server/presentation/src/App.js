import React from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup, L, GeoJSON } from 'react-leaflet'
import DataPicker from './components/DataPicker.js'
import 'leaflet/dist/leaflet.css'
import './style/App.css';
import axios from 'axios';


export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataManager: null,
            agRegions: null,
            stations: null,
            selectedData: [],
            aggType: 'MONTH',
            data: {}
        }
    }


    componentDidMount() {
        this.loadAgRegions()
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

    async loadAgRegions() {
        //try {

        let response = await axios.get('http://localhost:4000/');
        response = JSON.parse(response.data)
        console.log(response.features)
        this.setState({ agRegions: response.features }, () => {
            // This callback is called after the state has been updated
            console.log(this.state.agRegions);
        });

        //   } catch (error) {
        //     console.error('An error occurred:', error);
        //   }
    }

    loadPopUp = (feature, layer) => {
        layer.bindPopup('hi');
    };


    render() {
        return (
            <div className="App">
                <DataPicker modAggType={(newVal) => this.modAggType(newVal)} modSelectedData={(data, removing) => this.modSelectedData(data, removing)}/>

                <MapContainer style={{ width: "100vw", height: "100vh" }} center={[55.3, -106.205]} zoom={6} scrollWheelZoom={true}>
                    <TileLayer url='https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png' />

                    {this.state.agRegions && (<GeoJSON data={this.state.agRegions} style={(feature) => ({
                        color: 'black',
                        fillColor: feature.properties.color,
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.7,
                    })}
                        onEachFeature={this.loadPopUp}
                    />)}

                    {/* <Marker position={[54.875, -106.205]}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker> */}

                </MapContainer>
            </div>
        );
    }
}