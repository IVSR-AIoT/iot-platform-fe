import { Modal, Form, Input, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useContext } from 'react';
import { modalSupportContext } from '~/hook/useContext';
import { CreateIssueService } from '~/services/supportService';
export default function CreateSupportModal() {
    const context = useContext(modalSupportContext);
    const [form] = Form.useForm();

    const createIssue = async (value) => {
        if (value.title.trim() === '' || value.description.trim() === '') {
            message.error('data is empty!');
            return;
        }
        try {
            await CreateIssueService(value);
            message.success('successful!');
        } catch (error) {
            message.error('error');
        }
    };

    const handleOk = () => {
        form.submit();
        context.handleCancel();
    };

    return (
        <div>
            <Modal title="Basic Modal" open={context.isModalOpen} onOk={handleOk} onCancel={context.handleCancel}>
                <Form
                    form={form}
                    onFinish={createIssue}
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                >
                    <Form.Item name={'title'} label={'Title:'} required={true}>
                        <Input placeholder="Title" />
                    </Form.Item>
                    <Form.Item name={'description'} label={'Description:'} required={true}>
                        <TextArea rows={7} placeholder="Description" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
