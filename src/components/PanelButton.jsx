import React, { Component } from 'react';
import './PanelButton.css';
import Button from './Button';

let buttons;
let cornerRadius = [0, 0, 0, 0];

class PanelButton extends Component {
  constructor(props) {
    super(props);

    buttons = [
      [
        { title: "AC", action: props.owner.clearInput },
        { title: "+/-", action: props.owner.invertInput },
        { title: "%", action: props.owner.percentInput },
        { title: "/", action: props.owner.operateInput },
      ],
      [
        { title: "7", action: props.owner.addToInput },
        { title: "8", action: props.owner.addToInput },
        { title: "9", action: props.owner.addToInput },
        { title: "*", action: props.owner.operateInput },
      ],
      [
        { title: "4", action: props.owner.addToInput },
        { title: "5", action: props.owner.addToInput },
        { title: "6", action: props.owner.addToInput },
        { title: "-", action: props.owner.operateInput },
      ],
      [
        { title: "1", action: props.owner.addToInput },
        { title: "2", action: props.owner.addToInput },
        { title: "3", action: props.owner.addToInput },
        { title: "+", action: props.owner.operateInput },
      ],
      [
        { title: "0", action: props.owner.addToInput, columns: 2 },
        { title: ".", action: props.owner.addToInput },
        { title: "=", action: props.owner.equalInput },
      ],
    ];

    let cr = props.cornerRadius.split(" ");
    for(let i = 0; i < cr.length; i++) { cornerRadius[i] = cr[i]*1; }
  }

  render() {
    let rows = [];
    buttons.forEach(row => {
      let btns = [];
      row.forEach(button => {
        let buttonCornerRadius = ["0px", "0px", "0px", "0px"];
        if(rows.length < 1) {
          if(cornerRadius[0] > 0 && btns.length < 1) { buttonCornerRadius[0] = cornerRadius[0] + "px"; }
          else if(cornerRadius[1] > 0 && btns.length === (row.length - 1)) { buttonCornerRadius[1] = cornerRadius[1] + "px"; }
        }
        else if(rows.length === (buttons.length - 1)) {
          if(cornerRadius[2] > 0 && btns.length < 1) { buttonCornerRadius[3] = cornerRadius[3] + "px"; }
          else if(cornerRadius[3] > 0 && btns.length === (row.length - 1)) { buttonCornerRadius[2] = cornerRadius[2] + "px"; }
        }
        btns.push(<div className={button.columns ? "panel-button__cell-" + button.columns : "panel-button__cell"}><Button action={button.action} cornerRadius={buttonCornerRadius.join(" ")}>{button.title}</Button></div>)
      });
      rows.push(<div className="panel-button__row">{btns}</div>);
    });

    return (<div className="panel-button">{rows}</div>);
  }
}

export default PanelButton;
