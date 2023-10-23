import '../style/dataPicker.css'
import Calendar from 'react-calendar'
import React from 'react'


export default class SourcePicker extends React.Component {
    constructor(props) {
        super(props);

        // this.state = {

        // }
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
                                <input type="checkbox" id="dewPointCheckbox" />
                                <label for="dewPointCheckbox">Dewpoint Temperature</label>
                            </div>
                            <div>
                                <input type="checkbox" id="temperatureCheckbox" />
                                <label for="temperatureCheckbox">Temperature</label>
                            </div>
                            <div>
                                <input type="checkbox" id="evaporationCheckbox" />
                                <label for="evaporationCheckbox">Evaporation from Soil</label>
                            </div>
                            <div>
                                <input type="checkbox" id="skinReservoirCheckbox" />
                                <label for="skinReservoirCheckbox">Skin Resevoir Content</label>
                            </div>
                            <div>
                                <input type="checkbox" id="skinTempCheckbox" />
                                <label for="skinTempCheckbox">Skin Temperature</label>
                            </div>
                            <div>
                                <input type="checkbox" id="snowmeltCheckbox" />
                                <label for="snowmeltCheckbox">Snowmelt</label>
                            </div>
                            <div>
                                <input type="checkbox" id="soilTempLvl1Checkbox" />
                                <label for="soilTempLvl1Checkbox">Soil Temperature Lvl 1</label>
                            </div>
                            <div>
                                <input type="checkbox" id="soilTempLvl2Checkbox" />
                                <label for="soilTempLvl2Checkbox">Soil Temperature Lvl 2</label>
                            </div>
                            <div>
                                <input type="checkbox" id="soilTempLvl3Checkbox" />
                                <label for="soilTempLvl3Checkbox">Soil Temperature Lvl 3</label>
                            </div>
                            <div>
                                <input type="checkbox" id="soilTempLvl4Checkbox" />
                                <label for="soilTempLvl4Checkbox">Soil Temperature Lvl 4</label>
                            </div>
                            <div>
                                <input type="checkbox" id="netSolarRadCheckbox" />
                                <label for="netSolarRadCheckbox">Net Solar Radiation</label>
                            </div>
                            <div>
                                <input type="checkbox" id="surfacePressureCheckbox" />
                                <label for="surfacePressureCheckbox">Surface Pressure</label>
                            </div>
                            <div>
                                <input type="checkbox" id="soilWaterLvl1Checkbox" />
                                <label for="soilWaterLvl1Checkbox">Soil Water Lvl 1</label>
                            </div>
                            <div>
                                <input type="checkbox" id="soilWaterLvl2Checkbox" />
                                <label for="soilWaterLvl2Checkbox">Soil Water Lvl 2</label>
                            </div>
                            <div>
                                <input type="checkbox" id="soilWaterLvl3Checkbox" />
                                <label for="soilWaterLvl3Checkbox">Soil Water Lvl 3</label>
                            </div>
                            <div>
                                <input type="checkbox" id="soilWaterLvl4Checkbox" />
                                <label for="soilWaterLvl4Checkbox">Soil Water Lvl 4</label>
                            </div>
                            <div>
                                <input type="checkbox" id="idxHighVegetationCheckbox" />
                                <label for="idxHighVegetationCheckbox">Index High Vegetation</label>
                            </div>
                            <div>
                                <input type="checkbox" id="idxHighVegetationCheckbox" />
                                <label for="idxLowVegetationCheckbox">Index Low Vegetation</label>
                            </div>
                        </div>
                        </div>

                        <div>
                        <h4>Soil</h4>
                        <div className='wrap gap'>
                            <div>
                                <input type="checkbox" id="coarseFragCheckbox" />
                                <label for="coarseFragCheckbox">Coarse Frag</label>
                            </div>
                            <div>
                                <input type="checkbox" id="sandCheckbox" />
                                <label for="sandCheckbox">Sand</label>
                            </div>
                            <div>
                                <input type="checkbox" id="siltCheckbox" />
                                <label for="siltCheckbox">Silt</label>
                            </div>
                            <div>
                                <input type="checkbox" id="clayCheckbox" />
                                <label for="clayCheckbox">Clay</label>
                            </div>
                            <div>
                                <input type="checkbox" id="carbonCheckbox" />
                                <label for="carbonCheckbox">Carbon</label>
                            </div>
                            <div>
                                <input type="checkbox" id="calciumPHCheckbox" />
                                <label for="calciumPHCheckbox">Calcium PH</label>
                            </div>
                            <div>
                                <input type="checkbox" id="projPHCheckbox" />
                                <label for="projPHCheckbox">Proj PH</label>
                            </div>
                            <div>
                                <input type="checkbox" id="waterRetention0Checkbox" />
                                <label for="waterRetention0Checkbox">Water Retention 0</label>
                            </div>
                            <div>
                                <input type="checkbox" id="waterRetention10Checkbox" />
                                <label for="waterRetention10Checkbox">Water Retention 10</label>
                            </div>
                            <div>
                                <input type="checkbox" id="waterRetention33Checkbox" />
                                <label for="waterRetentio33Checkbox">Water Retention 33</label>
                            </div>
                            <div>
                                <input type="checkbox" id="waterRetention1500Checkbox" />
                                <label for="waterRetention1500Checkbox">Water Retention 1500</label>
                            </div>
                            <div>
                                <input type="checkbox" id="myCheckbox" />
                                <label for="myCheckbox">Check this</label>
                            </div>
                            <div>
                                <input type="checkbox" id="bulkDensityCheckbox" />
                                <label for="bulkDensityCheckbox">Bulk Density</label>
                            </div>
                            <div>
                                <input type="checkbox" id="electricConductivityCheckbox" />
                                <label for="electricConductivityCheckbox">Electric Conductivity</label>
                            </div>
                            <div>
                                <input type="checkbox" id="woodCheckbox" />
                                <label for="woodCheckbox">Wood</label>
                            </div>
                            <div>
                                <input type="checkbox" id="waterHoldCapCheckbox" />
                                <label for="waterHoldCapCheckbox">Water Holding Cap</label>
                            </div>
                            <div>
                                <input type="checkbox" id="landAreaCheckbox" />
                                <label for="landAreaCheckbox">Land Area</label>
                            </div>
                            <div>
                                <input type="checkbox" id="waterAreaCheckbox" />
                                <label for="waterAreaCheckbox">Water Area</label>
                            </div>
                        </div>
                        </div>

                        <div>
                        <h4>Soil Moisture</h4>
                        <div className='wrap gap'>
                            <div>
                                <input type="checkbox" id="soilMoistureCheckbox" />
                                <label for="soilMoistureCheckbox">Soil Moisture</label>
                            </div>
                        </div>
                        </div>

                        <div>
                        <h4>Weather stations</h4>
                        <div className='wrap'>
                            <div>
                                <input type="checkbox" id="stationTempCheckbox" />
                                <label for="stationTempCheckbox">Temperature</label>
                            </div>
                            <div>
                                <input type="checkbox" id="stationDewpointTempCheckbox" />
                                <label for="stationDewpointTempCheckbox">Dewpoint Temperature</label>
                            </div>
                            <div>
                                <input type="checkbox" id="humidexCheckbox" />
                                <label for="humidexCheckbox">Humidex</label>
                            </div>
                            <div>
                                <input type="checkbox" id="precipitationCheckbox" />
                                <label for="precipitationCheckbox">Precipitation</label>
                            </div>
                            <div>
                                <input type="checkbox" id="relHumidityCheckbox" />
                                <label for="relHumidityCheckbox">Relative Humidity</label>
                            </div>
                            <div>
                                <input type="checkbox" id="stationPresureCheckbox" />
                                <label for="stationPresureCheckbox">Station Pressure</label>
                            </div>
                            <div>
                                <input type="checkbox" id="visibilityCheckbox" />
                                <label for="visibilityCheckbox">Visibility</label>
                            </div>
                            <div>
                                <input type="checkbox" id="totalRainCheckbox" />
                                <label for="totalRainCheckbox">Total Rain</label>
                            </div>
                            <div>
                                <input type="checkbox" id="totalSnowCheckbox" />
                                <label for="totalSnowCheckbox">Total Snow</label>
                            </div>
                            <div>
                                <input type="checkbox" id="snowOnGroundCheckbox" />
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