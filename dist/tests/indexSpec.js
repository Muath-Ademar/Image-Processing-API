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
const resize_1 = require("../utilities/resize");
const supertest = require("supertest");
const index_1 = require("../index");
const width = 400;
const height = 400;
const fileName = 'santamonica';
const wrongFileName = 'Madrid';
const request = supertest(index_1.default);
describe('tests for the functions', () => {
    it('expects function to resolve', () => __awaiter(void 0, void 0, void 0, function* () {
        const promise = (0, resize_1.imageProcessing)(width, height, fileName);
        yield expectAsync(promise).toBeResolved();
    }));
    it('expects function to reject', () => __awaiter(void 0, void 0, void 0, function* () {
        const promise = (0, resize_1.imageProcessing)(width, height, wrongFileName);
        yield expectAsync(promise).toBeRejected();
    }));
});
describe('test for api endpoint', () => {
    it('gets the api endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get(`/api/images?fileName=${fileName}&width=${width}&height=${height}`);
        expect(response.status).toBe(200);
    }));
    describe('tests for api endpoint error handling', () => {
        it("doesn't get the api endpoint when no values are entered", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get(`/api/images`);
            expect(response.status).toBe(400);
        }));
        it("doesn't get the api endpoint when no file name is entered", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get(`/api/images?width=${width}&height=${height}`);
            expect(response.status).toBe(400);
        }));
        it("doesn't get the api endpoint when the image does not exist in the folder", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get(`/api/images?fileName=${wrongFileName}&width=${width}&height=${height}`);
            expect(response.status).toBe(404);
        }));
        it("doesn't get the api endpoint when values are invalid", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get(`/api/images?fileName=${fileName}&width=ytyt&height=${height}`);
            expect(response.status).toBe(400);
        }));
    });
});
//# sourceMappingURL=indexSpec.js.map