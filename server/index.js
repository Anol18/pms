const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
const helmet = require("helmet");
const projectRoute = require("./routes/projectsRoute");
const outcomeRoute = require("./routes/outcome.route");
const activityRoute = require("./routes/activity.route");
const path = require("path");
const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// const now = new Date();
// const timeZoneOffset = 360;
// now.setMinutes(now.getMinutes() + timeZoneOffset);

// Routes
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "..", "client", "index.html"));
// });
app.use("/api", projectRoute);
app.use("/api", outcomeRoute);
app.use("/api", activityRoute);

app.listen(5000, () => {
  console.log("server started");
});
