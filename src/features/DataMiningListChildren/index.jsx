import React from 'react'
import './DataMiningListChildren.scss';
import PropTypes from 'prop-types'
import { CssBaseline, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchWardRequest, fetchVillageRequest } from '../../actions/commonAction';
import { fetchDataFormOfHelpRequest, downloadFileExcelDataHTTGRequest } from '../../actions/manageChildrenAction';
import { downloadFileExcelDataChildrenRequest } from '../../actions/dataMiningAction';
import SearchForm from '../DataMiningListChildren/components/SearchForm';
import Snackbars from '../../components/Snackbars';


function DataMiningListChildren({
    locationUser, quanhuyenList, thonList, phuongxaList,
    fetchWardRequest, fetchVillageRequest, downloadFileExcelDataChildrenRequest,
    
}) {

    // const {
    //     id_tinh, id_quan, id_xa,
    //     thanhpho, quanhuyen, phuongxa
    // } = locationUser

    const [snackbars, setSnackbars] = React.useState(false);
    const onHandleSnackbars = () => {
        setSnackbars(false);
    }

    // const [values, setValues] = React.useState({
    //     thanhpho: id_tinh || '',
    //     huyen: id_quan || '',
    //     xa: id_xa || '',
    //     thon : '',
    //     dotuoitu : '',
    //     dotuoiden: '',
    //     timestart: '',
    //     timefinish: '',
    // })

    // React.useEffect(() => {
    //     fetchDataFormOfHelpRequest(values)
    // }, [values])
    
    // const onHandleButtonPagination = (pageNumber) => {

    //     setValues({
    //         ...values,
    //         page : pageNumber+1,
    //     })

    // }

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
            downloadFileExcelDataChildrenRequest(dataSubmit);
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
        <div className="dataMiningListChildren">
            <Paper>
            <CssBaseline />
            <div className="dataMiningListChildren__searchForm">
                <SearchForm
                    onSubmitForm={onSubmitForm}
                    locationUser={locationUser}
                    quanhuyenList={quanhuyenList}
                    phuongxaList={phuongxaList}
                    thonList={thonList}
                    onChoose={onChoose}
                />
            </div>
            <div className="dataMiningListChildren__dataTable">
                <Paper className="dataMiningListChildren__dataTable--paper"></Paper>
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

DataMiningListChildren.propTypes = {

}

const mapStateToProps = state => ({
    locationUser : state.auth.locationUser,
    phuongxaList : state.common.phuongxaList,
    quanhuyenList : state.common.quanhuyenList,
    thonList : state.common.thonList,
})

export default connect(mapStateToProps, { fetchWardRequest, fetchVillageRequest, downloadFileExcelDataChildrenRequest })(DataMiningListChildren)

