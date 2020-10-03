import React from "react";
import { authLogin } from "store/actions/auth";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getCookie } from "commons/getcookie";

class Login extends React.Component {
  
  state = {
    username: "",
    password: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.login(username, password);
  }
  
  render() {
    const { error, token } = this.props;
    const { username, password } = this.state;
    if (token) {
      return <Redirect to="/" />;
    }
    
    return (
      <div className="login-wrapper">
        <form className="box login-box" onSubmit={this.onSubmit}>
        {error && <p>{this.props.error.message}</p>}				
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
            <label className="label">Password</label>
            <div className="control">
              <input
                className= "input"
                type="password"
                placeholder="Password"
                name="password"
                onChange={this.handleChange}
                value={password}
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
    login: (username, password) => dispatch(authLogin(username, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
