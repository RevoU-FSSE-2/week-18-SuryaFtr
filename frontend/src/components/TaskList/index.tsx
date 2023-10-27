import { Table } from "antd"
import { ColumnsType } from "antd/es/table";
import { GetTodoList } from "../../types"

interface Props {
    data: GetTodoList[];
    columns: ColumnsType<GetTodoList>;
}

const TaskList = ({ data, columns }: Props) => {

    return (
        <Table columns={columns} dataSource={data} />
    )
}

export default TaskList