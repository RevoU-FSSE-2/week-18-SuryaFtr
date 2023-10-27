import { Button, Input, Typography, Divider } from "antd"
import { useFormik } from "formik"
import { LoginForm as LoginFormProps } from "../../types"
import { initialValues, validationSchema } from "./loginFormSchema"

interface Props {
    onSubmit: (values: LoginFormProps) => void,
}

const LoginForm = ({ onSubmit }: Props) => {

    const handleSubmit = (values: LoginFormProps) => {
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
                <Button type={'primary'} htmlType={"submit"}>Login</Button>
            </div>
        </form>
    )
}

export default LoginForm