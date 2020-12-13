import React from 'react'
import './ChangePassword.scss';
import { Button } from '@material-ui/core'
import { Formik, Form, Field } from 'formik'
import InputField from '../../../../custom-fields/InputField';
import { ChangePasswordSchema } from '../../../../validation/signIn';


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

function ChangePasswordForm({ initialValues, onSubmitForm }) {

    const onSubmitFormik = (values, action) => {
        onSubmitForm(values)
    }

    return (
        <div className="changePasswordForm">
            <h3 className="changePasswordForm__title">Đăng Nhập Vào Hệ Thống</h3>
        <Formik
            initialValues={initialValues}
            validationSchema={ChangePasswordSchema}
            onSubmit={onSubmitFormik}
        >
            {formikProps => {

                return (
                    <Form autoComplete="off" className="changePasswordForm__formik">

                        <Field 
                            name="oldPassword"
                            component={InputField}

                            label="Mật khẩu cũ"
                            placeholder="Xin hãy nhập mật khẩu cũ..."
                            type="password"
                        />
                        <br />


                        <Field 
                            name="newPassword"
                            component={InputField}

                            label="Mật khẩu mới"
                            placeholder="Xin hãy nhập mật khẩu mới..."
                            type="password"
                        />

                        <Field 
                            name="confirmPassword"
                            component={InputField}

                            label="Xác nhận mật khẩu mới"
                            placeholder="Xin hãy xác nhận mật khẩu mới..."
                            type="password"
                        />
                        <br />

                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary"
                        >
                            ĐỔI MẬT KHẨU
                        </Button>

                    </Form>
                )
            }}
        </Formik>
        </div>
    )
}

ChangePasswordForm.propTypes = {

}

export default ChangePasswordForm




