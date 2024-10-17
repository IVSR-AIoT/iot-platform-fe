import { useState, createContext } from 'react';

const modalSupportContext = createContext();

const ModalSupportProvider = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const value = { isModalOpen, showModal, handleCancel };
    return <modalSupportContext.Provider value={value}>{children}</modalSupportContext.Provider>;
};

export { modalSupportContext, ModalSupportProvider };
