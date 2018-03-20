import React, { Component } from 'react';
import './App.css';
// import ReactDOM from 'react-dom';

import {Header} from './js/Header/Header';
import {SearchingForm} from './js/SearchingForm/SearchingForm';
import {Offers} from './js/Offers/Offers';
import {Footer} from './js/Footer/Footer';


export class App extends Component {
  render() {
    return (
      <div className="app">
        <Header/>
        <SearchingForm/>
        <Offers/>
        <Footer/>
      </div>
    );
  }
}

