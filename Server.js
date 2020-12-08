const express = require("express");
const path = require("path");
var bodyParser = require("body-parser");
var cors = require("cors");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const Pool = require("pg").Pool;

const pool = new Pool({
  user: "hoalvaiuiinzfz",
  host: "eec2-18-233-207-22.compute-1.amazonaws.com",
  database: "df0b9kkga3b512",
  password: "fb0ef388ce38a3145f7eebe4722223000293e22c087f3ad9998e2b402c8f1ae3",
  port: 5432,
});

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "surveyjs",
//   password: "123456",
//   port: 5432,
// });

// const get_json = () => {
//   return new Promise(function(resolve, reject) {

// }

app.get("/get_que", (req, res) => {
  pool.query(
    "SELECT json FROM surveys where available = TRUE;",
    (error, results) => {
      if (error) {
        console.log(error);
      }
      res.json({ data: results.rows });
    }
  );
});

let surveys = {};

app.post("/doasurvey", (req, res) => {
  if (req.body.email in surveys) {
    surveys[req.body.email].push(req.body.data);
    console.log(surveys);
  } else {
    surveys[req.body.email] = [];
    surveys[req.body.email].push(req.body.data);
    console.log(surveys);
  }
  res.end();
});

app.get("/:email/surveys", (req, res) => {
  console.log(surveys[req.params.email]);

  if (surveys[req.params.email] === undefined) {
    res.json([]);
  } else {
    res.json(surveys[req.params.email]);
  }
});

app.get("/", (req, res) => {
  res.send("Hello");
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
