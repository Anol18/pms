const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = {
  get: async (req, res) => {
    try {
      const response = await prisma.Projects.findMany({
        orderBy: {
          id: "desc",
        },
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
                  yearlyActivities: true,
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
  post: async () => {
    try {
    } catch (error) {
      console.log(error);
      res.status(500).send("Internatl Server error");
    }
  },
  put: async () => {
    try {
    } catch (error) {
      console.log(error);
      res.status(500).send("Internatl Server error");
    }
  },
  delete: async () => {
    try {
    } catch (error) {
      console.log(error);
      res.status(500).send("Internatl Server error");
    }
  },
};
