import { rollingStockMock } from "./mockstate";

export default {
  get: jest.fn((url: string) => {
    switch (url) {
      case "rolling-stock":
        return Promise.resolve(rollingStockMock);

      default:
        return Promise.resolve();
    }
  }),
};
