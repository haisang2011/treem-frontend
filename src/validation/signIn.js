import * as Yup from 'yup';

const SignInSchema = Yup.object().shape({
    username: Yup.string()
        .required('tài khoản không được rỗng'),
    password: Yup.string()
        .required('mật khẩu không được rỗng')
});

export default SignInSchema