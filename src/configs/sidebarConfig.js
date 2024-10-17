import {
    SignalFilled,
    MailOutlined,
    SettingOutlined,
    ProjectOutlined,
    PhoneOutlined,
    ProjectFilled,
} from '@ant-design/icons';
export const listItems = [
    {
        key: 'sub1',
        label: 'Project management',
        icon: <ProjectFilled />,
        children: [
            {
                key: '1',
                icon: <SignalFilled />,
                label: 'Dashboard',
                route: '/dashboard',
            },
            {
                key: '2',
                icon: <ProjectOutlined />,
                label: 'Project',
                route: '/project',
            },
            {
                key: '3',
                icon: <PhoneOutlined />,
                label: 'Device',
                route: '/device',
            },
        ],
    },
    {
        key: 'sub2',
        label: 'Manage Support',
        route: '/manage-support',
        roleid: 2,
        icon: <MailOutlined />,
    },
    {
        key: 'sub3',
        label: 'Navigation Three',
        icon: <SettingOutlined />,
        children: [
            {
                key: '9',
                label: 'Option 9',
            },
            {
                key: '10',
                label: 'Option 10',
            },
            {
                key: '11',
                label: 'Option 11',
            },
            {
                key: '12',
                roleid: 2,
                label: 'Option 12',
            },
        ],
    },
    {
        key: 'sub3',
        label: 'Navigation Three',
        icon: <SettingOutlined />,
        children: [
            {
                key: '9',
                label: 'Option 9',
            },
            {
                key: '10',
                label: 'Option 10',
            },
            {
                key: '11',
                label: 'Option 11',
            },
            {
                key: '12',
                roleid: 2,
                label: 'Option 12',
            },
        ],
    },
    {
        key: 'sub3',
        label: 'Navigation Three',
        icon: <SettingOutlined />,
        children: [
            {
                key: '9',
                label: 'Option 9',
            },
            {
                key: '10',
                label: 'Option 10',
            },
            {
                key: '11',
                label: 'Option 11',
            },
            {
                key: '12',
                roleid: 2,
                label: 'Option 12',
            },
        ],
    },
];
