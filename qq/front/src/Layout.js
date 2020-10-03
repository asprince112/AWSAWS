import React from 'react';
import Header from 'components/Header';
import { connect } from 'react-redux';

class Layout extends React.Component {
    
    render() {
        return(
            <div className="main">
                <Header {...this.state} />
                {this.props.children}
            </div>
        )
    }
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

export default connect(mapStateToProps)(Layout);