import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

function updateText(text) {
  this.setState({ text })
}

export class Layout extends Component {
  static displayName = Layout.name;
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    }
  }

  updateChild(text) {
    updateText(text)
  }

  render() {
    return (
      <div>
        <NavMenu />		
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
