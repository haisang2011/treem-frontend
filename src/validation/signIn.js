import * as Yup from 'yup';

const SignInSchema = Yup.object().shape({
    username: Yup.string()
        .required('tài khoản không được rỗng'),
    password: Yup.string()
        .required('mật khẩu không được rỗng')
});

const ChangePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('phải nhập mật khẩu cũ'),
    newPassword: Yup.string().required('phải nhập mật khẩu mới'),
    confirmPassword: Yup.string().required('phải xác nhận mật khẩu mới')
});

export {
    SignInSchema,
    ChangePasswordSchema,
}