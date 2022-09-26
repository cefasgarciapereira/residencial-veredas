import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const BASE_URL = "https://opensheet.elk.sh/"
const SHEET_ID = "1E85UsRGMPkAlh1AaxXHZIlhHDl4lKMoE8IAJCSyQXdw"
const TAB_NAME = "Página1"

const initialState = {
    entities: [],
    loading: false,
    currentRequestId: undefined,
    error: null
}

export const fetchSheets = createAsyncThunk(
    'sheets/fetchSheets',
    async () => {
        const response = await fetch(`${BASE_URL}${SHEET_ID}/${TAB_NAME}`)
        const data = await response.json()
        return data
    }
)

export const sheetsSlice = createSlice({
    name: 'sheets',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSheets.pending, (state, action) => {
                if (!state.loading) {
                    state.loading = true
                    state.currentRequestId = action.meta.requestId
                }
            })
            .addCase(fetchSheets.fulfilled, (state, action) => {
                const { requestId } = action.meta
                if (
                    state.loading &&
                    state.currentRequestId === requestId
                ) {
                    state.loading = false
                    state.entities = action.payload
                    state.currentRequestId = undefined
                }
            })
            .addCase(fetchSheets.rejected, (state, action) => {
                const { requestId } = action.meta
                if (
                    state.loading &&
                    state.currentRequestId === requestId
                ) {
                    state.loading = false
                    state.error = action.error
                    state.currentRequestId = undefined
                }
            })
    },
})

//export const { filterByDate } = sheetsSlice.actions

export default sheetsSlice.reducer