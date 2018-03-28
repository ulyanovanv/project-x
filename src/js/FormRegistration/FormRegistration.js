import React from "react";
import './sass/FormRegistration.css';

const initialState = {status: "Log In",
                      email: "",
                      emailIsCorrect: true,
                      password: "",
                      passwordIsCorrect: true,
                      currentTypeOfPassword: "password",
                      showPassword: false,
                      saveSettings: {"Log In": true, "Register": true}
};

export class FormRegistration extends React.Component {
  constructor(props){
    super(props);
    let newState = Object.assign({}, initialState);
    newState.saveSettings = Object.assign({}, initialState.saveSettings);
    this.state = newState;
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.blurEmail = this.blurEmail.bind(this);
    this.blurPassword = this.blurPassword.bind(this);
    this.showPassword = this.showPassword.bind(this);
    this.setSettings = this.setSettings.bind(this);
    this.handleForm = this.handleForm.bind(this);
  }
  handleClick(){
    let renew = Object.assign({}, initialState, {status: this.state.status === "Log In" ? "Register" : "Log In"});
    this.setState(renew);
  }
  handleChange(event){
    this.setState({[event.target.type]: event.target.value});
  }
  blurEmail(event){
    if (/^[a-zA-Z0-9\.\+\-]+@[a-zA-Z]+\.[a-zA-Z]+/.test(event.target.value)){
      this.setState({emailIsCorrect: true});
    } else {
      this.setState({emailIsCorrect: false});
    }
  }
  blurPassword(event){
    if (/\d{4,}/.test(event.target.value)){
      this.setState({passwordIsCorrect: true});
    }else {
      this.setState({passwordIsCorrect: false});
    }
  }
  passwordErrorMessage(){
    let text = "";
    if (this.state.passwordIsCorrect) {
      return text;
    } else {
      if (this.state.password.length === 0) {
        text ="Enter password";
      } else if (this.state.password.length !== 0 && this.state.password.length < 5 ) {
        text = "Minimum of 4 number characters required";
      }  else {
        text = "Wrong characters in password";
      }
    }
    return <div className="error-messanges">{text}</div>;
  }
  showPassword(){
    let newType = this.state.currentTypeOfPassword === "password" ? "text" : "password";
    this.setState({currentTypeOfPassword: newType, showPassword: !this.state.showPassword});
  }
  setSettings(event){
    let { saveSettings } = this.state;
    saveSettings[event.target.name] = !saveSettings[event.target.name];
    this.setState({saveSettings});
    // console.log(initialState);
  }
  handleForm(event){
    event.preventDefault();
    if (this.state.emailIsCorrect && this.state.passwordIsCorrect ){
      console.log("prepaied to be sent");
    }
  }

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

        <form className="form-registration_login-in_usual" method="POST"
              onSubmit={(event) => {this.handleForm(event)}}>
            {this.state.status === "Log In" && <h5>Log in with your FlightLines account</h5>}
            {this.state.status === "Register" && <h5>Register with FlightLines</h5>}
          <p>
            Don't have an Airtraveller account?
            {this.state.status === "Log In" && <span onClick={() => {this.handleClick()}}> Register hier</span>}
            {this.state.status === "Register" && <span onClick={() => {this.handleClick()}}> Log in hier</span>}
          </p>

          <input type="email" placeholder='Email address' value={this.state.email}
                 // pattern="/^[a-zA-Z0-9\.\+\-]+@[a-zA-Z]+\.[a-zA-Z]+/"
                 onChange={(event) => {this.handleChange(event)}}
                 onBlur={(event) => {this.blurEmail(event)}}/>
          {!this.state.emailIsCorrect && <div className="error-messanges">{this.state.email.length > 0 ? "Ensure email address is valid (your@mail.com)" : "Enter email address"} </div>}

          <input type={this.state.currentTypeOfPassword} placeholder='Password' value={this.state.password}
                 // pattern="/\d{4,}/"
                 onChange={(event) => {this.handleChange(event)}}
                 onBlur={(event) => {this.blurPassword(event)}}/>
          {this.passwordErrorMessage()}


          <div className="form-registration_login-in_usual_checkbox">
            <label>
              <input type="checkbox" name="ShowPassword"
                     checked={this.state.showPassword}
                     onChange={() => {this.showPassword()}}/>Show password
            </label>

            <label>
              <input type="checkbox" name={this.state.status}
                     checked={this.state.saveSettings[this.state.status]}
                     onChange={(event) => {this.setSettings(event)}}/>
              {this.state.status === "Log In" && <span>Keep me logged in</span>}
              {this.state.status === "Register" && <span>Email me the latest news, travel tips and deals from Skyscanner</span>}
            </label>
          </div>

          <input className="btn btn-success"type="submit" value={this.state.status === "Log In" ? "Log in" : "Register"}/>
        </form>

      </div>
    </section>);
  }
}