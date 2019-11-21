import React from 'react';
import './Input.css';

const Input = props => (
  <div className={`input${props.scale ? " input-" + props.scale : " input-normal"}`}>{props.input}</div>
);

export default Input;