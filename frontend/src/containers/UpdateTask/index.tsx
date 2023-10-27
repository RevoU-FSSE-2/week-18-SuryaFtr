import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row, Card } from 'antd';
import { UpdateTask as UpTask, UpdateTaskForm as UpdateTaskFormType, BaseUrl } from "../../types"
import { UpdateTaskForm } from "../../components"
import { useNavigate, useParams } from "react-router-dom"


const UpdateTask: React.FC = () => {
    const navigate = useNavigate()

    const [upTask, setUpdateTask] = useState<UpTask>()

    const { id } = useParams();

    const getTask = useCallback(
        async () => {
            const fetching = await fetch(BaseUrl + `/task/${id}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accesToken')}`
                },
            });
            const response: UpTask = await fetching.json();

            setUpdateTask(response)
        },
        [id]
    )

    useEffect(
        () => {
            getTask()
        },
        [getTask]
    )

    const onSubmit = async (values: UpdateTaskFormType) => {
        const token = localStorage.getItem('accesToken');
        if (!token) {
            navigate('/login')
            return
        }
        try {
            const fetching = await fetch(BaseUrl + `/task/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('accesToken')}`
                },
                body: JSON.stringify(values)
            })
            const response: UpdateTaskFormType = await fetching.json()
            if (fetching.ok) {
                alert("Task Successfully Updated!")
                navigate('/')
            }

        } catch (error) {
            alert("Failed to Update Task!")
        }
    }
    if (upTask) {
        return (
            <>

                <Row>
                    <Col span={12} offset={6}>
                        <Card title="Update Task" bordered={false} style={{ width: '100%', marginTop: 50 }}>
                            <UpdateTaskForm onSubmit={onSubmit} task={upTask} />
                        </Card>
                    </Col>
                </Row>

            </>
        )
    }
    return null
};

export default UpdateTask;