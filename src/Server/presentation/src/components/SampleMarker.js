import { Marker, Popup } from 'react-leaflet'
import L from 'leaflet'; // Import the 'leaflet' library
import '../style/dataPicker.css'
import React from 'react'
import ergotIcon from '../assets/ergot.png'


export default class StationMarker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            attributes: [], 
            icon: new L.Icon({
                iconUrl: ergotIcon,
                iconSize: [44, 44],
                iconAnchor: [22, 22],
            })
        }
    }


    componentDidMount() {
        this.chooseMarker(this.props.diseaseName)
        this.setState({attributes: this.props.dataLoader.getMetaData(this.props.diseaseName).columnData})
    }

    chooseMarker(diseaseName) {
        switch(diseaseName) {
            case 'ergot':
                this.setState({icon: new L.Icon({iconUrl: ergotIcon, iconSize: [10, 10], iconAnchor: [5, 5]})})
                break;

            default:
                alert('[ERROR] No marker assigned for this diesease')
                break
        }
    }


    render() {
        return (
            <Marker position={[this.props.sample.y, this.props.sample.x]} icon={this.state.icon}>
                <Popup open={this.loadSamplePopUp} closeButton={true}>
                    {this.state.attributes
                        .map((attr) => (
                            <h4>{attr.displayName + ': ' + this.props.sample[attr.name]}</h4>
                        )
                    )}
                </Popup>
            </Marker>
        )
    }
}