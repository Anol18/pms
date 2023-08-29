const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = {
  get: async (req, res) => {
    try {
      const response = await prisma.projects.findMany({
        orderBy: {
          id: "desc",
        },
        select: {
          id: true,
          projectName: true,
          Outcome: {
            select: {
              id: true,
              outcomeName: true,
              Activity: {
                select: {
                  id: true,
                  activityName: true,
                },
              },
            },
          },
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
      console.log(req.body);
      res.send("");
    } catch (error) {}
  },
  delete: async (req, res) => {},
  put: async (req, res) => {},
};
