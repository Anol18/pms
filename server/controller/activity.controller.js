const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = {
  get: async (req, res) => {
    try {
      const response = await prisma.Projects.findMany({
        orderBy: [
          {
            id: "desc",
          },
        ],
        select: {
          id: true,
          projectName: true,
          projectDuration: true,
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
        // include: {
        //   Outcome: true,
        // },
      });
      res.status(200).send(response);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  },
  post: async (req, res) => {
    console.log(req.body);
  },
  delete: async () => {},
  put: async () => {},
};
