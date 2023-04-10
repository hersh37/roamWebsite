import React, { Component } from 'react';
import '../res/style.css'

export class CreateUser extends Component {
  static displayName = CreateUser.name;  

  constructor(props) {
    super(props);
    this.state = {
      status: 0,
      responseMessage: "",
      name: "",      
      email: "",      
      pw: "",      
      cpw: "",
      roleCheckbox: false,
      admin: false
    };
    
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);       
    this.handleChangeCPassword = this.handleChangeCPassword.bind(this);       
    this.handleCheckbox = this.handleCheckbox.bind(this);        
    this.handleSubmit = this.handleSubmit.bind(this);    
    this.escFunction = this.escFunction.bind(this);
  }

  handleChangeName(event) { this.setState({ name: event.target.value }); }
  handleChangeEmail(event) { this.setState({ email: event.target.value }); }
  handleChangePassword(event) { this.setState({ pw: event.target.value }); }          
  handleChangeCPassword(event) { this.setState({ cpw: event.target.value }); }          

  escFunction(event) {
    if (event.key === "Escape") {
      this.setState({ roleCheckbox: !this.state.roleCheckbox });  
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }

  handleSubmit(event) {
    event.preventDefault();        
    if (this.state.pw === this.state.cpw) {
      this.send();
    }
    else {
      this.setState({ status: -1, responseMessage: "Passwords do not match." });
    }
  }

  handleCheckbox(event) {        
    this.setState({ admin: !this.state.admin });    
  }

  async send() {
    var roles = this.state.admin ? [ 'administrator'] : [ 'user'];
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.pw,        
        roles
      }),
    };
    const response = await fetch("/operations/createuser", requestOptions);
    var data = await response.json();
    this.setState({ responseMessage: data });   
    this.setState({ status: response.status });    
  }

  renderAddUser() {
    if (this.state.status !== 0) {      
      return (
        this.state.responseMessage    
        )      
    }
  }
  
  render() {    
    var checkbox = this.state.roleCheckbox ?
      <div className="form-group">
        <label asp-for="Checkbox">Admin</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input asp-for="Checkbox" type="checkbox" checked={this.state.admin} onChange={this.handleCheckbox} />
      </div> : "";
    return (
      <div className="createUser">
        <h5>Create User</h5>
        <p/>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Username</label><br/>
            <input className="form-control" value={this.state.name} onChange={this.handleChangeName}/>
          </div>
          <div className="form-group">
            <label>Email</label><br/>
            <input className="form-control" value={this.state.email} onChange={this.handleChangeEmail}/>
          </div>
          <div className="form-group">
            <label>Password</label><br/>
            <input className="form-control" type="password" value={this.state.pw} onChange={this.handleChangePassword}/>
          </div>
          <div className="form-group">
            <label>Confirm password</label><br />
            <input className="form-control" type="password" value={this.state.cpw} onChange={this.handleChangeCPassword} />
          </div>
          {checkbox}          
          <button type="submit" className="btn btn-primary">Create</button>
        </form><p/>
        {this.renderAddUser()}
      </div>
    );
  }
}
