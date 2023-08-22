const { PrismaClient } = require("@prisma/client");
const { response } = require("express");
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
      });
      res.status(200).send(response);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  },
  post: async (req, res) => {
    try {
      const { outcome, activityName } = req.body.value;
      const dataPromises = req.body.dateWiseActivityCount.map(async (item) => {
        return item.activityCount;
      });
      const data = await Promise.all(dataPromises);
      const response = await prisma.Activity.create({
        data: {
          activityName: activityName,
          outcomeId: outcome,
          yearlyActivities: data,
        },
      });
      res.status(201).send(response);
    } catch (error) {
      console.log(error);
      res.status(500).send("Error occured");
    }
  },
  delete: async () => {},
  put: async () => {},
};
