import React from "react";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import {PassengersInfo} from "./PassengersInfo";

export class FlightsSearchingCriteria extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      popupVisible: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.setFrom = this.setFrom.bind(this);
    this.setTo = this.setTo.bind(this);
    this.setDepart = this.setDepart.bind(this);
    this.setArrival = this.setArrival.bind(this);
  }
  setFrom(value){
    this.props.setFrom(value);
  }
  setTo(value){
    this.props.setTo(value);
  }
  setDepart(value){
    this.props.setDepart(value);
  }
  setArrival(value){
    this.props.setArrival(value);
  }

  reverseValues(){
    let from = this.props.from;
    this.props.setFrom(this.props.to);
    this.props.setTo(from);
  }
  handleClick() {
    if (!this.state.popupVisible) {
      // attach/remove event handler
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
      // console.log("d");
    }
    this.setState(prevState => ({
      popupVisible: !prevState.popupVisible,
    }));
  }
  handleOutsideClick(e) {
    // ignore clicks on the component itself
    if (this.node.contains(e.target)) {
      return;
    }
    this.handleClick();
  }

  render(){
    return (<div className="searching-critaria">

        <div className="travel-info-input">
          <label>From</label>
          <input id="from"
                 value={this.props.from}
                 type="text"
                 className="form-control"
                 placeholder="country,city or airport"
                 autoComplete="on"
                 onChange={ (event) => {this.setFrom(event.target.value)}}/>
        </div>

        <div className="travel-info-input" >
          <input id="reverse"
                 value="⇄"
                 type="button"
                 className="form-control"
                 onClick = {()=> {this.reverseValues()}}/>
        </div>

        <div className="travel-info-input">
          <label>To</label>
          <input id="to"
                 value={this.state.to}
                 type="text"
                 className="form-control"
                 placeholder="country,city or airport"
                 autoComplete="on"
                 onChange={ (event) => {this.setTo(event.target.value)}}/>
        </div>

        <div className="travel-info-input">
          <label>Depart</label>
          <DatePicker value={this.props.depart.format("D.MM.YYYY")}
                      selected={this.props.depart}
                      selectsStart
                      startDate={this.props.depart}
                      endDate={this.props.arrival}
                      minDate={moment()}
                      className="form-control"
                      onChange={ (date) => {this.setDepart(date ) }}
                      locale="en-gb"/>
        </div>


        <div className="travel-info-input">
          <label>Arrival</label>
          <DatePicker value={this.props.arrival.format("D.MM.YYYY")}
                      selected={this.props.arrival}
                      selectsEnd
                      startDate={this.props.depart}
                      endDate={this.props.arrival}
                      disabled={this.props.direction === "One Way"}
                      className="form-control"
                      onChange={ (date) => {this.setArrival( date );console.log(date) }}
                      locale="en-gb"/>
        </div>

        <div className="travel-info-input" ref={node => { this.node = node; }}>
          <label>Cabin class and Travellers</label>
          <input id="info"
                 value={`${this.props.cabinClass}, ${this.props.adults+this.props.children} ${(this.props.adults+this.props.children) > 1 ?"travellers": "traveller"}`}
                 type="text"
                 className="form-control"
                 onClick={this.handleClick}
                 onChange={() => {console.log("info from child component")}}/>
          {this.state.popupVisible  && <PassengersInfo cabinClass ={this.props.cabinClass}
                                                       setCabinClass={this.props.setCabinClass}
                                                       adults={this.props.adults}
                                                       setAdults={this.props.setAdults}
                                                       children={this.props.children}
                                                       setChildren={this.props.setChildren}
                                                       childrenAge={this.props.childrenAge}
                                                       setChildrenAge={this.props.setChildrenAge}/>}
        </div>
      </div>
    )
  }
}

