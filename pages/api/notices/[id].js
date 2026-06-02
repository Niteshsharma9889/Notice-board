import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "PUT") {
    try {
      const updated = await prisma.notice.update({
        where: {
          id,
        },

        data: req.body,
      });

      return res.status(200).json(updated);

    } catch {

      return res.status(500).json({
        message: "Update failed",
      });

    }
  }

  if (req.method === "DELETE") {
    try {

      await prisma.notice.delete({
        where: {
          id,
        },
      });

      return res.status(200).json({
        message: "Deleted successfully",
      });

    } catch {

      return res.status(500).json({
        message: "Delete failed",
      });

    }
  }

  return res.status(405).json({
    message: "Method not allowed",
  });
}