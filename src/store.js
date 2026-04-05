import { configureStore } from "@reduxjs/toolkit";
import weatherApiSlicReducer from "./weatherApiSlice";


export default configureStore({
    reducer: {
        weather: weatherApiSlicReducer
    }
})