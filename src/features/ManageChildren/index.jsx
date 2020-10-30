import React from 'react'
import Table from './components/Table';
import PropTypes from 'prop-types'
import './ManageChildren.scss';
import { CssBaseline, Paper } from '@material-ui/core';
import SearchForm from './components/SearchForm';
import { connect } from 'react-redux';
import { fetchWardRequest, fetchVillageRequest } from '../../actions/commonAction';
import { fetchDataRequest } from '../../actions/manageChildrenAction';

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
    totalChildrenList, fetchDataRequest,
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
            thungrac : value.thungrac ? value.thungrac : '',
            dantoc : value.dantoc ? value.dantoc : '',
            gioitinh : value.gioitinh ? value.gioitinh : '',
            search : null,
        })

        // fetchDataRequest(values);
    }

    const onHandleButtonPagination = (pageNumber) => {

        setValues({
            ...values,
            search : pageNumber+1,
        })

        // const params = {
        //     search : pageNumber + 1,
        // }

        // fetchDataRequest(values)
    }

    console.log("Children List : ", childrenList);

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
                    />
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
    childrenList : state.manageChildren.childrenList,
    totalChildrenList : state.manageChildren.totalChildrenList,
})

export default connect(mapStateToProps, { fetchWardRequest, fetchVillageRequest, fetchDataRequest })(ManageChildren)

