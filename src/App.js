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
      registration: false
    };
    this.removeGreyDiv = this.removeGreyDiv.bind(this);
    this.showGreyDiv = this.showGreyDiv.bind(this);
  }
  showGreyDiv(value){
    this.setState({showGreyDiv: true, [value]: true});
  }
  removeGreyDiv(){
    this.setState({showGreyDiv: false, customerSettings: false, registration: false});
  }
  render() {
    return (
      <div className="app">
        <Header handleClick={(value)=>{this.showGreyDiv(value)}}/>
        <SearchingForm/>
        <Offers/>
        <Footer/>
        {this.state.showGreyDiv && <GreyDiv handleClickOnGreyDiv={() => {this.removeGreyDiv()}}/>}
        {this.state.customerSettings && <FormCustomerSettings />}
        {this.state.registration && <FormRegistration />}
      </div>
    );
  }
}

