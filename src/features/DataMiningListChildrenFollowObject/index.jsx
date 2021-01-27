import React from 'react'
import './DataMiningListChildrenFollowObject.scss';
import PropTypes from 'prop-types'
import { CssBaseline, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchWardRequest, fetchVillageRequest } from '../../actions/commonAction';
import { fetchDataFormOfHelpRequest, downloadFileExcelDataHTTGRequest } from '../../actions/manageChildrenAction';
import { downloadFileExcelDataChildrenObjectRequest } from '../../actions/dataMiningAction';
import SearchForm from '../DataMiningListChildrenFollowObject/components/SearchForm';
import Snackbars from '../../components/Snackbars';


function DataMiningListChildrenFollowObject({
    locationUser, quanhuyenList, thonList, phuongxaList, listHTTG, listHCK, 
    listNCHCDB, listHCDB, fetchWardRequest, fetchVillageRequest,
    downloadFileExcelDataChildrenObjectRequest,
    
}) {

    // const {
    //     id_tinh, id_quan, id_xa,
    //     thanhpho, quanhuyen, phuongxa
    // } = locationUser

    const [snackbars, setSnackbars] = React.useState(false);
    const [statusMessage, setStatusMessage] = React.useState(0);
    const onHandleSnackbars = () => {
        setSnackbars(false);
        setStatusMessage(0);
    }

    const onSubmitForm = (value) => {
 
        const dataSubmit = {
            thanhpho: value.tinhthanhpho ? value.tinhthanhpho : '',
            huyen: value.quanhuyen ? value.quanhuyen : '',
            xa: value.phuongxa ? value.phuongxa : '',
            thon : value.thon ? value.thon : '',
            hoancanh : value.hoancanh,
            dotuoitu : value.dotuoitu ? value.dotuoitu : '',
            dotuoiden : value.dotuoiden ? value.dotuoiden : '',
        }

        if(!dataSubmit.huyen){
            setSnackbars(true);
            setStatusMessage(1);
        }else if(!dataSubmit.hoancanh){
            setSnackbars(true);
            setStatusMessage(2);
        }
        else{
            downloadFileExcelDataChildrenObjectRequest(dataSubmit)
        }

    }

    const onChoose = (id, step) => {
        if(step===1){
            fetchVillageRequest(id)
        }else if(step === 2){
            fetchWardRequest(id)
        }
    }

    return (
        <div className="dataMiningListChildrenFollowObject">
            <Paper>
            <CssBaseline />
            <div className="dataMiningListChildrenFollowObject__searchForm">
                <SearchForm
                    onSubmitForm={onSubmitForm}
                    locationUser={locationUser}
                    quanhuyenList={quanhuyenList}
                    phuongxaList={phuongxaList}
                    listHCDB={listHCDB}
                    listNCHCDB={listNCHCDB}
                    listHCK={listHCK}
                    listHTTG={listHTTG}
                    thonList={thonList}
                    onChoose={onChoose}
                />
            </div>
            <div className="dataMiningListChildrenFollowObject__dataTable">
                <Paper className="dataMiningListChildrenFollowObject__dataTable--paper"></Paper>
            </div>
            </Paper>
            <Snackbars
                open={snackbars}
                onHandleSnackbars={onHandleSnackbars}
                message={statusMessage===1 ? "Phải chọn Quận/Huyện để xuất dữ liệu"
                        : (statusMessage===2 ? "Phải chọn chỉ tiêu để xuất dữ liệu" : null)
                }
                type={1010}
            />
        </div>
    )
}

DataMiningListChildrenFollowObject.propTypes = {

}

const mapStateToProps = state => ({
    locationUser : state.auth.locationUser,
    phuongxaList : state.common.phuongxaList,
    quanhuyenList : state.common.quanhuyenList,
    thonList : state.common.thonList,
    listHTTG : state.common.listHTTG,
    listHCK : state.common.listHCK,
    listNCHCDB : state.common.listNCHCDB,
    listHCDB : state.common.listHCDB,
})

export default connect(mapStateToProps, { fetchWardRequest, fetchVillageRequest, downloadFileExcelDataChildrenObjectRequest })(DataMiningListChildrenFollowObject)

