import React from 'react';
import "./square.css";

export default function Square(props) {
  return (
      <div className='square' id={props.id} onClick={props.onClick}>
          {props.value}
      </div>
  )
}
