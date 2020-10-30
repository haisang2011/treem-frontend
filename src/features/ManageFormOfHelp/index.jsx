import React from 'react'
import './ManageFormOfHelp.scss';
import PropTypes from 'prop-types'
import { CssBaseline, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchWardRequest, fetchVillageRequest } from '../../actions/commonAction';
import { fetchDataFormOfHelpRequest } from '../../actions/manageChildrenAction';
import SearchForm from '../ManageFormOfHelp/components/SearchForm';
import Table from '../ManageFormOfHelp/components/Table';

function ManageFormOfHelp({
    locationUser, quanhuyenList, thonList, phuongxaList,
    fetchWardRequest, fetchVillageRequest,
    listHTTG, formOfHelp, totalFormOfHelp, fetchDataFormOfHelpRequest
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

    const onSubmitForm = (value) => {

        setValues({
            thanhpho: value.tinhthanhpho ? value.tinhthanhpho : '',
            huyen: value.quanhuyen ? value.quanhuyen : '',
            xa: value.quanhuyen ? value.phuongxa : '',
            thon : value.thon ? value.thon : '',
            hoancanh : value.chitieu ? value.chitieu : '',
            tentreem : value.hoten ? value.hoten : '',
            magiadinh : value.id_giadinh ? value.id_giadinh : '',
            timestart : value.ngaybatdau ? value.ngaybatdau : '',
            timefinish : value.ngayketthuc ? value.ngayketthuc : '',
            page : null,
        })
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

export default connect(mapStateToProps, { fetchWardRequest, fetchVillageRequest, fetchDataFormOfHelpRequest })(ManageFormOfHelp)

