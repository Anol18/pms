const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
const helmet = require("helmet");
const projectRoute = require("./routes/projectsRoute");
const outcomeRoute = require("./routes/outcome.route");
const activityRoute = require("./routes/activity.route");
const budgetDescriptio = require("./routes/budgetDescription.route");
const detailsbudget = require("./routes/detailBudget.route");

const path = require("path");
const { exec } = require("child_process");
const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allows cookies and authentication headers
};
app.use(cors(corsOptions));
app.use(helmet());
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// const now = new Date();
// const timeZoneOffset = 360;
// now.setMinutes(now.getMinutes() + timeZoneOffset);

// Routes
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "..", "client", "index.html"));
// });

// CMD Command variable
// const npmCommand = "npx prisma migrate dev --name addNewModelBudgetDescription";

// Execution Function
// exec(npmCommand, (error, stdout, stderr) => {
//   if (error) {
//     console.error(`Error executing npm command: ${error}`);
//     return;
//   }

//   console.log(`npm command output:\n${stdout}`);
// });

app.use("/api", projectRoute);
app.use("/api", outcomeRoute);
app.use("/api", activityRoute);
app.use("/api", budgetDescriptio);
app.use("/api", detailsbudget);

app.listen(5000, () => {
  console.log("server started");
});
