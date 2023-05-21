import axios from 'axios';
import toast from 'react-hot-toast';
import { MdDelete } from 'react-icons/md';

interface DeletePostButtonProps {
  postId: string
}

const DeletePostButton: React.FC<DeletePostButtonProps> = ({ postId }) => {
  return (
    <MdDelete/>
  );
};

export default DeletePostButton;
