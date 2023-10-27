import * as yup from 'yup'

export const initialValues = {
    username: '',
    email: '',
    password: ''
}

export const validationSchema = yup.object({
    username: yup.string()
        .min(5, 'Username is too short, must have at least 5 characters!')
        .required('Please input your Name!'),
    email: yup.string()
        .email('Invalid email format')
        .required('Please input your Email!'),
    password: yup.string()
        .min(8, 'Password is too short, must have at least 8 characters!')
        .required('Please input your Password!')
        .matches(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/, 'Must have at least 1 numbers or letter')
})