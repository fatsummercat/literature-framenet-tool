import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ message: "Please sign in" });

    const { title, literatureId } = req.body.data;
    const prismaUser = await prisma.user.findUnique({
      where: { email: session.user?.email },
    });

    if (title.length > 200) {
      return res.status(403).json({ message: "Please write a shorter title" });
    }

    if (!title.length) {
      return res
        .status(403)
        .json({ message: "Please do not leave title empty" });
    }

    try {
      const result = await prisma.episode.create({
        data: {
          title,
          userId: prismaUser.id,
          literatureId,
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
