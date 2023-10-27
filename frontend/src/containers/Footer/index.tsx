import React from 'react';
import { Layout } from 'antd';

const BaseFooter = Layout;

const Footer: React.FC = () => {
    return (
        <BaseFooter style={{
            textAlign: 'center',
            height: 50,
            paddingInline: 50,
            lineHeight: '50px',
            backgroundColor: 'transparent'
        }}>Copyright © 2023, Developed By Surya Faturohman.</BaseFooter>
    )
}

export default Footer