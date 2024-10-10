import { Input, Button, message } from 'antd';
import { useState } from 'react';
import { forgotPassword } from '~/services/userService';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');

    const handleSubmit = async () => {
        const data = { email: email };
        try {
            await forgotPassword(data);
            message.success('Submit successful!');
        } catch (error) {
            console.log(error);
            message.error('Fail to submit email');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-[350px] h-[350px] p-6">
                <h1 className="text-[40px] text-center font-medium mb-12">Forgot Password</h1>
                <div className="w-full">
                    <Input
                        placeholder="Enter your email"
                        value={email}
                        type="email"
                        required
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <div className="flex justify-center mt-4">
                        <Button type="primary" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
