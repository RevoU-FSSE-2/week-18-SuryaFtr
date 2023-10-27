import React from 'react';
import { Col, Row, Card, Button } from 'antd';
import { LoginForm as LoginFormProps, LoginResponse, BaseUrl } from "../../types"
import { LoginForm } from "../../components"
import { useNavigate } from "react-router-dom"

const Login: React.FC = () => {
    const navigate = useNavigate()
    const onClick = () => {
        navigate('/register')
    };

    const onSubmit = async (data: LoginFormProps) => {
        const fetching = await fetch(BaseUrl + '/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        const response: LoginResponse = await fetching.json()
        const token = response.accesToken
        const tokenRefresh = response.refreshToken

        try {
            if (fetching.ok) {
                localStorage.setItem('accesToken', token)
                localStorage.setItem('tokenRefresh', tokenRefresh)
                window.location.replace('/')
            } else {
                alert(response.error)
            }
        }
        catch (error) {
            alert("Login Failed!")
        }

    }
    return (
        <>
            <Row>
                <Col span={8} offset={8}>
                    <Card title="Input your account" bordered={false} style={{ width: '100%', marginTop: 50 }}>
                        <LoginForm onSubmit={onSubmit} />
                        <div>
                            <p>Don't have account? <Button className={'link'} onClick={onClick}>Register here!</Button></p>
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Login