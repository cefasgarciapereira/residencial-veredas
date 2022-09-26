import { configureStore } from '@reduxjs/toolkit'
import sheetsSlice from './sheetsSlice'

const store = configureStore({
    reducer: {
        sheets: sheetsSlice
    },
})

export default store