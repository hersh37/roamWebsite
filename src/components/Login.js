import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import '../res/style.css'

export class Login extends Component {
  static displayName = Login.name;    

  constructor(props) {
    super(props);
    this.state = {
      status: 0,            
      roles: null,
      username: "",      
      pw: ""      
    };
         
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);    
    this.handleSubmit = this.handleSubmit.bind(this);    
  }
  
  handleChangeName(event) { this.setState({ username: event.target.value }); }
  handleChangePassword(event) { this.setState({ pw: event.target.value }); }  

  handleSubmit(event) {
    event.preventDefault();        
    this.send();    
  }

  async send() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.state.username,        
        password: this.state.pw
      }),
    };    
    
    const response = await fetch("/accounts/login", requestOptions);
    var data = await response.json();      
    this.setState({ roles: data });    
    this.setState({ status: response.status });          
  }

  renderLogin() {    
    if (this.state.status !== 0) {        
     if (this.state.status === 200) {          
       this.props.location.setLogin(true, this.state.username, this.state.roles);
       return (                                     
          <Navigate to="/trainers" />
        )
      }
      else {
        return (
            <h6>Username / password not found.</h6>
          )
      }
    }
  }
  
  render() {    
    return (
      <div className="Login">
        <p/>
        <h5>Please login</h5>
        <p/>
        <form onSubmit={this.handleSubmit}>          
          <div className="form-group">
            <label asp-for="Username">Username</label><br/>
            <input asp-for="Username" className="form-control" value={this.state.username} onChange={this.handleChangeName}/>
          </div>
		  <p/>
          <div className="form-group">
            <label asp-for="Password">Password</label><br/>
            <input asp-for="Password" className="form-control" type="password" value={this.state.pw} onChange={this.handleChangePassword}/>
          </div>
		  <p/>
          <button type="submit" className="btn btn-primary">Submit</button>
          <p />or
          <p /><Link to={{ pathname:"/createuser" }}>Create new user</Link>          
        </form><p/>
        {this.renderLogin()}
      </div>
    );
  }
}
