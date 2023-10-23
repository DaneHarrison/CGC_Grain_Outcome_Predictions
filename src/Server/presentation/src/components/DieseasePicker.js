import '../style/dataPicker.css'
import Calendar from 'react-calendar'
import React from 'react'


export default class DieseasePicker extends React.Component {
    constructor(props) {
        super(props);

        // this.state = {

        // }
    }


    render() {
        return (
            <div className='column'>
                <h2>Disease:</h2>
                <div>
                    <input type="checkbox" id="ergotCheckbox"/>
                    <label for="ergotCheckbox">Ergot</label>
                </div>
            </div>
        )
    }
}