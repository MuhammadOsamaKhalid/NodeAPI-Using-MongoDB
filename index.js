const express = require("express");
const { default: mongoose } = require("mongoose");
require("./connection");
const Products = require("./products");
const multer = require("multer");

const app = express();
app.use(express.json());

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + ".jpg");
    },
  }),
}).single("users");

//routes
app.post("/create", async (req, res) => {
  const data = new Products(req.body);
  const result = await data.save();
  console.log(result);
  res.send(result);
});

app.get("/list", async (req, res) => {
  let data = await Products.find();
  res.send(data);
});

app.get("/search/:key", async (req, res) => {
  // console.log(req.params.key)
  let data = await Products.find({
    $or: [
      { firstname: { $regex: req.params.key } },
      { lastname: { $regex: req.params.key } },
      { location: { $regex: req.params.key } },
    ],
  });
  res.send(data);
});

app.get("/list/:_id", async (req, res) => {
  console.log(req.params);
  let data = await Products.find(req.params);
  res.send(data);
});

app.delete("/delete/:_id", async (req, res) => {
  console.log(req.params);
  let data = await Products.deleteOne(req.params);
  res.send(data);
});

app.put("/update/:_id", async (req, res) => {
  console.log(req.params);
  let data = await Products.updateOne(req.params, {
    $set: {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      location: req.body.location,
    },
  });
  res.send(data);
});

app.post("/upload", upload, (req, res) => {
  res.send("File Uploaded");
});

app.listen(5000);
