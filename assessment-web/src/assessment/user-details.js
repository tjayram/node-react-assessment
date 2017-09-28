import React, { Component } from 'react';


class UserDetails extends Component {
  constructor(props) {
    super(props);
    console.log("User: %s, Email: %s", props.user, props.email)
  }

  render() {

    return (
      
        <div>
          <label>
            Name: &nbsp;
            <input name="user" type="text" value={this.props.user} onChange={this.props.onChangeHandler} />
          </label>
          <br/>
          <label>
            Email: &nbsp;
            <input name="email" type="text" value={this.props.email}  onChange={this.props.onChangeHandler} />
          </label>
        </div>
      
    );
  }
}

export default UserDetails;