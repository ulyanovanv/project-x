import React, { Component } from 'react';
import { Navbar, Jumbotron, Button } from 'react-bootstrap';
import './App.css';
import ReactDOM from 'react-dom';

class App extends Component {
  componentDidMount()  {
    console.log( ReactDOM.findDOMNode(this.refs.container).style);
  }
  render() {
    return (
      <section>
        <div className="div1" ref={"container"} >hello</div>
        <div className="div2"  >hello</div>
        <div className="div3"  >hello</div>
      </section>
    );
  }
}

export default App;
