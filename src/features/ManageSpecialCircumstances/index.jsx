import React from 'react'
import './ManageSpecialCircumstances.scss';
import PropTypes from 'prop-types'
import { CssBaseline, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchWardRequest, fetchVillageRequest } from '../../actions/commonAction';
import { fetchDataSpecialCircumstancesRequest, downloadFileExcelDataHCDBRequest } from '../../actions/manageChildrenAction';
import SearchForm from '../ManageSpecialCircumstances/components/SearchForm';
import Table from '../ManageSpecialCircumstances/components/Table';
import Snackbars from '../../components/Snackbars';

function ManageSpecialCircumstances({
    locationUser, quanhuyenList, thonList, phuongxaList,
    fetchWardRequest, fetchVillageRequest, fetchDataSpecialCircumstancesRequest,
    listHCDB, specialCircumstances, totalSpecialCircumstances, downloadFileExcelDataHCDBRequest,
}) {

    const {
        id_tinh, id_quan, id_xa,
        thanhpho, quanhuyen, phuongxa
    } = locationUser

    const [snackbars, setSnackbars] = React.useState(false);
    const onHandleSnackbars = () => {
        setSnackbars(false);
    }

    const [values, setValues] = React.useState({
        thanhpho: id_tinh || '',
        huyen: id_quan || '',
        xa: id_xa || '',
        thon : '',
        hoancanh : '',
        tentreem: '',
        magiadinh: '',
        timestart: '',
        timefinish: '',
        page: null,
    })
console.log({values})
    React.useEffect(() => {
        fetchDataSpecialCircumstancesRequest(values)
    }, [values])

    const onChoose = (id, step) => {
        if(step===1){
            fetchVillageRequest(id)
        }else if(step === 2){
            fetchWardRequest(id)
        }
    }

    const onHandleButtonPagination = (pageNumber) => {

        setValues({
            ...values,
            page : pageNumber+1,
        })

    }

    const onSubmitForm = (value, statusSubmit) => {

        
        const dataSubmit = {
            thanhpho: value.tinhthanhpho ? value.tinhthanhpho : '',
            huyen: value.quanhuyen ? value.quanhuyen : '',
            xa: value.phuongxa ? value.phuongxa : '',
            thon : value.thon ? value.thon : '',
            hoancanh : value.chitieu ? value.chitieu : '',
            tentreem : value.hoten ? value.hoten : '',
            magiadinh : value.id_giadinh ? value.id_giadinh : '',
            timestart : value.ngaybatdau ? value.ngaybatdau : '',
            timefinish : value.ngayketthuc ? value.ngayketthuc : '',
            page : null,
        }

        if(statusSubmit===1){
            setValues({
                thanhpho: value.tinhthanhpho ? value.tinhthanhpho : '',
                huyen: value.quanhuyen ? value.quanhuyen : '',
                xa: value.phuongxa ? value.phuongxa : '',
                thon : value.thon ? value.thon : '',
                hoancanh : value.chitieu ? value.chitieu : '',
                tentreem : value.hoten ? value.hoten : '',
                magiadinh : value.id_giadinh ? value.id_giadinh : '',
                timestart : value.ngaybatdau ? value.ngaybatdau : '',
                timefinish : value.ngayketthuc ? value.ngayketthuc : '',
                page : null,
            })
        }else if(statusSubmit===2){
            if(!dataSubmit.huyen){
                setSnackbars(true);
            }else{
                downloadFileExcelDataHCDBRequest(dataSubmit)
            }
        }else{
            /* TODO SOMETHING */
        }

    }
    
    return (
        <div className="manageSpecialCircumstances">
            <Snackbars
                open={snackbars}
                onHandleSnackbars={onHandleSnackbars}
                message="Phải chọn Quận/Huyện để xuất dữ liệu"
                type={1010}
            />
            <Paper>
            <CssBaseline />
            <div className="manageSpecialCircumstances__searchForm">
                <SearchForm
                    onSubmitForm={onSubmitForm}
                    locationUser={locationUser}
                    quanhuyenList={quanhuyenList}
                    phuongxaList={phuongxaList}
                    thonList={thonList}
                    listHCDB={listHCDB}
                    onChoose={onChoose}
                />
            </div>
            <div className="manageSpecialCircumstances__dataTable">
                <Paper>
                    <Table
                        specialCircumstances={specialCircumstances}
                        listHCDB={listHCDB}
                        totalSpecialCircumstances={totalSpecialCircumstances}
                        onHandlePagination={onHandleButtonPagination}
                    />
                </Paper>
            </div>
            </Paper>
        </div>
    )
}

ManageSpecialCircumstances.propTypes = {

}

const mapStateToProps = state => ({
    locationUser : state.auth.locationUser,
    phuongxaList : state.common.phuongxaList,
    quanhuyenList : state.common.quanhuyenList,
    thonList : state.common.thonList,
    listHCDB : state.common.listHCDB,
    specialCircumstances : state.manageChildren.specialCircumstances,
    totalSpecialCircumstances : state.manageChildren.totalSpecialCircumstances,
})

export default connect(mapStateToProps, { fetchWardRequest, fetchVillageRequest, fetchDataSpecialCircumstancesRequest, downloadFileExcelDataHCDBRequest })(ManageSpecialCircumstances)

