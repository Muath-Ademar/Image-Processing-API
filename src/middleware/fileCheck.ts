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
  let width = Number(req.query.width) as number;
  let height = Number(req.query.height) as number;
  const resizedFiles = fs.readdirSync(outputFolder);
  const resizedFilesNames = resizedFiles.map((f) => path.parse(f).name);
  if (Number.isNaN(width) && Number.isNaN(height)) {
    res.status(400).json({ msg: 'width and height must be numbers' });
    return;
  } else if (!Number.isNaN(height) && Number.isNaN(width)) width = height;
  else if (!Number.isNaN(width) && Number.isNaN(height)) height = width;
  else if (!image) {
    res.status(400).json({ msg: 'please enter an image name' });
    return;
  } else if (width <= 0 || height <= 0) {
    res.status(400).json({ msg: 'width and height must be positive numbers' });
    return;
  }

  if (resizedFilesNames.includes(`${image}-${width}x${height}`)) {
    res.sendFile(
      path.resolve(`${outputFolder}/${image}-${width}x${height}.jpg`)
    );
    return;
  } else {
    next();
  }
};

export default fileCheck;
