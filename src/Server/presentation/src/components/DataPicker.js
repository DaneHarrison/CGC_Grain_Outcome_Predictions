import '../style/dataPicker.css'
import React from 'react'
import AggPicker from './AggPicker.js'
import DieseasePicker from './DieseasePicker.js'
import SourcePicker from './SourcePicker.js'

export default class DataPicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hidden: false
        }
    }


    toggleDataPicker(requestData=false) {
        this.setState((prevState) => ({ hidden: !prevState.hidden }));

        if(requestData) {
            this.props.dataLoader.requestData()
        }
    }

    modYear(increase, numYears=1) {
        let prevTime = this.props.date.getTime()
        let change = increase ? 1 : -1;
        change = change * numYears;

        this.props.setDate(new Date(prevTime + change * 365 * 24 * 60 * 60 * 1000))
    }


    render() {
        return (
            <div className={`stickyHeader ${this.state.hidden ? null : 'smaller'}`}> 
                {this.state.hidden ?
                    <div>
                        <div className='width80'>
                            <div className='slightMargin'>
                                <button onClick={() => this.toggleDataPicker()} className='red largerAndborderless'>Close</button>
                                <button onClick={() => this.toggleDataPicker(true)} className='green largerAndborderless'>Submit</button>
                            </div>

                            <DieseasePicker dataLoader={this.props.dataLoader} toggleDisease={(diseaseName) => this.props.toggleDisease(diseaseName)}/>
                            <AggPicker dataLoader={this.props.dataLoader}/>
                            <SourcePicker dataLoader={this.props.dataLoader}/>
                        </div>
                    </div>

                    :

                    <button className='fill flex' onClick={() => this.toggleDataPicker()}>
                        <button onClick={(e) => {e.stopPropagation(); this.modYear(false, 5);}} className='arrowBtn'><h1>{'<<'}</h1></button>
                        <button onClick={(e) => {e.stopPropagation(); this.modYear(false);}} className='arrowBtn'><h1>{'<'}</h1></button>
                        <h1>{this.props.date.getFullYear()}</h1>
                        <button onClick={(e) => {e.stopPropagation(); this.modYear(true);}} className='arrowBtn'><h1>{'>'}</h1></button>
                        <button onClick={(e) => {e.stopPropagation(); this.modYear(true, 5);}} className='arrowBtn'><h1>{'>>'}</h1></button>
                    </button>
                }
            </div>
        )
    }
}