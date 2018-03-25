import React from "react";
import './../sass/ButtonCustomerSettings.scss';

export class ButtonRegistation extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(value){
    this.props.handleClick(value);
  }
  render(){
    return (<button className="header-button" onClick={()=>{this.handleClick("registration")}}>
      Anmelden
    </button>)
  }
}