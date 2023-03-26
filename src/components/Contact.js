import React, { Component } from 'react';
import '../res/custom.css'

export class Contact extends Component {
  static displayName = Contact.name;    

  constructor(props) {
    super(props);
    this.state = {
      name: "",    
	  email: "",    
	  phone: "",    
	  message: ""    
    }; 

    this.handleChangeName = this.handleChangeName.bind(this);	
	this.handleChangeEmail = this.handleChangeEmail.bind(this);	
	this.handleChangePhone = this.handleChangePhone.bind(this);	
	this.handleChangeMessage = this.handleChangeMessage.bind(this);	
	this.handleSubmit = this.handleSubmit.bind(this);    
  }  

  handleChangeName(event) { this.setState({ name: event.target.value }); }  
  handleChangeEmail(event) { this.setState({ email: event.target.value }); }  
  handleChangePhone(event) { this.setState({ phone: event.target.value }); }  
  handleChangeMessage(event) { this.setState({ message: event.target.value }); }  
  
  handleSubmit(event) {
    event.preventDefault();        
    this.send();    
  }

  async send() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Name: this.state.name,        
        Email: this.state.email,
		Phone: this.state.phone,
		Message: this.state.message,
      }),
    };    
    
	var URL = "https://ysj4jaeqck.execute-api.us-east-2.amazonaws.com/public/contact-us";
	alert("Thanks for contacting us, we will get back to you soon!");		
    fetch(URL, requestOptions);     
  }
  
  render() {    
    return (
      <form id="contact" onSubmit={this.handleSubmit}>                
          <div className="form-group">
            <label asp-for="Name">Name</label><br/>
            <input asp-for="Name" className="form-control" value={this.state.name} onChange={this.handleChangeName}/>
          </div>
		  <p/>
          <div className="form-group">
            <label asp-for="Email">Email</label><br/>
            <input asp-for="Email" className="form-control" value={this.state.email} onChange={this.handleChangeEmail}/>
          </div>
		  <p/>
		  <div className="form-group">
            <label asp-for="Phone">Phone</label><br/>
            <input asp-for="Phone" className="form-control" value={this.state.phone} onChange={this.handleChangePhone}/>
          </div>
		  <p/>
		  <div className="form-group">
            <label asp-for="Message" style={{width:'200px'}}>How can we help you?</label><br/>
			<textarea name="Message" className="form-control textarea" value={this.state.message} onChange={this.handleChangeMessage}></textarea>            
          </div>
		  <p/>		  
          <button type="submit" className="btn btn-primary">Submit</button>                          	
	</form>
    );
  }
}
