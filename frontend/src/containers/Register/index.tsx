import React from 'react';
import { Col, Row, Card, Button } from 'antd';
import { RegisterForm as RegisterFormProps, BaseUrl } from "../../types"
import { RegisterForm } from "../../components"
import { useNavigate } from "react-router-dom"



const Register: React.FC = () => {
    const navigate = useNavigate()
    const onClick = () => {
        navigate('/login')
    };

    const onSubmit = async (values: RegisterFormProps) => {

        try {
            const fetching = await fetch(BaseUrl + '/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            const response: RegisterFormProps = await fetching.json()
            if (fetching.ok) {
                alert("Register Success!")
                window.location.replace('/login')
            } else {
                alert(response.errors)
            }

        } catch (error) {
            alert("Register Failed!")
        }

    }
    return (
        <>
            <Row>
                <Col span={8} offset={8}>
                    <Card title="Input your new account" bordered={false} style={{ width: '100%', marginTop: 50 }}>
                        <RegisterForm onSubmit={onSubmit} />
                        <div>
                            <p>Already have account? <Button className={'link'} onClick={onClick}>Login here!</Button></p>
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Register