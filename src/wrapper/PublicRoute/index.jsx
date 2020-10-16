import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

const PublicRoute = ({component: Component, isLoading, isAuthenticated, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isLoading ? <CircularProgress />
            : (isAuthenticated ?
                <Redirect to='/quanlytreem' /> :
                <Component {...props} />
            )
        )} />
    );
};

export default PublicRoute;