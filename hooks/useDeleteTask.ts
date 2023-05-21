import axios from 'axios';
import toast from 'react-hot-toast';

interface DeleteTaskResponse {
  postId: number;
  success: boolean;
  error?: string;
}

const useDeleteTask = () => {

  const deleteTask = async (postId: number) => {

    try {
      await axios.post('/api/delete', { postId });
      toast.success('Task deleted');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }

  };

  return {
    deleteTask,
  };
};

export default useDeleteTask;