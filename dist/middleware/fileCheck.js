'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const resize_1 = require('../utilities/resize');
const fs = require('fs');
const path = require('path');
const fileCheck = (req, res, next) => {
  const image = req.query.fileName;
  let widthParam = req.query.width;
  let heightParam = req.query.height;
  const resizedFiles = fs.readdirSync(resize_1.outputFolder);
  const resizedFilesNames = resizedFiles.map((f) => path.parse(f).name);
  if (!image) {
    res.status(400).json({ msg: 'Missing required parameter: fileName' });
    return;
  }
  if (!/^[a-zA-Z]+$/.test(image)) {
    res.status(400).json({ msg: 'Invalid fileName format' });
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
      .json({ msg: 'Missing required parameter: width and height' });
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
      path.resolve(
        `${resize_1.outputFolder}/${image}-${widthParam}x${heightParam}.jpg`
      )
    );
    return;
  } else {
    next();
  }
};
exports.default = fileCheck;
//# sourceMappingURL=fileCheck.js.map
