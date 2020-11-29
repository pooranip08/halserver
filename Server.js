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
  user: "imnfzwxldaivfh",
  host: "ec2-34-200-106-49.compute-1.amazonaws.com",
  database: "da7qumh28m93em",
  password: "c43d758f0a9ed97a07463841907b22a49ce7cb13ec0b6b5141b918c97ab681e9",
  port: 5432,
});
// const get_json = () => {
//   return new Promise(function(resolve, reject) {

// }

app.get("/get_que", (req, res) => {
  pool.query("SELECT json FROM surveys;", (error, results) => {
    if (error) {
      console.log(error);
    }
    res.json({ data: results.rows });
  });
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
