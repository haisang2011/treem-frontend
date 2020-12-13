import React, { Fragment } from 'react';
import ChangePasswordForm from './components/ChangePasswordForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changePasswordRequest } from '../../actions/authAction';
import { useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

function ChangePassword({ auth, changePasswordRequest, isAuthenticated }) {

    // useEffect(() => {
        
    // }, [])

    const history = useHistory();

    const initialValues = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    }

    const onSubmitForm = async (values) => {
        try {
            await changePasswordRequest(values);
            history.push('/');
        } catch (error) {
            
        }
    }

    return (
        <Fragment>
        {/* {(isAuthenticated && <Redirect from='/sign-in' to='/change-password' />)} */}
        <div className="changePassword">
            <div className="signIn__loginForm">
                <ChangePasswordForm   
                    initialValues={initialValues}
                    onSubmitForm={onSubmitForm}
                />
            </div>

        </div>
        </Fragment>
    )
}

ChangePassword.propTypes = {

}

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, { changePasswordRequest })(ChangePassword)

