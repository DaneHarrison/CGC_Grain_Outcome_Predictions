import '../style/dataPicker.css'
import Calendar from 'react-calendar'
import React from 'react'


export default class AggPicker extends React.Component {
    constructor(props) {
        super(props);

        // this.state = {

        // }
    }


    render() {
        return (
            <div className='column'>
                <h2>Aggregate by:</h2>
                <div>
                    <input type="checkbox" id="dailyCheckbox"/>
                    <label for="dailyCheckbox">Daily</label>
                </div>
                <div>
                    <input type="checkbox" id="weeklyCheckbox"/>
                    <label for="weeklyCheckbox">Weekly</label>
                </div>
                <div>
                    <input type="checkbox" id="monthlyCheckbox"/>
                    <label for="monthlyCheckbox">Monthly</label>
                </div>
            </div>
        )
    }
}