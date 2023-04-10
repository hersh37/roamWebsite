import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import '../res/style.css'

export class Logout extends Component {
  static displayName = Logout.name;

  constructor(props) {
    super(props);
    this.state = {
      status: 0
    };
  }  

  async logout() {
    this.setState({ status: -1 });       
    const response = await fetch("/accounts/logout");        
    this.setState({ status: response.status });          
  }

  render() {
    if (this.state.status === 0) {
      this.logout();
      return null;
    }
    else if (this.state.status === -1) {
      return null;
    }
    else if (this.state.status === 200) {
      this.setState({ status: 0 });
      this.props.location.setLogin(false, "", null);
      return (                
        <Navigate to="/" />
      )
    }
  }  
}
