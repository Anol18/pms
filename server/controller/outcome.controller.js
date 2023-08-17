const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = {
  get: async () => {},
  post: async (req, res) => {
    try {
      const response = await prisma.outcome.create({
        data: req.body,
      });
      res.status(200).send(response);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  },
  delete: async () => {},
  put: async () => {},
};
