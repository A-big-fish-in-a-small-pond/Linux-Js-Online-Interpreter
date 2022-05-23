import { combineReducers, Reducer } from "redux";
import storageSession from "redux-persist/lib/storage/session";
import { persistReducer } from "redux-persist";
import counter from "./counter";

const persistConfig = {
    key: "root",
    storage: storageSession,
    whitelist: ["counter"],
    // blacklist -> 그것만 제외합니다
};

export default function reducer(): Reducer {
    const rootReducer = combineReducers({ counter });
    return persistReducer(persistConfig, rootReducer);
}
