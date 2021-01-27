import React, { Fragment } from 'react';
import ChangePasswordForm from './components/ChangePasswordForm';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { resetPassword } from '../../contants/images'
import { changePasswordRequest } from '../../actions/authAction';
import { useEffect } from 'react';
import './style.scss';
import { clearErrors } from '../../actions/errorAction';
import { Redirect, useHistory } from 'react-router-dom';

function ChangePassword({ auth, changePasswordRequest, isAuthenticated, code, msg }) {

    const dispatch = useDispatch();

    useEffect(() => {
        if(code === 200 && msg === 'Change password success'){
            dispatch(clearErrors());
            history.push('/');
        }
    }, [msg, code])

    const history = useHistory();

    const initialValues = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    }

    const onSubmitForm = (values) => {
        changePasswordRequest(values);
    }

    return (
        <Fragment>
        {/* {(isAuthenticated && <Redirect from='/sign-in' to='/change-password' />)} */}
        <div className="changePassword">

            <img 
                src={resetPassword} 
                alt="Background Children Page Sign-In"
                className="changePassword__background" 
            />

            <div className="changePassword__loginForm">
                <ChangePasswordForm   
                    initialValues={initialValues}
                    onSubmitForm={onSubmitForm}
                    code={code}
                    msg={msg}
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
    code: state.error.code,
    msg: state.error.msg,
})

export default connect(mapStateToProps, { changePasswordRequest })(ChangePassword)

