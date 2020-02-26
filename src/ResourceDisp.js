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
      //var testValue=this.state;
      //alert(JSON.stringify(testValue));
      try{
      ReactDOM.render(<RecurResource value={this.state}/>,document.getElementById('root'));
      }
      catch(e){
        alert("Error: "+e);
      }
    }
    render(){
        //this.sample=this.props;
        //alert(JSON.stringify(this.state));
        try{
        return(<div class="Resourced">
        <div class="jumbotron">
          <div class="cols-sm-4" id="home">
            <a onClick={this.moveHome} style={{color:'blue'}} class="float">&lt;- Home</a>
          </div>
          <div class="row container-fluid title">
            <div class="col-sm-12 title" id="title">
              <h2>Resource Generator</h2>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row vcenter">
            <div class="col-sm-4"><a onClick={this.recurResource} style={{color:'blue',fontSize:"18px",margin:"40%"}} id="recurR">Add More</a></div>
          </div>
          <div class="row vcenter">
            <div class="col-sm-4"><a style={{fontSize:"18px",margin:"40%"}} href={("data:text/plain;charset=utf-8,"+encodeURIComponent(JSON.stringify(this.state.zfa)))} download={this.state.filename}>Export ZFA</a></div>
        </div>
        </div>
      <footer id="sticky-footer" class="py-4 bg-dark text-white-50" style={{marginTop:"48%"}}>
          <div class="container text-center">
              <small>* Disclaimer: Make a copy of the exported ZFA before creating the resource. Field element type would always be single line text and verify the generated field's data type.</small>
          </div>
      </footer>
    </div>);
        }
        catch(e){
          alert("Error: "+e);
        }
    }
}
export default ResourceDisp;