import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";


class ToolBox extends React.Component {
  
  state = {
    searchText: '',
    isLogout: true
  }

  handleChange = e => {
    const value = e.target.value;
    this.setState({
      searchText: value
    });
    this.props.search(value);
  }

  searchClear = () => {
    this.setState({
      searchText: ''
    });
    this.props.search('');
  }

  goCart = () => {
    if (!this.props.isAuthenticated) {
      this.props.history.push('/login');
      toast.info('Please Login First');
      return;
    }
    this.props.history.push('/cart')
  }

  render() {

    return (
      <div className="tool-box">
        <div className="logo-text">Shop</div>
        <div className="search-box">
          <div className="field has-addons">
            <div className="control">
              <input type="text" className="input search-input" placeholder="Search Product" value={this.state.searchText} onChange={this.handleChange} />
            </div>
            <div className="control">
              <button className="button" onClick={this.searchClear}>X</button>
            </div>
          </div>
        </div>
        <div to="/cart" className="cart-box" onClick={this.goCart}>
          <i className="fas fa-shopping-cart"></i>
          <span className="cart-num">({this.props.cartNum})</span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

export default withRouter(connect(mapStateToProps)(ToolBox));