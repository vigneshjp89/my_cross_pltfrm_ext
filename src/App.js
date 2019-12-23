import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import { render } from '@testing-library/react';
import Ipt from './Ipt';
import Opt from './Opt';
class App extends React.Component{
  constructor() {
    super();
    //ReactDOM.render(<App />, document.getElementById('root'));
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event){
    var data=event.target.value;

    // Your mom was not satisfied with day 1 & 2's task. So we've uped the game a little. Your task is with some good employee who helps everyone not even knowing their
    // name, that person is the first one you see, as you enter the lakeview entrance(PS:: You also get stationary from them, when the vendie doesn't work properly). We could appreciate their work
    // Say "You are great. I'm glad that there is someone doing this job. Thank you so much" and collect your presents and today's task from them.
    if(data=='ipt'){
      ReactDOM.render(<Ipt />, document.getElementById('root'));
    }else{
      ReactDOM.render(<Opt />, document.getElementById('root'));
    }
    // alert(data);
    // console.log(data);
  }
  render(){
    return (
      <div className="App" class="container" style={{marginTop: '25%'}}>
        <form>
            <center>
                <button type="submit" class="btn btn-primary" id="ipt" name="ipt" value="ipt" style={{fontSize:'24px',margin:'10px'}} onClick={this.handleSubmit}>Input Transformer</button>
                <button type="submit" class="btn btn-primary" id="opt" name="opt" value="opt" style={{fontSize:'24px',margin:'10px'}} onClick={this.handleSubmit}>Output Transformer</button>
            </center>
        </form>
      </div>
    );
  }

}

export default App;
