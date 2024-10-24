import { Table } from 'antd';
import Search from 'antd/es/input/Search';
import React, { useCallback, useEffect, useState } from 'react';
import SupportDialog from '~/components/manage-support/supportDialog';
import { getList, getListByQuery } from '~/services/supportService';
import { columns as initialColumns } from '~/configs/columnSupport';
import useDebounce from '~/hook/useDebounce';
import { formatDate } from '~/configs/utils';
import CreateSupportModal from '~/components/manage-support/createSupportModal';

export default function ManageSupport() {
    const [supportRequests, setSupportRequests] = useState([]);
    const [detailRequest, setDetailRequest] = useState();
    const [query, setQuery] = useState('');

    const debouncedValue = useDebounce(query, 500);

    const columns = initialColumns.map((col) => {
        if (col.dataIndex === 'checked') {
            return {
                ...col,
                onCell: (record) => ({
                    onClick: () => handleRowClick(record),
                }),
            };
        }
        return col;
    });

    const getSupportRequests = useCallback(async () => {
        try {
            let res;
            if (debouncedValue.trim() === '') {
                res = await getList();
            } else {
                res = await getListByQuery(debouncedValue);
            }

            const data = res.map((item) => {
                return {
                    key: item.id,
                    subject: item.title,
                    username: item.user.name,
                    userEmail: item.user.email,
                    id: item.id,
                    createdAt: formatDate(item.createdAt),
                    updatedAt: item.isReplied ? formatDate(item.updatedAt) : '',
                    description: item.description,
                    adminResponse: item.reply,
                    projectId: item.id,
                    isReplied: item.isReplied,
                    adminName: item.isReplied ? item.admin.name : '',
                    adminEmail: item.isReplied ? item.admin.email : '',
                    methodMessage: item.methodMessage,
                };
            });
            setSupportRequests(data);
        } catch (error) {}
    }, [debouncedValue]);

    useEffect(() => {
        getSupportRequests();
    }, [getSupportRequests]);

    const handleRowClick = (record, rowIndex) => {
        setDetailRequest(record);
    };

    const handleCloseDialog = () => {
        setDetailRequest(null);
    };
    return (
        <div className="h-auto bg-[#F0F2F5]">
            <div className="p-3 w-[30%]">
                <Search
                    className="my-[20px]"
                    placeholder="Search issue or description"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                    }}
                />
            </div>
            <Table pagination={{ pageSize: 20 }} dataSource={supportRequests} columns={columns} />
            <SupportDialog
                detailRequest={detailRequest}
                closeDialog={handleCloseDialog}
                getSupportRequests={getSupportRequests}
            />
            <CreateSupportModal />
        </div>
    );
}
