import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';

const items: MenuProps['items'] = [
    {
        label: 'Task List',
        key: '/'
    },
    {
        label: 'Logout',
        key: '/login'
    },
]

const Navbar = () => {
    const navigate = useNavigate();
    const onClick: MenuProps['onClick'] = (e) => {
        if (e.key == '/login') {
            localStorage.removeItem('accesToken');
            localStorage.removeItem('tokenRefresh');
            window.location.replace(e.key)
        }
        navigate(e.key)
    };


    return (
        <>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                onClick={onClick}
                items={items}
                style={{
                    position: "sticky",
                }}
            />
        </>
    )
}

export default Navbar