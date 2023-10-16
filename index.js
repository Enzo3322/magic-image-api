const express = require("express");
const multer = require("multer");
const { exec } = require("child_process");

const app = express();
const upload = multer({ dest: "uploads/" });

app.post("/resize", upload.single("image"), (req, res) => {
  const { width, height } = req.body;

  if (!width || !height) {
    return res.status(400).json({ error: "Missing width or height" });
  }

  const inputFile = req.file.path;
  const outputFile = `resized_${width}x${height}.jpg`;

  exec(
    `ffmpeg -i ${inputFile} -vf scale=${width}:${height} ${outputFile}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`ffmpeg error: ${error.message}`);
        return res.status(500).json({ error: "Image resizing failed" });
      }

      console.log(`Resized image: ${outputFile}`);
      res.sendFile(outputFile, { root: __dirname });
    }
  );
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
