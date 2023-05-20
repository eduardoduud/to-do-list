import axios from "axios";

import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import useEditModal from "@/hooks/useEditModal";

import Input from "../Input";
import Modal from "../Modal";
import usePosts from "@/hooks/usePosts";
import usePost from "@/hooks/usePost";

const EditModal = () => {
  const { mutate: mutatePosts, data: postId } = usePosts();
  const { mutate: mutatePost } = usePost();
  const editModal = useEditModal();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTitle(title)
    setCategory(category)
    setDescription(description)
  }, [title, category, description]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.patch(`/api/posts/${postId}`, { title, category, description });

      mutatePosts();
      mutatePost();

      toast.success('Updated');

      editModal.onClose();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [editModal, title, category, description, mutatePosts, mutatePost, postId]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        disabled={isLoading}  
      />
      <Input 
        placeholder="Category"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
        disabled={isLoading} 
      />
      <Input 
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        disabled={isLoading} 
      />
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit task"
      actionLabel="Save"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
}

export default EditModal;