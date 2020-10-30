import React from 'react'
import './ManageSpecialCircumstances.scss';
import PropTypes from 'prop-types'
import { CssBaseline, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchWardRequest, fetchVillageRequest } from '../../actions/commonAction';
import { fetchDataSpecialCircumstancesRequest } from '../../actions/manageChildrenAction';
import SearchForm from '../ManageSpecialCircumstances/components/SearchForm';
import Table from '../ManageSpecialCircumstances/components/Table';

function ManageSpecialCircumstances({
    locationUser, quanhuyenList, thonList, phuongxaList,
    fetchWardRequest, fetchVillageRequest, fetchDataSpecialCircumstancesRequest,
    listHCDB, specialCircumstances, totalSpecialCircumstances,
}) {

    const [values, setValues] = React.useState({
        thanhpho: '',
        huyen: '',
        xa: '',
        thon : '',
        hoancanh : '',
        tentreem: '',
        magiadinh: '',
        timestart: '',
        timefinish: '',
        page: null,
    })

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
    
    return (
        <div className="manageSpecialCircumstances">
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

export default connect(mapStateToProps, { fetchWardRequest, fetchVillageRequest, fetchDataSpecialCircumstancesRequest })(ManageSpecialCircumstances)

