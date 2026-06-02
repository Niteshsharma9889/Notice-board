import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const notices = await prisma.notice.findMany({
        orderBy: [
          { priority: "desc" },
          { publishDate: "desc" },
        ],
      });

      return res.status(200).json(notices);
    } catch {
      return res.status(500).json({
        message: "Failed to fetch notices",
      });
    }
  }

  if (req.method === "POST") {
    const {
      title,
      body,
      category,
      priority,
      publishDate,
      image,
    } = req.body;

    if (!title || !body || !publishDate) {
      return res.status(400).json({
        message: "Required fields missing",
      });
    }

    const date = new Date(publishDate);

    if (isNaN(date.getTime())) {
      return res.status(400).json({
        message: "Invalid date",
      });
    }

    try {
      const notice = await prisma.notice.create({
        data: {
          title,
          body,
          category,
          priority,
          publishDate: date,
          image,
        },
      });

      return res.status(201).json(notice);
    } catch {
      return res.status(500).json({
        message: "Failed to create notice",
      });
    }
  }

  return res.status(405).json({
    message: "Method not allowed",
  });
}