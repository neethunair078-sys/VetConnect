import {configureStore} from "@reduxjs/toolkit"

import petReducer from './slices/petSlice'

export const store = configureStore({
    reducer: {
        pets: petReducer
    }
})