import { ColumnsType, TableProps } from 'antd/es/table';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { GetTodoList, BaseUrl } from '../../types';
import { TaskList } from '../../components'
import { Button } from 'antd';


const TodoList = () => {

    const [todolist, setTodoList] = useState<GetTodoList[]>([]);
    const navigate = useNavigate();

    const getTodoList = useCallback(
        async () => {
            const token = localStorage.getItem('accesToken');
            if (!token) {
                navigate('/login')
                return
            }

            try {
                const response = await fetch(BaseUrl + '/task', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accesToken')}`
                    },
                });
                const data = await response.json();

                if (data) {
                    const datas = data.map((todolist: { _id: string; }) => ({
                        ...todolist,
                        key: todolist._id
                    }));
                    setTodoList(datas);
                } else {
                    setTodoList([]);
                }
            } catch (error) {
                console.error("ERROR:", error);
                alert("Failed to fetch Task List!");
            }
        }, [navigate]);

    useEffect(() => {
        getTodoList()
    }, [getTodoList])

    const deleteTask = async (id: string) => {
        try {
            const fetching = await fetch(BaseUrl + `/task/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accesToken')}`
                },
            })

            const response = await fetching.json()

            if (response) {
                setTodoList((todolist) => todolist.filter((todolist) => todolist._id !== id))
            }
        } catch (error) {
            alert(error)
        }
    }

    const columns: ColumnsType<GetTodoList> = [
        {
            title: 'Task',
            dataIndex: 'task',
            key: 'task',
            render: (text) => text || 'N/A',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (text) => text || 'N/A',
        },
        {
            title: 'Priority',
            dataIndex: 'priority',
            key: 'priority',
            render: (text) => text || 'N/A',
            filters: [
                {
                    text: 'High',
                    value: 'high',
                },
                {
                    text: 'Medium',
                    value: 'medium',
                },
                {
                    text: 'Low',
                    value: 'low',
                }
            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value: string, record) => record.priority.includes(value),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text) => text || 'N/A',
            filters: [
                {
                    text: 'Done',
                    value: 'done',
                },
                {
                    text: 'Pending',
                    value: 'pending',
                }
            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value: string, record) => record.status.includes(value),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <>
                    <Button className={'button-update'} type={'primary'} color={'yellow'}
                        onClick={() => navigate(`/update-task/${record._id}`)}
                    >Update</Button>
                    {' '}
                    <Button className={'button-delete'} type={'primary'}
                        onClick={() => {
                            if (window.confirm('Are you sure you wish to delete this item?')) {
                                deleteTask(record._id)
                            }
                        }}
                    >Delete</Button>
                </>
            ),
        },
    ];
    const onChange: TableProps<GetTodoList>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    return (
        <>
            <div className='item-center'>
                <Button type={'primary'} onClick={() => navigate('/create-task')}>Create Task</Button>
            </div>
            <TaskList columns={columns} data={todolist} onChange={onChange} />
        </>
    )
}

export default TodoList