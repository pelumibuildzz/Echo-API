const express = require('express');

const app = express();

app.use(express.json());
app.get("/api", (req, res) => {
    res.json({msg: "Welcome To Echo API!"});
});

app.use("/api/auth", require("./routes/auth"));

module.exports = app;