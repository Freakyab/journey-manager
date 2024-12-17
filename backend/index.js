const express = require("express");
const cors = require("cors");
const bodyPareser = require("body-parser");
const app = express();

const PORT = process.env.PORT | 8000;

app.use(bodyPareser.json());
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Home");
});

app.use("/packages", require("./controllers/package.controller"));
app.use("/bookings", require("./controllers/bookings.controller"));
app.use("/admin", require("./controllers/admin.controller"));


app.listen(PORT, async () => {
  console.log(`Listening on the port ${PORT}`);
});
