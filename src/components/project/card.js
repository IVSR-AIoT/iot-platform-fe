import { isAdmin } from '~/hook/useAuth';
import { DeleteOutlined, EditOutlined, EyeOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { deleteProject } from '~/services/projectServices';
import { message, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Card({ data, getProjectFunc, onclick }) {
    const navigate = useNavigate();
    const [modal, contextHolder] = Modal.useModal();
    const [loading, setLoading] = useState(false); // Loading state

    const confirmDelete = () => {
        modal.confirm({
            title: 'Confirm Deletion',
            icon: <ExclamationCircleOutlined />,
            content: 'Do you want to delete this project?',
            okText: 'Yes',
            cancelText: 'No',
            onOk: deleteProjectFunc,
        });
    };

    const deleteProjectFunc = async () => {
        setLoading(true); 
        try {
            const res = await deleteProject(data.project.id);
            message.success('Delete successful!');
            getProjectFunc();
            return res;
        } catch (error) {
            message.error('Deletion failed');
            if (error.status === 401) {
                localStorage.removeItem('accessToken');
                navigate('/');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-[85%] p-4 bg-white border border-gray-200 rounded-lg shadow line-clamp-6">
            <div className="flex justify-between h-[40px] border-b-2 items-center overflow-hidden line-clamp-2 ">
                <p
                    onClick={() => {
                        navigate('/device');
                    }}
                    className="cursor-pointer overflow-hidden w-[100px] "
                >
                    {data.project.name}
                </p>
                {isAdmin() ? (
                    <div className="flex">
                        <button onClick={confirmDelete} disabled={loading}>
                            <DeleteOutlined className="text-[20px] hover:text-blue-600 transition-colors" />
                        </button>

                        <button
                            onClick={() => {
                                onclick(data);
                            }}
                        >
                            <EditOutlined className="text-[20px] hover:text-blue-600 transition-colors ml-3" />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => {
                            onclick(data);
                        }}
                    >
                        <EyeOutlined className="text-[20px] hover:text-blue-600 transition-colors" />
                    </button>
                )}
            </div>
            <div className="whitespace-pre-wrap ">{data.project.description}</div>
            {contextHolder}
        </div>
    );
}
