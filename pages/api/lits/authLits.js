import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ message: "Please sign in" });

    try {
      const data = await prisma.user.findUnique({
        where: { email: session.user?.email },
        include: {
          literatures: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              episodes: true,
            },
          },
        },
      });
      res.status(200).json(data);
    } catch (err) {
      res
        .status(403)
        .json({ err: "Error has occured while adding a literature" });
    }
  }
}
