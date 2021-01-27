import React, { Fragment } from 'react'
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom'
import { connect } from 'react-redux';
import ChangePassword from '../../features/ChangePassword'
import { downloadFileDocHDSDRequest } from '../../actions/manageChildrenAction';

function Wrapper({ isAuthenticated, locationUser, isShowDetailChildren }) {

    const { path } = useRouteMatch()
    const history = useHistory();

    React.useEffect(()=>{
     downloadFileDocHDSDRequest();  
     history.goBack(); 
    })

    return (
        <Fragment>
            {/* <Route exact path={path} component={ChangePassword} /> */}
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

