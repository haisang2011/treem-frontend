import React from 'react'
import './DataMiningListChildrenNormal.scss';
import PropTypes from 'prop-types'
import { CssBaseline, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchWardRequest, fetchVillageRequest } from '../../actions/commonAction';
import { downloadFileExcelDataChildrenNormalRequest } from '../../actions/dataMiningAction';
import SearchForm from '../DataMiningListChildrenNormal/components/SearchForm';
import Snackbars from '../../components/Snackbars';

function DataMiningListChildrenNormal({
    locationUser, quanhuyenList, thonList, phuongxaList,
    fetchWardRequest, fetchVillageRequest, downloadFileExcelDataChildrenNormalRequest,
}) {

    const [snackbars, setSnackbars] = React.useState(false);
    const onHandleSnackbars = () => {
        setSnackbars(false);
    }

    const onSubmitForm = (value) => {

        const dataSubmit = {
            thanhpho: value.tinhthanhpho ? value.tinhthanhpho : '',
            huyen: value.quanhuyen ? value.quanhuyen : '',
            xa: value.phuongxa ? value.phuongxa : '',
            thon : value.thon ? value.thon : '',
            dotuoitu : value.dotuoitu ? value.dotuoitu : '',
            dotuoiden : value.dotuoiden ? value.dotuoiden : '',
        }

        if(!dataSubmit.huyen){
            setSnackbars(true);
        }else{
            downloadFileExcelDataChildrenNormalRequest(dataSubmit);
        }

        // if(statusSubmit===1){
        //     setValues({
        //         thanhpho: value.tinhthanhpho ? value.tinhthanhpho : '',
        //         huyen: value.quanhuyen ? value.quanhuyen : '',
        //         xa: value.phuongxa ? value.phuongxa : '',
        //         thon : value.thon ? value.thon : '',
        //         hoancanh : value.chitieu ? value.chitieu : '',
        //         tentreem : value.hoten ? value.hoten : '',
        //         magiadinh : value.id_giadinh ? value.id_giadinh : '',
        //         timestart : value.ngaybatdau ? value.ngaybatdau : '',
        //         timefinish : value.ngayketthuc ? value.ngayketthuc : '',
        //         page : null,
        //     })
        // }else if(statusSubmit===2){
        //     downloadFileExcelDataHTTGRequest(dataSubmit)
        // }else{
        //     /* TODO SOMETHING */
        // }
    }

    const onChoose = (id, step) => {
        if(step===1){
            fetchVillageRequest(id)
        }else if(step === 2){
            fetchWardRequest(id)
        }
    }

    return (
        <div className="dataMiningListChildrenNormal">
            <Paper>
            <CssBaseline />
            <div className="dataMiningListChildrenNormal__searchForm">
                <SearchForm
                    onSubmitForm={onSubmitForm}
                    locationUser={locationUser}
                    quanhuyenList={quanhuyenList}
                    phuongxaList={phuongxaList}
                    thonList={thonList}
                    onChoose={onChoose}
                />
            </div>
            <div className="dataMiningListChildrenNormal__dataTable">
                <Paper className="dataMiningListChildrenNormal__dataTable--paper"></Paper>
            </div>
            </Paper>
            <Snackbars
                open={snackbars}
                onHandleSnackbars={onHandleSnackbars}
                message="Phải chọn Quận/Huyện để xuất dữ liệu"
                type={1010}
            />
        </div>
    )
}

DataMiningListChildrenNormal.propTypes = {

}

const mapStateToProps = state => ({
    locationUser : state.auth.locationUser,
    phuongxaList : state.common.phuongxaList,
    quanhuyenList : state.common.quanhuyenList,
    thonList : state.common.thonList,
})

export default connect(mapStateToProps, { fetchWardRequest, fetchVillageRequest, downloadFileExcelDataChildrenNormalRequest })(DataMiningListChildrenNormal)

