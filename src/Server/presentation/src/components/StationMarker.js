import { Marker, Popup } from 'react-leaflet'
import L from 'leaflet'; // Import the 'leaflet' library
import '../style/dataPicker.css'
import React from 'react'
import stationIcon from '../assets/windmill.png'


export default class StationMarker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stationIcon: new L.Icon({
                iconUrl: stationIcon, // Replace with the path to your custom icon image
                iconSize: [10, 10], // Set the size of the icon
                iconAnchor: [5, 5], // Set the anchor point for the icon (usually half of the icon size)
            })
        }
    }


    render() {
        return (
            <Marker position={[this.props.station.latitude, this.props.station.longitude]} icon={this.state.stationIcon}>
                <Popup open={this.loadStationPopUp} closeButton={true}>
                    <h4>Province: {this.props.station.province}</h4>
                    <h4>Elevation: {this.props.station.elevation}</h4>
                    <h4>First Year: {this.props.station.first_year}</h4>
                    <h4>Last Year: {this.props.station.last_year}</h4>
                    <h4>Total Number of Years: {this.props.station.last_year - this.props.station.first_year}</h4>
                </Popup>
            </Marker>
        )
    }
}