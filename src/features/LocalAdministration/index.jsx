import React from 'react'
import './localAdministration.scss';
import ListIcon from '@material-ui/icons/List';
import PropTypes from 'prop-types'
import { CssBaseline, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchWardRequest } from '../../actions/commonAction';
import { addLocalRequest, updateLocalRequest, deleteLocalRequest, mergeLocalRequest } from '../../actions/manageLocal';
// import Table from '../userAdministration/components/Table';
import Table from '../LocalAdministration/components/Table';
import { clearErrors } from '../../actions/errorAction';
import Snackbars from '../../components/Snackbars';

const MESSAGE_ERROR_403 = "Thôn này đang được sử dụng. Bạn dùng chức năng gộp trước khi xóa";

function LocalAdministration({
    locationUser, quanhuyenList, phuongxaList, clearErrors,
    fetchWardRequest, listLocal, addLocalRequest, msg, code,
    updateLocalRequest, deleteLocalRequest, mergeLocalRequest,
}) {

    const [snackbars, setSnackbars] = React.useState(false);
    const onHandleSnackbars = () => {
        clearErrors();
        setSnackbars(false);
    }
    React.useEffect(() => {
        if(msg==="Thêm thôn thành công" && code===200){
            setSnackbars(true);
        }else if(msg==="Xóa thôn thành công" && code===200){
            setSnackbars(true);
        }else if(msg === "Gộp Thôn Thành Công" && code===200){
            setSnackbars(true);
        }else if(msg===MESSAGE_ERROR_403 && code===403){
            setSnackbars(true);
        }
    }, [msg, code])

    const onChoose = (id, step) => {
        if(step===2){
            fetchWardRequest(id)
        }
    }

    const onSubmitForm = (values) => {
        if(!values.id_thon){
            addLocalRequest(values)
        }else{
            updateLocalRequest(values)
        }
        setSnackbars(true);
    }

    const onDeleteLocal = (id) => {
        deleteLocalRequest(id);
        setSnackbars(true)
    }

    const onSubmitFormMergeLocal = (values, listChecked) => {
        const list = listChecked.map(({id_thon}) => {
            if(id_thon!==values.selectLocal){
                return id_thon;
            }
        }).filter(e => e)
        const dataSubmit = {
            id: values.selectLocal,
            dsthon: list
        }
        mergeLocalRequest(dataSubmit);
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
                        onSubmitForm={onSubmitForm}
                        onSubmitFormMergeLocal={onSubmitFormMergeLocal}
                        onDeleteLocal={onDeleteLocal}
                    />
                </Paper>
            </div>
            </Paper>
            <Snackbars
                open={snackbars}
                onHandleSnackbars={onHandleSnackbars}
                message={msg}
                type={code}
            />
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
    msg : state.error.msg,
    code : state.error.code,
})

export default connect(mapStateToProps, { 
    fetchWardRequest, 
    addLocalRequest,
    updateLocalRequest,
    deleteLocalRequest,
    mergeLocalRequest,
    clearErrors
})(LocalAdministration)

