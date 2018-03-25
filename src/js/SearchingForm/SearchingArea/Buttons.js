import React from "react";
import './../sass/SearchingForm.css';
import flight from './../../../images/small-icons/plane-2.svg';
import hotels from './../../../images/small-icons/hotels.svg';
import car from './../../../images/small-icons/car.svg';

const SearchingOptions = [
  {image: flight, text: "Flights"},
  {image: hotels, text: "Hotels"},
  {image: car, text: "Car Rental"}];

export default class Buttons extends React.Component {
  constructor(props){
    super(props);
    this.handleTheClick = this.handleTheClick.bind(this);
  }
  handleTheClick(searchArea){
    this.props.showSearchingForm(searchArea);
  }
  renderSearchingOptions(){
    return SearchingOptions.map((searchingOption, key) => {
      return <div className="searching-form-options col-xs-3 col-sm-2 col-md-2 btn btn-info"
                  key={key} onClick={() => {this.handleTheClick(searchingOption.text)}}>
        <div className="d-inline-flex flex-row flex-nowrap"><img src={searchingOption.image} alt=''/></div>
        <div className='d-inline-flex flex-row flex-nowrap searching-form-options_text'>{searchingOption.text}</div>
      </div>
    })
  }
  render(){
    return (<div className="row searching-form-row">{this.renderSearchingOptions()}</div>)
  }
}