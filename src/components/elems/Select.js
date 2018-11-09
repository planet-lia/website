import React from 'react';
import {FormControl} from 'react-bootstrap';

const Select = (props) => {
  let optionsInput = props.options.slice();
  let optionsList = [];
  let bsClass = "form-control";

  optionsInput.unshift({
    value:"",
    label: props.placeholder ? props.placeholder : "Select"
  });

  optionsList = optionsInput.map( (option, index) => (<option key={index} value={option.value}>{option.label}</option>) );

  if(!props.value){
    bsClass += " placeholder";
  }

  return (
    <FormControl componentClass="select" bsClass={bsClass} value={props.value} onChange={props.onChange}>
      {optionsList}
    </FormControl>
  )
}

export default Select;
