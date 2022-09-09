import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import Cart from './pages/Cart';
import DetailedProduct from './pages/DetailedProduct';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={ HomePage } />
        <Route exact path="/Cart" component={ Cart } />
        <Route path="/DetailedProduct/:id" component={ DetailedProduct } />
      </BrowserRouter>
    );
  }
}

export default App;
