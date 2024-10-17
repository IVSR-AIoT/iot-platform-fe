import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getUser, isAuthentication } from '~/hook/useAuth';
import { QuestionCircleFilled, UserOutlined } from '@ant-design/icons';
import { navigation } from '~/configs/headerConfig';
import { LogoutOutlined } from '@ant-design/icons';
import { useContext, useState } from 'react';
import { modalSupportContext } from '~/hook/useContext';

function Header() {
    const navigate = useNavigate();
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const location = useLocation();
    const userName = getUser()?.name;
    const context = useContext(modalSupportContext);

    const openIssueSupport = () => {
        context.showModal();
        setMenuIsOpen(false);
    };

    const checkNavigation = () => {
        navigation.forEach((item) => {
            item.selected = item.route === location.pathname;
        });
    };

    checkNavigation();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/login');
    };

    return (
        <div className="h-[50px] w-full bg-white flex justify-between items-center px-[30px] fixed top-0 z-50 shadow-sm">
            <div className="h-full w-full flex">
                {navigation.map((item, index) => {
                    return (
                        <Link
                            to={item.route}
                            key={index}
                            className={`w-[100px] text-center transition-colors duration-200  leading-[46px] rounded-xl ${
                                item.selected ? 'text-[#0866FF] hover:bg-none' : 'text-[#606266] hover:bg-[#F2F2F2]'
                            }`}
                        >
                            {item.title}

                            {item.selected && <div className="w-full h-[4px] bg-[#0866FF]"></div>}
                        </Link>
                    );
                })}
            </div>
            <div className="relative">
                {isAuthentication() ? (
                    <div
                        className="flex justify-center items-center cursor-pointer w-8 h-8 rounded-full bg-[#E4E6EB]"
                        onClick={() => {
                            setMenuIsOpen(!menuIsOpen);
                        }}
                    >
                        <UserOutlined />
                    </div>
                ) : (
                    <div className="flex justify-between w-[160px] cursor-pointer items-center h-[50px]">
                        <Link
                            to="/login"
                            className="text-[#606266] hover:bg-[#F2F2F2] transition-colors duration-200 h-full leading-[50px] w-[80px] rounded-lg text-center"
                        >
                            Login
                        </Link>
                        <div className="h-5 w-[1px] bg-black"></div>
                        <Link
                            to="/register"
                            className="text-[#606266] hover:bg-[#F2F2F2] transition-colors duration-200 h-full leading-[50px] w-[80px] rounded-lg text-center"
                        >
                            SignUp
                        </Link>
                    </div>
                )}
                {menuIsOpen && (
                    <ul className="absolute top-[42px] right-0 shadow text-gray-800 rounded-lg z-50 bg-white w-[200px] p-1">
                        <li className="flex items-center px-4 py-2 cursor-pointer hover:bg-[#F2F2F2] hover:rounded-lg">
                            <div className="flex justify-center items-center w-7 h-7 rounded-full bg-[#D8DADF] mr-3">
                                <UserOutlined />
                            </div>
                            <p className="font-semibold">{userName}</p>
                        </li>
                        <li
                            className="flex items-center px-4 py-2 cursor-pointer hover:bg-[#F2F2F2] hover:rounded-lg"
                            onClick={openIssueSupport}
                        >
                            <div className="flex justify-center items-center w-7 h-7 rounded-full bg-[#D8DADF] mr-3">
                                <QuestionCircleFilled />
                            </div>
                            <p className="font-semibold">Support</p>
                        </li>
                        <li
                            className="flex items-center px-4 py-2 cursor-pointer hover:bg-[#F2F2F2] hover:rounded-lg"
                            onClick={handleLogout}
                        >
                            <div className="flex justify-center items-center w-7 h-7 rounded-full bg-[#D8DADF] mr-3">
                                <LogoutOutlined />
                            </div>
                            <p className="font-semibold">Logout</p>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Header;
