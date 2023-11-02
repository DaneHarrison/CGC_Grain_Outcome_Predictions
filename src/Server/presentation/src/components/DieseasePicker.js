import '../style/dataPicker.css'
import React from 'react'


export default class DieseasePicker extends React.Component {
    handleCheckbox = (event, identifier) => {
        let value = event.target.checked;
        let dieseaseData = this.props.dataLoader.getMetaData(identifier)

        for(let column of dieseaseData.columnData) {
            column.selected = value
        }
    }


    render() {
        return (
            <div className='column'>
                <h2>Disease:</h2>
                <div>
                    <input type="checkbox" id="ergotCheckbox" onChange={(e) => this.handleCheckbox(e, 'ergot')}/>
                    <label for="ergotCheckbox">Ergot</label>
                </div>
            </div>
        )
    }
}