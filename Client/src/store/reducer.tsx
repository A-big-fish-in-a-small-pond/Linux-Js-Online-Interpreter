import { combineReducers } from "redux";
import storageSession from "redux-persist/lib/storage/session";
import { persistReducer } from "redux-persist";
import login from "./login";

const persistConfig = {
    key: "root",
    storage: storageSession,
    whitelist: ["login"],
    // blacklist -> 그것만 제외합니다
};

export default function reducer() {
    const rootReducer = combineReducers({ login });
    return persistReducer(persistConfig, rootReducer);
}
