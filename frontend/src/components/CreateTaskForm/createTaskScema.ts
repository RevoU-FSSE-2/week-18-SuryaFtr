import * as yup from 'yup'

export const initialValues = {
    task: '',
    description: '',
    priority: ''
}

export const validationSchema = yup.object({
    task: yup.string()
        .min(3, 'Task is too short, must have at least 3 characters!')
        .required('Please input Task!'),
    description: yup.string()
        .required('Please input Description!'),
    priority: yup.string()
        .required('Please select Priority!')
})