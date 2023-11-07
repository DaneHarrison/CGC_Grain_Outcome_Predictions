import satellite_balanced_model_balanced_rf from '../assets/satellite_balanced_model_balanced_rf.png'
import satellite_balanced_model_rf from '../assets/satellite_balanced_model_rf.png'
import satellite_model_balance_xgbrf from '../assets/satellite_model_balance_xgbrf.png'
import satellite_model_nobalance_rf from '../assets/satellite_model_nobalance_rf.png'
import satellite_model_rf from '../assets/satellite_model_rf.png'
import satellite_model_xgbrf from '../assets/satellite_model_xgbrf.png'
import station_balanced_model_balanced_rf from '../assets/station_balanced_model_balanced_rf.png'
import station_balanced_model_rf from '../assets/station_balanced_model_rf.png'
import station_model_balance_xgbrf from '../assets/station_model_balance_xgbrf.png'
import station_model_nobalance_rf from '../assets/station_model_nobalance_rf.png'
import station_model_rf from '../assets/station_model_rf.png'
import station_model_xgbrf from '../assets/station_model_xgbrf.png'
import ModelLoader from '../classes/modelLoader.js'
import React from "react";
import "../style/overlay.css";


export default class ModelOverlay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modelLoader: new ModelLoader(),
      models: [],

      selectedModel: null,
      results: null,
      img: null
    };
  }


  async componentDidMount() {
    this.state.modelLoader.initModels().then(() => {
      this.setState({ models: this.state.modelLoader.models });
    });
  }

  toggleModel(newModelName) {
    for(let model of this.state.models) {
        if(model.name == newModelName && model != this.state.selectedModel) {
            this.setState({ selectedModel: model })
            this.setState({results: null})
            this.loadModelImg(newModelName)

            break;
        }
    }
  }

  loadModelImg(newModelName) {
    let img = null;

    switch (newModelName) {
        case "satellite_balanced_model_balanced_rf":
            img = satellite_balanced_model_balanced_rf;
            break;

        case "satellite_balanced_model_rf":
            img = satellite_balanced_model_rf;
            break;

        case "satellite_model_balance_xgbrf":
            img = satellite_model_balance_xgbrf;
            break;

        case "satellite_model_nobalance_rf":
            img = satellite_model_nobalance_rf;
            break;

        case "satellite_model_rf":
            img = satellite_model_rf;
            break;

        case "satellite_model_xgbrf":
            img = satellite_model_xgbrf;
            break;

        case "station_balanced_model_balanced_rf":
            img = station_balanced_model_balanced_rf;
            break;

        case "station_balanced_model_rf":
            img = station_balanced_model_rf;
            break;

        case "station_model_balance_xgbrf":
            img = station_model_balance_xgbrf;
            break;

        case "station_model_nobalance_rf":
            img = station_model_nobalance_rf;
            break;

        case "station_model_rf":
            img = station_model_rf;
            break;

        case "station_model_xgbrf":
            img = station_model_xgbrf;
            break;

        default:
            img = null;
    }

    this.setState({img: img})
  }


  predict = () => {
    let modelName, predictionInput, currVal
    
    if(this.state.selectedModel) {
        modelName = this.state.selectedModel.name
        predictionInput = {}

        for(let attr of this.state.selectedModel.factors) {
            currVal = parseFloat(document.getElementById(attr).value)
            predictionInput[attr] = isNaN(currVal) ? 0 : currVal
        }

        this.state.modelLoader.predict(modelName, predictionInput).then((results) => {
            this.setState({results: results})
        })
    }
  }


  render() {
    return (
      <div class="coverScreen">
        <div class="grid">
          <div class="input">
            <div class="modelSelector">
              <h2 class="giveSpace">Models:</h2>
              {this.state.models && this.state.models.map((model) => (
                <button
                  onClick={() => this.toggleModel(model.name)}
                  class={`toggleModelBtn ${
                    model == this.state.selectedModel ? "chosenModel" : ""
                  }`}
                >
                  {model.name}
                </button>
              ))}
            </div>

            <h2 class="giveSpace">Factors:</h2>
            <div class="listOfFactors">
              {this.state.selectedModel && this.state.selectedModel.factors
                .map((factor) => (
                  <div class='factors'>
                    <label for={factor}>{`${factor} `}</label>
                    <input type="text" id={factor} />
                  </div>
                )
              )}
            </div>

            <button onClick={this.predict} class="btn">Predict</button>
          </div>
          <div class="results">
            <div class="img">
              {this.state.img && <img src={this.state.img} class="fitImg"></img>}
            </div>

            <div class="predictionResults">
              {this.state.results && <h1 class='rmMargins'>{`Results: ${this.state.results}`}</h1>}
            </div>

            <div class="characteristics hideScrollers">
              <h3 class='rmMargins'>{`Predictor: ${this.state.selectedModel ? this.state.selectedModel.predictor : ''}`}</h3>
              <h3>Stats: </h3>
              {this.state.selectedModel && this.state.selectedModel.statistics && Object.keys(this.state.selectedModel.statistics)
                .map((stat) => {
                    return stat != 'importances' ? <h3 class='rmMargins'>{`${stat}: ${this.state.selectedModel.statistics[stat]}`}</h3> : null
                }
              )}

              <h3>Feature Importance: </h3>
              <div class='features'>
              {this.state.selectedModel && this.state.selectedModel.statistics && this.state.selectedModel.statistics.importances && this.state.selectedModel.statistics.importances
                .map((feature) => (
                    <h3 class='rmMargins'>{`${feature}`}</h3>
                )
              )}
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}