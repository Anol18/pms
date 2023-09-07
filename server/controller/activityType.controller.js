const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  get: async (req, res) => {
    try {
      const response = await prisma.ActivityType.findMany({
        orderBy: {
          id: "desc",
        },
        select: {
          id: true,
          activityType: true,
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
      const response = await prisma.ActivityType.create({
        data: req.body,
      });
      res.status(201).send(response);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internatl Server error");
    }
  },
  delete: async () => {
    try {
    } catch (error) {}
  },
  put: async () => {
    try {
    } catch (error) {}
  },
};
