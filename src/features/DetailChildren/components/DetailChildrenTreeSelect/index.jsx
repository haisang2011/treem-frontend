import React from 'react'
import PropTypes from 'prop-types'
import { Button, Grid, makeStyles, Paper } from '@material-ui/core'
import { Field, Formik, Form } from 'formik'
import InputField from '../../../../custom-fields/InputField';
import SelectField from '../../../../custom-fields/SelectField';
import CheckBoxField from '../../../../custom-fields/CheckBoxField';
import HoanCanhDacBietField from '../../../../custom-fields/HoanCanhDacBietField';
import DateField from '../../../../custom-fields/DateField';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import Tabs from '../TabsTreeSelect';
import Tree from '../Tree';
import { getKeys } from '../../../../helpers/getKeys';
import { getKeysHelp } from '../../../../helpers/getKeysHelp';
import expandAllKeys_ from '../../../../helpers/expandAllKeys';

const useStyles = makeStyles(() => ({
    root : {
        '& .MuiGrid-grid-xs-4' : {
            flexBasis: "30.333333%",
        }
    }
}))

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

function DetailChildrenTreeSelect({
    listHCDB, listNCHCDB, listHCK,
    listHTTG, detailChildrenInfo,
    handleOnChange, onCheck, checkedKeys,
}) {

    const classes = useStyles();

    const {
        Hoan_Canh_Dac_Biet,
        Nguy_Co_Roi_Vao_HCDB, 
        Hoan_Canh_Khac, 
        Hinh_Thuc_Tro_Giup
    } = detailChildrenInfo

    const [tab, setTab] = React.useState(0);
    
    const onHandleTabIndex = (index) => {
        setTab(index);
    }

    // const expandedAllKeys=
    //     tab===0 ? ((Hoan_Canh_Dac_Biet && Hoan_Canh_Dac_Biet.length>0) ? expandAllKeys_(Hoan_Canh_Dac_Biet) : []) : 
    //     (tab===1 ? (Nguy_Co_Roi_Vao_HCDB ? expandAllKeys_(Nguy_Co_Roi_Vao_HCDB) : []) : 
    //     (tab===2 ? (Hoan_Canh_Khac ? expandAllKeys_(Hoan_Canh_Khac) : []) : 
    //     (tab===3 ? (Hinh_Thuc_Tro_Giup ? expandAllKeys_(Hinh_Thuc_Tro_Giup) : []) : null)))
    

    const [expandedKeys, setExpandedKeys] = React.useState(expandAllKeys_(listHCDB));
    React.useEffect(() => {
        setExpandedKeys(
            tab===0 ? expandAllKeys_(listHCDB) : 
            (tab===1 ? expandAllKeys_(listNCHCDB) : 
            (tab===2 ? expandAllKeys_(listHCK) : 
            (tab===3 ? expandAllKeys_(listHTTG) : null)))
        )
    }, [tab])
    
    // const [checkedKeys, setCheckedKeys] = React.useState([
    //     {
    //         idTab: 0,
    //         data: []
    //     },
    //     {
    //         idTab: 1,
    //         data: []
    //     }, 
    //     {
    //         idTab: 2,
    //         data: []
    //     }, 
    //     {
    //         idTab: 3,
    //         data: []
    //     }, 
    // ]);

    // React.useEffect(() => {
    //     let array0 = (Hoan_Canh_Dac_Biet && Hoan_Canh_Dac_Biet.length>0) ? getKeys(Hoan_Canh_Dac_Biet) : [];
    //     let array1 = Nguy_Co_Roi_Vao_HCDB ? getKeys(Nguy_Co_Roi_Vao_HCDB) : [];
    //     let array2 = Hoan_Canh_Khac ? getKeys(Hoan_Canh_Khac) : [];
    //     let array3 = Hinh_Thuc_Tro_Giup ? getKeysHelp(Hinh_Thuc_Tro_Giup) : [];

    //     let data = initialDataSelected.map(({idTab}, index) => {
    //         if(idTab===0){
    //             return {
    //                 idTab: checkedKeys[index].idTab,
    //                 data: array0
    //             }
    //         }
    //         if(idTab===1){
    //             return {
    //                 idTab: checkedKeys[index].idTab,
    //                 data: array1
    //             }
    //         }
    //         if(idTab===2){
    //             return {
    //                 idTab: checkedKeys[index].idTab,
    //                 data: array2
    //             }
    //         }
    //         if(idTab===3){
    //             return {
    //                 idTab: checkedKeys[index].idTab,
    //                 data: array3
    //             }
    //         }
    //     });
    //     setCheckedKeys(data);
    // },[])

    const onHandleCheck = (checked) => {
        let data = initialDataSelected.map(({idTab}, index) => {
            if(idTab!==tab){
                return {
                    ...checkedKeys[index]
                }
            }else{
                return {
                    idTab: checkedKeys[index].idTab,
                    data: [...checked]
                }
            }
        });

        // setCheckedKeys(data);
        onCheck(data);
    };

    //Handle After...
    // const setStateExpandedKeys = (keys) => {
    //     setExpandedKeys(keys)
    // }

    return (
        <div>
            <Grid container item xs={12} spacing={1}>
                <Tabs
                    tab={tab}
                    onHandleTabIndex={onHandleTabIndex}
                />
            </Grid>

            <Grid container item xs={12} spacing={1}>
                <Tree
                    treeData={
                        tab===0 ? listHCDB : (tab===1 ? listNCHCDB : (tab===2 ? listHCK : (tab===3 ? listHTTG : null)))
                    }
                    tabCurrent={tab}
                    treeDataDetailChildren={
                        tab===0 ? ((Hoan_Canh_Dac_Biet && Hoan_Canh_Dac_Biet.length>0) ? getKeys(Hoan_Canh_Dac_Biet) : []) : 
                        (tab===1 ? (Nguy_Co_Roi_Vao_HCDB ? getKeys(Nguy_Co_Roi_Vao_HCDB) : []) : 
                        (tab===2 ? (Hoan_Canh_Khac ? getKeys(Hoan_Canh_Khac) : []) : 
                        (tab===3 ? (Hinh_Thuc_Tro_Giup ? getKeysHelp(Hinh_Thuc_Tro_Giup) : []) : null)))
                    }
                    handleOnChange={handleOnChange}
                    checkedKeys={
                        tab===0 ? checkedKeys[0].data : (tab===1 ? checkedKeys[1].data : (tab===2 ? checkedKeys[2].data : (tab===3 ? checkedKeys[3].data : null)))
                    }
                    expandedKeys={expandedKeys}
                    // onHandleExpandedKeys={setStateExpandedKeys}
                    onCheck={onHandleCheck}
                />
            </Grid>

        </div>
    )
}

DetailChildrenTreeSelect.propTypes = {

}

export default DetailChildrenTreeSelect

