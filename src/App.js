import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Logout } from './components/Logout';
import { Contact } from './components/Contact';
import { CreateUser } from './components/CreateUser';

export default class App extends Component {
  static displayName = App.name;
  
  render() {
    return (
      <Layout>	    
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route path='/logout' element={<Logout/>}/>
		  <Route path='/contact' element={<Contact/>}/>
        </Routes>		
      </Layout>
    );
  }    
}
