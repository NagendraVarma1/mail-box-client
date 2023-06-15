import { configureStore } from "@reduxjs/toolkit";
import mailSliceReducer from "./mail-slice";

const Store = configureStore({
    reducer: { mail : mailSliceReducer},
})


export default Store