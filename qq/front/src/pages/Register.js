import React from "react";
import { connect } from "react-redux";
import { authSignup } from "store/actions/auth";
import { Redirect } from "react-router-dom";


class Register extends React.Component {
  
  state = {
    username: "",
    nickname: "",
    email: "",
    password1: "",
    password2: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, nickname, email, password1, password2 } = this.state;
    this.props.signup(username, nickname, email, password1, password2);
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { username, nickname, email, password1, password2 } = this.state;
    const { error, token } = this.props;
    if (token) {
      return <Redirect to="/" />;
    }

    return (
      <div className="login-wrapper">
        {error && <p>{this.props.error.message}</p>}
        <form className="box login-box" onSubmit={this.handleSubmit}>					
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input 
                className= "input"
                type="text"
                placeholder="Username"
                name="username"
                onChange={this.handleChange}
                value={username}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Nickname</label>
            <div className="control">
              <input 
                className= "input"
                type="text"
                placeholder="Nickname"
                name="nickname"
                onChange={this.handleChange}
                value={nickname}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input 
                className= "input"
                type="text"
                placeholder="Email"
                name="email"
                onChange={this.handleChange}
                value={email}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                className= "input"
                type="password"
                placeholder="Password"
                name="password1"
                onChange={this.handleChange}
                value={password1}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Confirm Password</label>
            <div className="control">
              <input
                className= "input"
                type="password"
                placeholder="Confirm Password"
                name="password2"
                onChange={this.handleChange}
                value={password2}
              />
            </div>
          </div>
          <div className="control">
            <button className="button is-fullwidth is-primary">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signup: (username, nickname, email, password1, password2) =>
      dispatch(authSignup(username, nickname, email, password1, password2))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
