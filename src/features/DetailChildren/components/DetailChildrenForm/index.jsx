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
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch } from 'react-redux'
import { Status } from '../../../../contants/actionType'
import danToc from '../../../../helpers/getNation';
import {Gender} from '../../../../helpers/getGender';
import {TTHT} from '../../../../helpers/getListTinhTrangHocTap';
import {LHCN} from '../../../../helpers/getLopHocCaoNhat';

const useStyles = makeStyles(() => ({
    root : {
        '& .MuiGrid-grid-xs-4' : {
            flexBasis: "30.333333%",
        }
    }
}))

function DetailChildrenForm({ onHandleCloseDetail, detailChildrenInfo, }) {

    const classes = useStyles();

    const {
        id_tinhthanhpho, id_quanhuyen, id_phuongxa,
        ten_tinhthanhpho, ten_quanhuyen, ten_phuongxa,
        id_giadinh, hotencha, hotenme, nguoinuoiduong,
        sodienthoai, diachi, id_treem, ngaysinh, gioitinh,
        hoten, dantoc, tinhtranghoctap, lophoccaonhat, ghichu,
        hoancanh,
    } = detailChildrenInfo

    console.log("Tre Em ::: ",detailChildrenInfo)

    const initialValues = {
        tinhthanhpho: id_tinhthanhpho || '',
        quanhuyen: id_quanhuyen || '',
        phuongxa: id_phuongxa || '',
        thon: '',
        id_giadinh: id_giadinh ? id_giadinh : '',
        hotencha: hotencha ? hotencha : '',
        hotenme: hotenme ? hotenme : '',
        nguoinuoiduong: nguoinuoiduong ? nguoinuoiduong : '',
        sodienthoai: sodienthoai ? sodienthoai : '',
        diachi: diachi ? diachi : '',
        id_treem: id_treem ? id_treem : '',
        hoten: hoten ? hoten : '',
        ngaysinh: '',
        dantoc: dantoc ? dantoc :'',
        gioitinh: gioitinh ? gioitinh :'',
        lophoccaonhat: lophoccaonhat ? lophoccaonhat :'',
        tinhtranghoctap: tinhtranghoctap ? tinhtranghoctap :'',
        ghichu: ghichu ? ghichu :'',
    }

    const onSubmitFormik = () => {
        
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
                                onClick={onHandleCloseDetail}
                            >
                                Đóng
                            </Button>
                        </Grid>

                        <Grid container xs={12} className={classes.root} style={{marginTop:"10px"}}>
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
                                                
                                                disabled={ten_tinhthanhpho ? true : false}
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

                                                    disabled={ten_quanhuyen ? true : false}
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

                                                disabled={ten_phuongxa ? true : false}
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

                                                disabled={id_giadinh ? true : false}
                                                label="Mã gia đình"
                                                
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container item xs={6} justify="space-between" alignItems="center">
                                        <Grid item container justify="flex-end" xs={4}>Họ tên cha</Grid>
                                        <Grid item xs={8}>
                                            <Field 
                                                name="hotencha"
                                                component={InputField}

                                                label="Họ tên cha"
                                                
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* End */}

                                {/* Row */}
                                <Grid item container xs={12} className={classes.root}>
                                    <Grid container item xs={6} justify="space-between" alignItems="center">
                                        <Grid item container justify="flex-end" xs={4}>Họ tên mẹ</Grid>
                                        <Grid item xs={8}>
                                            <Field 
                                                name="hotenme"
                                                component={InputField}

                                                label="Họ tên mẹ"
                                                
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container item xs={6} justify="space-between" alignItems="center">
                                        <Grid item container justify="flex-end" xs={4}>Người nuôi dưỡng</Grid>
                                        <Grid item xs={8}>
                                            <Field 
                                                name="nguoinuoiduong"
                                                component={InputField}

                                                label="Người nuôi dưỡng"
                                                
                                            />
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
                                                name="dienthoai"
                                                component={InputField}

                                                label="Điện thoại"
                                                
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container item xs={6} alignItems="center">
                                        <Grid container item xs={6} justify="center" alignItems="center">
                                            <Grid item xs={2}>
                                                <Field 
                                                    name="hongheo"
                                                    hongheo={hoancanh===1 ? true : false}
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
                                                    name="hocanngheo"
                                                    hocanngheo={hoancanh===2 ? true : false}
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

                                                disabled={id_treem ? true : false}
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
                                        <Grid item container justify="flex-end" xs={4}>Lớp học cao nhất</Grid>
                                        <Grid item xs={8}>
                                            <Field 
                                                name="lophoccaonhat"
                                                component={SelectField}

                                                valueDetail={lophoccaonhat ? lophoccaonhat : null}
                                                label="Lớp học cao nhất"
                                                lopHocCaoNhat={LHCN}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* End */}

                                {/* Row */}
                                <Grid container item xs={12} className={classes.root}>
                                    <Grid container justify="space-between" alignItems="center" item xs={6}>
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
                                    </Grid>
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

                    </Form>
                )
            }}
        </Formik>
        </div>
    )
}

DetailChildrenForm.propTypes = {

}

export default DetailChildrenForm

