const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = {
  get: async () => {
    try {
      const response = await prisma.Projects.findMany({
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
                  yearlyActivities: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {}
  },
  post: async () => {
    try {
    } catch (error) {}
  },
  put: async () => {
    try {
    } catch (error) {}
  },
  delete: async () => {
    try {
    } catch (error) {}
  },
};
