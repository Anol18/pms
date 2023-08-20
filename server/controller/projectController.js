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
        dononePhoneCode,
        donorEmail,
        projectBudget,
        currency,
        conversionRate,
        status,
      } = req.body.value;
      let convertedBudget;
      if (conversionRate) {
        convertedBudget = await conculateConvertedBudget(
          projectBudget,
          conversionRate
        );
      } else {
        convertedBudget = await projectBudget;
      }
      const bujectInCurrency = await completeBudgetInCurrency(
        projectBudget,
        currency
      );
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
          projectBudget: convertedBudget,
          budgetInCurrency: bujectInCurrency,
          conversionRate: conversionRate,
          reportingPeriod: reportingPeriod,
          status: status,
        },
      });
      const { id } = projectResponse;

      const phoneNumberOfDonor = await additionCodeNumber(
        dononePhoneCode,
        donorPhoneNumber
      );
      const donorResponse = await prisma.DonorInformation.create({
        data: {
          projectID: id,
          name: donorName,
          donorType: donorType,
          address: donorAddress,
          phone: phoneNumberOfDonor,
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
      res.status(201).send({
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

          Outcome: {
            include: {
              Activity: true,
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
  put: async (req, res) => {},
  delete: async (req, res) => {},
};

const conculateConvertedBudget = async (projectBudget, conversionRate) => {
  return projectBudget * conversionRate;
};
const additionCodeNumber = async (dononePhoneCode, donorPhoneNumber) => {
  return dononePhoneCode + donorPhoneNumber;
};
const completeBudgetInCurrency = async (projectBudget, currency) => {
  return projectBudget + " " + currency;
};
