import '../style/dataPicker.css'
import Calendar from 'react-calendar'
import React from 'react'
import AggPicker from './AggPicker.js'
import DieseasePicker from './DieseasePicker.js'
import SourcePicker from './SourcePicker.js'

export default class DataPicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hidden: false,
            date: new Date()
        }
    }


    modDateByCalendar = date => this.setState({date})

    modDate(increase) {
        let prevDateTime = this.state.date.getTime();
        let change = increase ? 1 : -1;
        let nxtMonth, currYear, numDaysInMonth;

        switch(this.state.aggType) {
            case 'DAY':
                this.setState({date: new Date(prevDateTime + change * 24 * 60 * 60 * 1000)})
                break;

            case 'WEEK':
                this.setState({date: new Date(prevDateTime + change * 7 * 24 * 60 * 60 * 1000)})
                break;

            case 'MONTH':
                nxtMonth = this.state.date.getMonth() + 1
                currYear = this.state.date.getFullYear() - 1

                if(nxtMonth > 11) {
                    currYear += 1
                    nxtMonth = nxtMonth % 11
                }

                // Gets the last day of the previous/current month (because we've already skipped ahead)
                numDaysInMonth = new Date(currYear, nxtMonth, 0)
                numDaysInMonth = numDaysInMonth.getDate()

                this.setState({date: new Date(prevDateTime + change * numDaysInMonth * 24 * 60 * 60 * 1000)});
                break;
        }
    }

    modYear(increase) {
        let prevDateTime = this.state.date.getTime();
        let change = increase ? 1 : -1;

        this.setState({date: new Date(prevDateTime + change * 365 * 24 * 60 * 60 * 1000)});
    }

    toggleDataPicker() {
        this.setState((prevState) => ({ hidden: !prevState.hidden }));
    }

    render() {
        return (
            <div className={`stickyHeader ${this.state.hidden ? null : 'smaller'}`}> 
                {this.state.hidden ?
                    <div>
                        <div className='width80'>
                            <div class='calendarContainer'>
                                <Calendar onChange={this.modDateByCalendar} value={this.state.date}/>

                                <div className='slightMargin'>
                                    <button onClick={() => this.toggleDataPicker()} className='red largerAndborderless'>Close</button>
                                    <button onClick={() => this.toggleDataPicker()} className='green largerAndborderless'>Submit</button>
                                </div>
                            </div>
                            
                            <DieseasePicker modSelectedData={(data, removing) => this.props.modSelectedData(data, removing)}/>
                            <AggPicker modAggType={(newVal) => this.props.modAggType(newVal)}/>
                            <SourcePicker modSelectedData={(data, removing) => this.props.modSelectedData(data, removing)}/>
                        </div>
                    </div>

                    :

                    <button className='fill flex' onClick={() => this.toggleDataPicker()}>
                        <button onClick={(e) => {e.stopPropagation(); this.modYear(false);}} className='arrowBtn'><h1>{'<<'}</h1></button>
                        <button onClick={(e) => {e.stopPropagation(); this.modDate(false);}} className='arrowBtn'><h1>{'<'}</h1></button>
                        <h1>{`${this.state.date.getMonth() + 1}/${this.state.date.getDate()}/${this.state.date.getFullYear()}`}</h1>
                        <button onClick={(e) => {e.stopPropagation(); this.modDate(true);}} className='arrowBtn'><h1>{'>'}</h1></button>
                        <button onClick={(e) => {e.stopPropagation(); this.modYear(true);}} className='arrowBtn'><h1>{'>>'}</h1></button>
                    </button>
                }
            </div>
        )
    }
}