const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = {
  get: async (req, res) => {
    try {
      const response = await prisma.activityTotal.findMany({
        select: {
          id: true,
          grossTotal: true,
          netTotal: true,
          activityId: true,
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
    } catch (error) {
      console.log(error);
      res.status(500).send("Internatl Server error");
    }
  },
  put: async (req, res) => {},
  delete: async (req, res) => {},
};
