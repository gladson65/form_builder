import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categorySlice.js'

const quizeStore = configureStore({
    reducer: {
        category: categoryReducer,
    }
})

export default quizeStore;