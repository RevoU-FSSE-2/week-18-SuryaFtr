import * as yup from 'yup'

export const initialValues = {
    username: '',
    password: ''
}

export const validationSchema = yup.object({
    username: yup.string()
        .required('Please input your Name!'),
    password: yup.string()
        .required('Please input your Password!')
})