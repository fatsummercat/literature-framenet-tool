import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const data = await prisma.literature.findMany({
        include: {
          user: true,
          episodes: {
            include: {
              scenarios: {
                include: {
                  elements: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      res.status(200).json(data);
    } catch (err) {
      res.status(403).json({ err: "Error fetching literature data" });
    }
  }
}
