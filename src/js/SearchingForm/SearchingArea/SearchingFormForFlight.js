import React from "react";
import './../sass/SearchingFormForFlight.css';

const flightDirections = ["Roundtrip","One way", "Multi-city"];
const inputTypes = [{type:"text",label:"From",placeholder:"country,city or airport"},
  {type:"button"},
  {type:"text",label:"To",placeholder:"country,city or airport"},
  {type:"date",label: "Depart"},
  {type:"date",label:"Return"},
  {type:"text",label:"Cabin class & Travellers",placeholder:"1 adult, Economy"} ];

export default class SearchingFormForFlight extends React.Component {
  constructor(props){
    super(props);
    this.state = {category:"Flights",
                  direction: "",
                  from: "", to: "",
                  depart: "",
                  return: "",
                  cabinClass: "Economy",
                  Travellers: 1,
                  nonStop: null};
  }

  renderFlightDirection(){
    return flightDirections.map((it) => {
      let value = "";
      if (it.type === "date"){
        let dateNow = new Date;
        value = dateNow.getDate() + "." + dateNow.getMonth() + "." + dateNow.getFullYear();
        console.log(value);
      }
      console.log(value);
      return (<label for="flight-direction">
        <input type="radio" name="flight-direction" value={value} onClick={()=>{this.setState({direction: it}); } }/>
        {it}
      </label>);
    })
  }
  renderTravelInfoInputs(){
    return inputTypes.map((info,key) => {
      return (<div className="travel-info-input" key={key}>
        <label>{info.label}</label>
        <input id="departure-area" type={info.type} className="form-control" placeholder={info.placeholder}/>
      </div>);
    })
  }
  render(){
    return (
      <div className="searching-form-for-flight">
        <form className="form-inline">

          <div className="flight-direction">
            {this.renderFlightDirection()}
            <div className="flight-direction_map">
              <a>Map</a>
            </div>
          </div>

          <div className="searching-critaria">
            {this.renderTravelInfoInputs()}
          </div>

          <div className="start-to-search">
            <div className="start-to-search_container">
              <label>
                <input type="checkbox" name="nearby-airports"/>
                Add nearby airport
              </label>
              <label>
                <input type="checkbox" name="none-stops"/>
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