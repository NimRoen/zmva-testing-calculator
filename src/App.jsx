import React, { Component } from 'react';
import './App.css';
import PanelButton from './components/PanelButton';
import Input from './components/Input';
import * as math from 'mathjs';

const INITIAL_STATE = "0";

let currentInput;
let equalOperation = false;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: INITIAL_STATE,
      output: INITIAL_STATE,
      smaller: false,
    }
  }

  addToInput = val => {
    if(this.state.input.length > 15) { return; }
    if(val === "." && this.state.input.includes(".")) { return; }
    this.setState({
      input: (this.state.input === INITIAL_STATE || equalOperation ? "" : this.state.input) + val,
      output: equalOperation ? INITIAL_STATE : this.state.output,
    });
    if(equalOperation) { equalOperation = false; }
  }

  clearInput = () => {
    this.setState({ input: INITIAL_STATE, output: INITIAL_STATE, smaller: false });
  }

  invertInput = () => {
    currentInput = this.state.input + "";
    let sign = currentInput.substr(0, 1);
    let val = currentInput.length > 1 ? currentInput.substr(1) : "";
    if(sign === "-") { this.setState({ input: val }); }
    else { this.setState({ input: "-" + currentInput }); }
  }

  percentInput = () => {
    this.setState({ input: (Number(this.state.input) / 100) })
  }

  operateInput = val => {
    let currentOutput, currentInput, needBrackets;

    currentOutput = this.state.output === INITIAL_STATE ? "" : this.state.output;
    needBrackets = (val === "*" || val === "/") ? true : false;
    if(equalOperation) {
      currentInput = "";
      equalOperation = false;
    }
    else {
      currentInput = this.state.input;
    }
    this.setState({
      output: (needBrackets ? "(" : "") + currentOutput + currentInput + (needBrackets ? ")" : "") + val,
      input: INITIAL_STATE,
      smaller: false
    });
  }

  equalInput = () => {
    let formula = this.state.output + this.state.input;
    let result = math.evaluate(formula);
    this.setState({
      input: result,
      output: formula,
    });
    equalOperation = true;
  }
  
  assetLength = () => {
    currentInput = this.state.input + "";
    let wholeNumber = currentInput.split('.')[0];
    if(typeof this.state.input == 'number') { this.setState((state, props) => {
      return (currentInput.length > 16 && wholeNumber.length < 16) ? { input: math.round(this.state.input, wholeNumber.length < 15 ? (15 - wholeNumber.length) : 0), } : null;
    }); }
    if(currentInput.length > 7) { this.setState((state, props) => {
      return state.smaller ? null : { smaller: true };
    }); }
    else { this.setState((state, props) => {
      return state.smaller ? { smaller: false } : null;
    }); }
  }

  render() {
    this.assetLength();

    return (
      <div className="application">
        <div className="inner-wrapper">
          <div className="panel-wrapper">
            <Input input={this.state.output} scale="small"></Input>
          </div>
          <div className="panel-wrapper">
            <Input input={this.state.input} scale={this.state.smaller ? "smaller" : ""}></Input>
          </div>
          <div className="panel-wrapper flex-grow">
            <PanelButton owner={this} cornerRadius="0 0 8 8"></PanelButton>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
