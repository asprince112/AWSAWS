import React from "react";

class UserProfile extends React.Component {

	state = {
		username: this.props.user.username,
		nickname: this.props.user.nickname,
		email: this.props.user.email,
		usertype: this.props.user.usertype
	}

	render() {

		const logout = () => {
			this.props.logout();
			this.props.close("You have logged out");
		}

		return (
			<div className="user-profile">
				<p className="title has-text-centered">Profile</p>
				<fieldset disabled className="has-text-left">
					<div className="field">
						<div className="control">
							<label className="label">Username</label>
							<input  type="text" className="input" defaultValue={this.state.username} />
						</div>
					</div>
					<div className="field">
						<div className="control">
							<label className="label">Nickname</label>
							<input type="text" className="input" defaultValue={this.state.nickname} />
						</div>
					</div>
					<div className="field">
						<div className="control">
							<label className="label">Email</label>
							<input type="text" className="input" defaultValue={this.state.email} />
						</div>
					</div>
					<div className="field">
						<div className="control">
							<label className="label">Type</label>
							<input type="text" className="input" defaultValue={this.state.usertype} />
						</div>
					</div>
				</fieldset>
				<br/>
				<div className="field is-grouped is-grouped-centered">
					<div className="control">
						<button className="button is-danger" type="button" onClick={logout}>Logout</button>
					</div>
					<div className="control">
						<button className="button" type="button" onClick={() => {this.props.close()}}>Cancel</button>
					</div>
				</div>
			</div>
		)
	}
}

export default (UserProfile);