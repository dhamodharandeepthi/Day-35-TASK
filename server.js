const express = require("express");
const fs = require("fs");
const app = express();
require("dotenv").config();


const folderPath = "./files"; // Replace with your desired folder path

// Endpoint to create a text file with current timestamp
app.post("/createFile", (req, res) => {
  const currentDate = new Date();
  const fileName = `${currentDate.toISOString().replace(/:/g, "-")}.txt`;
  const filePath = `${folderPath}/${fileName}`;
  const fileContent = currentDate.toString();

  fs.writeFile(filePath, fileContent, (err) => {
    if (err) {
      res.status(500).send({ error: "Failed to create file" });
    } else {
      res.status(200).send({ message: "File created successfully" });
    }
  });
});

// Endpoint to retrieve all text files in the folder
app.get("/getTextFiles", (req, res) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      res.status(500).send({ error: "Failed to retrieve files" });
    } else {
      const textFiles = files.filter((file) => file.endsWith(".txt"));
      res.status(200).send({ files: textFiles });
    }
  });
});

const PORT = process.env.PORT; // Replace with your desired port number
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
