import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/libs/prismadb";

export default async function deletePost(req: NextApiRequest, res: NextApiResponse) {
  const { postId } = req.body;

  if (req.method !== 'GET') {
    return res.status(405).end();
  };

  try {
    const post = await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
