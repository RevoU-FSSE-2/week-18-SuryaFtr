import React from 'react';
import { Layout, theme } from 'antd';

const BaseHeader = Layout;

const Header: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <BaseHeader style={{ padding: 10, textAlign: 'center', background: colorBgContainer }}>
            <h2>To Do List App</h2>
        </BaseHeader>
    )
}

export default Header