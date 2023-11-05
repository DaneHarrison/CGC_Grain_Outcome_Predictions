import React from 'react'
import '../style/overlay.css'
import picture from '../assets/tree.png'


export default class ModelOverlay extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            models: ['a', 'b', 'c'],
            factors: ['a', 'b', 'c'],

            selectedModel: 'a',
            results: null
        }
    }


    render() {
        return (
            <div class='coverScreen'>
                <div class='grid'>
                    <div class='input'>
                        <div class='modelSelector'>
                            <h2 class='giveSpace'>Models:</h2>
                            {this.state.models
                                .map((model) => (
                                    <button class={`btn ${model == this.state.selectedModel ? 'chosenModel' : ''}`}>{model}</button>
                                )
                            )}
                        </div>

                        <div class='listOfFactors'>
                        <h2 class='giveSpace'>Factors:</h2>
                            {this.state.factors
                                .map((factor) => (
                                    <div>
                                        <label for={factor}>{factor}</label>
                                        <input type="text" id={factor} />
                                    </div>
                                )
                            )}
                        </div>

                        <button class='btn'>Predict</button>
                    </div>
                    <div class='results'>
                        <div class='img'>
                            {this.state.selectedModel == 'a' && <img src={picture} class='fitImg'></img>}
                        </div>

                        <div class='predictionResults'>
                            <h1>Results: </h1>
                        </div>

                        <div class='characteristics'>
                            <h3>Predictor: </h3>
                            <h3>Stats: </h3>
                            <h3>Feature Importance: </h3>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}