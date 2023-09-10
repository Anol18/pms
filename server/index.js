const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
const helmet = require("helmet");
const projectRoute = require("./routes/projectsRoute");
const outcomeRoute = require("./routes/outcome.route");
const activityRoute = require("./routes/activity.route");
const particularRoute = require("./routes/particular.route");
const detailsbudget = require("./routes/detailBudget.route");
const objectTypeRoute = require("./routes/objectType.route");
const activityType = require("./routes/activityType.route");
const vatRoute = require("./routes/vat.route");
// const { exec } = require("child_process");
const app = express();
const corsOptions = {
  origin: process.env.URL,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allows cookies and authentication headers
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("../client"));

// Routes
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "..", "client", "index.html"));
// });

// CMD Command variable
// const createDatabase =
//   "npx prisma migrate dev --name addNewModelBudgetDescription";
// const createDatabaseClient = "npx prisma migrate dev";

// Execution Function
// exec(createDatabase, (error, stdout, stderr) => {
//   if (error) {
//     console.error(`Error executing npm command: ${error}`);
//     return;
//   }

//   console.log(`npm command output:\n${stdout}`);
// });
// exec(createDatabaseClient, (error, stdout, stderr) => {
//   if (error) {
//     console.error(`Error executing npm command: ${error}`);
//     return;
//   }

//   console.log(`npm command output:\n${stdout}`);
// });

app.use("/api", projectRoute);
app.use("/api", outcomeRoute);
app.use("/api", activityRoute);
app.use("/api", particularRoute);
app.use("/api", detailsbudget);
app.use("/api", objectTypeRoute);
app.use("/api", activityType);
app.use("/api", vatRoute);

// server start
app.listen(process.env.PORT, () => {
  console.log("server started");
});
