import React, { Component } from 'react';
import home from '../res/roam-new.jpg';
import '../res/custom.css';

export class Home extends Component {
  static displayName = Home.name;  

  componentWillMount() {
    this.setState({ height: window.innerHeight + 'px', width: window.innerWidth + 'px' });
  }
  
  render() {
    return (		
      <img src={home} className="homeImage" alt="home"/>        
    );
  }
}
