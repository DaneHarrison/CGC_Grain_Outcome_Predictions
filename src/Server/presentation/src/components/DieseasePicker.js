import '../style/dataPicker.css'
import React from 'react'


export default class DieseasePicker extends React.Component {
    handleCheckbox = (event, identifier) => {
        let value = event.target.checked;
        let dieseaseData = this.props.dataLoader.getMetaData(identifier)

        for(let column of dieseaseData.columnData) {
            column.selected = value
        }

        this.props.toggleDisease(identifier)
    }


    render() {
        return (
            <div className='column'>
                <h2>Disease:</h2>
                <div>
                    <input type="checkbox" id="ergotCheckbox" defaultChecked={this.props.dataLoader.getMetaData('ergot').columnData[0].selected} onChange={(e) => this.handleCheckbox(e, 'ergot')}/>
                    <label for="ergotCheckbox">Ergot</label>
                </div>
            </div>
        )
    }
}