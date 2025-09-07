import * as sharp from 'sharp';

export const inputFolder = './disk';
export const outputFolder = './processed';

export const imageProcessing = async (
  width: number,
  height: number,
  fileName: string
): Promise<sharp.OutputInfo> => {
  if (!fileName)
    return Promise.reject(new Error('Missing required parameter: fileName'));
  if (!Number.isNaN(height) && Number.isNaN(width)) width = height;
  else if (!Number.isNaN(width) && Number.isNaN(height)) height = width;
  else if (Number.isNaN(width) && Number.isNaN(height))
    return Promise.reject(
      new Error('Missing required parameters: width and height')
    );
  if (width <= 0 || height <= 0)
    return Promise.reject(
      new Error('width and height must be positive numbers')
    );

  try {
    return await sharp(`${inputFolder}/${fileName}.jpg`)
      .resize(width, height)
      .toFile(`${outputFolder}/${fileName}-${width}x${height}.jpg`);
  } catch (err) {
    return Promise.reject(err);
  }
};
