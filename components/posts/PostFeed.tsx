import usePosts from "@/hooks/usePosts";
import PostItem from "./PostItem";
import useCurrentUser from "@/hooks/useCurrentUser";

interface PostFeedProps {
  userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
  const { data: posts = [] } = usePosts(userId);
  const { data: currentUser } = useCurrentUser();

  return (
    <>
      {currentUser ? (
        posts.map((post: Record<string, any>) => (
          <PostItem userId={userId} key={post.id} data={post} />
        ))
      ) : (
        <div></div>
      )}
    </>
  );
};

export default PostFeed;
