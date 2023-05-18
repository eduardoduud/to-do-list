import axios from 'axios';
import { MdDelete } from 'react-icons/md';

interface DeletePostButtonProps {
  postId: number;
  label?: string;
  secondary?: boolean;
}

const DeletePostButton: React.FC<DeletePostButtonProps> = ({ postId, label, secondary }) => {
  const handleDelete = async () => {
    try {
      await axios.post('/api/deletePost', { postId });
      alert('Task deleted successfully');
      // Atualize o estado ou faça qualquer ação adicional necessária
    } catch (error) {
      console.error(error);
      alert('Failed to delete task');
    }
  };

  return (
    <MdDelete onClick={handleDelete}/>
  );
};

export default DeletePostButton;
