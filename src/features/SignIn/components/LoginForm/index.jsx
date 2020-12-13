import React from 'react'
import './LoginForm.scss';
import { Button } from '@material-ui/core'
import { FastField, Formik, Form } from 'formik'
import InputField from '../../../../custom-fields/InputField';
import {SignInSchema} from '../../../../validation/signIn';


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

function LoginForm({ initialValues, onSubmitForm, message, code }) {

    const onSubmitFormik = (values, action) => {
        onSubmitForm(values)
    }

    return (
        <div className="loginForm">
            <h3 className="loginForm__title">Đăng Nhập Vào Hệ Thống</h3>
        <Formik
            initialValues={initialValues}
            validationSchema={SignInSchema}
            onSubmit={onSubmitFormik}
        >
            {formikProps => {

                return (
                    <Form autoComplete="off" className="loginForm__formik">

                        <FastField 
                            name="username"
                            component={InputField}

                            label="ID NGƯỜI DÙNG"
                            placeholder="Xin hãy nhập tài khoản..."
                            type="text"
                            message={message}
                            code={code}
                        />
                        <br />


                        <FastField 
                            name="password"
                            component={InputField}

                            label="MẬT KHẨU"
                            placeholder="Xin hãy nhập mật khẩu..."
                            type="password"
                            message={message}
                            code={code}
                        />
                        <br />

                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary"
                        >
                            ĐĂNG NHẬP
                        </Button>

                    </Form>
                )
            }}
        </Formik>
        </div>
    )
}

LoginForm.propTypes = {

}

export default LoginForm




