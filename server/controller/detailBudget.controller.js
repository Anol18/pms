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
      const allData = await Promise.all(
        req.body.addRow.map(async (i) => {
          return {
            particular: i.particular,
            costPerUnit: i.costPerUnit,
            objectUnit: i.objectUnit,
            objectType: i.objectType,
            activityUnit: i.activityUnit,
            activityType: i.activityType,
            durationUnit: i.durationUnit,
            durationType: i.durationType,
            gross: i.gross,
            tax: i.tax,
            net: i.net,
            vat: i.vat,
            activityId: req.body.e.activity,
          };
        })
      );
      const budgetResponse = await prisma.DetailBudget.createMany({
        data: allData,
      });

      const activityTotalResponse = await prisma.ActivityTotal.create({
        data: {
          netTotal: req.body.netTotal,
          grossTotal: req.body.calGRoss,
          activityId: req.body.e.activity,
        },
      });

      res
        .status(201)
        .json({ Budget: budgetResponse, activity: activityTotalResponse });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server error");
    }
  },
  getDetailBudget: async (req, res) => {
    try {
      const response = await prisma.DetailBudget.findMany({
        orderBy: {
          id: "desc",
        },
      });
      res.status(200).send(response);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server error");
    }
  },

  delete: async (req, res) => {},
  put: async (req, res) => {},
};
