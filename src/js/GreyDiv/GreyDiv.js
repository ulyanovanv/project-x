import React from "react";


export class GreyDiv extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    this.props.handleClickOnGreyDiv();
  }
  render(){
    return(<section className="grey-div"
                style={{
                  position:"absolute",
                  width:"100%",
                  height:"100%",
                  backgroundColor:"grey",
                  opacity: "0.3",
                  top: 0,
                  left: 0}} onClick={()=>{this.handleClick()}}> </section>);
  }
}
