import { useCallback, useEffect, useState } from 'react';
import Dialog from '~/components/dialog';
import { getProject } from '~/services/projectServices';
import Card from '~/components/card';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import CreateSupportModal from '~/components/createSupportModal';

export default function Project() {
    const [totalProjects, setTotalProjects] = useState([]);
    const navigate = useNavigate;
    const [selectedProject, setSelectedProject] = useState(null);
    const handleGetProject = (data) => {
        setSelectedProject(data);
    };
    const handleCloseDialog = () => {
        setSelectedProject(null);
    };

    const getProjectFunc = useCallback(async () => {
        try {
            const res = await getProject();
            setTotalProjects(res.data);
        } catch (error) {
            message.error(error);
            if (error.status === 401) {
                localStorage.removeItem('accessToken');
                navigate('/');
            }
        }
    }, [navigate]);
    useEffect(() => {
        getProjectFunc();
    }, [getProjectFunc]);

    return (
        <div className="h-screen bg-[#F0F2F5]">
            <div className="pt-[20px] pl-[20px]">
                <Dialog data={selectedProject} onclose={handleCloseDialog} getProjectFunc={getProjectFunc} />
            </div>

            <div className="flex flex-wrap">
                {totalProjects.map((project, index) => {
                    return (
                        <div key={index} className="w-[20%] flex justify-center h-[200px] mt-[20px]">
                            <Card data={project} getProjectFunc={getProjectFunc} onclick={handleGetProject} />
                        </div>
                    );
                })}
            </div>
            <CreateSupportModal />
        </div>
    );
}
