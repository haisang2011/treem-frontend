import React from 'react'
import './userAdministration.scss';
import PersonIcon from '@material-ui/icons/Person';
import PropTypes from 'prop-types'
import { CssBaseline, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchWardRequest } from '../../actions/commonAction';
import SearchForm from '../userAdministration/components/SearchForm';
import Table from '../userAdministration/components/Table';

function UserAdministration({
    locationUser, quanhuyenList, phuongxaList,
    fetchWardRequest, listAccount,
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
        <div className="userAdministration">
            <Paper>
            <CssBaseline />
            <div className="userAdministration__searchForm">
                <SearchForm
                    onSubmitForm={onSubmitForm}
                    locationUser={locationUser}
                    quanhuyenList={quanhuyenList}
                    phuongxaList={phuongxaList}
                    onChoose={onChoose}
                />
            </div>
            <div className="userAdministration__title">
                <div>
                    <PersonIcon className="userAdministration__title--icon" />
                    <span>Người dùng</span>
                </div>
            </div>
            <div className="userAdministration__dataTable">
                <Paper>
                    <Table
                        listAccount={listAccount}
                    />
                </Paper>
            </div>
            </Paper>
        </div>
    )
}

UserAdministration.propTypes = {

}

const mapStateToProps = state => ({
    locationUser : state.auth.locationUser,
    phuongxaList : state.common.phuongxaList,
    quanhuyenList : state.common.quanhuyenList,
    listAccount : state.manageAccount.listAccount,
})

export default connect(mapStateToProps, { fetchWardRequest })(UserAdministration)

