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
import { getKeysHelp, getKeys } from '../../../../helpers/getKeys'

const useStyles = makeStyles(() => ({
    root : {
        '& .MuiGrid-grid-xs-4' : {
            flexBasis: "30.333333%",
        }
    }
}))

function DetailChildrenTreeSelect({listHCDB, listNCHCDB, listHCK, listHTTG, detailChildrenInfo}) {

    const classes = useStyles();

    const {
        Hoan_Canh_Dac_Biet,
        Nguy_Co_Roi_Vao_HCDB, 
        Hoan_Canh_Khac, 
        Hinh_Thuc_Tro_Giup
    } = detailChildrenInfo

    const initialValues = {
        thon: '',
        chitieu: '',
        id_giadinh: '',
        hoten: '',
        ngaybatdau: '',
        ngayketthuc: '',
    }

    const onSubmitFormik = () => {
        
    }

    const [tab, setTab] = React.useState(0);
    const onHandleTabIndex = (index) => {
        setTab(index);
    }

    return (
        <div className="detailChildrenForm">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmitFormik}
            >
            {formikProps => {

                return (
                    <Form autoComplete="off" className="detailChildrenForm__formik">
                        <Grid container xs={12} spacing={1}>
                            <Tabs
                                onHandleTabIndex={onHandleTabIndex}
                            />
                        </Grid>

                        <Grid container xs={12} spacing={1}>
                            <Tree
                                // treeData={
                                //     tab===0 ? listHCDB : (tab===1 ? listNCHCDB : (tab===2 ? listHCK : (tab===3 ? listHTTG : null)))
                                // }
                                // treeDataDetailChildren={
                                //     tab===0 ? getKeys(Hoan_Canh_Dac_Biet) : (tab===1 ? getKeys(Nguy_Co_Roi_Vao_HCDB) : (tab===2 ? getKeys(Hoan_Canh_Khac) : (tab===3 ? getKeysHelp(Hinh_Thuc_Tro_Giup) : null)))
                                // }
                                treeData={
                                    tab===0 ? listHTTG : null
                                }
                                treeDataDetailChildren={
                                    tab===0 ? getKeysHelp(Hinh_Thuc_Tro_Giup) : null
                                }
                            />
                        </Grid>

                    </Form>
                )
            }}
        </Formik>
        </div>
    )
}

DetailChildrenTreeSelect.propTypes = {

}

export default DetailChildrenTreeSelect

