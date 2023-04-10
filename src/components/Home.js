import React, { Component } from 'react';
import home from '../res/logo.jpg';
import forest from '../res/forest.mp4';
import '../res/style.css';

export class Home extends Component {
  static displayName = Home.name;  

  componentWillMount() {
    this.setState({ height: window.innerHeight + 'px', width: window.innerWidth + 'px' });
  }
  
  render() {
    return (
      <div id="videoContainer">
	  <video autoPlay muted loop>
          <source src={forest} type="video/mp4"/>
	  </video>        
      </div>
    );
  }
}
