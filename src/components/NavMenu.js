import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Nav } from 'reactstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;
  static loggedIn = false;
  static username = "";
  static roles = null;

  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      loggedIn: false,
      username: "",
      roles: null
    };

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.setLogin = this.setLogin.bind(this);
  }

  toggleNavbar() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  setLogin(loginState, user, rolesList) {
    NavMenu.loggedIn = loginState;
    NavMenu.username = user;
    NavMenu.roles = rolesList;
    this.setState({ loggedIn: loginState, username: user, roles: rolesList });    
  }

  render() {           
    let add = "", catalog = "";
    if (this.state.roles !== null && this.state.roles[0] === "administrator") {
      add = <NavItem><NavLink tag={Link} to="/add">Add</NavLink></NavItem>;
      catalog = <NavItem><NavLink tag={Link} to="/catalog">Catalog</NavLink></NavItem>;
    }
    let login = this.state.loggedIn ?      
      <NavLink tag={Link} to={{ pathname: "/logout", setLogin: this.setLogin }}>Logout<br/>{this.state.username}</NavLink> :      
      <NavLink tag={Link} to={{ pathname: "/login", setLogin: this.setLogin }}>Login</NavLink>;        
    let links = this.state.loggedIn ?
      <>
        <NavItem>
          <NavLink tag={Link} to="/trainers">Trainers</NavLink>
        </NavItem>        
        <NavItem>
          <NavLink tag={Link} to="/search">Search</NavLink>
        </NavItem>        
        {add}{catalog}</> : "";
	
    return (
      <header>	  	  
        <ul>
		  <li><a href="/">Home</a></li>
		  <li><a href="/">Contact Us</a></li>
		  <li><a href="/">Whatever</a></li>
		  <li id="bars"><a href="/">Bars</a></li>          
		</ul>						
      </header>
    );
  }
}
