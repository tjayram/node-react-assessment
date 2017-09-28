import React, { Component } from 'react';
import { Button, Image, Label } from 'react-bootstrap';
import PrevImg from './prev.jpg' 


class Results extends Component {
  constructor(props) {
    super(props);
    console.log("User: %s, Email: %s", props.user, props.email)
  }

  render() {

    let prev = <p></p>;
    const leftStyle = {float: "left"};
    const rightStyle = {float: "right", fontWeight: "bold"};
    const btStyle = {margin: 10};

    if(this.props.prev === true && this.props.summary.totalQuestions !== this.props.summary.totalAnswered) {
      prev =  <img src={PrevImg} style={leftStyle} onClick={this.props.prevHandler} />
    }

    let scoreInfo = <p>Please answer all questions to see final score</p>;
    if(this.props.summary.totalScore !== undefined) {
      scoreInfo = <h3><Label bsSize="large">Total Score: </Label>&nbsp;&nbsp;<Button bsSize="large" bsStyle="primary" >{this.props.summary.totalScore}</Button></h3>;
    }

    return (
      <div>
         {prev}
         <span style={rightStyle}>{this.props.status}</span>
        <h3><Label>Total Questions: {this.props.summary.totalQuestions} </Label></h3><br/>
        <h3><Label>Total Answered: {this.props.summary.totalAnswered}</Label></h3><br/>
        <br/>
        {scoreInfo}
      </div>
    );
  }

}

export default Results;