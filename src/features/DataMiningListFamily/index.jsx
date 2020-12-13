import React from 'react'
import Table from './components/Table';
import PropTypes from 'prop-types'
import './DataMiningListFamily.scss';
import { CssBaseline, Paper } from '@material-ui/core';
import SearchForm from './components/SearchForm';
import { connect } from 'react-redux';
import { fetchWardRequest, fetchVillageRequest } from '../../actions/commonAction';
import { 
    fetchDataFamilyRequest, downloadFileExcelDataFamilyRequest
} from '../../actions/manageFamilyAction';
import Snackbars from '../../components/Snackbars';


function DataMiningListFamily({ 
    locationUser, quanhuyenList, thonList, phuongxaList,
    fetchWardRequest, fetchVillageRequest, fetchDataFamilyRequest,
    familyList, totalFamilyList, downloadFileExcelDataFamilyRequest,
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
        thon: '',
        tenchame: '',
        magiadinh: '',
        tentreem: '',
        page: null,
    })
    
    const onChoose = (id, step) => {
        if(step===1){
            fetchVillageRequest(id)
        }else if(step === 2){
            fetchWardRequest(id)
        }
    }

    React.useEffect(() => {
        fetchDataFamilyRequest(values)
    }, [values])

    const onSubmitForm = (value, statusSubmit) => {

        const dataSubmit = {
            thanhpho: value.tinhthanhpho ? value.tinhthanhpho : '',
            huyen: value.quanhuyen ? value.quanhuyen : '',
            xa: value.phuongxa ? value.phuongxa : '',
            thon : value.thon ? value.thon : '',
            tenchame: value.nguoinuoi ? value.nguoinuoi : '',
            tentreem : value.hoten ? value.hoten : '',
            magiadinh : value.id_giadinh ? value.id_giadinh : '',
            page : null,
        }

        if(statusSubmit===1){
            setValues({
                thanhpho: value.tinhthanhpho ? value.tinhthanhpho : '',
                huyen: value.quanhuyen ? value.quanhuyen : '',
                xa: value.quanhuyen ? value.quanhuyen : '',
                thon : value.thon ? value.thon : '',
                tenchame : value.nguoinuoi ? value.nguoinuoi : '',
                magiadinh : value.id_giadinh ? value.id_giadinh : '',
                tentreem : value.hoten ? value.hoten : '',
                page : null,
            })
        }else if(statusSubmit===2){
            if(!dataSubmit.huyen){
                setSnackbars(true);
            }else{
                downloadFileExcelDataFamilyRequest(dataSubmit)
            }
        }else{
            /* TODO SOMETHING */
        }
    }

    const onHandleButtonPagination = (pageNumber) => {
        setValues({
            ...values,
            page : pageNumber+1,
        })
    }

    return (
        <div className="dataMiningListFamily">
            <Paper>
            <CssBaseline />
            <div className="dataMiningListFamily__searchForm">
                <SearchForm
                    onSubmitForm={onSubmitForm}
                    locationUser={locationUser}
                    quanhuyenList={quanhuyenList}
                    phuongxaList={phuongxaList}
                    thonList={thonList}
                    onChoose={onChoose}
                />
            </div>
            <div className="dataMiningListFamily__dataTable">
                <Paper>
                    <Table
                        familyList={familyList}
                        totalFamilyList={totalFamilyList}
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

DataMiningListFamily.propTypes = {

}

const mapStateToProps = state => ({
    locationUser : state.auth.locationUser,
    phuongxaList : state.common.phuongxaList,
    quanhuyenList : state.common.quanhuyenList,
    thonList : state.common.thonList,
    familyList : state.family.familyList,
    totalFamilyList : state.family.totalFamilyList,
})

export default connect(mapStateToProps,
{   fetchWardRequest, 
    fetchVillageRequest, 
    fetchDataFamilyRequest,
    downloadFileExcelDataFamilyRequest,
})(DataMiningListFamily)

