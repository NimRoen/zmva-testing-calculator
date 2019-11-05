import React, { Component } from 'react';
import './Button.css';

const isCommon = val => {
  return (val >= "0" && val <= "9") || val === ".";
}

const isOperator = val => {
  return val === "+" || val === "-" || val === "=" || val === "/" || val === "*";
}

const isManage = val => {
  return !isCommon(val) && !isOperator(val);
}

const getClassName = props => {
  return `button${isCommon(props.children) ? " button-common" : ""}${isOperator(props.children) ? " button-operator" : ""}${isManage(props.children) ? " button-manage" : ""}`;
}

class Button extends Component {
  render() {
    return (
    <div style={{borderRadius:this.props.cornerRadius}} className={getClassName(this.props)} onClick={() => this.props.action(this.props.children)}>
      {this.props.children}
    </div>
    );
  }
}

export default Button;