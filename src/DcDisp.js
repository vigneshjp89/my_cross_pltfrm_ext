import React, { Component } from 'react';
import logo from './logo.svg';
import App from './App'
//import RecurResource from './RecurResource';
import './App.css';

import ReactDOM from 'react-dom';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';


class DcDisp extends Component{
    constructor(props){
      super(props);
      if(this.props.value.islz){
        this.state={
          filename:this.props.value.filename,
          l:this.props.value.l
        };
      }else{
        this.state={
          filename:this.props.value.filename,
          eu:this.props.value.eu,
          in:this.props.value.in,
          au:this.props.value.au,
          cn:this.props.value.cn,
          jp:this.props.value.jp
        };
      }
      
      //this.recurResource=this.recurResource.bind(this);
      this.moveHome=this.moveHome.bind(this);
      this.create_zip=this.create_zip.bind(this);
    }
    create_zip() {
        var zip = new JSZip();
        console.log("in create zip");
        var fileNM=this.state.filename;
        if(this.state.hasOwnProperty("l")){
          var blob = new Blob([JSON.stringify(this.state.l)], {type: "text/plain;charset=utf-8"});
          saveAs(blob, this.state.filename.substring(0,this.state.filename.lastIndexOf('.'))+"_local."+this.state.filename.substring(this.state.filename.lastIndexOf('.')+1,this.state.filename.length));
        }else{
          zip.file(this.state.filename.substring(0,this.state.filename.lastIndexOf('.'))+"_EU."+this.state.filename.substring(this.state.filename.lastIndexOf('.')+1,this.state.filename.length), JSON.stringify(this.state.eu));
          zip.file(this.state.filename.substring(0,this.state.filename.lastIndexOf('.'))+"_IN."+this.state.filename.substring(this.state.filename.lastIndexOf('.')+1,this.state.filename.length), JSON.stringify(this.state.in));
          zip.file(this.state.filename.substring(0,this.state.filename.lastIndexOf('.'))+"_CN."+this.state.filename.substring(this.state.filename.lastIndexOf('.')+1,this.state.filename.length), JSON.stringify(this.state.cn));
          zip.file(this.state.filename.substring(0,this.state.filename.lastIndexOf('.'))+"_AU."+this.state.filename.substring(this.state.filename.lastIndexOf('.')+1,this.state.filename.length), JSON.stringify(this.state.au));
          zip.file(this.state.filename.substring(0,this.state.filename.lastIndexOf('.'))+"_JP."+this.state.filename.substring(this.state.filename.lastIndexOf('.')+1,this.state.filename.length), JSON.stringify(this.state.jp));
          //var content = zip.generate();
          zip.generateAsync({type:"blob"})
          .then(function(content) {
              // see FileSaver.js
              saveAs(content, fileNM.substring(0,fileNM.lastIndexOf('.'))+".zip");
          });

        }
        
        //return("data:application/zip;base64," + content);
    }
    moveHome(){
      ReactDOM.render(<App/>,document.getElementById('root'));
    }
    // recurResource(){
    //   //var testValue=this.state;
    //   //alert(JSON.stringify(testValue));
    //   try{
    //   ReactDOM.render(<RecurResource value={this.state}/>,document.getElementById('root'));
    //   }
    //   catch(e){
    //     alert("Error: "+e);
    //   }
    // }
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
              <h2>DC ZFA Generator</h2>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row vcenter">
            <div class="col-sm-4">{/*<button style={{fontSize:"18px",margin:"40%"}} href={(this.create_zip())} onClick={this.create_zip()}>Export ZIP</a>*/}<button type="submit" class="btn" onClick={this.create_zip} style={{fontSize:"18px",margin:"40%"}}>Download ZIP</button></div>

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
export default DcDisp;