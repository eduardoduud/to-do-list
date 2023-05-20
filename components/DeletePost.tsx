import axios from 'axios';
import toast from 'react-hot-toast';
import { MdDelete } from 'react-icons/md';

interface DeletePostButtonProps {
  postId: string
}

const DeletePostButton: React.FC<DeletePostButtonProps> = ({ postId }) => {
  const handleDelete = async () => {
    try {
      await axios.post('/api/delete', { postId });
      toast.success('Task deleted');
      // Atualize o estado ou faça qualquer ação adicional necessária
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <MdDelete/>
  );
};

export default DeletePostButton;
