import React from 'react'
import Table from './components/Table';
import PropTypes from 'prop-types'
import './ManageChildren.scss';
import { CssBaseline, Paper } from '@material-ui/core';
import SearchForm from './components/SearchForm';
import { connect } from 'react-redux';
import authReducer from '../../reducers/authReducer';

function ManageChildren({ locationUser, quanhuyenList, thonList, phuongxaList }) {

    return (
        <div className="manageChildren">
            <Paper>
            <CssBaseline />
            <div className="manageChildren__searchForm">
                <SearchForm
                    locationUser={locationUser}
                    quanhuyenList={quanhuyenList}
                    phuongxaList={phuongxaList}
                    thonList={thonList}
                />
            </div>
            <div className="manageChildren__dataTable">
                <Paper>
                    <Table />
                </Paper>
            </div>
            </Paper>
        </div>
    )
}

ManageChildren.propTypes = {

}

const mapStateToProps = state => ({
    locationUser : state.auth.locationUser,
    phuongxaList : state.common.phuongxaList,
    quanhuyenList : state.common.quanhuyenList,
    thonList : state.common.thonList,
})

export default connect(mapStateToProps, null)(ManageChildren)

