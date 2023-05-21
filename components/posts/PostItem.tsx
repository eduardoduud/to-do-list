import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { MdOutlineDone, MdDownloadDone } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";

import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import useLike from "@/hooks/useLike";
import useDeleteTask from "@/hooks/useDeleteTask";
import useEditModal from "@/hooks/useEditModal";

import DeletePostButton from "../DeletePost";


interface PostItemProps {
    data: Record<string, any>;
    userId?: string;
}


const PostItem: React.FC<PostItemProps> = ({ data, userId }) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const { data: currentUser } = useCurrentUser();
    const { hasDone, toggleDone } = useLike({ postId: data.id, userId });
    const { deleteTask } = useDeleteTask();

    const editModal = useEditModal();

    const onDone = useCallback((event: any) => {
        event.stopPropagation();

        if (!currentUser) {
            return loginModal.onOpen();
        }

        toggleDone();
    }, [loginModal, currentUser, toggleDone]);

    const handleDelete = () => {
        deleteTask(data.id);
        window.location.reload();
      };

    const createdAt = useMemo(() => {
        if (!data?.createdAt) {
            return null;
        }

        return formatDistanceToNowStrict(new Date(data.createdAt));
    }, [data?.createdAt]);

    const DoneIcon = hasDone ? MdDownloadDone : MdOutlineDone;

    return (
        <div className="w-full flex flex-row justify-center">
            <div 
                className={`
                    group
                    rounded-lg
                    mt-[6px]
                    w-3/4
                    sm:w-3/4
                    md:w-2/4
                    xl:w-1/3
                    border-[1px]
                    border-neutral-800
                    shadow-lg
                    p-5
                    ${hasDone ? 'bg-emerald-200' : 'bg-gray-300'}
                    hover:bg-gray-800
                    transition
                    `}
            >
                <div className="flex flex-row justify-center items-start gap-3">
                    <div className="w-full">
                        <div className="flex flex-row items-center gap-2">
                            <p className="text-slate-900 group-hover:text-white font-semibold">
                                {data.title}
                            </p>
                            <div className="ml-auto cursor-pointer ">
                                <div onClick={handleDelete} className="group-hover:text-neutral-400">
                                    <div className="hover:bg-blue-300 hover:text-red-500 hover:bg-opacity-10 rounded-full p-2">
                                        <DeletePostButton postId={data.id}/>
                                    </div>
                                </div>
                            </div>
                            <div className="cursor-pointer ">
                                <div onClick={editModal.onOpen} className="group-hover:text-neutral-400">
                                    <div className="hover:bg-blue-300 hover:text-blue-500 hover:bg-opacity-10 rounded-full p-2 portrait:hidden">
                                        <AiOutlineEdit className=" " size={20}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <span className="text-neutral-500 group-hover:text-neutral-400">
                                {data.category}
                            </span>
                        </div>
                        <div>
                            <span className="text-slate-900 group-hover:text-white mt-1 break-all">
                                {data.description}
                            </span>
                        </div>
                        <div>
                            <span className="mt-15 text-neutral-500 group-hover:text-neutral-400 text-sm">
                                {createdAt} ago
                            </span>
                        </div>
                        <div className="flex flex-row items-center mt-3 gap-10">
                            <div onClick={onDone} className="flex flex-row items-center text-neutral-500 gap-1 cursor-pointer transition hover:text-green-500">
                                <p className={`
                                    hover:bg-blue-300
                                    hover:bg-opacity-10
                                    rounded-full
                                    p-2`}
                                >
                                    <DoneIcon size={20} color={hasDone ? 'green' : ''}/>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default PostItem;