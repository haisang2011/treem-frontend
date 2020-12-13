import * as Yup from 'yup';

const validateDate = () => {
    const age = 18;

    const dateCurrent = new Date();

    const year = dateCurrent.getFullYear();
    const month = dateCurrent.getMonth() + 1;
    const day = dateCurrent.getDay();

    const dateHandle = new Date(`${year-age}/${month}/${day}`);

    return dateHandle;
}

const DetailChildrenSchema = Yup.object().shape({
    thon: Yup.string()
        .required('bạn phải nhập thôn'),
    hotencha: Yup.string().when(['hotenme', 'nguoinuoiduong'], {
        is: (a, b) => !a && !b,
        then: Yup.string().required()
    }),
    hotenme: Yup.string().when(['hotencha', 'nguoinuoiduong'], {
        is: (a, b) => !a && !b,
        then: Yup.string().required()
    }),
    nguoinuoiduong: Yup.string().when(['hotencha', 'hotenme'], {
        is: (a, b) => !a && !b,
        then: Yup.string().required()
    }),
    hoten: Yup.string()
        .required('bạn phải nhập thôn'),
    ngaysinh: Yup.date().min(validateDate()).max(new Date())
        .required('bạn phải nhập ngày sinh'),
    dantoc: Yup.string()
        .required('bạn phải nhập dân tộc'),
    gioitinh: Yup.string()
        .required('bạn phải nhập giới tính'),
}, [['hotencha','hotenme'],['hotencha','nguoinuoiduong'],['hotenme','nguoinuoiduong']]);

export {
    DetailChildrenSchema,
}