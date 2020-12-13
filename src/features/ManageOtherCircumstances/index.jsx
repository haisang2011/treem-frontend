import React from 'react'
import './ManageOtherCircumstances.scss';
import PropTypes from 'prop-types'
import { CssBaseline, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchWardRequest, fetchVillageRequest } from '../../actions/commonAction';
import { fetchDataOtherCircumstancesRequest, downloadFileExcelDataHCKRequest } from '../../actions/manageChildrenAction';
import SearchForm from '../ManageOtherCircumstances/components/SearchForm';
import Table from '../ManageOtherCircumstances/components/Table';
import Snackbars from '../../components/Snackbars';

function ManageOtherCircumstances({
    locationUser, quanhuyenList, thonList, phuongxaList,
    fetchWardRequest, fetchVillageRequest, totalOtherCircumstances,
    listHCK, otherCircumstances, fetchDataOtherCircumstancesRequest,
    downloadFileExcelDataHCKRequest,
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
    
    React.useEffect(() => {
        fetchDataOtherCircumstancesRequest(values)
    }, [values])

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
                downloadFileExcelDataHCKRequest(dataSubmit)
            }
        }else{
            /* TODO SOMETHING */
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
        <div className="manageOtherCircumstances">
            <Paper>
            <CssBaseline />
            <div className="manageOtherCircumstances__searchForm">
                <SearchForm
                    onSubmitForm={onSubmitForm}
                    locationUser={locationUser}
                    quanhuyenList={quanhuyenList}
                    phuongxaList={phuongxaList}
                    thonList={thonList}
                    listHCK={listHCK}
                    onChoose={onChoose}
                />
            </div>
            <div className="manageOtherCircumstances__dataTable">
                <Paper>
                    <Table 
                        otherCircumstances={otherCircumstances}
                        listHCK={listHCK}
                        totalOtherCircumstances={totalOtherCircumstances}
                        onHandlePagination={onHandleButtonPagination}
                    />
                </Paper>
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

ManageOtherCircumstances.propTypes = {

}

const mapStateToProps = state => ({
    locationUser : state.auth.locationUser,
    phuongxaList : state.common.phuongxaList,
    quanhuyenList : state.common.quanhuyenList,
    thonList : state.common.thonList,
    listHCK : state.common.listHCK,
    otherCircumstances : state.manageChildren.otherCircumstances,
    totalOtherCircumstances : state.manageChildren.totalOtherCircumstances,
})

export default connect(mapStateToProps, { fetchWardRequest, fetchVillageRequest, fetchDataOtherCircumstancesRequest, downloadFileExcelDataHCKRequest })(ManageOtherCircumstances)

