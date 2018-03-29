import React from "react";
import './../sass/SearchingFormForFlight.css';
import {FlightsSearchingCriteria} from "./Flights/FlightsSearchingCriteria";

const flightDirections = ["Roundtrip","One Way", "Multi-city"];

export default class SearchingFormForFlight extends React.Component {
  constructor(props){
    super(props);
    this.state = {category:"Flights",
                  direction: "Roundtrip",
                  from: "",
                  to: "",
                  depart: "",
                  return: "",
                  cabinClass: "Economy",
                  Travellers: 1,
                  nonStop: false
    };
  }
  renderFlightDirection(){
    return flightDirections.map((it,key) => {
      return (<label  id={key}>
        <input type="radio" name="flight-direction"
               checked={it === this.state.direction}
               onClick={()=>{this.setState({direction: it}); console.log(this.state.direction) } }/>
        {it}
      </label>);
    })
  }

  render(){
    return (
      <div className="searching-form-for-flight">
        <form className="form-styling">

          <div className="flight-direction row">
            {this.renderFlightDirection()}
            <div className="flight-direction_map">
              <a>Map</a>
            </div>
          </div>

          <FlightsSearchingCriteria direction={this.state.direction}/>

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