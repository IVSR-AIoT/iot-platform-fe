import { Button, Form, Input, message, Modal, Select } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAdmin, isUser } from '~/hook/useAuth';
import { createProject, getUserInProject, updateProject } from '~/services/projectServices';
import { getListUser } from '~/services/userService';

function Dialog({ getProjectFunc, data, onclose }) {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [totalUser, setTotalUser] = useState([]);
    const [userInProject, setUserInProject] = useState([]);
    const navigate = useNavigate;
    const onCreate = async (value) => {
        value.description = value.description || '';
        value.userIds = value.userIds || [];

        value.userIds = value.userIds.map((item) => {
            if (typeof item === 'object') {
                return item.value;
            }
            return item;
        });

        console.log(value);
        try {
            if (data) {
                await updateProject(data.project.id, value);
                message.success('Your project has been successfully updated.');
            } else {
                await createProject(value);
                message.success('Your project has been successfully created.');
            }
            form.resetFields();
            setOpen(false);
            getProjectFunc();
            onclose();
        } catch (error) {
            message.error('There was an error creating the project.');
            if (error.status === 401) {
                localStorage.removeItem('accessToken');
                navigate('/');
            }
        }
    };

    const handleCancel = () => {
        setOpen(false);
        form.resetFields();
        onclose();
    };

    const getTotalUser = async () => {
        try {
            const res = await getListUser(2);
            const users = res.items.map((item) => ({
                label: item.email,
                value: item.id,
            }));
            setTotalUser(users);
        } catch (error) {
            message.error('Failed to fetch the user list.');
            if (error.status === 401) {
                localStorage.removeItem('accessToken');
                navigate('/');
            }
        }
    };

    const getUserByProjectId = useCallback(
        async (projectId) => {
            try {
                const res = await getUserInProject(projectId);
                const projectUsers = res.data.map((item) => ({
                    label: item.email,
                    value: item.id,
                }));
                setUserInProject(projectUsers);
            } catch (error) {
                message.error('There was an error while loading project of users.');
                if (error.status === 401) {
                    localStorage.removeItem('accessToken');
                    navigate('/');
                }
            }
        },
        [navigate],
    );

    useEffect(() => {
        if (data) {
            getUserByProjectId(data.project.id);
        }
    }, [data, getUserByProjectId]);

    useEffect(() => {
        if (data && userInProject.length >= 0) {
            form.setFieldsValue({
                name: data.project.name,
                description: data.project.description,
                userIds: userInProject,
            });
        }
    }, [userInProject, data, form]);

    return (
        <>
            {isAdmin() && (
                <Button type="primary" onClick={() => setOpen(true)}>
                    Add project
                </Button>
            )}

            <Modal
                open={open || !!data}
                title={isUser() ? 'View project' : data ? 'Edit project' : 'Create a new project'}
                okText={isAdmin() ? 'Submit' : ''}
                cancelText={isAdmin() ? 'Cancel' : ''}
                onCancel={handleCancel}
                onOk={isAdmin() ? form.submit : undefined}
                destroyOnClose
                okButtonProps={{ style: { display: isUser() ? 'none' : 'inline-block' } }}
            >
                <Form
                    layout={!isUser() ? 'vertical' : null}
                    form={form}
                    name="form_in_modal"
                    initialValues={{
                        name: '',
                        description: '',
                        userIds: [],
                    }}
                    onFinish={onCreate}
                >
                    <Form.Item
                        name="name"
                        label={<label className="text-gray-800 font-semibold">Name</label>}
                        required={!isUser() && true}
                    >
                        {isUser() ? (
                            <p>{form.getFieldValue('name')}</p>
                        ) : (
                            <Input placeholder="Name" />
                        )}
                    </Form.Item>

                    <Form.Item
                        name="userIds"
                        label={<label className="text-gray-800 font-semibold">Users in project</label>}
                    >
                        {isUser() ? (
                            <ul>
                                {userInProject.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            {item.label}
                                        </li>
                                    );
                                })}
                            </ul>
                        ) : (
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="Search or select users"
                                options={totalUser}
                                value={userInProject}
                                onChange={(value) => {
                                    setUserInProject(value);
                                }}
                                showSearch
                                optionFilterProp="label"
                                onFocus={getTotalUser}
                                autoClearSearchValue={true}
                                disabled={isUser()}
                            />
                        )}
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label={<label className="text-gray-800 font-semibold">Description</label>}
                    >
                        {!isUser() ? (
                            <Input.TextArea rows={5} placeholder="Description" />
                        ) : (
                            <p>{form.getFieldValue('description')}</p>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default Dialog;
