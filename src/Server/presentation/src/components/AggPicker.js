import '../style/dataPicker.css'
import React from 'react'


export default class AggPicker extends React.Component {
    constructor(props) {
        super(props);
    }

    
    handleRadioChange = (event, newAggVal) => {
        let value = event.target.value;
    
        if(value)
            this.props.dataLoader.modAggType(newAggVal)
    };
    

    render() {
        return (
            <div className='column'>
                <h2>Aggregate:</h2>
                <div>
                    <input type="radio" id="dailyCheckbox" name="aggType" value="daily" onChange={(e) => this.handleRadioChange(e, 'DAY')}/>
                    <label for="dailyCheckbox">Daily</label>
                </div>
                <div>
                    <input type="radio" id="weeklyCheckbox" name="aggType" value="weekly" onChange={(e) => this.handleRadioChange(e, 'WEEK')}/>
                    <label for="weeklyCheckbox">Weekly</label>
                </div>
                <div>
                    <input type="radio" id="monthlyCheckbox" name="aggType" value="monthly" defaultChecked onChange={(e) => this.handleRadioChange(e, 'MONTH')}/>
                    <label for="monthlyCheckbox">Monthly</label>
                </div>
            </div>
        )
    }
}