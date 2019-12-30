import React from 'react';
import logo from './logo.svg';
import './App.css';
import { render } from '@testing-library/react';
import View from './view';
import ReactDOM from 'react-dom';
import App from './App';

class Opt extends React.Component{
  constructor() {
    super();
    //ReactDOM.render(<App />, document.getElementById('root'));
    this.handleNewSubmit = this.handleNewSubmit.bind(this);
  }
  moveHome(){
    ReactDOM.render(<App/>,document.getElementById('root'));
  }
  fixKey(key){
    key=key.replace(/[^a-zA-Z0-9_]/g,'_');
    key=key.replace(/^[$!@#%^&*()]/i,'');
    return key;
  }
  handleNewSubmit(event){
    var data=document.getElementById('textArea').value;
    var tform="";
      try {
        data=JSON.parse(data);
        var container=document.getElementById('container').value;
        var subcontainer=document.getElementById('subcontainer').value;
        //data=data[container];
        var tform="";
        if(typeof data==="object" && Array.isArray(data)){
            tform=`<json:array>\n\t<Core:forEach items="\${${container}.body${((subcontainer.length>0)?`.${subcontainer}`:"")}}" var="data">\n`;
            tform+="\t\t<json:object>\n";
            for(var key in data[0]){
                if(typeof data[0][key]==="object" && !Array.isArray(data[0][key])){
                  if(data[0][key]==null){
                    tform+=`\t\t\t<json:property name="${this.fixKey(key)}" value="\${data['${key}']}"/>\n`;
                  }else{
                    for(var inkey in data[0][key]){
                      tform+=`\t\t\t<json:property name="${this.fixKey(key)}_${this.fixKey(inkey)}" value="\${data['${key}']['${inkey}']}"/>\n`;
                    }
                  }
                }
                else if(typeof data[key]==="object" && Array.isArray(data[key])){
                    // tform+=`\t\t<json:property name=\"${this.fixKey(key)}\">\n\t\t\t<json:array>\n\t\t\t\t<json:object>\n`;
                    // for(var inkey in data[key][0]){
                    //     tform+=`\t\t\t\t\t<json:property name="${this.fixKey(inkey)}" value="\${data.${key}_${inkey}}"/>\n`;
                    // }
                    // tform+=`\t\t\t\t</json:object>\n\t\t\t</json:array>\n\t\t</json:property>\n`;
                    tform+=`\t\t\t<json:property name=\"${this.fixKey(key)}\" value="\${data['${key}']}"/>\n`;
                }else{
                    tform+=`\t\t\t<json:property name="${this.fixKey(key)}" value="\${data['${key}']}"/>\n`;
                }
            }
            tform+="\t\t</json:object>\n";
            tform+=`\t</Core:forEach>\n</json:array>`;
        }else if(typeof data==="object" && !Array.isArray(data)){
            tform="<Core:set var=\"data\" value=\"${"+container+".body"+((subcontainer.length>0)?`.${subcontainer}`:"")+"}\"/>\n<json:object>\n";
            for(var key in data){
                if(typeof data[key]==="object" && !Array.isArray(data[key])){
                  if(data[key]==null){
                    tform+=`\t<json:property name="${this.fixKey(key)}" value="\${data['${key}']}"/>\n`;
                  }else{
                    //tform+=`\t<json:property name=\"${this.fixKey(key)}\">\n\t\t<json:object>\n`;
                    for(var inkey in data[key]){
                        tform+=`\t<json:property name="${this.fixKey(key)}_${this.fixKey(inkey)}" value="\${data['${key}']['${inkey}']}"/>\n`;
                    }
                    //tform+=`\t\t</json:object>\n\t</json:property>\n`;
                  }
                }
                else if(typeof data[key]==="object" && Array.isArray(data[key])){
                    // tform+=`\t<json:property name=\"${this.fixKey(key)}\">\n\t\t<json:array>\n\t\t\t<json:object>\n`;
                    // for(var inkey in data[key][0]){
                    //     tform+=`\t\t\t\t<json:property name="${this.fixKey(inkey)}" value="\${data.${key}_${inkey}}"/>\n`;
                    // }
                    // tform+=`\t\t\t</json:object>\n\t\t</json:array>\n\t</json:property>\n`;
                    tform+=`\t<json:property name=\"${this.fixKey(key)}\" value="\${data['${key}']}"/>\n`;
                }else{
                    tform+=`\t<json:property name="${this.fixKey(key)}" value="\${data['${key}']}"/>\n`;
                }
            }
            tform+="</json:object>";
        }
        ReactDOM.render(<View value={tform}/>,document.getElementById('root'));
    } catch(e) {
        alert("Unable to parse the JSON");
        ReactDOM.render(<App/>,document.getElementById('root'));
    }
    
  }
  render(){
    return (
      <div class="Ipt">
        <div class="jumbotron">
          <ul class="header-list">
            <div class="row">
              <div class="cols-sm-8" id="home">
                <li><a onClick={this.moveHome} style={{color:'blue'}}>&lt;- Home</a></li>
              </div>
              <div class="cols-sm-8" id="title">
                <li><center><h2>Output Transformer</h2></center></li>
              </div>
            </div>
          </ul>
        </div>
        <div class="container">
            <form>
              <center>
                <div class="row">
                  <div class="col-sm-3">
                    <label for="container">Http Container :</label>
                    <input type="text" id="container" class="form-control" name="container" placeholder="Http Container"/>
                    <div class="valid-feedback">
                      HTTP container's name
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <label for="subcontainer">Http sub-container :</label>
                    <input type="text" id="subcontainer" class="form-control" name="subcontainer" placeholder="Http Sub-container"/>
                    <div class="valid-feedback">
                      Object within HTTP payload from which output has to extracted.
                    </div>
                  </div>
                </div>
                <label for="textArea">Sample Payload:</label>
                <textarea id="textArea" rows="15" name="textArea" style={{width:'80%',margin:'25px'}}></textarea><br/>
                <button type="submit" class="btn btn-primary" onClick={this.handleNewSubmit} style={{marginBottom:"20px"}}>Transform</button>
              </center>
            </form>
        </div>
      </div>
    );
  }
}

export default Opt;
