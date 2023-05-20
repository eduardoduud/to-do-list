import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { postId, title, category, description } = req.body;

    if (req.method !== 'PATCH') {
        return res.status(405).end();
    }

    try {

        const updateTask = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                title,
                category,
                description,
            }
        });

        return res.status(200).json(updateTask);

    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}