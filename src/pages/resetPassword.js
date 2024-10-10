import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Input, Modal, message } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updatePassword } from '~/services/userService';

export default function ResetPassword() {
    const params = useParams();
    const navigate = useNavigate();
    const [modal, contextHolder] = Modal.useModal();
    const confirm = useCallback(() => {
        modal.confirm({
            title: 'Error',
            icon: <ExclamationCircleOutlined />,
            content: 'Your session has expired, go back home and try again.',
            okText: 'Ok',
            onOk: () => navigate('/'),
            cancelButtonProps: { style: { display: 'none' } },
        });
    }, [modal, navigate]);

    const [form, setForm] = useState({
        password: '',
        confirmPassword: '',
    });
    useEffect(() => {
        const payload = JSON.parse(atob(params.token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        const timeLeftInMilliseconds = (payload.exp - currentTime) * 1000;

        if (timeLeftInMilliseconds <= 0) {
            confirm();
            return;
        }

        const timeout = setTimeout(() => {
            confirm();
        }, timeLeftInMilliseconds);

        return () => {
            clearTimeout(timeout);
        };
    }, [params.token, modal, navigate, confirm]);

    const handleChangeValue = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async () => {
        localStorage.setItem('accessToken', params.token);
        if (form.password !== form.confirmPassword) {
            message.error('Password and confirm password do not match');
            return;
        } else {
            try {
                await updatePassword({ password: form.password });
                localStorage.removeItem('accessToken');
                navigate("/login")
                message.success('Password changed successfully');
            } catch (error) {
                console.log(error);
                message.error('Failed to change password');
            }
        }
    };

    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <div className="w-[350px] h-[400px]">
                <h1 className="text-[45px] font-medium text-center mb-16">Reset password</h1>
                <Input.Password
                    placeholder="New password"
                    name="password"
                    value={form.password}
                    className="mb-4"
                    onChange={handleChangeValue}
                />
                <Input.Password
                    placeholder="Confirm password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    className="mb-4"
                    onChange={handleChangeValue}
                />
                <div className="flex justify-center">
                    <Button type="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </div>
            </div>
            {contextHolder}
        </div>
    );
}
