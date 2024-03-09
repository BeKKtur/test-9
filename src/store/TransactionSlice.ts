import {Transaction} from "../types";
import {createSlice} from "@reduxjs/toolkit";

interface State {
    transactions: Transaction[]
}

const initialState:State = {
    transactions: []
}

const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {}
});

export const transactionReducer = transactionSlice.reducer;