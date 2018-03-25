import React from "react";
import './../sass/ButtonCustomerSettings.scss';

export class ButtonCustomerSettings extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      flag: "usa",
      language: "en",
      country: "DE",
      currency: "$ USD"
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(value){
    this.props.handleClick(value);
  }
  render(){
    return (<button className="header-button" onClick={()=>{this.handleClick("customerSettings")}}>
      {this.state.flag} {this.state.language}-{this.state.country} {this.state.currency}
      </button>)
  }
}