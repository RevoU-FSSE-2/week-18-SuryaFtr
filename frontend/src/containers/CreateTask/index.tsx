import React from 'react';
import { Col, Row, Card } from 'antd';
import { CreateTask, BaseUrl } from "../../types"
import { CreateTaskForm } from "../../components"
import { useNavigate } from "react-router-dom"


const CreatTask: React.FC = () => {
    const navigate = useNavigate()

    const onSubmit = async (values: CreateTask) => {
        const token = localStorage.getItem('accesToken');
        if (!token) {
            navigate('/login')
            return
        }
        try {
            const fetching = await fetch(BaseUrl + '/task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('accesToken')}`
                },
                body: JSON.stringify(values)
            })
            const response: CreateTask = await fetching.json()
            if (fetching.ok) {
                alert("Task Successfully Created!")
                navigate('/')
            }

        } catch (error) {
            alert("Failed to Create Task!")
        }
    }
    return (
        <>

            <Row>
                <Col span={12} offset={6}>
                    <Card title="Create Task" bordered={false} style={{ width: '100%', marginTop: 50 }}>
                        <CreateTaskForm onSubmit={onSubmit} />
                    </Card>
                </Col>
            </Row>

        </>
    );
};

export default CreatTask;