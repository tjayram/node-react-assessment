import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AssessmentContainer from './assessment/container'

class App extends Component {
  render() {
    return (
      <div className="App">
        <AssessmentContainer></AssessmentContainer>
      </div>
    );
  }
}

export default App;
