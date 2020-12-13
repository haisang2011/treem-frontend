import React, { Fragment } from 'react';
import './Signin.scss';
import { backgroundLogin } from '../../contants/images'
import LoginForm from './components/LoginForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/authAction';
import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Snackbars from '../../components/Snackbars';
import { clearErrors } from '../../actions/errorAction';

function SignIn({ auth, login, isAuthenticated, msg, code, clearErrors }) {

    const initialValues = {
        username: '',
        password: ''
    }

    const onSubmitForm = values => {
        login(values);
    }

    const [snackbars, setSnackbars] = React.useState(false);
    React.useEffect(() => {
        if(msg==="User not exsist" && code===401){
            setSnackbars(true);
        }else if(msg==="Password Invalid" && code===401){
            setSnackbars(true);
        }else{}
    }, [msg, code])
    const onHandleSnackbars = () => {
        clearErrors();
        setSnackbars(false);
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
                    // message={msg}
                    // code={code}
                />
            </div>

            <Snackbars
                open={snackbars}
                onHandleSnackbars={onHandleSnackbars}
                message={msg}
                type={code}
            />

        </div>
        </Fragment>
    )
}

SignIn.propTypes = {

}

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated,
    msg: state.error.msg,
    code: state.error.code
})

export default connect(mapStateToProps, { login, clearErrors })(SignIn)

