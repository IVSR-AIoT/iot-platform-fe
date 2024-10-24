import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { isAdmin } from '~/hook/useAuth';
import { listItems } from '~/configs/sidebarConfig';

const getMenuItems = (isAdmin) => {
    const filteredItem = listItems
        .filter((item) => !item.roleid)
        .map((item) => {
            if (item.children) {
                return {
                    ...item,
                    children: item.children.filter((childItem) => !childItem.roleid),
                };
            }
            return null;
        });

    return isAdmin ? listItems : filteredItem;
};

const Sidebar = () => {
    const [selectedKey, setSelectedKey] = useState('1');
    const navigate = useNavigate();
    const location = useLocation();
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        setMenuItems(getMenuItems(isAdmin()));
    }, []);

    useEffect(() => {
        const item = menuItems
            .flatMap((item) => item.children || [item])
            .find((item) => item?.route === location.pathname);
        if (item) {
            setSelectedKey(item.key);
        }
    }, [location.pathname, menuItems]);

    const onClick = (e) => {
        const clickItem = menuItems.flatMap((item) => item.children || [item]).find((item) => item.key === e.key);
        if (clickItem) {
            setSelectedKey(clickItem.key);
            navigate(clickItem.route);
        }
    };

    return (
        <Menu
            className="bg-[#F0F2F5]"
            onClick={onClick}
            style={{ width: 256 }}
            selectedKeys={[selectedKey]}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={menuItems}
        />
    );
};

export default Sidebar;
