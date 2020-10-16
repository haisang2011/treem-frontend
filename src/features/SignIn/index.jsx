import React, { Fragment } from 'react';
import './Signin.scss';
import { backgroundLogin } from '../../contants/images'
import LoginForm from './components/LoginForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/authAction';
import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

function SignIn({ auth, login, isAuthenticated }) {

    useEffect(() => {
        
    }, [])

    const initialValues = {
        username: '',
        password: ''
    }

    const onSubmitForm = values => {
        login(values);
    }

    return (
        <Fragment>
        {(isAuthenticated && <Redirect from='/sign-in' to='/quanlytreem' />)}
        <div className="signIn">
            
            <img 
                src={backgroundLogin} 
                alt="Background Children Page Sign-In"
                className="signIn__background" 
            />

            <div className="signIn__loginForm">
                <LoginForm   
                    initialValues={initialValues}
                    onSubmitForm={onSubmitForm}
                />
            </div>

        </div>
        </Fragment>
    )
}

SignIn.propTypes = {

}

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, { login })(SignIn)

