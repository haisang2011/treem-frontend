import React from 'react'
import SearchIcon from '@material-ui/icons/Search';
import { UserAdminitrationData } from '../../../../helpers/getUserAdministration';
import { Button, Grid } from '@material-ui/core'
import { Field, Formik, Form } from 'formik'
import InputField from '../../../../custom-fields/InputField';
import SelectField from '../../../../custom-fields/SelectField';
import HoanCanhDacBietField from '../../../../custom-fields/HoanCanhDacBietField';
import UserAdministrationField from '../../../../custom-fields/UserAdministrationField';
import DateField from '../../../../custom-fields/DateField';
import DescriptionIcon from '@material-ui/icons/Description'

const ROLE_CITY=1;
const ROLE_DISTRICT=2;
const ROLE_WARD=3;
const FIELD_DISTRICT=2;
const FIELD_WARD=1;

function SearchForm({
     onSubmitForm, locationUser, onChoose,
     quanhuyenList, phuongxaList,
}) {
    
    const {
        id_tinh, id_quan, id_xa,
        thanhpho, quanhuyen, phuongxa
    } = locationUser

    const onSubmitFormik = (values, action) => {
        onSubmitForm(values)
    }

    const [role, setRole] = React.useState(ROLE_CITY);

    const onHandleChooseRole = (value) => {
        setRole(value)
    }

    const [step, setStep] = React.useState(role===ROLE_DISTRICT ? 0 : (role===ROLE_WARD ? 1 : null));
    const onHandleChoose = (value, field) => {
        if(field==="district"){
            onChoose(value, FIELD_DISTRICT)
            setStep(FIELD_DISTRICT-1);
        }else if(field==="ward"){
            onChoose(value, FIELD_WARD)
            setStep(FIELD_WARD-1);
        }else{
            setStep(0);
        }
    }

    const initialValues = {
        role: 1,
        tinhthanhpho: id_tinh || '',
        quanhuyen: '',
        phuongxa: '',
        idnguoidung: '',
        tenhienthi: ''
    }

    return (
        <div className="searchForm">
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmitFormik}
        >
            {formikProps => {

                return (
                    <Form autoComplete="off" className="searchForm__formik">
                        <Grid container item xs={12} spacing={1}>
                            <Grid item xs={role===1 ? 6 : (role===2 ? 4 : (role===3 ? 3 : null))}>
                                <Field 
                                    name="role"
                                    component={UserAdministrationField}

                                    label="Loại quyền"
                                    listRole={UserAdminitrationData}
                                    onChooseRole={onHandleChooseRole}
                                    valueRole={role}
                                />
                            </Grid>

                            <Grid item xs={role===1 ? 6 : (role===2 ? 4 : (role===3 ? 3 : null))}>
                                <Field 
                                    name="tinhthanhpho"
                                    component={UserAdministrationField}

                                    label="Tỉnh Thành Phố"
                                    thanhpho={[{value:id_tinh,title:thanhpho}]}
                                />
                            </Grid>
                        
                            {role===2 && (
                                <Grid item xs={4}>
                                <Field 
                                    name="quanhuyen"
                                    component={SelectField}

                                    label="Quận Huyện"
                                    quanHuyenList={quanhuyenList.length > 0 ? quanhuyenList : null}
                                />
                                </Grid>
                            )}
                            
                            {role===3 && (
                                <>
                                <Grid item xs={3}>
                                <Field 
                                    name="quanhuyen"
                                    component={SelectField}

                                    label="Quận Huyện"
                                    quanHuyenList={quanhuyenList.length > 0 ? quanhuyenList : null}
                                    onChoose={onHandleChoose}
                                    authDistrictLocation={true}
                                />
                                </Grid>
                                <Grid item xs={3}>
                                    <Field 
                                    name="phuongxa"
                                    component={SelectField}

                                    label="Phường xã"
                                    phuongXaList={phuongxaList.length > 0 ? phuongxaList : null}
                                    onChoose={onHandleChoose}
                                    authWardLocation={true}
                                    readOnly={phuongxaList.length > 0 ? false : true}
                                    />
                                </Grid>
                                </>
                            )}
                        </Grid>

                        <Grid container item xs={12} spacing={1}>
                            <Grid item xs={6}>
                                <Field 
                                name="idnguoidung"
                                component={InputField}

                                label="ID người dùng"
                                placeholder="Nhập ID người dùng..."
                                type="text"
                                />
                            </Grid>

                            <Grid container item xs={6}>

                                <Grid item xs={9}>
                                    <Field 
                                    name="tenhienthi"
                                    component={InputField}

                                    label="Tên hiển thị"
                                    placeholder="Nhập tên hiển thị..."
                                    type="text"
                                    />
                                </Grid>

                                <Grid container alignItems="center" justify="flex-end" item xs={3}>
                                    <Button
                                        startIcon={<SearchIcon />}
                                        size="small"
                                        type="submit" 
                                        variant="contained" 
                                        style={{backgroundColor:"#35baf6",textTransform: "none",fontSize:"13px",}}
                                        >
                                            Tìm kiếm
                                    </Button>
                                </Grid>

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
