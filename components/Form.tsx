import toast from "react-hot-toast";
import axios from "axios";
import Button from "./Button";

import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import usePosts from "@/hooks/usePosts";
import useRegisterModal from "@/hooks/useRegisterModal";
import usePost from "@/hooks/usePost";

import { useCallback, useState } from "react";
import { signOut } from "next-auth/react";

interface FormProps {
    placeholder: String
    isComment?: boolean;
    postId?: string;
}

const Form: React.FC<FormProps> = ({
    isComment,
    postId
}) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const { data: currentUser } = useCurrentUser();
    const { mutate: mutatePosts } = usePosts();
    const { mutate: mutatePost } = usePost(postId as string);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            await axios.post('/api/posts', { title, description, category });

            toast.success('Tweet Created');

            setTitle('');
            setDescription('');
            setCategory('');
            mutatePosts();
            mutatePost();
        } catch {
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }, [title, description, category, mutatePosts, mutatePost]);

    return ( 
        <div className="px-5 py-2">
            {currentUser ? (
                <div>
                    <div className="flex flex-row justify-end">
                    <Button 
                        label="Logout"
                        onClick={signOut}
                    />
                    </div>
                    <p className="flex mb-[35px] text-white justify-center">
                    <a className="underline text-7xl decoration-sky-500">Task</a>&nbsp;<a className="underline text-7xl decoration-pink-500">List</a>
                    </p>
                
                    <div className="flex flex-row justify-center gap-4">
                        <div className="w-1/3">
                            <textarea
                                maxLength={25}
                                disabled={isLoading}
                                placeholder='Title'
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                                className="mt-1 resize-none block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
                            ></textarea>
                            <textarea
                                maxLength={15}
                                disabled={isLoading}
                                placeholder='Category'
                                onChange={(e) => setCategory(e.target.value)}
                                value={category}
                                className="mt-1 resize-none block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
                            ></textarea>
                            <textarea
                                maxLength={5000}
                                disabled={isLoading}
                                placeholder='Description'
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
                            ></textarea>
                            <div className="mt-4 flex flex-row justify-center">
                                <Button 
                                    label="Create new task"
                                    disabled={isLoading || !title || !description || !category}
                                    onClick={onSubmit}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
            <div className="py-8">
                <h1 className="text-white text-2xl text-center mb-4 font-bold">
                   Welcome to Tuliter!
                </h1>
                <p className="text-red-500 text-1xl text-center mb-4 font-semibold">
                    This site is an educational project and is not intended for real usage
                </p>
                <div className="flex flex-row items-center justify-center gap-4">
                    <Button label='Login' onClick={loginModal.onOpen}/>
                    <Button label='Register' onClick={registerModal.onOpen} secondary/>
                </div>
            </div>
            )}
        </div>
     );
}
 
export default Form;