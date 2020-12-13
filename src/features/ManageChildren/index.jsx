import React from 'react'
import Table from './components/Table';
import PropTypes from 'prop-types'
import DetailChildren from '../DetailChildren';
import './ManageChildren.scss';
import { CssBaseline, Paper } from '@material-ui/core';
import SearchForm from './components/SearchForm';
import { connect } from 'react-redux';
import { fetchWardRequest, fetchVillageRequest } from '../../actions/commonAction';
import { 
    fetchDataRequest, 
    fetchDataDetailChildren, 
    fetchDataDetailChildrenFollowFamily,
    deleteChildrenIntoTrash,
    deleteChildrenMultiIntoTrash,
} from '../../actions/manageChildrenAction';
import Snackbars from '../../components/Snackbars';
import Excel from '../../components/Excel';
import { clearErrors } from '../../actions/errorAction';

const tokenConfig = (getState) => {

    /* Get token from Localstorage */
    const token = getState;
  
    const config = {
        headers : {
            'Content-type': 'application/json'
        }
    }
  
    /* If token, add to headers */
    if(token){
        config.headers['access-token'] = token;
    }
  
    return config
  
  }

function ManageChildren({ 
    locationUser, quanhuyenList, thonList, phuongxaList,
    fetchWardRequest, fetchVillageRequest, childrenList,
    totalChildrenList, fetchDataRequest, fetchDataDetailChildren,
    fetchDataDetailChildrenFollowFamily, msg, code, clearErrors,
    deleteChildrenIntoTrash, deleteChildrenMultiIntoTrash,
}) {

    const [values, setValues] = React.useState({
        tinhthanhpho: '',
        quanhuyen: '',
        phuongxa: '',
        thon : '',
        hoten: '',
        nguoinuoi: '',
        id_giadinh: '',
        thungrac: '',
        dantoc: '',
        gioitinh: '',
        search: null,
    })
    console.log({values})
    const onChoose = (id, step) => {
        if(step===1){
            fetchVillageRequest(id)
        }else if(step === 2){
            fetchWardRequest(id)
        }
    }

    React.useEffect(() => {
        fetchDataRequest(values)
    }, [values])

    const onSubmitForm = (value) => {
        setValues({
            tinhthanhpho: value.tinhthanhpho ? value.tinhthanhpho : '',
            quanhuyen: value.quanhuyen ? value.quanhuyen : '',
            phuongxa: value.quanhuyen ? value.quanhuyen : '',
            thon : value.thon ? value.thon : '',
            hoten : value.hoten ? value.hoten : '',
            nguoinuoi : value.nguoinuoi ? value.nguoinuoi : '',
            id_giadinh : value.id_giadinh ? value.id_giadinh : '',
            thungrac : value.thungrac ? (value.thungrac==='Sử dụng' ? 1 : 2) : '',
            dantoc : value.dantoc ? value.dantoc : '',
            gioitinh : value.gioitinh ? value.gioitinh : '',
            search : null,
        })
    }

    const [snackbars, setSnackbars] = React.useState(false);
    React.useEffect(() => {
        if(msg==="responseMessage" && code===200){
            setSnackbars(true);
        }else if(msg==="Update successful" && code===200){
            setSnackbars(true);
        }else if(msg==="Delete Children Into Trash Success" && code===200){
            setSnackbars(true);
        }else if(msg==="Delete Children Into Trash Error" && code===500){
            setSnackbars(true);
        }
    }, [msg, code])
    const onHandleSnackbars = () => {
        clearErrors();
        setSnackbars(false);
    }

    const onHandleButtonPagination = (pageNumber) => {
        setValues({
            ...values,
            search : pageNumber+1,
        })
    }

    const onHandleEdit = (id) => {
        fetchDataDetailChildren(id)
    }

    const onHandleAdd = (id) => {
        fetchDataDetailChildrenFollowFamily(id)
    }

    const onDeleteChildren = (id) => {
        if(typeof id == 'number'){
            deleteChildrenIntoTrash(id)
        }else{
            deleteChildrenMultiIntoTrash(id)
        }
    }

    return (
        <div className="manageChildren">
            <Paper>
            <CssBaseline />
            <div className="manageChildren__searchForm">
                <SearchForm
                    onSubmitForm={onSubmitForm}
                    locationUser={locationUser}
                    quanhuyenList={quanhuyenList}
                    phuongxaList={phuongxaList}
                    thonList={thonList}
                    onChoose={onChoose}
                />
            </div>
            <div className="manageChildren__dataTable">
                <Paper>
                    <Table
                        childrenList={childrenList}
                        totalChildrenList={totalChildrenList}
                        onHandlePagination={onHandleButtonPagination}
                        onHandleEdit={onHandleEdit}
                        onHandleAdd={onHandleAdd}
                        onDeleteChildren={onDeleteChildren}
                    />
                </Paper>
            </div>
            </Paper>
            <Snackbars
                open={snackbars}
                onHandleSnackbars={onHandleSnackbars}
                message={msg}
            />
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
    childrenList : state.manageChildren.childrenList,
    totalChildrenList : state.manageChildren.totalChildrenList,
    msg: state.error.msg,
    code: state.error.code,
})

export default connect(mapStateToProps,
{   fetchWardRequest, 
    fetchVillageRequest, 
    fetchDataRequest, 
    fetchDataDetailChildren,
    fetchDataDetailChildrenFollowFamily,
    clearErrors,
    deleteChildrenIntoTrash,
    deleteChildrenMultiIntoTrash,
})(ManageChildren)

