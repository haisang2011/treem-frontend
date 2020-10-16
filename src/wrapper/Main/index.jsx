import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import ManageChildren from '../../features/ManageChildren'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import { connect } from 'react-redux';

function Main({ isAuthenticated }) {

    const { path } = useRouteMatch()

    return (
        <Fragment>
            <Header />
            <Navbar />

            <Switch>
                <Route exact path={path} component={ManageChildren} />
            </Switch>
        </Fragment>
    )
}

Main.propTypes = {

}

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated,
})

export default connect(mapStateToProps, null)(Main)

