import React, { Component } from 'react';
import Header from './header';
import UserDetails from './user-details';
import Question from './question';
import Results from './results';


class AssessmentContainer extends Component {


  constructor(props) {
    super(props);
    this.state = this.getInitialState();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.markAnswer = this.markAnswer.bind(this);
    this.prevHandler = this.prevHandler.bind(this);
    this.invokeAssessment = this.invokeAssessment.bind(this);
  }

  getInitialState() {
    console.log('getInitialState: called');

    return {
      "user" : "",
      "email" : "",
      "question" : undefined,
      "results" : undefined,
      "success" : false,
      "status" : undefined,
      "isNext" : false,
      "isPrev" : false,
      "isLast" : false
    };
  }

  handleChange(event) {
    console.log(event);
    if(event.target.name === "user") {
      this.setState({user: event.target.value, email: this.state.email});
    } else if(event.target.name === "email") {
      this.setState({user: this.state.user, email: event.target.value});
    }
  }

  markAnswer(event) {
    console.log("markAnswer: Received");
    console.log(event);
    console.log(event.target.value);
    event.preventDefault();
    if(this.state.question !== undefined) {
      this.invokeAssessment(event.target.value);
    } 
  }

  prevHandler(event) {
    console.log("markAnswer: Received");
    console.log(event);
    console.log(event.target.value);
    event.preventDefault();
    if(this.state.question !== undefined) {
      this.invokeAssessment(undefined, true);
    } 
  }

  handleSubmit(event) {
    console.log('Current state:');
    console.log(this.state);

    event.preventDefault();

    this.invokeAssessment(undefined);
  }

  invokeAssessment(ans, prev) {
    if(this.state.user === "" || this.state.email === "") {
      return;
    }

    var assessmentUrl = 'http://localhost:5000/assessment';
    assessmentUrl += ("?user=") + this.state.user;
    assessmentUrl += ("&email=") + this.state.email;

    if(this.state.question !== undefined) {
      assessmentUrl += ("&qid=") + this.state.question.id;
      if(ans !== undefined) {
        assessmentUrl += ("&ans=") + ans;
      }
    }

    if(prev !== undefined) {
      assessmentUrl += ("&prev=1");
    }

    console.log('invokeAssessment: Url: %s', assessmentUrl);

    // Call Assessement API
    fetch(assessmentUrl)
    .then(result=>result.json())
    .then(items=>{
          console.log("invokeAssessment: Received response");
          console.log(items);
          this.setState(items);
      }
    );
  }

  render() {

    const wellStyles = {maxWidth: 800, maxHeight:600, margin: '0 auto 10px'};

    console.log('render: called');
    console.log(this.state);

    let details;
    let submit = <br/>

    if(this.state.user === "" || this.state.email === "" || this.state.question === undefined) {
      details = <UserDetails user={this.state.user} email={this.state.email} onChangeHandler={this.handleChange}></UserDetails>
      submit = <input type="submit" value="Submit" />;
    } else if(this.state.results === undefined && !this.state.isLast){
      details = <Question question={this.state.question} 
                          prev={this.state.isPrev} 
                          status={this.state.status}
                          clickHandler={this.markAnswer} 
                          prevHandler={this.prevHandler}></Question>
    } else {
      details = <Results summary={this.state.results} 
                         prev={this.state.isPrev}  
                         status={this.state.status}
                         prevHandler={this.prevHandler}></Results>
    }

    return (
      <div>
        <Header user={this.state.user}></Header>
        <div className="well" style={wellStyles}>
          <form onSubmit={this.handleSubmit}>
            {details}
            <br/>
            {submit}
          </form>
        </div>
      </div>
    );
  }
}

export default AssessmentContainer;