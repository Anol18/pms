const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
const app = express();

const projectRoute = require("./routes/projectsRoute");

app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
const now = new Date();
const timeZoneOffset = 360;
now.setMinutes(now.getMinutes() + timeZoneOffset);
app.use(cors());
app.use("/api", projectRoute);

// app.post("/", async (req, res) => {
//   try {
//     console.log(now);
//     const d = req.body;
//     const response = await prisma.Projects.create({
//       data: req.body,
//     });
//     res.send(response);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("error");
//   }
// });
app.listen(5000, () => {
  console.log("server started");
});
