import { configureStore } from "@reduxjs/toolkit";
import CostsSlice from "./costs-slice";

const store = configureStore({
    reducer: {costs: CostsSlice}
})

export default store