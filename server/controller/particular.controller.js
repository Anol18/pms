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
      let { tax, acTax } = req.body.value;
      if (!acTax) {
        acTax = 0;
      }

      const totalTax = tax + acTax;
      const { isAc } = req.body;
      let name;
      if (isAc) {
        name = req.body.value.particular + " " + "(AC)";
      } else {
        name = req.body.value.particular;
      }
      const response = await prisma.Particular.create({
        data: {
          particular: name,
          totalTax: totalTax,
          isAc: isAc,
          tax: req.body.value.tax,
          acTax: req.body.value.acTax,
        },
      });
      res.status(201).send("response");
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  },
  delete: async (req, res) => {},
  put: async (req, res) => {},
};
