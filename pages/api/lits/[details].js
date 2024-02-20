import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      console.log(req.query);
      const data = await prisma.literature.findUnique({
        where: {
          id: req.query.details,
        },
        include: {
          user: true,
          episodes: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              user: true,
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
