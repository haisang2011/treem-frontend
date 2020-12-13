import React from 'react'
import './userAdministration.scss';
import PersonIcon from '@material-ui/icons/Person';
import PropTypes from 'prop-types'
import { Button, CssBaseline, IconButton, Paper, Snackbar } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchWardRequest } from '../../actions/commonAction';
import { fetchAccountSearchRequest, updateAccountRequest } from '../../actions/manageAccount';
import SearchForm from '../userAdministration/components/SearchForm';
import Table from '../userAdministration/components/Table';
import Snackbars from '../../components/Snackbars';
import { clearErrors } from '../../actions/errorAction';

function UserAdministration({
    locationUser, quanhuyenList, phuongxaList, updateAccountRequest,
    fetchWardRequest, listAccount, fetchAccountSearchRequest, msg, code, clearErrors,
}) {

    const [values, setValues] = React.useState({
        huyen: '',
        xa: '',
        tentaikhoan: '',
        tenhienthi: '',
        page: null,
    })

    React.useEffect(() => {
        fetchAccountSearchRequest(values)
    }, [values])

    const onChoose = (id, step) => {
        if(step===2){
            fetchWardRequest(id)
        }
    }

    const onSubmitForm = (value) => {
        setValues({
            huyen: value.role===1 ? '' : (value.quanhuyen ? value.quanhuyen : ''),
            xa: value.role===1 ? '' : (value.role===2 ? '' : (value.phuongxa ? value.phuongxa : '')),
            tentaikhoan: value.idnguoidung ? value.idnguoidung : '',
            tenhienthi: value.tenhienthi ? value.tenhienthi : '',
            page : null,
        })
    }

    const onSubmitFormUpdateAccount = (valuesUpdate) => {
        valuesUpdate.huyen = values.huyen;
        valuesUpdate.xa = values.xa;
        updateAccountRequest(valuesUpdate, values);
        setSnackbars(true);
    }

    
    const [snackbars, setSnackbars] = React.useState(false);
    const onHandleSnackbars = () => {
        clearErrors();
        setSnackbars(false);
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
                        onSubmitFormUpdate={onSubmitFormUpdateAccount}
                    />
                </Paper>
            </div>
            <Snackbars
                open={snackbars}
                onHandleSnackbars={onHandleSnackbars}
            />
            
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
    msg : state.error.msg,
    code : state.error.code,
})

export default connect(mapStateToProps, { fetchWardRequest, fetchAccountSearchRequest, updateAccountRequest, clearErrors })(UserAdministration)

