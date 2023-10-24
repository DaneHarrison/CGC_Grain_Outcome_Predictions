import '../style/dataPicker.css'
import Calendar from 'react-calendar'
import React from 'react'


export default class SourcePicker extends React.Component {
    constructor(props) {
        super(props);
    }


    handleCheckbox = (event, data) => {
        let value = event.target.checked;
        
        this.props.modSelectedData(data, !value)
    }


    render() {
        return (
            <div >
                <h2>Data Sources:</h2>
                <div>
                    <div className='wrap'>
                        <div>
                        <h4>Copernicus</h4>
                        <div className='wrap gap'>
                            <div>
                                <input type="checkbox" id="dewPointCheckbox" onChange={(e) => this.handleCheckbox(e, 'Copernicus:Dewpoint Temperature')}/>
                                <label for="dewPointCheckbox">Dewpoint Temperature</label>
                            </div>
                            <div>
                                <input type="checkbox" id="temperatureCheckbox" onChange={(e) => this.handleCheckbox(e, 'Copernicus:Temperature')}/>
                                <label for="temperatureCheckbox">Temperature</label>
                            </div>
                            <div>
                                <input type="checkbox" id="evaporationCheckbox" onChange={(e) => this.handleCheckbox(e, 'Copernicus:Evaporation from Soil')}/>
                                <label for="evaporationCheckbox">Evaporation from Soil</label>
                            </div>
                            <div>
                                <input type="checkbox" id="skinReservoirCheckbox" onChange={(e) => this.handleCheckbox(e, 'Copernicus:Skin Resevoir Content')}/>
                                <label for="skinReservoirCheckbox">Skin Resevoir Content</label>
                            </div>
                            <div>
                                <input type="checkbox" id="skinTempCheckbox" onChange={(e) => this.handleCheckbox(e, 'Copernicus:Skin Temperature')}/>
                                <label for="skinTempCheckbox">Skin Temperature</label>
                            </div>
                            <div>
                                <input type="checkbox" id="snowmeltCheckbox" onChange={(e) => this.handleCheckbox(e, 'Copernicus:Snowmelt')}/>
                                <label for="snowmeltCheckbox">Snowmelt</label>
                            </div>
                            <div>
                                <input type="checkbox" id="soilTempLvl1Checkbox" onChange={(e) => this.handleCheckbox(e, 'Copernicus:Soil Temperature Lvl 1')}/>
                                <label for="soilTempLvl1Checkbox">Soil Temperature Lvl 1</label>
                            </div>
                            <div>
                                <input type="checkbox" id="soilTempLvl2Checkbox" onChange={(e) => this.handleCheckbox(e, 'Copernicus:Soil Temperature Lvl 2')}/>
                                <label for="soilTempLvl2Checkbox">Soil Temperature Lvl 2</label>
                            </div>
                            <div>
                                <input type="checkbox" id="soilTempLvl3Checkbox" onChange={(e) => this.handleCheckbox(e, 'Copernicus:Soil Temperature Lvl 3')}/>
                                <label for="soilTempLvl3Checkbox">Soil Temperature Lvl 3</label>
                            </div>
                            <div>
                                <input type="checkbox" id="soilTempLvl4Checkbox" onChange={(e) => this.handleCheckbox(e, 'Copernicus:Soil Temperature Lvl 4')}/>
                                <label for="soilTempLvl4Checkbox">Soil Temperature Lvl 4</label>
                            </div>
                            <div>
                                <input type="checkbox" id="netSolarRadCheckbox" onChange={(e) => this.handleCheckbox(e, 'Copernicus:Net Solar Radiation')}/>
                                <label for="netSolarRadCheckbox">Net Solar Radiation</label>
                            </div>
                            <div>
                                <input type="checkbox" id="surfacePressureCheckbox" onChange={(e) => this.handleCheckbox(e, 'Copernicus:Surface Pressure')}/>
                                <label for="surfacePressureCheckbox">Surface Pressure</label>
                            </div>
                            <div>
                                <input type="checkbox" id="soilWaterLvl1Checkbox" onChange={(e) => this.handleCheckbox(e, 'Copernicus:Soil Water Lvl 1')}/>
                                <label for="soilWaterLvl1Checkbox">Soil Water Lvl 1</label>
                            </div>
                            <div>
                                <input type="checkbox" id="soilWaterLvl2Checkbox" onChange={(e) => this.handleCheckbox(e, 'Copernicus:Soil Water Lvl 2')}/>
                                <label for="soilWaterLvl2Checkbox">Soil Water Lvl 2</label>
                            </div>
                            <div>
                                <input type="checkbox" id="soilWaterLvl3Checkbox" onChange={(e) => this.handleCheckbox(e, 'Copernicus:Soil Water Lvl 3')}/>
                                <label for="soilWaterLvl3Checkbox">Soil Water Lvl 3</label>
                            </div>
                            <div>
                                <input type="checkbox" id="soilWaterLvl4Checkbox" onChange={(e) => this.handleCheckbox(e, 'Copernicus:Soil Water Lvl 4')}/>
                                <label for="soilWaterLvl4Checkbox">Soil Water Lvl 4</label>
                            </div>
                            <div>
                                <input type="checkbox" id="idxHighVegetationCheckbox" onChange={(e) => this.handleCheckbox(e, 'Copernicus:Index High Vegetation')}/>
                                <label for="idxHighVegetationCheckbox">Index High Vegetation</label>
                            </div>
                            <div>
                                <input type="checkbox" id="idxHighVegetationCheckbox" onChange={(e) => this.handleCheckbox(e, 'Copernicus:Index Low Vegetation')}/>
                                <label for="idxLowVegetationCheckbox">Index Low Vegetation</label>
                            </div>
                        </div>
                        </div>

                        <div>
                        <h4>Soil</h4>
                        <div className='wrap gap'>
                            <div>
                                <input type="checkbox" id="coarseFragCheckbox" onChange={(e) => this.handleCheckbox(e, 'Soil:Coarse Frag')}/>
                                <label for="coarseFragCheckbox">Coarse Frag</label>
                            </div>
                            <div>
                                <input type="checkbox" id="sandCheckbox" onChange={(e) => this.handleCheckbox(e, 'Soil:Sand')}/>
                                <label for="sandCheckbox">Sand</label>
                            </div>
                            <div>
                                <input type="checkbox" id="siltCheckbox" onChange={(e) => this.handleCheckbox(e, 'Soil:Silt')}/>
                                <label for="siltCheckbox">Silt</label>
                            </div>
                            <div>
                                <input type="checkbox" id="clayCheckbox" onChange={(e) => this.handleCheckbox(e, 'Soil:Clay')}/>
                                <label for="clayCheckbox">Clay</label>
                            </div>
                            <div>
                                <input type="checkbox" id="carbonCheckbox" onChange={(e) => this.handleCheckbox(e, 'Soil:Carbon')}/>
                                <label for="carbonCheckbox">Carbon</label>
                            </div>
                            <div>
                                <input type="checkbox" id="calciumPHCheckbox" onChange={(e) => this.handleCheckbox(e, 'Soil:Calcium PH')}/>
                                <label for="calciumPHCheckbox">Calcium PH</label>
                            </div>
                            <div>
                                <input type="checkbox" id="projPHCheckbox" onChange={(e) => this.handleCheckbox(e, 'Soil:Proj PH')}/>
                                <label for="projPHCheckbox">Proj PH</label>
                            </div>
                            <div>
                                <input type="checkbox" id="waterRetention0Checkbox" onChange={(e) => this.handleCheckbox(e, 'Soil:Water Retention 0')}/>
                                <label for="waterRetention0Checkbox">Water Retention 0</label>
                            </div>
                            <div>
                                <input type="checkbox" id="waterRetention10Checkbox" onChange={(e) => this.handleCheckbox(e, 'Soil:Water Retention 10')}/>
                                <label for="waterRetention10Checkbox">Water Retention 10</label>
                            </div>
                            <div>
                                <input type="checkbox" id="waterRetention33Checkbox" onChange={(e) => this.handleCheckbox(e, 'Soil:Water Retention 33')}/>
                                <label for="waterRetentio33Checkbox">Water Retention 33</label>
                            </div>
                            <div>
                                <input type="checkbox" id="waterRetention1500Checkbox" onChange={(e) => this.handleCheckbox(e, 'Soil:Water Retention 1500')}/>
                                <label for="waterRetention1500Checkbox">Water Retention 1500</label>
                            </div>
                            <div>
                                <input type="checkbox" id="bulkDensityCheckbox" onChange={(e) => this.handleCheckbox(e, 'Soil:Bulk Density')}/>
                                <label for="bulkDensityCheckbox">Bulk Density</label>
                            </div>
                            <div>
                                <input type="checkbox" id="electricConductivityCheckbox" onChange={(e) => this.handleCheckbox(e, 'Soil:Electric Conductivity')}/>
                                <label for="electricConductivityCheckbox">Electric Conductivity</label>
                            </div>
                            <div>
                                <input type="checkbox" id="woodCheckbox" onChange={(e) => this.handleCheckbox(e, 'Soil:Wood')}/>
                                <label for="woodCheckbox">Wood</label>
                            </div>
                            <div>
                                <input type="checkbox" id="waterHoldCapCheckbox" onChange={(e) => this.handleCheckbox(e, 'Soil:Water Holding Cap')}/>
                                <label for="waterHoldCapCheckbox">Water Holding Cap</label>
                            </div>
                            <div>
                                <input type="checkbox" id="landAreaCheckbox" onChange={(e) => this.handleCheckbox(e, 'Soil:Land Area')}/>
                                <label for="landAreaCheckbox">Land Area</label>
                            </div>
                            <div>
                                <input type="checkbox" id="waterAreaCheckbox" onChange={(e) => this.handleCheckbox(e, 'Soil:Water Area')}/>
                                <label for="waterAreaCheckbox">Water Area</label>
                            </div>
                        </div>
                        </div>

                        <div>
                        <h4>Soil Moisture</h4>
                        <div className='wrap gap'>
                            <div>
                                <input type="checkbox" id="soilMoistureCheckbox" onChange={(e) => this.handleCheckbox(e, 'Soil Moisture:Soil Moisture')}/>
                                <label for="soilMoistureCheckbox">Soil Moisture</label>
                            </div>
                        </div>
                        </div>

                        <div>
                        <h4>Weather Stations</h4>
                        <div className='wrap'>
                            <div>
                                <input type="checkbox" id="stationTempCheckbox" onChange={(e) => this.handleCheckbox(e, 'Weather Stations:Temperature')}/>
                                <label for="stationTempCheckbox">Temperature</label>
                            </div>
                            <div>
                                <input type="checkbox" id="stationDewpointTempCheckbox" onChange={(e) => this.handleCheckbox(e, 'Weather Stations:Dewpoint Temperature')}/>
                                <label for="stationDewpointTempCheckbox">Dewpoint Temperature</label>
                            </div>
                            <div>
                                <input type="checkbox" id="humidexCheckbox" onChange={(e) => this.handleCheckbox(e, 'Weather Stations:Humidex')}/>
                                <label for="humidexCheckbox">Humidex</label>
                            </div>
                            <div>
                                <input type="checkbox" id="precipitationCheckbox" onChange={(e) => this.handleCheckbox(e, 'Weather Stations:Precipitation')}/>
                                <label for="precipitationCheckbox">Precipitation</label>
                            </div>
                            <div>
                                <input type="checkbox" id="relHumidityCheckbox" onChange={(e) => this.handleCheckbox(e, 'Weather Stations:Relative Humidity')}/>
                                <label for="relHumidityCheckbox">Relative Humidity</label>
                            </div>
                            <div>
                                <input type="checkbox" id="stationPresureCheckbox" onChange={(e) => this.handleCheckbox(e, 'Weather Stations:Station Pressure')}/>
                                <label for="stationPresureCheckbox">Station Pressure</label>
                            </div>
                            <div>
                                <input type="checkbox" id="visibilityCheckbox" onChange={(e) => this.handleCheckbox(e, 'Weather Stations:Visibility')}/>
                                <label for="visibilityCheckbox">Visibility</label>
                            </div>
                            <div>
                                <input type="checkbox" id="totalRainCheckbox" onChange={(e) => this.handleCheckbox(e, 'Weather Stations:Total Rain')}/>
                                <label for="totalRainCheckbox">Total Rain</label>
                            </div>
                            <div>
                                <input type="checkbox" id="totalSnowCheckbox" onChange={(e) => this.handleCheckbox(e, 'Weather Stations:Total Snow')}/>
                                <label for="totalSnowCheckbox">Total Snow</label>
                            </div>
                            <div>
                                <input type="checkbox" id="snowOnGroundCheckbox" onChange={(e) => this.handleCheckbox(e, 'Weather Stations:Snow on Ground')}/>
                                <label for="snowOnGroundCheckbox">Snow on Ground</label>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}