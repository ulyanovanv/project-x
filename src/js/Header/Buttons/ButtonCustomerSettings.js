import React from "react";
import './../sass/ButtonCustomerSettings.scss';

export class ButtonCustomerSettings extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(value){
    this.props.handleClick(value);
  }
  render(){
    return (<button className="header-button" onClick={()=>{this.handleClick("customerSettings")}}>
      {this.props.country}, {this.props.language}, {this.props.currency}
      </button>)
  }
}