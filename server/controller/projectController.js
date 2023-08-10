const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = {
  post: async (req, res) => {
    try {
      console.log(req.body);
      const projectResponse = await prisma.projects.create({ data: req.body });
      const { id } = projectResponse;
      const donorResponse = await prisma.DonorInformation.create({
        data: {
          projectID: id,
        },
      });
      const subGrantResponse = await prisma.SubGrantPartners.create({
        data: {
          projectID: id,
        },
      });
      res.send({
        project: projectResponse,
        donor: donorResponse,
        subGrant: subGrantResponse,
        message: "Successfully inserted",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internatl Server error");
    }
  },
  get: async (req, res) => {
    res.send("hello");
  },
  put: async (req, res) => {},
  delete: async (req, res) => {},
};
