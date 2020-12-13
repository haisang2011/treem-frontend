import React from 'react'
import './ManageFormOfHelp.scss';
import PropTypes from 'prop-types'
import { CssBaseline, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchWardRequest, fetchVillageRequest } from '../../actions/commonAction';
import { fetchDataFormOfHelpRequest, downloadFileExcelDataHTTGRequest } from '../../actions/manageChildrenAction';
import SearchForm from '../ManageFormOfHelp/components/SearchForm';
import Table from '../ManageFormOfHelp/components/Table';
import Snackbars from '../../components/Snackbars';

function ManageFormOfHelp({
    locationUser, quanhuyenList, thonList, phuongxaList,
    fetchWardRequest, fetchVillageRequest,
    listHTTG, formOfHelp, totalFormOfHelp, fetchDataFormOfHelpRequest,
    downloadFileExcelDataHTTGRequest,
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
        hinhthuc : '',
        tentreem: '',
        magiadinh: '',
        timestart: '',
        timefinish: '',
        page: null,
    })

    React.useEffect(() => {
        fetchDataFormOfHelpRequest(values)
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
            hinhthuc : value.chitieu ? value.chitieu : '',
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
                hinhthuc : value.chitieu ? value.chitieu : '',
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
                downloadFileExcelDataHTTGRequest(dataSubmit)
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
        <div className="manageFormOfHelp">
            <Paper>
            <CssBaseline />
            <div className="manageFormOfHelp__searchForm">
                <SearchForm
                    onSubmitForm={onSubmitForm}
                    locationUser={locationUser}
                    quanhuyenList={quanhuyenList}
                    phuongxaList={phuongxaList}
                    thonList={thonList}
                    listHTTG={listHTTG}
                    onChoose={onChoose}
                />
            </div>
            <div className="manageFormOfHelp__dataTable">
                <Paper>
                    <Table 
                        formOfHelp={formOfHelp}
                        listHTTG={listHTTG}
                        totalFormOfHelp={totalFormOfHelp}
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

ManageFormOfHelp.propTypes = {

}

const mapStateToProps = state => ({
    locationUser : state.auth.locationUser,
    phuongxaList : state.common.phuongxaList,
    quanhuyenList : state.common.quanhuyenList,
    thonList : state.common.thonList,
    listHTTG : state.common.listHTTG,
    formOfHelp : state.manageChildren.formOfHelp,
    totalFormOfHelp : state.manageChildren.totalFormOfHelp,
})

export default connect(mapStateToProps, { fetchWardRequest, fetchVillageRequest, fetchDataFormOfHelpRequest, downloadFileExcelDataHTTGRequest })(ManageFormOfHelp)

