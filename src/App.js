import React, { useEffect, useMemo } from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import { loadUser } from './actions/authAction';
import './assets/css/style.scss';
import NotFound from './components/NotFound';
import SignIn from './features/SignIn';
import Main from './wrapper/Main';
import { connect } from 'react-redux'
import PrivateRoute from './wrapper/PrivateRoute';
import PublicRoute from './wrapper/PublicRoute';

function App({ isAuthenticated, isLoading }) {

  // useEffect(() => {
  //   loadUser()
  // }, [])

  return (
    <BrowserRouter>

      <Switch>

        <PrivateRoute
          exact
          component={Main}
          path='/quanlytreem'
          isLoading={isLoading}
          isAuthenticated={isAuthenticated}
        />

        <PublicRoute
          exact
          component={SignIn}
          path='/'
          isLoading={isLoading}
          isAuthenticated={isAuthenticated}
        />

        {/* <Route exact path='/' component={SignIn} /> */}
        {/* <Route path='/quanlytreem' component={Main} /> */}
        <Route component={NotFound} />

      </Switch>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated : state.auth.isAuthenticated,
  isLoading : state.auth.isLoading
})

export default connect(mapStateToProps, null)(App);
