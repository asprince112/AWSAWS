import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Panel from 'components/Panel';
import UserProfile from 'components/UserProfile';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { logout, getUserInfo } from "store/actions/auth";

class Header extends React.Component {

	toProfile = async() => {
		const res = await getUserInfo()
		Panel.open({
			component: UserProfile,
			props: {
				user: res.data,
				logout: () => {this.props.logout()},
			},
			callback: (data) => {
				toast.info(data);
			}
		})
	}

  render() {
		return (
			<div className="header">
				<div className="grid">
					<div className="start">
						<Link to="/">Home</Link>
					</div>
					<div className="end">
						{this.props.isAuthenticated ? (
							<span className="nickname" onClick={this.toProfile}><i className="far fa-user"></i> Profile</span>
							) : (
							<Fragment>
								<Link to="/login">Login</Link>
								<Link to="/register">Register</Link>
							</Fragment>
							)
						}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		logout: () => dispatch(logout()),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));