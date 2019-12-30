import React from 'react';
import logo from './logo.svg';
import App from './App'
import './App.css';
import { render } from '@testing-library/react';
import ReactDOM from 'react-dom';
import { FilePicker } from 'react-file-picker';
import View from './view'

class Resource  extends React.Component{
    constructor(props) {
        super(props);
        //ReactDOM.render(<App />, document.getElementById('root'));
        this.setFile = this.setFile.bind(this);
      }
      moveHome(){
        ReactDOM.render(<App/>,document.getElementById('root'));
      }
       postFile(event) {   
            var resourceUrl=document.getElementById('resourceUrl').value;
            var sample=JSON.parse(document.getElementById('textArea').value);
            var tst=(JSON.parse(event.target.value));
            var zf=tst.zfa;
            var rind;
            zf.resources.forEach(function(item,index){
                if(item.linkName==resourceUrl){
                    rind=index;
                }
            });
            if(!zf.resources[rind].hasOwnProperty('staticFields'))
            zf.resources[rind].staticFields=[];
            if(zf.resources[rind].hasOwnProperty('staticFields')&&zf.resources[rind].staticFields.length==0)
            zf.resources[rind].staticFields=[];
            //alert(rind);
            function hasKey(key){
                var flag=false;
                zf.resources[rind].staticFields.forEach(function(item){
                    if(item.inputParams.name==key){
                        flag=true;
                    }
                });
                return flag;
            }
            function label(data){
            var str=data;
            var patt=/[A-Z]/g;
            var counter=0;
            str=(str.trim().substring(0,1).toUpperCase()+str.trim().substring(1,str.length).replace(/_/g,' ')).replace(/ id$/i,' ID');
            var result;
            while((result=patt.exec(data))&&counter<100){
            counter++;
                console.log("At"+result.index+"for"+result[0]);
                str=str.substring(0,result.index)+' '+result[0].toLowerCase()+str.substring(result.index+1,str.length);
            }
            if(str.match(/^Id$/i)){
                str=str.toUpperCase();
            }
            return str;
            }
            for(var key in sample){
            if(typeof sample[key]==='object' && !Array.isArray(sample[key]) && sample[key]!=null){
                for(var inkey in sample[key]){
                    var reg=/[A-Z]/g;
                    var str=inkey.trim();
                    var match;
                    var dtype=typeof sample[key][inkey];
                    if(dtype=='string' && (sample[key][inkey]).match(/[0-9]{2,4}(\-|\/)[0-9]{2}(\-|\/)[0-9]{2,4}$/i)){
                    dtype="date";
                    }
                    if(dtype=='string' && (sample[key][inkey]).match(/[0-9]{2,4}(\-|\/)[0-9]{2}(\-|\/)[0-9]{2,4}(T|\'T\'| )?[0-9:Z\+.]+/i)){
                    dtype="datetime";
                    }
                    var fieldType={"boolean":4,"number":1,"string":0,"object":0,"date":6,"datetime":8};
                    console.log("In "+key+" - "+inkey);
                if(key.indexOf('_')!=-1){
                    while((match=reg.exec(str))!=null){
                        console.log(match[0]+" "+match.index);
                        str=str.substring(0,match.index)+' '+str[match.index].toLowerCase()+str.substring(match.index+1,str.length);
                    }
                }
                else{
                str=inkey.toLowerCase();
                str=str.replace(/_/g,' ')
                }
                str=str.replace(/_/g,' ');
                var field={
                    "inputParams": {
                        "helpText": "",
                        "isLabelField": false,
                        "name": key.replace(/^[0-9!@#$%^&*]+/i,'').trim()+'_'+inkey.trim(),
                        "isDataTypeField": false,
                        "zf_has_lists": false,
                        "isIdField": false,
                        "isTypeField": false,
                        "label":label(key)+' - '+label(str),
                        "fieldType": fieldType[dtype],
                        "isMandatory": false,
                        "placeHolder": ""
                    },
                    "type": 0,
                    "category": 1
                    };
                if(!hasKey(key.replace(/^[0-9!@#$%^&*]+/i,'').trim()+'_'+inkey.trim()))
                zf.resources[rind].staticFields.push(field);
            }
            }else{
                    var reg=/[A-Z]/g;
                    var str=key.trim();;
                    var fieldType={"boolean":4,"number":1,"string":0,"object":0,"date":6,"datetime":8};
                    var match;
                    var dtype=typeof sample[key];
                    if(dtype=='string' && (sample[key]).match(/[0-9]{2,4}(\-|\/)[0-9]{2}(\-|\/)[0-9]{2,4}$/i)){
                    dtype="date";
                    }
                    if(dtype=='string' && (sample[key]).match(/[0-9]{2,4}(\-|\/)[0-9]{2}(\-|\/)[0-9]{2,4}(T|\'T\'| )?[0-9:Z\+.]+/i)){
                    dtype="datetime";
                    }
                    console.log("In "+key);
                    while((match=reg.exec(str))!=null){
                        console.log(match[0]+" "+match.index);
                        str=str.substring(0,match.index)+' '+str[match.index].toLowerCase()+str.substring(match.index+1,str.length);
                }
            str=str.substring(0,1).toUpperCase()+str.substring(1,str.length).replace(/_/g,' ');
                var field={
                    "inputParams": {
                        "helpText": "",
                        "isLabelField": false,
                        "name": key.replace(/^[0-9!@#$%^&*]+/i,'').trim(),
                        "isDataTypeField": false,
                        "zf_has_lists": false,
                        "isIdField": false,
                        "isTypeField": false,
                        "label": label(key),//(key.trim().substring(0,1).toUpperCase()+key.trim().substring(1,key.length).replace(/_/g,' ')).replace(/ id$/i,' ID'),
                        "fieldType": fieldType[dtype],
                        "isMandatory": false,
                        "placeHolder": ""
                    },
                    "type": 0,
                    "category": 1
                    };
                if(!hasKey(key.replace(/^[0-9!@#$%^&*]+/i,'').trim()))
                zf.resources[rind].staticFields.push(field);
            }
            }
        // HTTP POST  
        //ReactDOM.render(<View value={JSON.stringify(zf)}/>,document.getElementById('root'));
        //this.download('sample.zfa',JSON.stringify(zf));
        ReactDOM.render(
            <div class="row vcenter">
                <a style={{fontSize:"30px",margin:"40%"}} href={("data:text/plain;charset=utf-8,"+encodeURIComponent(JSON.stringify(zf)))} download={(tst.filename)}>Export ZFA</a>
            </div>,document.getElementById('container'))
      }
       setFile(event) {
        // Get the details of the files
        let FileList=event.target.files;
        let file=FileList[0];
        
        let read = new FileReader();
        read.readAsBinaryString(file);
        read.onloadend = function(){
            this.setState({filename:file.name,zfa:JSON.parse(read.result)});
            //alert(read.result);
        }.bind(this);
        document.getElementById('FileLabel').innerHTML=file.name;
      }
    render(){
        return (
          <div class="Ipt">
            <div class="jumbotron">
              <ul class="header-list">
                <div class="row">
                  <div class="cols-sm-4" id="home">
                    <li><a onClick={this.moveHome} style={{color:'blue'}}>&lt;- Home</a></li>
                  </div>
                  <div class="cols-sm-8" id="title">
                    <li><center><h2>Resource Generator</h2></center></li>
                  </div>
                </div>
              </ul>
            </div>
            <div id="container" class="container">
                <form>
                  <center>
                    {//<input type="text" name="container" placeholder="Http Container"/>
                    /*<input type="text" name="subcontainer" placeholder="Http Sub-container"/><br/>*/}
                    <div class="row justify-content-start"><div class="col-sm-2 justify-content-start"><span style={{float:"left"}} class="pull-left">Upload ZFA:</span></div><div class="col-sm-2 justify-content-start"><span><div class="custom-file"><input type="file" class="custom-file-input" name="docx" onChange={this.setFile} required/><label class="custom-file-label" id="FileLabel" for="validatedCustomFile">Choose file...</label></div></span></div></div>
                    <div class="row justify-content-start"><div class="col-sm-2 justify-content-start"><span style={{float:"left"}} class="pull-left">Resource link to add static Fields:</span></div><div class="col-sm-2"><span><input class="form-control" type="text" style={{float:"left"}} id="resourceUrl" name="resourceUrl" placeholder="Resource link"/></span></div></div>
                    <div class="row justify-content-start"><div class="col-sm-2 justify-content-start"><span style={{float:"left"}} class="pull-left">Sample Payload:</span></div></div>
                    <div class="row justify-content-start"><div class="col-lg-10 justify-content-center"><textarea id="textArea" class="well" rows="15" name="textArea" style={{width:'80%',margin:'25px'}}></textarea></div></div>
                    <div class="row justify-content-start"><div class="col-lg-10 justify-content-center"><button type="submit" class="btn btn-primary" onClick={this.postFile} value={JSON.stringify(this.state)}>Generate</button></div></div>
                  </center>
                </form>
            </div>
            <footer id="sticky-footer" class="py-4 bg-dark text-white-50">
                <div class="container text-center">
                    <small>* Disclaimer: Make a copy of the exported ZFA before creating the resource. Field element type would always be single line text and verify the generated field's data type.</small>
                </div>
            </footer>
          </div>
          
        );
      }
}

export default Resource;