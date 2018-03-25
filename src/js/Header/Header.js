import React from "react";
import './sass/Header.css';
import {ButtonCustomerSettings} from "./Buttons/ButtonCustomerSettings";
import {ButtonRegistation} from "./Buttons/ButtonRegistration";

export class Header extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(value){
    this.props.handleClick(value);
  }
  render(){
    return (<section className="header row">
      <div className="page-name col-xs-5 col-sm-4 col-md-4">
       SkyFlight
      </div>
      <div className="col-xs-offset-2 col-xs-5 col-sm-offset-3 col-sm-5 col-md-5 row">
        <div className="custom-settings col-xs-12 col-md-8 col-sm-8">
          <ButtonCustomerSettings handleClick={(value) => {this.handleClick(value)}}/>
        </div>
        <div className="registration col-md-4 col-sm-4">
          <ButtonRegistation handleClick={(value) => {this.handleClick(value)}}/>
        </div>
      </div>
    </section>);
  }
}