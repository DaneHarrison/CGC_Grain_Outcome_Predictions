import '../style/dataPicker.css'
import Calendar from 'react-calendar'
import React from 'react'


export default class DieseasePicker extends React.Component {
    constructor(props) {
        super(props);
    }


    handleCheckbox = (event, data) => {
        let value = event.target.checked;
        
        this.props.modSelectedData(data, !value)
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