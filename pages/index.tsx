import Form from "@/components/Form";
import PostFeed from "@/components/posts/PostFeed";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function Home() {
  const { data: currentUser } = useCurrentUser();

  return (
      <>
      <Form placeholder=''/>
      <PostFeed userId={currentUser?.id}/>
      </>
  )
};