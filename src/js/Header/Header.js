import React from "react";
import './sass/Header.css';
// import plane from './../../images/plane.svg';

export class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      flag: "usa",
      language: "en",
      country: "DE",
      currency: "$ USD"
    }
  }
  render(){
    return (<section className="header flex-row ">
      <div className="page-name col-xs-6 col-sm-6 col-md-7">
       SkyFlight
      </div>
      <div className="col-xs-6 col-sm-6 col-md-5">
        <div className="page-settings col-xs-8 col-md-8 col-sm-8">
          <button className="header-button"> {this.state.flag} {this.state.language}-{this.state.country} {this.state.currency}</button>
        </div>
        <div className="registration col-xs-4 col-md-4 col-sm-4">
          <button className="header-button"> Anmelden </button>
        </div>
      </div>
    </section>);
  }
}