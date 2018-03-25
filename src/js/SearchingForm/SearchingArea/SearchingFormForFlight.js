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
    return flightDirections.map((it,key) => {

      return (<label  id={key}>
        <input type="radio" name="flight-direction"  onClick={()=>{this.setState({direction: it}); } }/>
        {it}
      </label>);
    })
  }
  renderTravelInfoInputs(){
    return inputTypes.map((info,key) => {
      let value = "";
      if (info.type === "date"){
        let dateNow = new Date;
        value = `${dateNow.getFullYear()}-${dateNow.getMonth() < 10 ? "0"+dateNow.getMonth() : dateNow.getMonth()}-${dateNow.getDate()}`;
      }
      return (<div className="travel-info-input" key={key}>
        <label>{info.label}</label>
        <input id="departure-area" type={info.type} value={value} className="form-control" placeholder={info.placeholder}/>
      </div>);
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