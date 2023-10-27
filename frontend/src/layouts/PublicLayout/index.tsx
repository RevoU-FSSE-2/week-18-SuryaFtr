import { Header, Content, Footer } from '../../containers';
import { Navbar } from '../../components';
import { useMemo } from 'react';
import { Navigate, useLocation } from 'react-router-dom'
import React from 'react';
import { Layout } from 'antd';

const { Sider } = Layout;

const PublicLayout: React.FC = () => {
    const token = localStorage.getItem('accesToken');

    const location = useLocation();

    const isAuth = useMemo(
        () => {
            if (location.pathname) {
                return !!token
            }

        },
        [location.pathname, token]
    )

    if (isAuth) {
        return (
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={(broken) => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                    style={{
                        position: "sticky",
                    }}
                >
                    <Navbar />
                </Sider>
                <Layout>
                    <Header />
                    <Content />
                    <Footer />
                </Layout>
            </Layout>
        )
    }
    return <Navigate to="/login" />
}

export default PublicLayout