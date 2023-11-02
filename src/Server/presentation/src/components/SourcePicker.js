import '../style/dataPicker.css'
import React from 'react'


export default class SourcePicker extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            srcs: [
                this.props.dataLoader.getMetaData('copernicus'),
                this.props.dataLoader.getMetaData('soil'),
                this.props.dataLoader.getMetaData('soilMoisture'),
                this.props.dataLoader.getMetaData('weatherStations')
            ]
        }
    }


    handleCheckbox = (event, attr, metaData) => {
        let value = event.target.checked;

        metaData.toggleSelect(attr, value)
    }


    render() {
        return (
            <div>
                <h2>Data Sources:</h2>
                <div className='wrap'>
                    {this.state.srcs.map((src, i) => {
                        
                        return (
                            <div key={src.tableData.name + i}>
                                <h4>{src.tableData.displayName}</h4>

                                <div className='wrap gap'>
                                    {src.columnData.map((column) => {
                                        if (column.name != 'year' && column.name != 'month' && column.name != 'day' && column.name != 'district')
                                            
                                            return (
                                                <div key={src.tableData.name + i + column.name}>
                                                    <input type="checkbox" id={column.name + "Checkbox"} defaultChecked={column.selected} onChange={(e) => this.handleCheckbox(e, column.name, src)} />
                                                    <label for={column.name + "Checkbox"}>{column.displayName}</label>
                                                </div>
                                            )
                                    })}
                                </div>

                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}