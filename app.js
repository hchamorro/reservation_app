// Dependencies
// =============================================================
const express = require("express");
const path = require("path");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// data
const reservations = [
  {
    routeName: "stacy",
    name: "stacy",
    phone: "7735551200",
    email: "stacy@email.com",
    uniqueId: "stacyrox"
  },
  {
    routeName: "tim",
    name: "tim",
    phone: "7735551201",
    email: "timy@email.com",
    uniqueId: "timrox"
  }
];

const waitList = [
  {
    routeName: "Larry",
    name: "Larry",
    phone: "7735551202",
    email: "larry@email.com",
    uniqueId: "larryrox"
  },
  {
    routeName: "sean",
    name: "Sean",
    phone: "7735551203",
    email: "sean@email.com",
    uniqueId: "seanrox"
  }
];
//routes
//api
app.get("/api/reservations", (req, res) => {
  return res.json(reservations);
});
app.get("/api/waitlist", (req, res) => {
  return res.json(waitList);
});
app.get("/api/tables", (req, res) => {
  let alltables = reservations.concat(waitList);
  return res.json(alltables);
});

//html
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/home.html"));
});
app.get("/reservations", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/makeRes.html"));
});
app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/tables.html"));
});

//post
app.post("/api/tables", (req, res) => {
  const newRes = req.body;
  if (reservations.length < 4) {
    reservations.push(newRes);
    res.json(true);
  } else {
    waitList.push(newRes);
    res.json(false);
  }
  console.log(newRes);
  waitList.push(newRes);
  //send bak new character
  res.json(newRes);
});

app.post("/api/clear", (req, res) => {
  reservations.empty();
  waitList.empty();
  res.json(true);
});

//listen
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
