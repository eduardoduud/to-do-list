import Form from "@/components/Form";
import PostFeed from "@/components/posts/PostFeed";
import useUser from "@/hooks/useUser";

import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

const UserView = () => {
    const router = useRouter();
    const { userId } = router.query;

    const { data: fetchedUser, isLoading } = useUser(userId as string);

    if (isLoading || !fetchedUser) {
        return (
            <div
                className="
                    flex
                    justify-center
                    items-center
                    h-full
                "
            >
                <ClipLoader color='lightblue' size={80}/>
            </div>
        )
    }

    return ( 
        <>
            <Form placeholder=''/>
            <PostFeed userId={userId as string}/>
        </>
     );
}
 
export default UserView;