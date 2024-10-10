
export const isAuthentication = () => {
    return localStorage.getItem('accessToken') !== null;
};

export const getUser = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        return null;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));

    return payload;
};

export const isAdmin = () => {
    const user = getUser();
    return user && user.roleId !== 2;
};


export const isUser = () => {
    const user = getUser();
    return user && user.roleId === 2;
};


