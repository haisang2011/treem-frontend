import * as Yup from 'yup';

const SignInSchema = Yup.object().shape({
    username: Yup.string()
        .required('tài khoản không được rỗng'),
    password: Yup.string()
        .required('mật khẩu không được rỗng')
});

const ChangePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('phải nhập mật khẩu cũ'),
    newPassword: Yup.string().required('phải nhập mật khẩu mới').min(8, 'Độ dài tối thiếu 8 kí tự'),
    confirmPassword: Yup.string().required('phải xác nhận mật khẩu mới').oneOf([Yup.ref('newPassword'), null], 'Mật khẩu xác nhận không chính xác')
});

export {
    SignInSchema,
    ChangePasswordSchema,
}