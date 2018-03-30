import React from "react";
import './sass/FormCustomerSettings.css';
import axios from "axios";



// const COUNTRIES  = ['Afghanistan', 'Åland Islands', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bangladesh', 'Barbados', 'Bahamas', 'Bahrain', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'British Indian Ocean Territory', 'British Virgin Islands', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burma', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo-Brazzaville', 'Congo-Kinshasa', 'Cook Islands', 'Costa Rica',  'Croatia', 'Curaçao', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'El Salvador', 'Egypt', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Federated States of Micronesia', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Lands', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard and McDonald Islands', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn Islands', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Réunion', 'Romania', 'Russia', 'Rwanda', 'Saint Barthélemy', 'Saint Helena', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Martin', 'Saint Pierre and Miquelon', 'Saint Vincent', 'Samoa', 'San Marino', 'São Tomé and Príncipe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Sint Maarten', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia', 'South Korea', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen', 'Sweden', 'Swaziland', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Vietnam', 'Venezuela', 'Wallis and Futuna', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe'];
const LANGUAGES = [{language:"English",short:"en"},{language:"Russain", short: "ru"}];
// const LANGUAGES = ["English","Russain"];
const CURRENCIES = ["EUR - €", "USD - $"];
// const LISTS_NAMES = ;

export class FormCustomerSettings extends React.Component {
  constructor(props){
    super(props);
    this.state = {country: "",
      language: LANGUAGES[0].language,
      currency: CURRENCIES[0],
      lists: [{country: []},{language:LANGUAGES},{currency:CURRENCIES}]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    this.getCountries();
  }
  getCountries(){
    let promise =  axios.get("http://localhost:3001/setting-info");
    promise.then( (response) => {

        let {lists} = this.state;
        lists[0].country = response.data.data;
        console.log(response.data.data);
        this.setState({lists: lists});

        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  renderOptions(category) {
    if (category === this.state.lists[0].country || category === this.state.lists[2].currency ) {
      return category.map((category, key) => {
        return <option key={key}>{category}</option>
      })
    } else if (category === LANGUAGES) {
      return category.map((category, key) => {
        return <option key={key}>{category["language"]}</option>
      })
    }
  }
  renderLists(){
    return this.state.lists.map((name) => {
      let key = Object.getOwnPropertyNames(name)[0];
      return (<div className="form-customer-settings_lists-container_list" key={key}>
        <label>{key}</label>
        <select onChange={(event) => {this.handleChange(event.target.value, key)}}>{this.renderOptions(name[key])}</select>
      </div>)
    })
  }
  handleChange(value,category){
    let clone = this.state;
    clone[category] = value;
    return clone;
  }
  handleSubmit(event){
    event.preventDefault();
    let currentState = this.state;
    let newState = this.handleChange();
    let result = Object.assign(currentState,newState);

    this.setState(result);
    this.props.handleSettingsChanges(result);

    axios.post('http://localhost:3001/settings', {
      result
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render(){
    return (<section className="form-customer-settings">
      <form onSubmit={(event) => {this.handleSubmit(event)}}>
        <div className="form-customer-settings_lists-container">{this.renderLists()}</div>
        <div className="form-customer-settings_finish-inputs">
          <input className="btn btn-info" value="Save" type="submit" />
          <input className='btn btn-default' value="Cancel" type="reset"/>
        </div>
      </form>
    </section>);
  }
}