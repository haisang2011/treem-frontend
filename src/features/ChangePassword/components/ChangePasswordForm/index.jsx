import React from 'react'
import './ChangePassword.scss';
import { Button } from '@material-ui/core'
import { Formik, Form, Field, ErrorMessage } from 'formik'
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

function ChangePasswordForm({ initialValues, onSubmitForm, code, msg }) {

    const onSubmitFormik = (values, action) => {
        onSubmitForm(values)
    }

    return (
        <div className="changePasswordForm">
            <h3 className="changePasswordForm__title">Đổi mật khẩu</h3>
        <Formik
            initialValues={initialValues}
            validationSchema={ChangePasswordSchema}
            onSubmit={onSubmitFormik}
        >
            {formikProps => {

                const { errors, touched } = formikProps;

                return (
                    <Form autoComplete="off" className="changePasswordForm__formik">

                        <Field 
                            name="oldPassword"
                            component={InputField}

                            label="Mật khẩu cũ"
                            placeholder="Xin hãy nhập mật khẩu cũ..."
                            type="password"
                        />
                        { code && msg ? <div style={{ color: 'red' }}>{msg}</div> : 
                            <ErrorMessage name="oldPassword">
                                { msg__ => <div style={{ color: 'red' }}>{msg__}</div> }
                            </ErrorMessage>
                        }
                        

                        <Field 
                            name="newPassword"
                            component={InputField}

                            label="Mật khẩu mới"
                            placeholder="Xin hãy nhập mật khẩu mới..."
                            type="password"
                        />
                        <ErrorMessage name="newPassword">
                            { msg => <div style={{ color: 'red' }}>{msg}</div> }
                        </ErrorMessage>

                        <Field 
                            name="confirmPassword"
                            component={InputField}

                            label="Xác nhận mật khẩu mới"
                            placeholder="Xin hãy xác nhận mật khẩu mới..."
                            type="password"
                        />
                        <ErrorMessage name="confirmPassword">
                            { msg => <div style={{ color: 'red' }}>{msg}</div> }
                        </ErrorMessage>
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




