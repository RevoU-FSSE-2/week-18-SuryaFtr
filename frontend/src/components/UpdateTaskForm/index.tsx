import React from 'react';
import { Button, Input, Select, Divider, Typography } from "antd"
const { TextArea } = Input

import { useFormik } from "formik"
import { UpdateTask, UpdateTaskForm as UpdateTaskFormProps } from "../../types"
import { initialValues, validationSchema } from "./updateTaskScema"


interface Props {
    onSubmit: (values: UpdateTaskFormProps) => void
    task?: UpdateTask
}

const UpdateTaskForm = ({ onSubmit, task }: Props) => {

    const handleSubmit = (values: UpdateTaskFormProps) => {
        onSubmit(values)
    }

    const formMik = useFormik({
        initialValues: task ?? initialValues,
        onSubmit: handleSubmit,
        validationSchema: validationSchema
    })

    return (
        <form onSubmit={formMik.handleSubmit}>
            <div>
                <Typography.Paragraph>{'Task Name'}</Typography.Paragraph>
                <Input name={'task'}
                    placeholder={'Enter Task'}
                    value={formMik.values.task}
                    onChange={formMik.handleChange('task')}
                    status={formMik.errors.task && 'error'}
                />
                {formMik.errors.task && (
                    <Typography.Paragraph className={'error-message'}>{formMik.errors.task}</Typography.Paragraph>
                )}
            </div>
            <div>
                <Typography.Paragraph>{'Description'}</Typography.Paragraph>
                <TextArea rows={3} name={'description'}
                    placeholder="Enter Description"
                    value={formMik.values.description}
                    onChange={formMik.handleChange('description')}
                    status={formMik.errors.description && 'error'}
                />
                {formMik.errors.description && (
                    <Typography.Paragraph className={'error-message'}>{formMik.errors.description}</Typography.Paragraph>
                )}
            </div>
            <div>
                <Typography.Paragraph>{'Priority'}</Typography.Paragraph>
                <Select
                    style={{ width: 150 }}
                    defaultValue={''}
                    value={formMik.values.priority}
                    onChange={formMik.handleChange('priority')}
                    options={[
                        { value: '', label: '', disabled: true },
                        { value: 'low', label: 'Low' },
                        { value: 'medium', label: 'Medium' },
                        { value: 'high', label: 'High' },
                    ]}
                    status={formMik.errors.priority && 'error'}
                >
                </Select>
                {formMik.errors.priority && (
                    <Typography.Paragraph className={'error-message'}>{formMik.errors.priority}</Typography.Paragraph>
                )}
            </div>
            <div>
                <Typography.Paragraph>{'Status'}</Typography.Paragraph>
                <Select
                    style={{ width: 150 }}
                    defaultValue={''}
                    value={formMik.values.status}
                    onChange={formMik.handleChange('status')}
                    options={[
                        { value: '', label: '', disabled: true },
                        { value: 'pending', label: 'Pending' },
                        { value: 'done', label: 'Done' },
                    ]}
                    status={formMik.errors.status && 'error'}
                >
                </Select>
                {formMik.errors.status && (
                    <Typography.Paragraph className={'error-message'}>{formMik.errors.status}</Typography.Paragraph>
                )}
            </div>
            <Divider />
            <div className={"item-right"}>
                <Button type={'primary'} htmlType={"submit"}>Update</Button>
            </div>
        </form>
    )
}

export default UpdateTaskForm