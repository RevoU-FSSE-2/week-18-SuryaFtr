import { Outlet } from 'react-router-dom'
import { Footer } from '../../containers';

const RegisterLoginLayout = () => {
    return (
        <>
            <Outlet />
            <Footer />
        </>
    )
}

export default RegisterLoginLayout