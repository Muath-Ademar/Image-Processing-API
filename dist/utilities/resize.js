'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.imageProcessing = exports.outputFolder = exports.inputFolder = void 0;
const sharp = require('sharp');
exports.inputFolder = './disk';
exports.outputFolder = './processed';
const imageProcessing = (width, height, fileName) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (!Number.isNaN(height) && Number.isNaN(width)) width = height;
    else if (!Number.isNaN(width) && Number.isNaN(height)) height = width;
    else if (Number.isNaN(width) && Number.isNaN(height))
      return Promise.reject(new Error('width and height must be provided'));
    else if (!fileName)
      return Promise.reject(new Error('Please enter the image name'));
    else if (width <= 0 || height <= 0)
      return Promise.reject(
        new Error('width and height must be positive numbers')
      );
    try {
      return yield sharp(`${exports.inputFolder}/${fileName}.jpg`)
        .resize(width, height)
        .toFile(`${exports.outputFolder}/${fileName}-${width}x${height}.jpg`);
    } catch (err) {
      return Promise.reject(err);
    }
  });
exports.imageProcessing = imageProcessing;
//# sourceMappingURL=resize.js.map
