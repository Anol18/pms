const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = {
  post: async (req, res) => {
    try {
      const {
        projectName,
        division,
        district,
        upazila,
        donorName,
        donorType,
        donorAddress,
        donorPhoneNumber,
        donorEmail,
        projectBudget,
        status,
      } = req.body.value;
      const { ngoApprovalDate, reportingPeriod, subGrant, projectDuration } =
        req.body;

      const projectResponse = await prisma.Projects.create({
        data: {
          projectName: projectName,
          projectDuration: projectDuration,
          division: division,
          district: district,
          upazila: upazila,
          ngoApprovalDate: ngoApprovalDate,
          projectBudget: projectBudget,
          reportingPeriod: reportingPeriod,
          status: status,
        },
      });
      const { id } = projectResponse;

      const donorResponse = await prisma.DonorInformation.create({
        data: {
          projectID: id,
          name: donorName,
          donorType: donorType,
          address: donorAddress,
          phone: donorPhoneNumber,
          email: donorEmail,
        },
      });
      const subGrantData = subGrant.map((item) => ({
        ...item,
        projectID: id,
      }));
      const subGrantResponse = await prisma.SubGrantPartners.createMany({
        data: subGrantData,
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
    try {
      const response = await prisma.Projects.findMany({
        // take: 5,
        orderBy: [
          {
            id: "desc",
          },
        ],
        include: {
          DonorInformation: true,
        },
      });
      res.status(200).send(response);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internatl Server error");
    }
  },
  put: async (req, res) => {},
  delete: async (req, res) => {},
};
