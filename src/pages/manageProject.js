import { deleteProject, getListProjectService, getUserInProject } from '~/services/projectServices';
import Search from 'antd/es/transfer/search';
import { projectColumn } from '~/configs/columnSupport';
import { Table, Button, message, Modal } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import UpdateInforModal from '~/components/mange-project/updateInforModal';
import CreateSupportModal from '~/components/manage-support/createSupportModal';
import { ExclamationCircleOutlined, UserAddOutlined } from '@ant-design/icons';
import { formatDate } from '~/configs/utils';

export default function ManageProject() {
    const [columns, setColumns] = useState([]);
    const [detailProject, setDetailProject] = useState([]);
    const [usersInProject, setUsersInProject] = useState([]);
    const [isOpenModal, setIsModalOpen] = useState(false);
    const [modal, contextHolder] = Modal.useModal();
    const confirm = (projectId) => {
        modal.confirm({
            title: 'Delete Project',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you sure you want to delete this project? This action cannot be undone.',
            okText: 'Confirm',
            cancelText: 'Cancel',
            onOk: () => handleDeleteProject(projectId),
        });
    };

    const getListProject = async () => {
        try {
            const res = await getListProjectService();
            const data = res.map((project, i) => {
                return {
                    key: i,
                    id: project.id,
                    createdAt: formatDate(project.createdAt),
                    updatedAt: formatDate(project.updatedAt),
                    name: project.name,
                    description: project.description,
                    adminName: project.createdBy.name,
                };
            });
            setColumns(data);
        } catch {
            message.error('Failed to fetch the project list. Please try again.');
        }
    };

    const handleDeleteProject = async (projectId) => {
        try {
            await deleteProject(projectId);
            message.success('Project deleted successfully!');
            getListProject();
        } catch {
            message.error('Failed to delete the project. Please try again.');
        }
    };

    const handleOpenModal = async (projectId, record) => {
        const users = await getUserInProject(projectId);
        const usersId = users.data.map((user) => user.id);

        setUsersInProject(usersId);
        
    };

    useEffect(() => {
        getListProject();
    }, []);

    const modifiedProjectColumn = useMemo(() => {
        return [
            {
                title: 'Users',
                dataIndex: 'user',
                key: 'user',
                width: 100,
                render: () => {
                    return (
                        <div>
                            <Button type="primary">
                                <UserAddOutlined />
                            </Button>
                        </div>
                    );
                },
            },
            ...projectColumn,
            {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
                width: 180,
                render: (_, record) => (
                    <div>
                        <Button
                            type="primary"
                            ghost
                            className="mr-2"
                            onClick={() => {
                                handleOpenModal(record.id, record);
                                setIsModalOpen(true);
                                setDetailProject(record);
                            }}
                        >
                            Update
                        </Button>
                        <Button danger ghost onClick={() => confirm(record.id)}>
                            Delete
                        </Button>
                    </div>
                ),
            },
        ]; // eslint-disable-next-line
    }, []);

    return (
        <div className="h-screen w-full p-5 bg-[#F0F2F5]">
            <div className="w-[20%] mb-5">
                <Search placeholder="input search loading with enterButton" loading enterButton />
            </div>
            <Table columns={modifiedProjectColumn} dataSource={columns} />
            <UpdateInforModal
                setIsModalOpen={setIsModalOpen}
                getListProject={getListProject}
                isOpenModal={isOpenModal}
                detailProject={detailProject}
                usersInProject={usersInProject}
            />
            <CreateSupportModal />
            {contextHolder}
        </div>
    );
}
