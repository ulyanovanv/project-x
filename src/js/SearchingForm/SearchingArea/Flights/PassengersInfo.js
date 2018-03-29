import React from "react";
import './../../sass/PassengersInfo.css';

const cabinClass =["Economy",'Premiun Economy','Bisuness class','First class'];
const number = {adults: {category: "adults", age: "16+ years"},children: {category: "children", age: "10-15 years"} };
// let currentState= {
//
// };

export class PassengersInfo extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      cabinClass: props.stateForUse.cabinClass,
      adults: props.stateForUse.adults,
      children: props.stateForUse.children,
      childrenAge: props.stateForUse.childrenAge
    };
    this.renderClassOptions = this.renderClassOptions.bind(this);
    this.renderNumber = this.renderNumber.bind(this);
    this.changeTravellersNumber = this.changeTravellersNumber.bind(this);
    this.renderAgeOfChildren = this.renderAgeOfChildren.bind(this);
    this.saveCurrentState = this.saveCurrentState.bind(this);
  }

  saveCurrentState(){
    this.props.savePassengersInfo(this.state);
  }
  changeTravellersNumber(ageGroup,operation) {
    switch(operation) {
      case "+":
        this.setState({[ageGroup.category]: this.state[ageGroup.category] + 1});
        break;
      case "-":
        let isMinusInputDisabled = (group) => {
          if (group === number.adults) {
            return this.state.adults < 2;
          } else if (group === number.children) {
            return this.state.children < 1;
          }
        };
        if (!isMinusInputDisabled(ageGroup)) {
          this.setState({[ageGroup.category]: this.state[ageGroup.category] - 1});
          if (ageGroup.category === "children") {
            let copy = this.state.childrenAge;
            // console.log(this.state.childrenAge.length);
            copy[this.state.children] = null;
            this.setState({childrenAge: copy});
            // let length = this.state.children.length -1;
            // let keys = Object.keys(this.state.children);
            // let newObj = {};
            // for (let i = 0; i<keys.length-1; i++){
            //   newObj[key] =
            // }
            // let newCopy =

            // this.setState({children: newObj});
          }
        }
        break;
    }
  }
  handleChildrenAge(event,i){
    let copy = this.state.childrenAge;

    if (this.state.childrenAge.hasOwnProperty(i) ) {
      copy[i] = event.target.value;
      this.setState({childrenAge: copy});
    } else {
      let newChild = {[i]: event.target.value };
      console.log(newChild);
      this.setState({childrenAge: Object.assign({},this.state.childrenAge,newChild)});
    }
    console.log(this.state);
  }

  renderAgeOfChildren(){
    let childrenAge = [], i = 0, len = this.state.children;
    while (++i <= len) childrenAge.push(i);
    return childrenAge.map((i) => {
      return (<div className="children-age" key={i}>
        <p>Child {i}</p>
        <input type="number" min="0" max="15" step="1" className="form-control"
               onChange={(event) => {this.handleChildrenAge(event,i)}}
                />
      </div>)
    });
  }

  renderClassOptions(){
    return cabinClass.map((cabinClass,key) => {
      return <option key={key} selected={cabinClass === this.state.cabinClass}>{cabinClass}</option>;
    })
  }
  renderNumber(ageGroup){
    let numberOfTravellersInState = ageGroup === number.adults ? this.state.adults : this.state.children;
    let shouldInputStyleBeChanged = (group) => {
      if (group === number.adults) {
        return this.state.adults === 1;
      }  else if (group === number.children){
        return this.state.children === 0;
      }
    };
    return <div className="passengers-info_number_age-category">
      <p>{ageGroup.category}</p>
      <div className="counter">
        <input type="button" value="-"
               onClick={() => {this.changeTravellersNumber(ageGroup,"-")}}
               style ={{ backgroundColor: shouldInputStyleBeChanged(ageGroup) ? "lightGrey" : "white",
                 opacity: shouldInputStyleBeChanged(ageGroup) ? 0.4 : 1,
                 cursor: shouldInputStyleBeChanged(ageGroup) ?"not-allowed" : "pointer"
               }}/>
        <span>{numberOfTravellersInState}</span>
        <input type="button" value="+"
               onClick={() => {this.changeTravellersNumber(ageGroup,"+")}}/>
        <span>{ageGroup.age}</span>
      </div>
    </div>
  }


  render(){
    return (<div className="passengers-info-container">
      <div className="passengers-info">
        <div className="white-triangular"></div>

        <div className="passengers-info_class">
          <label>Cabin class</label>
          <select className="form-control" onChange={(event) => {this.setState({cabinClass: event.target.value}) }}>
            {this.renderClassOptions()}
          </select>
        </div>
        <div className='passengers-info_number'>
          {this.renderNumber(number.adults)}
          {this.renderNumber(number.children)}
          {this.renderAgeOfChildren()}
        </div>
        <input type="button" className="btn btn-primary" value="Save" onClick={() => {this.saveCurrentState()}} />
      </div>
    </div>)
  }
}
