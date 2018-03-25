import React from "react";
import './sass/SearchingForm.css';

import Buttons from "./SearchingArea/Buttons";
import SearchingFormForFlight from "./SearchingArea/SearchingFormForFlight";
import SearchingFormForHotels from "./SearchingArea/SearchingFormForHotels";
import SearchingFormForCar from "./SearchingArea/SearchingFormForCar";




export class SearchingForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {searchingArea: "Flights"};
    this.showSearchingForm = this.showSearchingForm.bind(this);
  }
  showSearchingForm(receivedCategory){
    this.setState({searchingArea: receivedCategory})
  }
  render(){
    return (
      <section className="searching-form">
        <Buttons showSearchingForm={this.showSearchingForm}/>
        <div className="form-container">
          {this.state.searchingArea === "Flights" && <SearchingFormForFlight/>}
          {this.state.searchingArea === "Hotels" && <SearchingFormForHotels />}
          {this.state.searchingArea === "Car Rental" && <SearchingFormForCar />}
        </div>
      </section>
    );
  }
}