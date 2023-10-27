import { Button, Input, Typography, Divider } from "antd"
import { useFormik } from "formik"
import { RegisterForm as RegisterFormProps } from "../../types"
import { initialValues, validationSchema } from "./registerFormSchema"

interface Props {
    onSubmit: (values: RegisterFormProps) => void
}

const RegisterForm = ({ onSubmit }: Props) => {

    const handleSubmit = (values: RegisterFormProps) => {
        onSubmit(values)
    }

    const formMik = useFormik({
        initialValues: initialValues,
        onSubmit: handleSubmit,
        validationSchema: validationSchema
    })

    return (
        <form onSubmit={formMik.handleSubmit}>
            <div>
                <Typography.Paragraph>{'Username'}</Typography.Paragraph>
                <Input name={'username'}
                    placeholder={'Enter Your Username'}
                    value={formMik.values.username}
                    onChange={formMik.handleChange('username')}
                    status={formMik.errors.username && 'error'}
                />
                {formMik.errors.username && (
                    <Typography.Paragraph className={'error-message'}>{formMik.errors.username}</Typography.Paragraph>
                )}
            </div>
            <div>
                <Typography.Paragraph>{'Email'}</Typography.Paragraph>
                <Input name={'email'}
                    placeholder={'Enter Your Email'}
                    value={formMik.values.email}
                    onChange={formMik.handleChange('email')}
                    status={formMik.errors.email && 'error'}
                />
                {formMik.errors.email && (
                    <Typography.Paragraph className={'error-message'}>{formMik.errors.email}</Typography.Paragraph>
                )}
            </div>
            <div>
                <Typography.Paragraph>{'Password'}</Typography.Paragraph>
                <Input name={'password'}
                    placeholder={'Enter Your Password'}
                    value={formMik.values.password}
                    onChange={formMik.handleChange('password')}
                    status={formMik.errors.password && 'error'}
                    type={'password'}
                />
                {formMik.errors.password && (
                    <Typography.Paragraph className={'error-message'}>{formMik.errors.password}</Typography.Paragraph>
                )}
            </div>
            <Divider />
            <div className={"item-right"}>
                <Button type={'primary'} htmlType={"submit"}>Submit</Button>
            </div>
        </form>
    )
}

export default RegisterForm