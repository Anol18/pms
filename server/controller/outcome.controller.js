const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = {
  get: async (req, res) => {
    try {
      const response = await prisma.outcome.findMany({
        orderBy: [
          {
            id: "desc",
          },
        ],
        include: {
          Activity: true,
          projects: true,
        },
      });
      res.status(200).send(response);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internatl Server error");
    }
  },
  post: async (req, res) => {
    try {
      const response = await prisma.outcome.create({
        data: req.body,
      });
      res.status(201).send(response);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  },
  delete: async () => {},
  put: async () => {},
};
