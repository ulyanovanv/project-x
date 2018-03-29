import React from "react";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import {PassengersInfo} from "./PassengersInfo";

export class FlightsSearchingCriteria extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      from: "",
      to: "",
      depart:  moment(),
      arrival:  moment(),
      info: {
        class: "Economy",
        travellers: 1
      },
      popupVisible: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }
  reverseValues(){
    let from = this.state.from;
    this.setState({from: this.state.to, to: from});
  }

  handleClick() {
    if (!this.state.popupVisible) {
      // attach/remove event handler
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
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
                 value={this.state.from}
                 type="text"
                 className="form-control"
                 placeholder="country,city or airport"
                 autoComplete="on"
                 onChange={ (event) => {this.setState({from: event.target.value})}}/>
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
                 onChange={(event) => {this.setState({to: event.target.value})}}/>
        </div>

        <div className="travel-info-input">
          <label>Depart</label>
          <DatePicker value={this.state.depart.format("D.MM.YYYY")}
                      selected={this.state.depart}
                      selectsStart
                      startDate={this.state.depart}
                      endDate={this.state.arrival}
                      className="form-control"
                      onChange={ (date) => {this.setState({depart: date }) }}/>
        </div>


        <div className="travel-info-input">
          <label>Arrival</label>
          <DatePicker value={this.state.arrival.format("D.MM.YYYY")}
                      selected={this.state.arrival}
                      selectsEnd
                      startDate={this.state.depart}
                      endDate={this.state.arrival}
                        disabled={this.props.direction === "One Way"}
                      className="form-control"
                      onChange={ (date) => {this.setState({arrival: date }) }}/>
        </div>

        <div className="travel-info-input" ref={node => { this.node = node; }}>
          <label>Cabin class and Travellers</label>
          <input id="info"
                 value=""
                 type="text"
                 className="form-control"
                 placeholder={`${this.state.info.class} class, ${this.state.info.travellers} travellers`}
                 onClick={this.handleClick}/>
          {this.state.popupVisible  && <PassengersInfo/>}
        </div>

      </div>
    )
  }
}

