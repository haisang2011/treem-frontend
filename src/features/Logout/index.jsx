import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../../actions/authAction';

function Logout({ logout, isAuthenticated }) {

    React.useEffect(() => {
        logout();
    }, []);

    return (
        <Fragment>
            {!isAuthenticated ? <Redirect to="/" push={true} /> : null}
        </Fragment>
    )
}

Logout.propTypes = {

}

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { logout })(Logout)

