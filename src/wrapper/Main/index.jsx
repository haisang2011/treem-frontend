import React, { Fragment } from 'react'
// import PropTypes from 'prop-types'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import ManageChildren from '../../features/ManageChildren'
import ManageSpecialCircumstances from '../../features/ManageSpecialCircumstances'
import ManageRiskSpecial from '../../features/ManageRiskSpecial'
import ManageOtherCircumstances from '../../features/ManageOtherCircumstances'
import ManageFormOfHelp from '../../features/ManageFormOfHelp'
import UserAdministration from '../../features/userAdministration'
import LocalAdministration from '../../features/LocalAdministration'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { connect } from 'react-redux';

function Main({ isAuthenticated }) {

    const { path } = useRouteMatch()

    return (
        <Fragment>
            <Header />
            <Navbar />

            <Switch>
                <Route exact path="/quanlytreem" component={ManageChildren} />
                <Route exact path="/hoancanhdacbiet" component={ManageSpecialCircumstances} />
                <Route exact path="/nguycohoancanhdacbiet" component={ManageRiskSpecial} />
                <Route exact path="/hoancanhkhac" component={ManageOtherCircumstances} />
                <Route exact path="/hinhthuctrogiup" component={ManageFormOfHelp} />
                <Route exact path="/quantringuoidung" component={UserAdministration} />
                <Route exact path="/quantridiaphuong" component={LocalAdministration} />
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

