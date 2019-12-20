import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { render } from '@testing-library/react';
import ReactDOM from 'react-dom';
import App from './App';

class View extends Component{
  moveHome(){
    ReactDOM.render(<App/>,document.getElementById('root'));
  }
  render(){
  return(<div><a onClick={this.moveHome} style={{color:'blue'}}>&lt;- Home</a><br/><textarea id="textArea" rows="50" style={{width:'80%',margin:'25px'}} name="textArea" value={this.props.value}></textarea></div>);
  }
}

export default View;
