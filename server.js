const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/api/timestamp/", (req, res) => {
  res.json({msg: "you should get current date back"});
})

app.get("/api/timestamp/:date_string", (req, res) => {
  res.json({msg:"hey", param: req.params.date_string});
})

app.listen(PORT, ()=>console.log("server is on"));