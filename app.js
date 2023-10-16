const express = require("express");
const multer = require("multer");
const { resizeImage } = require("./services/resizeService.js");
const { cropImage } = require("./services/cropService.js");

const app = express();
const upload = multer({ dest: "uploads/" });

app.post("/resize", upload.single("image"), async (req, res) => {
  try {
    const { width, height } = req.body;

    if (!width || !height) {
      return res.status(400).json({ error: "Missing width or height" });
    }

    const inputFile = req.file.path;
    const outputFile = `resized_${width}x${height}.jpg`;

    await resizeImage(inputFile, outputFile, width, height);

    console.log(`Resized image: ${outputFile}`);
    res.sendFile(outputFile, { root: __dirname });
  } catch (error) {
    console.error(`Image resizing error: ${error.message}`);
    res.status(500).json({ error: "Image resizing failed" });
  }
});

app.post("/crop", upload.single("image"), async (req, res) => {
  try {
    const { ratio } = req.body;

    if (!ratio) {
      return res.status(400).json({ error: "Missing ratio" });
    }

    const inputFile = req.file.path;
    const outputFile = `cropped_${ratio}.jpg`;

    await cropImage(inputFile, outputFile, ratio);

    console.log(`Cropped image: ${outputFile}`);
    res.sendFile(outputFile, { root: __dirname });
  } catch (error) {
    console.error(`Image cropping error: ${error.message}`);
    res.status(500).json({ error: "Image cropping failed" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
