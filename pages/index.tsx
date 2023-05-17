import Form from "@/components/Form";
import Header from "@/components/Header";
import PostFeed from "@/components/posts/PostFeed";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
      <>
      <Form placeholder=''/>
      <PostFeed/>
      </>
  )
}
