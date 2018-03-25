import React, { Component } from 'react';
import './App.css';

import {Header} from './js/Header/Header';
import {SearchingForm} from './js/SearchingForm/SearchingForm';
import {Offers} from './js/Offers/Offers';
import {Footer} from './js/Footer/Footer';
import {GreyDiv} from './js/GreyDiv/GreyDiv';
import {FormCustomerSettings} from "./js/FormCustomerSettings/FormCustomerSettings";
import {FormRegistration} from "./js/FormRegistration/FormRegistration";


export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      showGreyDiv: false,
      customerSettings: false,
      registration: false,
      country: "Afghanistan",
      language: "English",
      currency: "EUR - €"
    };
    this.removeGreyDiv = this.removeGreyDiv.bind(this);
    this.showGreyDiv = this.showGreyDiv.bind(this);
    this.setCustomerSettings = this.setCustomerSettings.bind(this);
  }
  showGreyDiv(value){
    this.setState({showGreyDiv: true, [value]: true});
  }
  removeGreyDiv(){
    this.setState({showGreyDiv: false, customerSettings: false, registration: false});
  }
  setCustomerSettings(result){
    let currentState = this.state;
    let newState = Object.assign(currentState,result);
    this.setState(newState);
    console.log(this.state);
    this.removeGreyDiv();
  }
  render() {
    return (
      <div className="app">
        <Header handleClick={(value)=>{this.showGreyDiv(value)}}
                country={this.state.country}
                language={this.state.language}
                currency={this.state.currency}/>
        <SearchingForm/>
        <Offers/>
        <Footer/>
        {this.state.showGreyDiv && <GreyDiv handleClickOnGreyDiv={() => {this.removeGreyDiv()}}/>}
        {this.state.customerSettings && <FormCustomerSettings handleSettingsChanges={(result) => {this.setCustomerSettings(result)}}/>}
        {this.state.registration && <FormRegistration />}
      </div>
    );
  }
}

