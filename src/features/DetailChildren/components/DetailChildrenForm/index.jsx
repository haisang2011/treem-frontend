import React from 'react'
import PropTypes from 'prop-types'
import './DetailChildrenForm.scss'
import { Button, Grid, makeStyles, Paper } from '@material-ui/core'
import { Field, Formik, Form } from 'formik'
import InputField from '../../../../custom-fields/InputField';
import SelectField from '../../../../custom-fields/SelectField';
import CheckBoxField from '../../../../custom-fields/CheckBoxField';
import HoanCanhDacBietField from '../../../../custom-fields/HoanCanhDacBietField';
import DateField from '../../../../custom-fields/DateField';
import SaveIcon from '@material-ui/icons/Save';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CloseIcon from '@material-ui/icons/Close';
import { Status } from '../../../../contants/actionType'
import danToc from '../../../../helpers/getNation';
import {Gender} from '../../../../helpers/getGender';
import {TTHT} from '../../../../helpers/getListTinhTrangHocTap';
import {LHCN} from '../../../../helpers/getLopHocCaoNhat';
import * as ActionType from '../../../../contants/actionType';
import moment from 'moment';
import DialogFullScreen from '../../../../components/DialogFullScreen';
import Snackbars from '../../../../components/Snackbars';
import { clearErrors } from '../../../../actions/errorAction'
import { useDispatch, useSelector, connect } from 'react-redux'
// import { DetailChildrenSchema } from '../../../../validation/Detail';

const useStyles = makeStyles(() => ({
    root : {
        '& .MuiGrid-grid-xs-4' : {
            flexBasis: "30.333333%",
        }
    }
}))

function DetailChildrenForm({
    onHandleCloseDetail,
    detailChildrenInfo, 
    isShowDetailChildrenFollowIdFamily, 
    thonList,
    onSubmitForm,
    msg, code, clearErrors,
}) {

    const dispatch = useDispatch();

    const classes = useStyles();

    const {
        id_tinhthanhpho, id_quanhuyen, id_phuongxa,
        ten_tinhthanhpho, ten_quanhuyen, ten_phuongxa, id_thon, tenthon,
        id_giadinh, hotencha, hotenme, nguoinuoiduong,
        sodienthoai, diachi, id_treem, ngaysinh, gioitinh,
        hoten, dantoc, trinhdohocvan, ghichu,
        hoancanh, cha, me, idNguoiNuoi,
    } = detailChildrenInfo

    const [initialValues, setInitialValues] = React.useState({
        tinhthanhpho: id_tinhthanhpho || '',
        quanhuyen: id_quanhuyen || '',
        phuongxa: id_phuongxa || '',
        thon: id_thon || '',
        id_giadinh: id_giadinh ? id_giadinh : '',
        hotencha: hotencha ? hotencha : '',
        hotenme: hotenme ? hotenme : '',
        cha: cha ? cha : '',
        me: me ? me : '',
        idNguoiNuoi: idNguoiNuoi ? idNguoiNuoi : '',
        nguoinuoiduong: nguoinuoiduong ? nguoinuoiduong : '',
        sodienthoai: sodienthoai ? sodienthoai : '',
        diachi: diachi ? diachi : '',
        hoancanh: hoancanh ? hoancanh : 3,
        id_treem: id_treem ? id_treem : '',
        hoten: hoten ? hoten : '',
        ngaysinh: ngaysinh ? moment(ngaysinh).format('YYYY/MM/DD') : '',
        dantoc: dantoc ? dantoc :'',
        gioitinh: gioitinh ? gioitinh :'',
        trinhdohocvan: trinhdohocvan ? trinhdohocvan :'',
        ghichu: ghichu ? ghichu :'',
    })
    // const initialValues = {
    //     tinhthanhpho: id_tinhthanhpho || '',
    //     quanhuyen: id_quanhuyen || '',
    //     phuongxa: id_phuongxa || '',
    //     thon: id_thon || '',
    //     id_giadinh: id_giadinh ? id_giadinh : '',
    //     hotencha: hotencha ? hotencha : '',
    //     hotenme: hotenme ? hotenme : '',
    //     cha: cha ? cha : '',
    //     me: me ? me : '',
    //     nguoinuoiduong: nguoinuoiduong ? nguoinuoiduong : '',
    //     sodienthoai: sodienthoai ? sodienthoai : '',
    //     diachi: diachi ? diachi : '',
    //     hoancanh: hoancanh ? hoancanh : 3,
    //     id_treem: id_treem ? id_treem : '',
    //     hoten: hoten ? hoten : '',
    //     ngaysinh: ngaysinh ? moment(ngaysinh).format('YYYY/MM/DD') : '',
    //     dantoc: dantoc ? dantoc :'',
    //     gioitinh: gioitinh ? gioitinh :'',
    //     trinhdohocvan: trinhdohocvan ? trinhdohocvan :'',
    //     ghichu: ghichu ? ghichu :'',
    // }

    const onSubmitFormik = (values, action) => {
        onSubmitForm(values);
        // dispatch({
        //     type: ActionType.ManageChildren.CLEANUP_DATA_DETAIL_CHILDREN,
        // });
        dispatch({
            type: ActionType.Status.CLOSE_DETAIL_CHILDREN,
            payload: false,
        });
        // values.preventDefault();
    }

    const [checkBox, setCheckBox] = React.useState(hoancanh);
    const [checkedCheckBox, setCheckedCheckBox] = React.useState({
        hongheo: checkBox===1 ? true : false,
        hocanngheo: checkBox===2 ? true : false,
    })

    const onHandleCheckBox = (type, checked) => {
        setCheckBox(type);
        setCheckedCheckBox({
            hongheo: (type===1 && checked) ? true : false,
            hocanngheo: (type===2 && checked) ? true : false,
        });
    }

    /* Open Dialog Full Screen */
    const [statusPositionFamily, setStatusPositionFamily] = React.useState(null);
    const [openFullScreen, setOpenFullSreen] = React.useState(false);
    const handleOnClick = (status) => {
        setStatusPositionFamily(status);
        setOpenFullSreen(true);
    }

    const handleOnChangeParent = (values) => {
        if(statusPositionFamily===1){
            setInitialValues({
                ...initialValues,
                cha: values.id_person,
                hotencha: values.hoten
            })
        }else if(statusPositionFamily===2){
            setInitialValues({
                ...initialValues,
                me: values.id_person,
                hotenme: values.hoten
            })
        }else if(statusPositionFamily===3){
            setInitialValues({
                ...initialValues,
                idNguoiNuoi: values.id_person,
                nguoinuoiduong: values.hoten
            })
        }
    }

    const [snackbars, setSnackbars] = React.useState(false);
    React.useEffect(() => {
        if(msg==="Add successful" && code===200){
            setSnackbars(true);
        }
    }, [msg, code])

    const onHandleSnackbars = () => {
        clearErrors();
        setSnackbars(false);
    }

    return (
        <div className="detailChildrenForm">
            <Formik
                enableReinitialize
                initialValues={initialValues}
                // validationSchema={DetailChildrenSchema}
                onSubmit={onSubmitFormik}
            >
            {formikProps => {

                return (
                    <Form autoComplete="off" className="detailChildrenForm__formik">
                        <Grid container item xs={12} spacing={1}>
                            <Button
                                startIcon={<SaveIcon />}
                                size="small"
                                type="submit"
                                variant="contained" 
                                style={{backgroundColor:"#35baf6",textTransform: "none",fontSize:"13px",marginRight:"5px"}}
                            >
                                Lưu
                            </Button>
                            <Button
                                startIcon={<CloseIcon />}
                                color="secondary"
                                size="small"
                                type="submit" 
                                variant="contained" 
                                style={{textTransform: "none",fontSize:"13px",marginRight:"5px"}}
                                onClick={() => onHandleCloseDetail(false)}
                            >
                                Đóng
                            </Button>
                        </Grid>

                        <Grid container xs={12} item className={classes.root} style={{marginTop:"10px"}}>
                            {/* <Paper variant="outlined" elevation={3} className="detailChildrenForm__formik--paper"> */}

                                {/* Địa phương quản lý */}
                                <Grid item xs={12} style={{margin: "10px 0 0 0", fontWeight:700}}>
                                        Địa phương quản lý
                                </Grid>

                                {/* Row */}
                                <Grid item container xs={12}>
                                    <Grid container item xs={6} justify="space-between" alignItems="center">
                                        <Grid container justify="flex-end" item xs={4}>Tỉnh/Thành phố</Grid>
                                        <Grid item xs={8}>
                                            <Field 
                                                name="tinhthanhpho"
                                                component={SelectField}
                                                
                                                disabled={ten_tinhthanhpho ? true : (isShowDetailChildrenFollowIdFamily ? true : false)}
                                                valueLocation={ten_tinhthanhpho ? ten_tinhthanhpho : null}
                                                label="Tỉnh Thành Phố"
                                                
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container item xs={6} justify="space-between" alignItems="center">
                                        <Grid container justify="flex-end" item xs={4}>Quận/Huyện</Grid>
                                            <Grid item xs={8}>
                                                <Field 
                                                    name="quanhuyen"
                                                    component={SelectField}

                                                    disabled={ten_quanhuyen ? true : (isShowDetailChildrenFollowIdFamily ? true : false)}
                                                    valueLocation={ten_quanhuyen ? ten_quanhuyen : null}
                                                    label="Quận Huyện"
                                                    
                                                />
                                    </Grid>
                                </Grid>
                                {/* End */}

                                {/* Row */}
                                <Grid container item xs={12} className={classes.root}>
                                    <Grid container item xs={6} justify="space-between" alignItems="center">
                                        <Grid container justify="flex-end" item xs={4}>Phường/Xã</Grid>
                                        <Grid item xs={8}>
                                            <Field 
                                                name="phuongxa"
                                                component={SelectField}

                                                disabled={ten_phuongxa ? true : (isShowDetailChildrenFollowIdFamily ? true : false)}
                                                valueLocation={ten_phuongxa ? ten_phuongxa : null}
                                                label="Phường Xã"
                                                
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container item xs={6} justify="space-between" alignItems="center">
                                        <Grid item container justify="flex-end" xs={4}>Thôn/Xóm</Grid>
                                            <Grid item xs={8}>
                                                <Field 
                                                    name="thon"
                                                    component={SelectField}

                                                    disabled={isShowDetailChildrenFollowIdFamily ? true : false}
                                                    valueDetail={id_thon ? id_thon : null}
                                                    valueLocation={tenthon ? tenthon : null}
                                                    thonList={thonList.length > 0 ? thonList : null}
                                                    label="Thôn Xóm"
                                                    
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* End */}

                                {/* End Địa phương */}

                                {/* Thông tin gia đình */}
                                <Grid item xs={12} style={{margin: "10px 0 0 0", fontWeight:700}}>
                                        Thông tin gia đình
                                </Grid>

                                {/* Row */}
                                <Grid item container xs={12} className={classes.root}>
                                    <Grid container item xs={6} justify="space-between" alignItems="center">
                                        <Grid item container justify="flex-end" xs={4}>Mã gia đình</Grid>
                                        <Grid item xs={8}>
                                            <Field 
                                                name="id_giadinh"
                                                component={InputField}

                                                disabled={true}
                                                label="Mã gia đình"
                                                
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container item xs={6} justify="space-between" alignItems="center">
                                        <Grid item container justify="flex-end" xs={4}>Họ tên cha</Grid>
                                        <Grid item xs={8} container alignItems="center">
                                            <Grid item xs={9}>
                                            <Field 
                                                className="detailChildrenForm__formik--field_father"
                                                name="hotencha"
                                                component={InputField}

                                                disabled={true}
                                                label="Họ tên cha"
                                                
                                            />
                                            </Grid>
                                            <Grid item xs={3}>
                                            <Button
                                                disabled={isShowDetailChildrenFollowIdFamily ? true : false}
                                                className="detailChildrenForm__formik--button_father"
                                                size="small"
                                                onClick={() => handleOnClick(1)}
                                                variant="contained" 
                                                style={{backgroundColor:"#35baf6",textTransform: "none",fontSize:"13px"}}
                                            >
                                                <MoreHorizIcon />
                                            </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* End */}

                                {/* Row */}
                                <Grid item container xs={12} className={classes.root}>
                                    <Grid container item xs={6} justify="space-between" alignItems="center">
                                        <Grid item container justify="flex-end" xs={4}>Họ tên mẹ</Grid>
                                        <Grid item xs={8} container alignItems="center">
                                            <Grid item xs={9}>
                                                <Field 
                                                    name="hotenme"
                                                    component={InputField}

                                                    disabled={true}
                                                    label="Họ tên mẹ"
                                                    
                                                />
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Button
                                                    disabled={isShowDetailChildrenFollowIdFamily ? true : false}
                                                    className="detailChildrenForm__formik--button_father"
                                                    size="small"
                                                    onClick={() => handleOnClick(2)}
                                                    variant="contained" 
                                                    style={{backgroundColor:"#35baf6",textTransform: "none",fontSize:"13px"}}
                                                >
                                                    <MoreHorizIcon />
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid container item xs={6} justify="space-between" alignItems="center">
                                        <Grid item container justify="flex-end" xs={4}>Người nuôi dưỡng</Grid>
                                        <Grid item xs={8} container alignItems="center">
                                            <Grid item xs={9}>
                                                <Field 
                                                    name="nguoinuoiduong"
                                                    component={InputField}

                                                    disabled={true}
                                                    label="Người nuôi dưỡng"
                                                    
                                                />
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Button
                                                    disabled={isShowDetailChildrenFollowIdFamily ? true : false}
                                                    className="detailChildrenForm__formik--button_father"
                                                    size="small"
                                                    onClick={() => handleOnClick(3)}
                                                    variant="contained" 
                                                    style={{backgroundColor:"#35baf6",textTransform: "none",fontSize:"13px"}}
                                                >
                                                    <MoreHorizIcon />
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* End */}

                                {/* Row */}
                                <Grid container item xs={12} className={classes.root}>
                                    <Grid container item xs={6} justify="space-between" alignItems="center">
                                        <Grid item container justify="flex-end" xs={4}>Điện thoại</Grid>
                                        <Grid item xs={8}>
                                            <Field 
                                                name="sodienthoai"
                                                component={InputField}

                                                disabled={isShowDetailChildrenFollowIdFamily ? true : false}
                                                label="Điện thoại"
                                                
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container item xs={6} alignItems="center">
                                        <Grid container item xs={6} justify="center" alignItems="center">
                                            <Grid item xs={2}>
                                                <Field 
                                                    name="hoancanh"
                                                    disabled={isShowDetailChildrenFollowIdFamily ? true : false}
                                                    hongheo={checkBox===1 ? true : false}
                                                    hoancanh={checkedCheckBox.hongheo}
                                                    onHandleCheckBox={onHandleCheckBox}
                                                    component={CheckBoxField}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                Hộ nghèo
                                            </Grid>
                                        </Grid>
                                        <Grid container item xs={6} alignItems="center">
                                            <Grid item xs={2}>
                                                <Field 
                                                    name="hoancanh"
                                                    disabled={isShowDetailChildrenFollowIdFamily ? true : false}
                                                    hocanngheo={checkBox===2 ? true : false}
                                                    hoancanh={checkedCheckBox.hocanngheo}
                                                    onHandleCheckBox={onHandleCheckBox}
                                                    component={CheckBoxField}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                Hộ Cận nghèo
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* End */}

                                {/* Row */}
                                <Grid container item xs={12} justify="space-between" alignItems="center" className={classes.root}>
                                    <Grid item container justify="flex-end" spacing={3} xs={2}>Địa chỉ</Grid>
                                    <Grid item xs={10}>
                                        <Field 
                                            name="diachi"
                                            component={InputField}

                                            disabled={isShowDetailChildrenFollowIdFamily ? true : false}
                                            label="Địa chỉ"
                                        />
                                    </Grid>
                                </Grid>
                                {/* End */}

                                {/* Gia dinh End */}

                                {/* Thông tin trẻ em */}
                                <Grid item xs={12} style={{margin: "10px 0 0 0", fontWeight:700}}>
                                        Thông tin trẻ em
                                </Grid>

                                {/* Row */}
                                <Grid item container xs={12} className={classes.root}>
                                    <Grid container justify="space-between" alignItems="center" item xs={6}>
                                        <Grid item container justify="flex-end" xs={4}>Mã trẻ em</Grid>
                                        <Grid item xs={8}>
                                            <Field 
                                                name="id_treem"
                                                component={InputField}

                                                disabled={true}
                                                label="Mã trẻ em"
                                                
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container justify="space-between" alignItems="center" item xs={6}>
                                    <Grid item container justify="flex-end" xs={4}>Họ và tên</Grid>
                                        <Grid item xs={8}>
                                            <Field 
                                                name="hoten"
                                                component={InputField}

                                                label="Họ tên"
                                                
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* End */}

                                {/* Row */}
                                <Grid container item xs={12} className={classes.root}>
                                    <Grid container justify="space-between" alignItems="center" item xs={6}>
                                        <Grid item container justify="flex-end" xs={4}>Ngày sinh</Grid>
                                        <Grid item xs={8}>
                                            <Field 
                                                name="ngaysinh"
                                                component={DateField}

                                                valueDate={ngaysinh ? ngaysinh : null}
                                                label="Ngày sinh"
                                                
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container justify="space-between" alignItems="center" item xs={6}>
                                        <Grid item container justify="flex-end" xs={4}>Dân tộc</Grid>
                                        <Grid item xs={8}>
                                            <Field 
                                                name="dantoc"
                                                component={SelectField}

                                                valueDetail={dantoc ? dantoc : null}
                                                label="Dân tộc"
                                                danToc={danToc}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* End */}

                                {/* Row */}
                                <Grid container item xs={12} className={classes.root}>
                                    <Grid container justify="space-between" alignItems="center" item xs={6}>
                                        <Grid item container justify="flex-end" xs={4}>Giới tính</Grid>
                                        <Grid item xs={8}>
                                            <Field 
                                                name="gioitinh"
                                                component={SelectField}

                                                valueDetail={gioitinh ? gioitinh : null}
                                                label="Giới tính"
                                                gioiTinh={Gender}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container justify="space-between" alignItems="center" item xs={6}>
                                        <Grid item container justify="flex-end" xs={4}>Trình độ học vấn</Grid>
                                        <Grid item xs={8}>
                                            <Field 
                                                name="trinhdohocvan"
                                                component={SelectField}

                                                valueDetail={trinhdohocvan ? trinhdohocvan : null}
                                                label="Trình độ học vấn"
                                                lopHocCaoNhat={LHCN}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* End */}

                                {/* Row */}
                                <Grid container item xs={12} className={classes.root}>
                                    {/* <Grid container justify="space-between" alignItems="center" item xs={6}>
                                        <Grid item container justify="flex-end" xs={4}>Tình trạng học tập</Grid>
                                        <Grid item xs={8}>
                                            <Field 
                                                name="tinhtranghoctap"
                                                component={SelectField}

                                                valueDetail={tinhtranghoctap ? tinhtranghoctap : null}
                                                label="Tình trạng học tập"
                                                tinhTrangHocTap={TTHT}
                                            />
                                        </Grid>
                                    </Grid> */}
                                    <Grid container justify="space-between" alignItems="center" item xs={6}>
                                        <Grid item container justify="flex-end" xs={4}>Ghi chú</Grid>
                                        <Grid item xs={8}>
                                            <Field 
                                                name="ghichu"
                                                component={InputField}

                                                label="Ghi chú"
                                                
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* End */}

                                {/* Tre Em End */}


                            {/* </Paper> */}
                        </Grid>
                                {/* Dialog */}
                                <DialogFullScreen
                                    open={openFullScreen}
                                    handleOnClose={() => setOpenFullSreen(false)}
                                    handleOnChangeParent={handleOnChangeParent}
                                    statusFamily={statusPositionFamily}
                                />
                                <Snackbars
                                    open={snackbars}
                                    onHandleSnackbars={onHandleSnackbars}
                                    message={msg}
                                />
                    </Form>
                )
            }}
        </Formik>
        </div>
    )
}

DetailChildrenForm.propTypes = {

}

const mapStateToProps = state => ({
    msg: state.error.msg,
    code: state.error.code,
})

export default connect(mapStateToProps, { clearErrors })(DetailChildrenForm)

