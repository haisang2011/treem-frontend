import React from 'react'
import './localAdministration.scss';
import ListIcon from '@material-ui/icons/List';
import PropTypes from 'prop-types'
import { CssBaseline, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchWardRequest } from '../../actions/commonAction';
// import Table from '../userAdministration/components/Table';
import Table from '../LocalAdministration/components/Table';

function LocalAdministration({
    locationUser, quanhuyenList, phuongxaList,
    fetchWardRequest, listLocal,
}) {

    const onChoose = (id, step) => {
        if(step===2){
            fetchWardRequest(id)
        }
    }

    const onSubmitForm = (values) => {
        console.log({values})
    }

    return (
        <div className="localAdministration">
            <Paper>
            <CssBaseline />
            <div className="localAdministration__title">
                <div>
                    <ListIcon fontSize="default" className="localAdministration__title--icon" />
                    <span>Quản trị địa phương</span>
                </div>
            </div>
            <div className="localAdministration__dataTable">
                <Paper>
                    <Table
                        listLocal={listLocal}
                    />
                </Paper>
            </div>
            </Paper>
        </div>
    )
}

LocalAdministration.propTypes = {

}

const mapStateToProps = state => ({
    locationUser : state.auth.locationUser,
    phuongxaList : state.common.phuongxaList,
    quanhuyenList : state.common.quanhuyenList,
    listLocal : state.manageLocal.listLocal,
})

export default connect(mapStateToProps, { fetchWardRequest })(LocalAdministration)

