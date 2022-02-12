// import { createStore, combineReducers } from "redux";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./reducer/cartReducer";
import userReducer from "./reducer/userReducer";
// import { composeWithDevTools } from "redux-devtools-extension";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const rootReducer = combineReducers({ user: userReducer, cart: cartReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);
// const rootReducer = combineReducers({
//   cart: cartReducer,
//   user: userReducer,
// });

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export let persistor = persistStore(store);
// const store = createStore(rootReducer, composeWithDevTools());
// export default store;
