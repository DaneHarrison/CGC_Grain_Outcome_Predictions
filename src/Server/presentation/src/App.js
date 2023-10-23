import React from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './style/App.css';
import axios from 'axios';


export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            agRegions: null,
            weatherStations: null,
            data: null
        }

        this.loadAgRegions()
    }


    async loadAgRegions() {
        try {
            const response = await axios.get('http://localhost:4000/');
            console.log(response.data); // The response data
          } catch (error) {
            console.error('An error occurred:', error);
          }
    }


    render() {
        return (
            <div className="App">
                <MapContainer style={{ width: "100vw", height: "100vh" }} center={[54.875, -106.205]} zoom={5} scrollWheelZoom={true}>
                    <TileLayer url='https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'/>

                    <Marker position={[54.875, -106.205]}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>

                </MapContainer>
                {/* <MapContainer center={[52.9399, -106.4509]} zoom={13} scrollWheelZoom={TRUE}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[51.505, -0.09]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer> */}
                {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
            </div>
        );
    }
}