const { exec } = require("child_process");

function resizeImage(inputFile, outputFile, width, height) {
  return new Promise((resolve, reject) => {
    exec(
      `ffmpeg -i ${inputFile} -vf scale=${width}:${height} ${outputFile}`,
      (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      }
    );
  });
}

module.exports = { resizeImage };
