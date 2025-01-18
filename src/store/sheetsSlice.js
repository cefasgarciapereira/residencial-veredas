import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { buildBalances, buildCashFlow, buildIncomes, buildOutcomes, calculateCashFlow, calculateExpenses, calculateProfit } from '../services/sheets'

const BASE_URL = "https://opensheet.elk.sh/"
const SHEET_ID = "1E85UsRGMPkAlh1AaxXHZIlhHDl4lKMoE8IAJCSyQXdw"
const TAB_NAME = "Página1"

const initialState = {
    entities: [],
    totalInAccount: 0,
    totalExpenses: 0,
    totalProfit: 0,
    incomes: [],
    outcomes: [],
    cashflow: [],
    balances: [],
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
                    state.totalInAccount = calculateCashFlow(action.payload)
                    state.totalExpenses = calculateExpenses(action.payload)
                    state.totalProfit = calculateProfit(action.payload)
                    state.entities = action.payload
                    state.currentRequestId = undefined
                    state.incomes = buildIncomes(action.payload)
                    state.outcomes = buildOutcomes(action.payload)
                    state.cashflow = buildCashFlow(action.payload)
                    state.balances = buildBalances(action.payload)
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

export default sheetsSlice.reducer