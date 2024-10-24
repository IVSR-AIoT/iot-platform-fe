import api from './api';

export const createProject = async (data) => {
    const response = await api.post('/project', data);
    return response;
};
export const getProject = async () => {
    const response = await api.get('/project');
    return response.data;
};
export const getUserInProject = async (projectId) => {
    const response = await api.get(`/project/${projectId}`);
    return response.data;
};
export const updateProject = async (projectId, data) => {
    const response = await api.put(`/project/${projectId}`, data);
    return response;
};
export const deleteProject = async (projectId) => {
    const response = await api.delete(`/project/${projectId}`);
    return response;
};

export const getListProjectService = async () => {
    const response = await api.get('/project/list');
    return response.data;
};
