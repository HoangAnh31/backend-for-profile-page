const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
//upload file multipart/form-data
const multer = require("multer");
const path = require("path");

//config multer
const storage = multer.diskStorage({
  destination: "./images",
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const app = express();
const port = 8000;

// Use cors middleware
app.use(cors());

// Use body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const upload = multer({ storage });

//Define a route
app.get("/", (req, res) => {
  res.send("Hello world");
});

//receive image from Frontend
app.post("/upload", upload.single("image"), (req, res) => {
  res.status(200).json({ message: "Image has been uploaded successfully" });
});

//Start the serve
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
