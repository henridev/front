import devStore from "./config/storeConfig.dev";
import prodStore from "./config/storeConfig.prod";
import { AppStore } from "./types";
import { createStore } from "redux";
import { rootReducer } from "./reducers";

export const store =
  process.env.NODE_ENV === "production" ? prodStore : devStore;

export const createTestStore = (store: AppStore) =>
  createStore(rootReducer, store);
