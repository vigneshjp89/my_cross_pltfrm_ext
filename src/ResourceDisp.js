import React, { Component } from 'react';
import logo from './logo.svg';
import App from './App'
import RecurResource from './RecurResource';
import './App.css';
import { render } from '@testing-library/react';
import ReactDOM from 'react-dom';
import View from './view'
class ResourceDisp extends Component{
    constructor(props){
      super(props);
      this.state={
        filename:this.props.value.filename,
        zfa:this.props.value.zfa
      };
      this.recurResource=this.recurResource.bind(this);
    }
    recurResource(){
      var testValue=this.state;
      alert(JSON.stringify(testValue));
      ReactDOM.render(<RecurResource value={this.state}/>,document.getElementById('root'));
    }
    render(){
        //this.sample=this.props;
        alert(JSON.stringify(this.state));
        return(<div class="row vcenter">
        <div class="col-sm-4"><a onClick={this.recurResource} style={{color:'blue',fontSize:"18px",margin:"40%"}} id="recurR">Add More</a></div>
        <div class="col-sm-4"><a style={{fontSize:"18px",margin:"40%"}} href={("data:text/plain;charset=utf-8,"+encodeURIComponent(JSON.stringify(this.state.zfa)))} download={this.state.filename}>Export ZFA</a></div>
    </div>)
    }
}
export default ResourceDisp;