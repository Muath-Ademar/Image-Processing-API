"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resize_1 = require("../utilities/resize");
const fs = require("fs");
const path = require("path");
const fileCheck = (req, res, next) => {
    const image = req.query.fileName;
    let width = Number(req.query.width);
    let height = Number(req.query.height);
    const resizedFiles = fs.readdirSync(resize_1.outputFolder);
    const resizedFilesNames = resizedFiles.map((f) => path.parse(f).name);
    if (Number.isNaN(width) || Number.isNaN(height)) {
        res.status(400).json({ msg: 'width and height must be numbers' });
        return;
    }
    else if (!Number.isNaN(height) && Number.isNaN(width))
        width = height;
    else if (!Number.isNaN(width) && Number.isNaN(height))
        height = width;
    else if (!image) {
        res.status(400).json({ msg: 'please enter an image name' });
        return;
    }
    else if (width <= 0 || height <= 0) {
        res.status(400).json({ msg: 'width and height must be positive numbers' });
        return;
    }
    if (resizedFilesNames.includes(`${image}-${width}x${height}`)) {
        res.sendFile(path.resolve(`${resize_1.outputFolder}/${image}-${width}x${height}.jpg`));
        return;
    }
    else {
        next();
    }
};
exports.default = fileCheck;
//# sourceMappingURL=fileCheck.js.map