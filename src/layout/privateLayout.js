import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthentication } from '~/hook/useAuth';
import Header from '~/components/header';
import Footer from '~/components/footer';
import Sidebar from '~/components/sidebar';
import { message } from 'antd';

export default function PrivateRoute({ children }) {
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthentication()) {
            message.error('There was an error with the authentication process. You must log in again to continue.');
            navigate('/login');
        }
    });

    return (
        <div className="flex flex-col h-screen pt-[50px]">
            <Header className="overflow-y-auto" />
            <div className="flex h-full">
                <Sidebar className=" w-[15%] bg-gray-800 overflow-y-auto" />
                <div className=" w-[85%] h-full overflow-y-auto shadow-xl">
                    {children}
                    <Footer />
                </div>
            </div>
        </div>
    );
}
