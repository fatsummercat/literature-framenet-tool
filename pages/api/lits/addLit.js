import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res
        .status(401)
        .json({ message: "Please sign in to add a literature" });
    }

    const { title, source } = req.body.data;
    const prismaUser = await prisma.user.findUnique({
      where: { email: session.user?.email },
    });

    if (title.length > 200 || source.length > 200) {
      return res
        .status(403)
        .json({ message: "Please write a shorter title/source" });
    }

    if (!title.length || !source.length) {
      return res
        .status(403)
        .json({ message: "Please do not leave this empty" });
    }

    try {
      const result = await prisma.literature.create({
        data: {
          title,
          userId: prismaUser.id,
          source,
        },
      });
      res.status(200).json(result);
    } catch (err) {
      res
        .status(403)
        .json({ err: "Error has occured while adding a literature" });
    }
  }
}
