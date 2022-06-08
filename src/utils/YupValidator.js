import * as Yup from 'yup';

// RegEx for validation
const emailRegExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/

// Schema for yup
const ProfileSchema = Yup.object().shape({
    hoTen: Yup.string()
        .min(5, 'Quá ngắn!')
        .max(50, 'Quá dài!')
        .required('Bắt buộc'),
    email: Yup.string()
        .min(5, 'Quá ngắn!')
        .max(50, 'Quá dài!')
        .matches(emailRegExp, "Định dạng email không đúng")
        .required('Bắt buộc'),
    diaChi: Yup.string()
        .min(2, 'Quá ngắn!')
        .max(80, 'Quá dài!')
});

const LoginSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'Quá ngắn!')
        .max(50, 'Quá dài!')
        .required('Bắt buộc'),
    password: Yup.string()
        .min(2, 'Quá ngắn!')
        .max(50, 'Quá dài!')
        .required('Bắt buộc')
})

const validator = {
    ProfileSchema,
    LoginSchema
}

export default validator