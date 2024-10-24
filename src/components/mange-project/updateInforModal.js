import { Form, Modal, Input, message } from 'antd';
import { useEffect } from 'react';
import { updateProject } from '~/services/projectServices';

export default function UpdateInforModal({
    isOpenModal,
    setIsModalOpen,
    detailProject,
    usersInProject,
    getListProject,
}) {
    const [form] = Form.useForm();

    const submitForm = async (data) => {
        const form = {
            ...data,
            usersId: usersInProject,
        };
        try {
            await updateProject(detailProject.id, form);
            message.success('Project updated successfully!');
            getListProject();
        } catch {
            message.error('Failed to update the project. Please try again.');
        }
    };

    const handleOk = () => {
        form.submit();
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (isOpenModal && detailProject) {
            form.setFieldsValue({
                name: detailProject.name || '',
                description: detailProject.description || '',
            });
        }
    }, [isOpenModal, detailProject, form]);

    return (
        <Modal open={isOpenModal} onOk={handleOk} onCancel={handleCancel} title="Update Project">
            <Form
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 16,
                }}
                form={form}
                onFinish={submitForm}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Please input description!',
                        },
                    ]}
                >
                    <Input.TextArea rows={7} />
                </Form.Item>
            </Form>
        </Modal>
    );
}
