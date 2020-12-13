import React, { Fragment } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { connect } from 'react-redux';
import ChangePassword from '../../features/ChangePassword'

function Wrapper({ isAuthenticated, locationUser, isShowDetailChildren }) {

    const { path } = useRouteMatch()

    return (
        <Fragment>
            <Switch>
                <Route exact path={path} component={ChangePassword} />
            </Switch>
        </Fragment>
    )
}

Wrapper.propTypes = {

}

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated,
    locationUser : state.auth.locationUser,
    isShowDetailChildren : state.status.isShowDetailChildren,
})

export default connect(mapStateToProps, null)(Wrapper)

