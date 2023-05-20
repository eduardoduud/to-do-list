import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET' && req.method !== 'PATCH') {
        return res.status(405).end();
    }  

    try {
        const { postId } = req.query;

        if (!postId || typeof postId !== 'string') {
            throw new Error('Invalid ID');
        }

        if (req.method === 'GET') {
            const post = await prisma.post.findUnique({
                where: {
                    id: postId
                },
                include: {
                    user: true,
                    comments: {
                        include: {
                            user: true
                        },
                        orderBy: {
                            createdAt: 'desc'
                        }
                    }
                }
            });

            return res.status(200).json(post);
        }

        if (req.method === 'PATCH') {
            const updatedPost = await prisma.post.update({
                where: { id: postId },
                data: {
                  title: req.body.title,
                  category: req.body.category,
                  description: req.body.description
                }
              });
        
              res.status(200).json(updatedPost);
        }
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}