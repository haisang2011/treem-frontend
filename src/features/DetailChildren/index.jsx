import React from 'react'
import './DetailChildren.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DetailChildrenForm from './components/DetailChildrenForm';
import DetailChildrenTreeSelect from './components/DetailChildrenTreeSelect';
import { Grid } from '@material-ui/core';
import { 
    closeAndCleanDetailChildren, 
    addChildWithFamily, 
    addChildOtherFamily,
    updateChildren,
} from '../../actions/manageChildrenAction';
import { flattenDeep } from 'lodash';
import { clearErrors } from '../../actions/errorAction';
import { getKeys } from '../../helpers/getKeys';
import { getKeysHelp } from '../../helpers/getKeysHelp';

const initialDataSelected = [
    {
        idTab: 0,
        data: []
    },
    {
        idTab: 1,
        data: []
    }, 
    {
        idTab: 2,
        data: []
    }, 
    {
        idTab: 3,
        data: []
    }, 
]

function DetailChildren({
    listHCDB, listNCHCDB, listHCK, thonList, msg, code,
    listHTTG, detailChildrenInfo, closeAndCleanDetailChildren,
    isShowDetailChildrenFollowIdFamily, addChildWithFamily,
    isShowDetailChildren, isShowDetailChildrenFollowLocationUser,
    updateChildren, addChildOtherFamily, 
}) {

    const {
        Hoan_Canh_Dac_Biet,
        Nguy_Co_Roi_Vao_HCDB, 
        Hoan_Canh_Khac, 
        Hinh_Thuc_Tro_Giup
    } = detailChildrenInfo

    const [dataSelected, setDataSelected] = React.useState([
        {
            idTab: 0,
            data: []
        },
        {
            idTab: 1,
            data: []
        }, 
        {
            idTab: 2,
            data: []
        }, 
        {
            idTab: 3,
            data: []
        }, 
    ]);

    React.useEffect(() => {
        let array0 = (Hoan_Canh_Dac_Biet && Hoan_Canh_Dac_Biet.length>0) ? getKeys(Hoan_Canh_Dac_Biet) : [];
        let array1 = Nguy_Co_Roi_Vao_HCDB ? getKeys(Nguy_Co_Roi_Vao_HCDB) : [];
        let array2 = Hoan_Canh_Khac ? getKeys(Hoan_Canh_Khac) : [];
        let array3 = Hinh_Thuc_Tro_Giup ? getKeysHelp(Hinh_Thuc_Tro_Giup) : [];

        let data = initialDataSelected.map(({idTab}, index) => {
            if(idTab===0){
                return {
                    idTab: dataSelected[index].idTab,
                    data: array0
                }
            }
            if(idTab===1){
                return {
                    idTab: dataSelected[index].idTab,
                    data: array1
                }
            }
            if(idTab===2){
                return {
                    idTab: dataSelected[index].idTab,
                    data: array2
                }
            }
            if(idTab===3){
                return {
                    idTab: dataSelected[index].idTab,
                    data: array3
                }
            }
        });
        setDataSelected(data);
    },[])

    const onCheck = (checked) => {
        setDataSelected(checked);
    };

    const onHandleCloseDetail = (status) => {
        closeAndCleanDetailChildren(status)
    }

    const onSubmitForm = (value) => {

        /* Handle id_hoancanh */
        const hoancanh = flattenDeep(dataSelected.map(({idTab, data}) => {
            if(idTab!==3){
              return data
            }
        }).filter(e => e))

        /* Handle id_trogiup */
        const trogiup = flattenDeep(dataSelected.map(({idTab, data}) => {
            if(idTab===3){
              return data
            }
        }).filter(e => e))

        const dataSubmit = {
            tinhthanhpho: value.tinhthanhpho ? value.tinhthanhpho : '',
            huyen: value.quanhuyen ? value.quanhuyen : '',
            xa: value.quanhuyen ? value.quanhuyen : '',
            id_thon : value.thon ? value.thon : '',
            id_giadinh: value.id_giadinh ? value.id_giadinh : '',
            hotencha: value.hotencha ? value.hotencha : '',
            hotenme: value.hotenme ? value.hotenme : '',
            cha: value.cha ? value.cha : '',
            me: value.me ? value.me : '',
            idNguoiNuoi: value.idNguoiNuoi ? value.idNguoiNuoi : '',
            nguoinuoiduong: value.nguoinuoiduong ? value.nguoinuoiduong : '',
            sodienthoai: value.sodienthoai ? value.sodienthoai : '',
            hoancanh: value.hoancanh ? value.hoancanh : 0,
            diachi: value.diachi ? value.diachi : '',
            id_treem: value.id_treem ? value.id_treem : '',
            hoten : value.hoten ? value.hoten : '',
            ngaysinh : value.ngaysinh ? value.ngaysinh : '',
            dantoc : value.dantoc ? value.dantoc : '',
            gioitinh : value.gioitinh ? value.gioitinh : '',
            trinhdohocvan : value.trinhdohocvan ? value.trinhdohocvan : '',
            ghichu : value.ghichu ? value.ghichu : '',
            id_hoancanh : hoancanh,
            id_trogiup : trogiup,
        }
        console.log(dataSubmit);

        if(isShowDetailChildren && !isShowDetailChildrenFollowIdFamily && !isShowDetailChildrenFollowLocationUser){
            //TODO Update Children
            dataSubmit.trangthai = 1;
            updateChildren(dataSubmit);
        }else if(isShowDetailChildren && isShowDetailChildrenFollowIdFamily && !isShowDetailChildrenFollowLocationUser){
            //TODO Add With Family
            dataSubmit.trangthai = 0;
            addChildWithFamily(dataSubmit);
        }else if(isShowDetailChildren && !isShowDetailChildrenFollowIdFamily && isShowDetailChildrenFollowLocationUser){
            //TODO Add Other Family
            dataSubmit.trangthai = 0;
            addChildOtherFamily(dataSubmit);
        }else{
            // Do Something...
        }
    }

    // const [tabCurrent, setTabCurrent] = React.useState(null);
    const handleOnChange = (checkedKeys, tabCurrent) => {

        let data = initialDataSelected.map(({idTab}, index) => {
            if(idTab!==tabCurrent){
                return {
                    ...dataSelected[index]
                }
            }else{
                return {
                    idTab: dataSelected[index].idTab,
                    data: [...checkedKeys]
                }
            }
        });
        setDataSelected(data);
    }

    return (
        <div className="detailChildren">
            <div className="detailChildren__title">Thông tin trẻ em</div>
            <div className="detailChildren__main">
                <Grid container item xs={12} spacing={1}>
                    <Grid item xs={7}>
                        <DetailChildrenForm
                            onHandleCloseDetail={onHandleCloseDetail}
                            detailChildrenInfo={detailChildrenInfo}
                            isShowDetailChildrenFollowIdFamily={isShowDetailChildrenFollowIdFamily}
                            thonList={thonList}
                            onSubmitForm={onSubmitForm}
                        />
                    </Grid>

                    <Grid item xs={5} >
                        <DetailChildrenTreeSelect
                            listHCDB={listHCDB}
                            listNCHCDB={listNCHCDB}
                            listHCK={listHCK}
                            listHTTG={listHTTG}
                            detailChildrenInfo={detailChildrenInfo}
                            handleOnChange={handleOnChange}
                            onCheck={onCheck}
                            checkedKeys={dataSelected}
                        />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

DetailChildren.propTypes = {

}

const mapStateToProps = state => ({
    listHCDB : state.common.listHCDB,
    listNCHCDB : state.common.listNCHCDB,
    listHCK : state.common.listHCK,
    listHTTG : state.common.listHTTG,
    detailChildrenInfo : state.manageChildren.detailChildrenInfo,
    isShowDetailChildrenFollowIdFamily : state.status.isShowDetailChildrenFollowIdFamily,
    isShowDetailChildren : state.status.isShowDetailChildren,
    isShowDetailChildrenFollowLocationUser : state.status.isShowDetailChildrenFollowLocationUser,
    thonList : state.common.thonList,
    msg: state.error.msg,
    code: state.error.code,
})

export default connect(mapStateToProps, { 
    closeAndCleanDetailChildren, 
    addChildWithFamily,
    addChildOtherFamily,
    updateChildren,
    clearErrors
})(DetailChildren)