import React from "react";
import { BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import Router from "Router";
import * as actions from "store/actions/auth";
import Layout from "Layout";

class App extends React.Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <BrowserRouter>
        <Layout {...this.props}>
          <Router />
        </Layout>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default connect(null, mapDispatchToProps)(App);