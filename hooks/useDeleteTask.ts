import { useState } from 'react';
import axios from 'axios';

interface DeleteTaskResponse {
  success: boolean;
  error?: string;
}

const useDeleteTask = () => {

  const deleteTask = async (postId: number) => {

    try {
      await axios.post('/api/delete', { postId });
    } catch (error) {
      console.log(error);
    }

  };

  return {
    deleteTask,
  };
};

export default useDeleteTask;