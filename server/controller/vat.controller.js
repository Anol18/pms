const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = {
  get: async (req, res) => {
    try {
      const response = await prisma.vat.findMany({
        orderBy: {
          id: "desc",
        },
        select: {
          vat: true,
        },
        take: 1,
      });
      if (response.length != 1) {
        res.status(200).json([{ vat: 0 }]);
      } else {
        res.status(200).send(response);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Internatl Server error");
    }
  },
  post: async (req, res) => {
    try {
      const response = await prisma.vat.create({
        data: req.body,
      });
      res.status(201).send(response);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internatl Server error");
    }
  },
  put: async (req, res) => {},
  delete: async (req, res) => {},
};
