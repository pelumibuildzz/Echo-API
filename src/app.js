const express = require('express');

const app = express();

app.use(express.json());
app.get("/api", (req, res) => {
    res.json({msg: "Welcome To Echo API!"});
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/petitions", require("./routes/petition"));
app.use("/api/votes", require("./routes/vote"));
app.use("/api/council", require("./routes/council"))
app.use("/api/notifications", require("./routes/notification"));
app.use("api/solutions", require("./routes/solution"))

app.use(require("./telegram/webhook"));

module.exports = app;

//Status Code Verification and Correction Later