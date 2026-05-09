import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

import CategoriesSlice from "./Categories/CategoriesSlice";
import ProductsSlice from "./Products/ProductsSlice";
import CartSlice from "./Cart/CartSlice";
import WishlistSlice from "./Wishlist/WishlistSlice";
import AuthSlice from "./Auth/AuthSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["Cart", "Wishlist", "Auth"]
};

const rootReducer = combineReducers({
  Categories: CategoriesSlice,
  Products: ProductsSlice,
  Cart: CartSlice,
  Wishlist: WishlistSlice,
  Auth: AuthSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;