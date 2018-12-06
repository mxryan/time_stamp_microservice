const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// used to validate the output of parseInt()
// parseInt(12-12-12) returns 12 but its digit count is not equal to "12-12-12".length
// parseInt(12) also returns 12, but its digit count IS equal to "12".length
const countDigits = (d) => {
  let count = 0;
  while (d > 0) {
    count++;
    d = Math.floor(d / 10);
  }
  return count;
}

app.get("/", (req, res) => {
  res.send("Get /api/timestamp to get current utc & unix times. \n" +
           "Get /api/timestamp/date_string to get utc & unix times for that date"
           );
})

app.get("/api/timestamp/?", (req, res) => {
  let now = new Date();
  res.json({
    "unix": now.getTime(),
    "utc": now.toUTCString()
  });
});

app.get("/api/timestamp/:date_string", (req, res) => {
  let dateString = req.params.date_string;
  let date, serverResponse;
  if (parseInt(dateString) && countDigits(parseInt(dateString)) === dateString.length){
    date = new Date(parseInt(dateString));
    serverResponse = {
      "unix": date.getTime(),
      "utc": date.toUTCString()
    }
  } else if (Date.parse(dateString)) {
    date = new Date(dateString);
    serverResponse = {
      "unix": date.getTime(),
      "utc": date.toUTCString()
    }
  } else {
    serverResponse = {"error": "Invalid Date"}
  }
  res.json(serverResponse);
});

app.listen(PORT, ()=>console.log("server is on"));