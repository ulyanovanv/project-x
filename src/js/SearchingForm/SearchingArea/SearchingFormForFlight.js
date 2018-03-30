import React from "react";
import './../sass/SearchingFormForFlight.css';
import {FlightsSearchingCriteria} from "./Flights/FlightsSearchingCriteria";
import moment from 'moment';
import axios from "axios";

const flightDirections = ["Roundtrip","One Way", "Multi-city"];

export default class SearchingFormForFlight extends React.Component {
  constructor(props){
    super(props);
    this.state = {category:"Flights",
                  direction: "Roundtrip",
                  from: "",
                  to: "",
                  depart:  moment(),
                  arrival:  moment(),
                  popupVisible: false,
                  cabinClass: "Economy",
                  adults: 1,
                  children: 0,
                  childrenAge: {}
    };
    this.handleForm = this.handleForm.bind(this);
  }

  handleForm(event){
    event.preventDefault();
    console.log(this.state);
    let formInfo = this.state;
    axios({
      method: 'post',
      url: 'http://localhost:3001/searching-flights',
      data: {
        formInfo
      }
    }).then(function (response) {
        console.log(response);
    })
      .catch(function (error) {
        console.log(error);
    });
  }

  renderFlightDirection(){
    return flightDirections.map((it,key) => {
      return (<label  id={key}>
        <input type="radio" id={key} name="flight-direction"
               checked={it === this.state.direction}
               onChange={()=>{this.setState({direction: it}) } }/>
        {it}
      </label>);
    })
  }

  render(){
    return (
      <div className="searching-form-for-flight">
        <form className="form-styling" onSubmit={(event) => {this.handleForm(event)}}>

          <div className="flight-direction row">
            {this.renderFlightDirection()}
            <div className="flight-direction_map">
              <a>Map</a>
            </div>
          </div>

          <FlightsSearchingCriteria direction={this.state.direction}

                                    from={this.state.from}
                                    setFrom={(value) => {this.setState({from: value})}}
                                    to={this.state.to}
                                    setTo={(value) => {this.setState({to: value})}}
                                    depart={this.state.depart}
                                    setDepart={(value) => {this.setState({depart: value})}}
                                    arrival={this.state.arrival}
                                    setArrival={(value) => {this.setState({arrival: value})}}

                                    cabinClass ={this.state.cabinClass}
                                    setCabinClass={(value) => {this.setState({cabinClass: value})}}
                                    adults={this.state.adults}
                                    setAdults={(value) => {this.setState({adults: value})}}
                                    children={this.state.children}
                                    setChildren={(value) => {this.setState({children: value})}}
                                    childrenAge={this.state.childrenAge}
                                    setChildrenAge={(value) => {this.setState({childrenAge: value});console.log(value)}}/>
          <div className="start-to-search">
            <div className="start-to-search_container">
              <label>
                <input type="checkbox" name="nearby-airports"/>
                Add nearby airport
              </label>
              <label>
                <input type="checkbox" name="none-stops" checked={this.state.nonStop}
                       onChange={() => {this.setState({nonStop: !this.state.nonStop}); console.log(this.state)}}/>
                Non-stop flights only
              </label>
            </div>
            <div className="start-to-search_search-button">
              <input type="submit" id="submit" className="btn btn-success" value="Searching flights"/>
            </div>
          </div>

        </form>
      </div>)
  }
}