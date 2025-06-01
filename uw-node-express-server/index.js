const express = require("express");
const cors = require("cors");
const fs = require("node:fs");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(
  cors({
    origin: [`http://localhost:5173`],
  })
);

// This is where the POST request receives the claims data and writes to a file.
app.post("/receive", urlencodedParser, (req, res) => {
  const { claimDate, claimDescription, claimCategory } = req.body;
  const content = claimDate && claimDescription && claimCategory;
  if (content) {
    fs.writeFile(
      "./test.txt",
      `${claimDate} ${claimCategory} ${claimDescription}`,
      (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log("File written successfully");
        }
      }
    );
    res.send("POST request received successfully!");
  } else {
    throw new Error("Error with incoming data");
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
