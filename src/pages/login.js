import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { checkLogin } from '~/services/userService';
import { message } from 'antd';

function Login() {
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await checkLogin(loginForm);
            localStorage.setItem('accessToken', res.data.accessToken);
            message.success('Login successfully!');
            navigate('/dashboard');
        } catch (err) {
            message.error('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="w-[100%] h-[screen] flex flex-col items-center">
            <h1 className="text-[60px] mt-20 text-[#8f8e8e]">Login</h1>
            <p className="text-[14px] text-center text-[#8f8e8e] my-[20px]">Sign in to continue</p>

            <form className="w-[300px]">
                <h2 className="text-[#8f8e8e] my-1">EMAIL:</h2>
                <input
                    onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                    required
                    className="py-2 px-5 bg-[#ececec] text-[14px] rounded-md w-[100%] focus:outline-none placeholder:text-[#4d4c4c] placeholder:text-[14px]"
                    type="text"
                    value={loginForm.username}
                    placeholder="Type your email"
                />

                <h2 className="text-[#8f8e8e] mt-6 mb-1">PASSWORD:</h2>
                <input
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    required
                    className="px-5 py-2 bg-[#ececec] rounded-md w-[100%] focus:outline-none placeholder:text-[#4d4c4c] placeholder:text-[14px]"
                    type="password"
                    value={loginForm.password}
                    placeholder="Type your password"
                />
                <Link to="/forgot-password" className="text-[#8f8e8e] flex justify-end">
                    <p>Forgot password?</p>
                </Link>

                <button
                    onClick={handleLogin}
                    type="submit"
                    className="block mt-8 bg-[#535353] text-white text-[14px] font-medium w-[140px] h-[40px] rounded-lg mx-auto"
                >
                    Sign in
                </button>
            </form>

            <Link to="/register" className="flex justify-center mt-10 text-[#8f8e8e]">
                <p>Create new account?</p>
            </Link>
        </div>
    );
}

export default Login;
