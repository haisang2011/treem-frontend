import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './assets/css/style.scss';
import NotFound from './components/NotFound';
import SignIn from './features/SignIn';
import Main from './wrapper/Main';
import { connect } from 'react-redux'
import PrivateRoute from './wrapper/PrivateRoute';
import PublicRoute from './wrapper/PublicRoute';
import ManageSpecialCircumstances from './features/ManageSpecialCircumstances';

function App({ isAuthenticated, isLoading }) {

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

        <PrivateRoute
          exact
          component={Main}
          path='/hoancanhdacbiet'
          isLoading={isLoading}
          isAuthenticated={isAuthenticated}
        />

        <PrivateRoute
          exact
          component={Main}
          path='/nguycohoancanhdacbiet'
          isLoading={isLoading}
          isAuthenticated={isAuthenticated}
        />

        <PrivateRoute
          exact
          component={Main}
          path='/hoancanhkhac'
          isLoading={isLoading}
          isAuthenticated={isAuthenticated}
        />

        <PrivateRoute
          exact
          component={Main}
          path='/hinhthuctrogiup'
          isLoading={isLoading}
          isAuthenticated={isAuthenticated}
        />

        <PrivateRoute
          exact
          component={Main}
          path='/quantringuoidung'
          isLoading={isLoading}
          isAuthenticated={isAuthenticated}
        />

        <PrivateRoute
          exact
          component={Main}
          path='/quantridiaphuong'
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

        {/* <Route exact path='/hoancanhdacbiet' component={ManageSpecialCircumstances} /> */}
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
