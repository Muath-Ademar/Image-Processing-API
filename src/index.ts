import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { imageProcessing, inputFolder, outputFolder } from './utilities/resize';
import fileCheck from './middleware/fileCheck';

const app = express();
const port = 8000;

const files = fs.readdirSync(inputFolder);
const fileNames = files.map((f) => path.parse(f).name);

app.get(
  '/api/images',
  fileCheck,
  async (req: express.Request, res: express.Response): Promise<void> => {
    const params = req.query;
    const fileName = String(params.fileName);
    let width = Number(params.width);
    let height = Number(params.height);
    if (!Number.isNaN(height) && Number.isNaN(width)) width = height;
    else if (!Number.isNaN(width) && Number.isNaN(height)) height = width;
    else if (!fileName) {
      res.status(400).json({ msg: 'please enter an image name' });
      return;
    } else if (Number.isNaN(width) || Number.isNaN(height)) {
      res.status(400).json({ msg: 'width and height must be numbers' });
      return;
    } else if (width <= 0 || height <= 0) {
      res
        .status(400)
        .json({ msg: 'width and height must be positive numbers' });
    }

    if (!fileNames.includes(path.parse(fileName).name)) {
      res.status(404).json({ msg: 'Image does not exist in your folder' });
      return;
    } else {
      try {
        await imageProcessing(width, height, fileName);
        res.sendFile(
          path.resolve(`${outputFolder}/${fileName}-${width}x${height}.jpg`)
        );
      } catch (err) {
        res.status(500).json({ msg: err });
      }
    }
  }
);

app.listen(port, () => {
  console.log(`Server started at port http://localhost:${port}`);
});

export default app;
