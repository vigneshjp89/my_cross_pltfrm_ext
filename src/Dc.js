import React from 'react';
import logo from './logo.svg';
import App from './App';
import DCDisp from  './DcDisp';
import './App.css';
import { render } from '@testing-library/react';
import ReactDOM from 'react-dom';
import { FilePicker } from 'react-file-picker';
import View from './view'

class Dc  extends React.Component{
    constructor(props) {
        super(props);
        //ReactDOM.render(<App />, document.getElementById('root'));
        this.state={click:false};
        //this.recurResource=this.recurResource.bind(this);
        this.setFile = this.setFile.bind(this);
        this.postFile=this.postFile.bind(this);
        this.moveViewer=this.moveViewer.bind(this);
        this.setzf=this.setzf.bind(this);
        //this.recurResource=this.recurResource.bind(this);
      }
    //   keypressHandler(e){
    //     if(e.key=='Enter'){
    //         document.getElementById('submit').click();
    //     }
    //   }
      moveHome(){
        ReactDOM.render(<App/>,document.getElementById('root'));
      }
      moveViewer(){
         // alert(this.state.rindex);
        ReactDOM.render(<DCDisp value={this.state}/>,document.getElementById('root'));
      }
       async postFile(event) {   
            //var resourceUrl=document.getElementById('resourceUrl').value;
            let currentComponent=this;
            try{
            //var sample=JSON.parse(document.getElementById('textArea').value);
            var tst=(JSON.parse(event.target.value));
            var zf=tst.zfa;
            var zfstr=JSON.stringify(zf);
            var zfaCN=JSON.parse(zfstr.replaceAll("zoho.com","zoho.com.cn").replaceAll("zohoapis.com","zohoapis.com.cn"));
            var zfaIN=JSON.parse(zfstr.replaceAll("zoho.com","zoho.in").replaceAll("zohoapis.com","zohoapis.in"));
            var zfaAU=JSON.parse(zfstr.replaceAll("zoho.com","zoho.com.au").replaceAll("zohoapis.com","zohoapis.com.au"));
            var zfaEU=JSON.parse(zfstr.replaceAll("zoho.com","zoho.eu").replaceAll("zohoapis.com","zohoapis.eu"));
            var zfaJP=JSON.parse(zfstr.replaceAll("zoho.com","zoho.jp").replaceAll("zohoapis.com","zohoapis.jp"));
            // zfaEU.service.authenticationParam.oAuthReqParams.client_id="1000.GGXV39RRSOX820438EQD0FK2Q71U4L";
            // zfaEU.service.authenticationParam.oAuthReqParams.client_secret="8c12dd1097f1500cd0041643542ea880a31c1a73e8";
            // zfaCN.service.authenticationParam.oAuthReqParams.client_id="1000.MX41WT5TRR0524481JAED523L70MEB";
            // zfaCN.service.authenticationParam.oAuthReqParams.client_secret="6c174f79407980727f519baba75794dec170ee6f7f";
            // zfaIN.service.authenticationParam.oAuthReqParams.client_id="1000.BP6WRMQZ26F043584NRP8X7K1605RQ";
            // zfaIN.service.authenticationParam.oAuthReqParams.client_secret="e5e15804f7adcfbb5d7b30cd63dfa90ccaaa404a29";
            // zfaAU.service.authenticationParam.oAuthReqParams.client_id="1000.K0E060M13N1W653005WD29AME9074N";
            // zfaAU.service.authenticationParam.oAuthReqParams.client_secret="cd1862b6a8d2ce5493ef15422ae656675cff7e4b4d";
            //var rind=-1;
            try{
                //alert(JSON.stringify(zf.resources[rind]));
            await this.setzf({eu:zfaEU,in:zfaIN,cn:zfaCN,au:zfaAU,jp:zfaJP});  
            }catch(e){
                alert("Unable to set state"+e);
            }
        }catch(e){
            alert("Error parsing JSON");
        }
        this.moveViewer();
      }
        async setzf(val){
            await this.setState(val);
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
            <div class="jumbotron"><div class="cols-sm-4" id="home"><a onClick={this.moveHome} style={{color:'blue'}} class="float">&lt;- Home</a></div><div class="row container-fluid title"><div class="col-sm-12 title" id="title"><h2>Resource Generator</h2></div></div></div>
            <div id="container" class="container">
                <form>
                  <center>
                    {//<input type="text" name="container" placeholder="Http Container"/>
                    /*<input type="text" name="subcontainer" placeholder="Http Sub-container"/><br/>*/}
                    <div class="row justify-content-start"><div class="col-sm-2 justify-content-start"><span style={{float:"left"}} class="pull-left">Upload ZFA:</span></div><div class="col-sm-1 justify-content-start"><span><div class="custom-file"><input type="file" class="custom-file-input" name="docx" onChange={this.setFile} required/><label class="custom-file-label" id="FileLabel" for="validatedCustomFile">Choose file...</label></div></span></div>{/*<div class="col-sm-1"><button type="submit" id="submitEasyAcs" class="btn btn-primary" onClick={this.postFile} value={JSON.stringify(this.state)}>Generate</button></div>*/}</div>
                    <div class="row justify-content-start"><div class="col-lg-10 justify-content-center"><button type="submit" id="submit" class="btn btn-primary" onClick={this.postFile} value={JSON.stringify(this.state)}>Generate</button></div></div>
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

export default Dc;