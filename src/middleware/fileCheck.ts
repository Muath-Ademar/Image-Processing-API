import * as express from 'express';
import { outputFolder } from '../utilities/resize';
import * as fs from 'fs';
import * as path from 'path';

const fileCheck = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  const image = req.query.fileName as string;
  let widthParam = req.query.width as string | undefined;
  let heightParam = req.query.height as string | undefined;
  const resizedFiles = fs.readdirSync(outputFolder);
  const resizedFilesNames = resizedFiles.map((f) => path.parse(f).name);
  if (!image) {
    res.status(400).json({ msg: 'Missing required parameter: fileName' });
    return;
  }

  if (!/^[a-zA-Z]+$/.test(image)) {
    res.status(400).json({ msg: 'Invalid fileName format' });
    return;
  } else if (
    (widthParam && isNaN(Number(widthParam))) ||
    (heightParam && isNaN(Number(heightParam)))
  ) {
    res.status(400).json({ msg: 'width and height must be valid numbers' });
    return;
  }

  if (!widthParam && !heightParam) {
    res
      .status(400)
      .json({ msg: 'Missing required parameters: width and height' });
  }

  if (!isNaN(Number(heightParam)) && isNaN(Number(widthParam)))
    widthParam = heightParam;
  if (!isNaN(Number(widthParam)) && isNaN(Number(heightParam)))
    heightParam = widthParam;

  if (Number(widthParam) <= 0 || Number(heightParam) <= 0) {
    res.status(400).json({ msg: 'width and height must be positive numbers' });
    return;
  }

  if (resizedFilesNames.includes(`${image}-${widthParam}x${heightParam}`)) {
    res.sendFile(
      path.resolve(`${outputFolder}/${image}-${widthParam}x${heightParam}.jpg`)
    );
    return;
  } else {
    next();
  }
};

export default fileCheck;
