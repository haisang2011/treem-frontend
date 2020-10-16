import React, { useState } from 'react'
import './SearchForm.scss';
import danToc from '../../../../helpers/getNation'
import { TextField, MenuItem, Button, makeStyles, Grid } from '@material-ui/core'
import { Field, Formik, Form } from 'formik'
import InputField from '../../../../custom-fields/InputField';
import SelectField from '../../../../custom-fields/SelectField';


// Custom style for Form //
// const useStyles = makeStyles(theme => ({
//     root: {
//         '&':{
//             paddingBottom: 15
//         },
//         '& > *': {
//             display: "flex",
//             flexDirection: 'column',
//             margin: theme.spacing(3),
//         }
//     },
// }))

function SearchForm({
     initialValues, onSubmitForm, locationUser,
     quanhuyenList, phuongxaList, thonList
}) {
    
    const {
        id_tinh, id_quan, id_xa,
        thanhpho, quanhuyen, phuongxa
    } = locationUser

    const onSubmitFormik = (values, action) => {
        onSubmitForm(values)
    }

    return (
        <div className="searchForm">
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmitFormik}
        >
            {formikProps => {
                const { values, touched, errors } = formikProps

                return (
                    <Form autoComplete="off" className="searchForm__formik">
                        <Grid container item xs={12} spacing={1}>
                            <Grid item xs={3}>
                                <Field 
                                    name="tinhthanhpho"
                                    component={SelectField}

                                    label="Tỉnh Thành Phố"
                                    disabled={thanhpho ? true : false}
                                    valueLocation={thanhpho ? thanhpho : null}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Field 
                                name="quanhuyen"
                                component={SelectField}

                                label="Quận Huyện"
                                disabled={quanhuyen ? true : false}
                                valueLocation={quanhuyen ? quanhuyen : null}
                                quanHuyenList={!quanhuyen && thanhpho ? quanhuyenList : null}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Field 
                                name="phuongxa"
                                component={SelectField}

                                label="Phường xã"
                                disabled={phuongxa ? true : false}
                                valueLocation={phuongxa ? phuongxa : null}
                                phuongXaList={!phuongxa && quanhuyen ? phuongxaList : null}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Field 
                                name="thon"
                                component={SelectField}

                                label="Thôn Xóm"
                                disabled={false}
                                thonList={phuongxa ? thonList : null}
                            />
                            </Grid>
                            <Grid item xs={3}>
                                <Field 
                                name="hoten-treem"
                                component={InputField}

                                label="Họ tên trẻ em"
                                placeholder="Nhập họ tên trẻ em..."
                                type="text"
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Field 
                                name="hoten-bome"
                                component={InputField}

                                label="Họ tên bố hoặc mẹ"
                                placeholder="Nhập họ tên bố hoặc mẹ..."
                                type="text"
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Field 
                                name="magiadinh"
                                component={InputField}

                                label="Mã gia đình"
                                placeholder="Nhập mã gia đình..."
                                type="text"
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Field 
                                name="trangthai"
                                component={SelectField}

                                label="Trạng Thái"
                                trangThai={true}
                                disabled={false}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Field 
                                name="tinhthanhpho"
                                component={SelectField}

                                label="Dân Tộc"
                                disabled={false}
                                danToc={danToc}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Field 
                                name="gioitinh"
                                component={SelectField}

                                label="Giới Tính"
                                disabled={false}
                                gioiTinh={true}
                                />
                            </Grid>
                            <Grid item xs={6} container justify="flex-end" alignItems="center">
                                <Button 
                                type="submit" 
                                variant="contained" 
                                style={{backgroundColor:"#35baf6"}}
                                >
                                    Tìm kiếm
                                </Button>
                            </Grid>
                        </Grid>
                        
                    </Form>
                )
            }}
        </Formik>
        </div>
    )
}

SearchForm.propTypes = {

}

export default SearchForm
