"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const fs = require("fs");
const path = require("path");
const resize_1 = require("./utilities/resize");
const fileCheck_1 = require("./middleware/fileCheck");
const app = express();
const port = 8000;
const files = fs.readdirSync(resize_1.inputFolder);
const fileNames = files.map((f) => path.parse(f).name);
app.get('/api/images', fileCheck_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.query;
    const fileName = String(params.fileName);
    let width = Number(params.width);
    let height = Number(params.height);
    if (!Number.isNaN(height) && Number.isNaN(width))
        width = height;
    else if (!Number.isNaN(width) && Number.isNaN(height))
        height = width;
    else if (!fileName) {
        res.status(400).json({ msg: 'please enter an image name' });
        return;
    }
    else if (Number.isNaN(width) || Number.isNaN(height)) {
        res.status(400).json({ msg: 'width and height must be numbers' });
        return;
    }
    else if (width <= 0 || height <= 0) {
        res
            .status(400)
            .json({ msg: 'width and height must be positive numbers' });
    }
    if (!fileNames.includes(path.parse(fileName).name)) {
        res.status(404).json({ msg: 'Image does not exist in your folder' });
        return;
    }
    else {
        try {
            yield (0, resize_1.imageProcessing)(width, height, fileName);
            res.sendFile(path.resolve(`${resize_1.outputFolder}/${fileName}-${width}x${height}.jpg`));
        }
        catch (err) {
            res.status(500).json({ msg: err });
        }
    }
}));
app.listen(port, () => {
    console.log(`Server started at port http://localhost:${port}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map