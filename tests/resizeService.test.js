const { resizeImage } = require("../services/resizeService");
const { exec } = require("child_process");

jest.mock("child_process");

describe("Image Service", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should resize image", async () => {
    const inputFile = "test.jpg";
    const outputFile = "resized_100x100.jpg";
    const width = 100;
    const height = 100;

    exec.mockImplementation((command, callback) => {
      callback(null, "stdout", null);
    });

    await resizeImage(inputFile, outputFile, width, height);

    expect(exec).toHaveBeenCalledWith(
      `ffmpeg -i ${inputFile} -vf scale=${width}:${height} ${outputFile}`,
      expect.any(Function)
    );
  });

  test("should throw an error if image resizing fails", async () => {
    const inputFile = "test.jpg";
    const outputFile = "resized_100x100.jpg";
    const width = 100;
    const height = 100;

    exec.mockImplementation((command, callback) => {
      callback(new Error("Image resizing failed"), null, "stderr");
    });

    await expect(
      resizeImage(inputFile, outputFile, width, height)
    ).rejects.toThrow("Image resizing failed");

    expect(exec).toHaveBeenCalledWith(
      `ffmpeg -i ${inputFile} -vf scale=${width}:${height} ${outputFile}`,
      expect.any(Function)
    );
  });
});
