const { cropImage } = require("../services/cropService");
const sharp = require("sharp");

jest.mock("sharp");

describe("Crop Service", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should crop image", async () => {
    const inputFile = "test.jpg";
    const outputFile = "cropped_16-9.jpg";
    const ratio = "16:9";

    const metadataMock = jest
      .fn()
      .mockResolvedValue({ width: 1920, height: 1080 });
    const extractMock = jest.fn().mockReturnThis();
    const toFileMock = jest.fn().mockResolvedValue();

    sharp.mockImplementation(() => ({
      metadata: metadataMock,
      extract: extractMock,
      toFile: toFileMock,
    }));

    await cropImage(inputFile, outputFile, ratio);

    expect(sharp).toHaveBeenCalledWith(inputFile);
    expect(metadataMock).toHaveBeenCalled();
    expect(extractMock).toHaveBeenCalledWith({
      left: 0,
      top: 120,
      width: 1920,
      height: 840,
    });
    expect(toFileMock).toHaveBeenCalledWith(outputFile);
  });

  test("should throw an error if image cropping fails", async () => {
    const inputFile = "test.jpg";
    const outputFile = "cropped_16-9.jpg";
    const ratio = "16:9";

    const metadataMock = jest
      .fn()
      .mockRejectedValue(new Error("Image cropping failed"));

    sharp.mockImplementation(() => ({
      metadata: metadataMock,
    }));

    await expect(cropImage(inputFile, outputFile, ratio)).rejects.toThrow(
      "Image cropping failed"
    );

    expect(sharp).toHaveBeenCalledWith(inputFile);
    expect(metadataMock).toHaveBeenCalled();
  });
});
