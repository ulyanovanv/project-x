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
    this.renderClassOptions = this.renderClassOptions.bind(this);
    this.renderNumber = this.renderNumber.bind(this);
    this.changeTravellersNumber = this.changeTravellersNumber.bind(this);
    this.renderAgeOfChildren = this.renderAgeOfChildren.bind(this);
    this.setCabinClass = this.setCabinClass.bind(this);
    this.setAdults = this.setAdults.bind(this);
    this.setChildren = this.setChildren.bind(this);
    this.setChildrenAge = this.setChildrenAge.bind(this);
  }

  setCabinClass(value){
    this.props.setCabinClass(value);
  }
  setAdults(value){
    this.props.setAdults(value);
  }
  setChildren(value){
    this.props.setChildren(value);
  }
  setChildrenAge(value){
    this.props.setChildrenAge(value);
  }
  changeTravellersNumber(ageGroup,operation) {
    switch(operation) {
      case "+":
        if (ageGroup === number.adults){
          this.setAdults(this.props.adults+1);
        } else if (ageGroup === number.children) {
          this.setChildren(this.props.children+1);
        }
        break;
      case "-":
        let isMinusInputDisabled = (group) => {
          if (group === number.adults) {
            return this.props.adults < 2;
          } else if (group === number.children) {
            return this.props.children < 1;
          }
        };
        if (!isMinusInputDisabled(ageGroup)) {
          if (ageGroup === number.adults){
            this.setAdults(this.props.adults-1);
          } else if (ageGroup === number.children) {
            this.setChildren(this.props.children-1);
          }
          if (ageGroup.category === "children") {
            let copy = this.props.childrenAge;
            copy[this.props.children] = null;
            this.setChildrenAge(copy);
          }
        }
        break;
    }
  }
  handleChildrenAge(event,i){
    let copy = this.props.childrenAge;

    if (this.props.childrenAge.hasOwnProperty(i) ) {
      copy[i] = event.target.value;
      this.setChildrenAge(copy);
    } else {
      let newChild = {[i]: event.target.value };
      console.log(newChild);
      let newObj = Object.assign({},this.props.childrenAge,newChild);
      this.setChildrenAge(newObj);
    }
  }

  renderAgeOfChildren(){
    let childrenAge = [], i = 0, len = this.props.children;
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
      return <option key={key} selected={cabinClass === this.props.cabinClass}>{cabinClass}</option>;
    })
  }
  renderNumber(ageGroup){
    let numberOfTravellersInState = ageGroup === number.adults ? this.props.adults : this.props.children;
    let shouldInputStyleBeChanged = (group) => {
      if (group === number.adults) {
        return this.props.adults === 1;
      }  else if (group === number.children){
        return this.props.children === 0;
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
          <select className="form-control" onChange={(event) => {this.setCabinClass(event.target.value) }}>
            {this.renderClassOptions()}
          </select>
        </div>
        <div className='passengers-info_number'>
          {this.renderNumber(number.adults)}
          {this.renderNumber(number.children)}
          {this.renderAgeOfChildren()}
        </div>
        <input type="button" className="btn btn-primary" value="Save"/>
      </div>
    </div>)
  }
}
