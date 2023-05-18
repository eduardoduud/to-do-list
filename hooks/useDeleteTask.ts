import { useState } from 'react';
import axios from 'axios';

interface DeleteTaskResponse {
  success: boolean;
  error?: string;
}

const useDeleteTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const deleteTask = async (postId: number) => {
    setLoading(true);
    setError(undefined);

    try {
      await axios.post('/api/delete', { postId });
    } catch (error) {
      setError('Failed to delete task');
    }

    setLoading(false);
  };

  return {
    loading,
    error,
    deleteTask,
  };
};

export default useDeleteTask;