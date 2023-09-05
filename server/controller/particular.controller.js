const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = {
  get: async (req, res) => {
    try {
      const response = await prisma.Particular.findMany({
        orderBy: {
          id: "desc",
        },
      });
      res.status(200).send(response);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  },

  post: async (req, res) => {
    try {
      const response = await prisma.Particular.create({
        data: req.body,
      });
      res.status(201).send(response);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  },
  delete: async (req, res) => {},
  put: async (req, res) => {},
};
