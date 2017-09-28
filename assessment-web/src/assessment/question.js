import React, { Component } from 'react';
import { Button, Image } from 'react-bootstrap';
import PrevImg from './prev.jpg' 


class Question extends Component {
  render() {

    let prev = <p></p>;
    const leftStyle = {float: "left"};
    const rightStyle = {float: "right", fontWeight: "bold"};
    const btStyle = {margin: 10};

    if(this.props.prev === true) {
      prev =  <img src={PrevImg} style={leftStyle} onClick={this.props.prevHandler} />
    }

    return (
      <div>
        <h2>{this.props.question.title}</h2>
        {prev}
        <span style={rightStyle}>{this.props.status}</span>
        <br/>
        <br/>
        <p>{this.props.question.description}</p>
        <br/>
        {this.props.question.options.map((opt, i) =>
          <Button key={opt.id} bsSize="large" value={opt.id} style={btStyle} onClick={this.props.clickHandler}>{opt.value}</Button>
        )}
      </div>
    );
  }
}

export default Question;