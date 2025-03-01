const express = require('express');

const app = express();

app.use(express.json());
app.get("/api", (req, res) => {
    res.json({msg: "Welcome To Echo API!"});
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/petition", require("./routes/petition"));
app.use("/api/votes", require("./routes/vote"));
app.use("/api/council", require("./routes/council"))
app.use("/api/notification", require("./routes/notification"));

module.exports = app;