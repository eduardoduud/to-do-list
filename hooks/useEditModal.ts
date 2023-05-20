import { create } from 'zustand';

interface EditModalStore{
    isOpen: boolean;
    postId: string;
    onOpen: () => void;
    onClose: () => void;
};

const useEditModal = create<EditModalStore>((set) => ({
    isOpen: false,
    postId: "",
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({ isOpen: false}),
}));

export default useEditModal;