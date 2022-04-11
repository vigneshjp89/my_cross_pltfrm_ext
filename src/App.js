import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import { render } from '@testing-library/react';
import Ipt from './Ipt';
import Opt from './Opt';
import Resource from './Resource';
import DC from './Dc';
import * as Sentry from "@sentry/browser";
import { Integrations } from "@sentry/tracing";


class App extends React.Component{
  constructor() {
    super();
    //ReactDOM.render(<App />, document.getElementById('root'));
    Sentry.init({
      dsn: "https://72e82c54eb344a68a3aea5a248df8e1c@o1085475.ingest.sentry.io/6096254",
      integrations: [new Integrations.BrowserTracing()],
    
      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,
    });
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
    Sentry.captureException(new Error("New error arrival 2"), {
    });
  }
  handleSubmit(event){
    var data=event.target.value;
    Sentry.captureException(new Error("New error arrival"), {
    });
    // Your mom was not satisfied with day 1 & 2's task. So we've uped the game a little. Your task is with some good employee who helps everyone not even knowing their
    // name, that person is the first one you see, as you enter the lakeview entrance(PS:: You also get stationary from them, when the vendie doesn't work properly). We could appreciate their work
    // Say "You are great. I'm glad that there is someone doing this job. Thank you so much" and collect your presents and today's task from them.
    if(data=='ipt'){
      ReactDOM.render(<Ipt />, document.getElementById('root'));
    }else if(data=='opt'){
      ReactDOM.render(<Opt />, document.getElementById('root'));
    }else if(data=='res'){
      ReactDOM.render(<Resource />, document.getElementById('root'));
    }else{
      ReactDOM.render(<DC />, document.getElementById('root'));
    }
    // alert(data);
    console.log("in server");
  }
  render(){
    
    return (
      <div className="App" class="container" style={{marginTop: '25%'}}>
        <form>
            <center>
                <button type="submit" class="btn btn-primary" id="ipt" name="ipt" value="ipt" style={{fontSize:'24px',margin:'10px'}} onClick={this.handleSubmit}>Input Transformer</button>
                <button type="submit" class="btn btn-primary" id="opt" name="opt" value="opt" style={{fontSize:'24px',margin:'10px'}} onClick={this.handleSubmit}>Output Transformer</button>
                <button type="submit" class="btn btn-primary" id="res" name="res" value="res" style={{fontSize:'24px',margin:'10px'}} onClick={this.handleSubmit}>Resource Generator</button>
                <button type="submit" class="btn btn-primary" id="dc" name="dc" value="dc" style={{fontSize:'24px',margin:'10px'}} onClick={this.handleSubmit}>ZFA for DCs</button>
            </center>
        </form>
      </div>
    );
  }

}

export default App;
