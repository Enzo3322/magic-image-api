const sharp = require("sharp");

function cropImage(inputFile, outputFile, ratio) {
  const [widthRatio, heightRatio] = ratio.split(":").map(Number);

  return sharp(inputFile)
    .metadata()
    .then(({ width, height }) => {
      const targetWidth = Math.min(width, (height * widthRatio) / heightRatio);
      const targetHeight = Math.min(height, (width * heightRatio) / widthRatio);
      const x = Math.round((width - targetWidth) / 2);
      const y = Math.round((height - targetHeight) / 2);

      return sharp(inputFile)
        .extract({
          left: x,
          top: y,
          width: targetWidth,
          height: Math.round(targetHeight),
        })
        .toFile(outputFile);
    });
}

module.exports = { cropImage };
