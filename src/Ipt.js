import React from 'react';
import logo from './logo.svg';
import App from './App'
import './App.css';
import { render } from '@testing-library/react';
import ReactDOM from 'react-dom';
import View from './view'

class Ipt extends React.Component{
  constructor() {
    super();
    //ReactDOM.render(<App />, document.getElementById('root'));
    this.handleNewSubmit = this.handleNewSubmit.bind(this);
  }
  moveHome(){
    ReactDOM.render(<App/>,document.getElementById('root'));
  }
  handleNewSubmit(event){
    var data=document.getElementById('textArea').value;
    data=JSON.parse(data);
    var tform="";
    //alert(data+"in funtion");
    if(typeof data==="object" && Array.isArray(data)){

    }else if(typeof data==="object" && !Array.isArray(data)){
        tform="<json:object>\n";
        for(var key in data){
            if(typeof data[key]==="object" && !Array.isArray(data[key])){
              var testCon=" and ";
              for(var inkey in data[key][0]){
                  testCon=`!empty(resource['${key}_${inkey}'])`+testCon;
              }
              tform+=`\t<Core:if test="\${${testCon.substring(0,testCon.length-5)}}">\n`;
              tform+=`\t\t<json:property name=\"${key}\">\n\t\t\t<json:object>\n`;
              for(var inkey in data[key]){
                  tform+=`\t\t\t\t<Core:if test="\${!empty(resource['${key}_${inkey}'])}">\n\t\t\t\t\t<json:property name="${inkey}" value="\${resource.${key}_${inkey}}"/>\n\t\t\t\t</Core:if>\n`;
              }
              tform+=`\t\t\t</json:object>\n\t\t</json:property>\n`;
              tform+=`\t</Core:if>\n`;
            }else if(typeof data[key]==="object" && Array.isArray(data[key])){
                if(typeof data[key][0]==="object"&&!Array.isArray(data[key][0])&&(Object.keys(data[key][0]).length<2)){
                    tform+=`\t<Core:if test="\${!empty(resource['${key}'])}">\n\t\t<json:property name=\"${key}\">\n\t\t\t<json:array>\n`;
                    tform+=`\t\t\t\t<Core:forEach items="\${resource['${key}'].tolist(',')}" var="item">\n\t\t\t\t\t<json:object>\n`;
                    for(var inkey in data[key][0]){
                        tform+=`\t\t\t\t\t\t<json:property name="${inkey}" value="\${item}"/>\n`;
                    }
                    tform+=`\t\t\t\t\t</json:object>\n\t\t\t\t</Core:forEach>\n`;
                    tform+=`\t\t\t</json:array>\n\t\t</json:property>\n`;
                    tform+=`\t</Core:if>\n`;
                }else if(typeof data[key][0]==="object"&&!Array.isArray(data[key][0])&&(Object.keys(data[key][0]).length>2)){
                    tform+=`\t<Core:if test="\${!empty(resource['${key}'])}">\n\t\t<json:property name=\"${key}\">\n\t\t\t<json:array>\n`;
                    tform+=`\t\t\t\t<json:object>\n`;
                    for(var inkey in data[key][0]){
                        tform+=`\t\t\t\t\t<Core:if test="\${!empty(resource.${key}_${inkey})}">\n\t\t\t\t\t\t<json:property name="${inkey}" value="\${resource.${key}_${inkey}}"/>\n\t\t\t\t\t</Core:if>\n`;
                    }
                    tform+=`\t\t\t\t</json:object>\n`;
                    tform+=`\t\t\t</json:array>\n\t\t</json:property>\n`;
                    tform+=`\t</Core:if>\n`;
                }else{
                    tform+=`\t<Core:if test="\${!empty(resource['${key}'])}">\n\t\t<json:property name="${key}" value="\${resource['${key}'].tolist(',')}"/>\n\t</Core:if>\n`;
                }
            }else{
                tform+=`\t<Core:if test="\${!empty(resource['${key}'])}">\n\t\t<json:property name="${key}" value="\${resource.${key}}"/>\n\t</Core:if>\n`;
            }

        }
        tform+="</json:object>";
    }
    //alert(tform);
    //console.log(tform);
    //res.render("display",{data:tform});
    //document.getElementById('textArea').innerHTML=tform;
    ReactDOM.render(<View value={tform}/>,document.getElementById('root'));
  }
  render(){
    return (
      <div class="Ipt">
            <a onClick={this.moveHome} style={{color:'blue'}}>&lt;- Home</a>
            <h1>Input Transformer</h1>
            <form>
              <center>
                {//<input type="text" name="container" placeholder="Http Container"/>
                /*<input type="text" name="subcontainer" placeholder="Http Sub-container"/><br/>*/}
                <textarea id="textArea" rows="50" name="textArea" style={{width:'80%',margin:'25px'}}></textarea><br/>
                <button type="submit" class="btn btn-primary" onClick={this.handleNewSubmit} style={{marginBottom:"20px"}}>Transform</button>
              </center>
            </form>
      </div>
    );
  }
}

export default Ipt;
