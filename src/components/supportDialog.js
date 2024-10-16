import { Form, message, Modal, Radio, Spin } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import { replyService } from '~/services/supportService';

export default function SupportDialog({ detailRequest, closeDialog, getSupportRequests }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const replySupportRequest = async (value) => {
        if (!value.reply) {
            message.error('Answer is empty!');
            return;
        }
        setLoading(true);
        try {
            await replyService(value, detailRequest.projectId);
            message.success('Successful!');
            setIsModalOpen(false);
            closeDialog();
            getSupportRequests();
        } catch (error) {
            message.error('Error occurred while sending the reply.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (detailRequest) {
            setIsModalOpen(true);
            form.setFieldsValue({
                reply: detailRequest.adminResponse || '',
            });
        }
    }, [detailRequest, form]);

    const handleOk = () => {
        form.submit();
        
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        closeDialog();
    };

    return (
        <div>
            <Modal
                title="Customer Support Response"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                confirmLoading={loading}
                okButtonProps={{ style: { display: detailRequest?.isReplied ? 'none' : 'inline-block' } }}
            >
                <Spin spinning={loading}>
                    <Form form={form} onFinish={replySupportRequest}>
                        <Form.Item label="Issue Subject:">
                            <p className="text-gray-800 font-semibold">
                                {detailRequest?.subject || 'No subject provided'}
                            </p>
                        </Form.Item>
                        {detailRequest?.isReplied && (
                            <Form.Item label="Replied by:">
                                <p className="text-gray-800 font-semibold">
                                    {detailRequest?.adminName} <span>- {detailRequest?.adminEmail}</span>
                                </p>
                            </Form.Item>
                        )}
                        <Form.Item label="User:">
                            <p className="text-gray-800 font-semibold">
                                {detailRequest?.username} <span>- {detailRequest?.userEmail}</span>
                            </p>
                        </Form.Item>
                        <Form.Item label="Issue Description:">
                            <p className="text-gray-800 font-semibold">{detailRequest?.description}</p>
                        </Form.Item>
                        <Form.Item label="Notification Method" name={'method'} >
                            <Radio.Group defaultValue="email">
                                <Radio value="email">Email</Radio>
                                <Radio value="message">Message</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item name="reply" label="Reply">
                            {detailRequest?.isReplied ? (
                                <p className="text-gray-800 font-semibold">{detailRequest?.adminResponse}</p>
                            ) : (
                                <TextArea rows={7} />
                            )}
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>
        </div>
    );
}
