import { imageProcessing } from '../utilities/resize';
import * as supertest from 'supertest';
import app from '../index';

const width = 400;
const height = 400;
const fileName = 'santamonica';

const wrongFileName = 'Madrid';
const request = supertest(app);

describe('tests for the functions', () => {
  it('expects function to resolve', async () => {
    const promise = imageProcessing(width, height, fileName);
    await expectAsync(promise).toBeResolved();
  });
  it('expects function to reject', async () => {
    const promise = imageProcessing(width, height, wrongFileName);
    await expectAsync(promise).toBeRejected();
  });
});

describe('test for api endpoint', () => {
  it('gets the api endpoint', async () => {
    const response = await request.get(
      `/api/images?fileName=${fileName}&width=${width}&height=${height}`
    );
    expect(response.status).toBe(200);
  });
  describe('tests for api endpoint error handling', () => {
    it("doesn't get the api endpoint when no values are entered", async () => {
      const response = await request.get(`/api/images`);
      expect(response.status).toBe(400);
    });
    it("doesn't get the api endpoint when no file name is entered", async () => {
      const response = await request.get(
        `/api/images?width=${width}&height=${height}`
      );
      expect(response.status).toBe(400);
    });
    it("doesn't get the api endpoint when the image does not exist in the folder", async () => {
      const response = await request.get(
        `/api/images?fileName=${wrongFileName}&width=${width}&height=${height}`
      );
      expect(response.status).toBe(404);
    });
    it("doesn't get the api endpoint when values are invalid", async () => {
      const response = await request.get(
        `/api/images?fileName=${fileName}&width=ytyt&height=${height}`
      );
      expect(response.status).toBe(400);
    });
  });
});
