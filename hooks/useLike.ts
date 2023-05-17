import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import useCurrentUser from "./useCurrentUser"
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import usePosts from "./usePosts";
import axios from "axios";

const useLike = ({ postId, userId }: { postId: string, userId?: string}) =>{
    const { data: currentUser } = useCurrentUser();
    const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
    const { mutate: mutateFetchedPosts } = usePosts(userId);

    const loginModal = useLoginModal();

    const hasDone = useMemo(() => {
        const list = fetchedPost?.likedIds || [];

        return list.includes(currentUser?.id);
    }, [currentUser?.id, fetchedPost?.likedIds]);

    const toggleDone = useCallback(async () => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request;

            if (hasDone) {
                request = () => axios.delete('/api/done', { params: { postId } });
            } else {
                request = () => axios.post('/api/done', { postId });
            }

            await request();
            mutateFetchedPost();
            mutateFetchedPosts();

            toast.success('Success');

        } catch (error) {
            toast.error('Something went wrong');
        };
    }, [currentUser, hasDone, postId, mutateFetchedPost, mutateFetchedPosts, loginModal]);

    return {
        hasDone,
        toggleDone
    }
};

export default useLike;