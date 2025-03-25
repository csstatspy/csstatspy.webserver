const express = require("express");
const cors = require("cors");
require("dotenv").config();

const resolveVanityUrl = require("./api/resolveVanityUrl");
const getPlayerSummaries = require("./api/getPlayerSummaries");

const app = express();
const PORT = 3001;

const corsOptions = {
  origin: "https://csstatspy.github.io/csstatspy.web/",
  methods: "GET,POST",
};

app.use(cors(corsOptions));

app.get("/api/resolveVanityUrl", resolveVanityUrl);
app.get("/api/getPlayerSummaries", getPlayerSummaries);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
