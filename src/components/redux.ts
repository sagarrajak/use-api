import { combineReducers } from "@reduxjs/toolkit";

export const apiReducers = combineReducers(thunkApis.reduce((pre, cur) => ({
    [cur.reduxKey]: cur.reducer,
    ...pre
}), {}));

export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector
