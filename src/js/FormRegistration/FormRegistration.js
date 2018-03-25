import React from "react";
import './sass/FormRegistration.css';
import axios from "axios";

export class FormRegistration extends React.Component {
  // getInfo(){
  //   axios.get("localhost:8080/test").then(function(response){console.log(response);});
  //
  // }
  render(){
    return (<section className="form-registration">
      <header>
        Log in or register
      </header>
      <div className="form-registration_login-in">
        <div className="form-registration_login-in_social">
          <h5>Social network login</h5>
          <button className="btn "><a>Sign up with Facebook</a></button>
          <button className="btn "><a>Sign up with Google+</a></button>
        </div>
        <form className="form-registration_login-in_usual">
          <h5>Log in with your Skyscanner account</h5>
          <p>Don't have an Airtraveller account? <span>Register hier</span></p>
          <input type="email" placeholder='Email address'/>
          <input type="password" placeholder='Password'/>
          <div className="form-registration_login-in_usual_checkbox">
            <label><input type="checkbox" name="ShowPassword"/>Show password</label>
            <label><input type="checkbox" name="Keep"/>Keep me logged in</label>
          </div>
          <input className="btn btn-success"type="submit" value="Log in"/>
        </form>
      </div>
    </section>);
  }
}