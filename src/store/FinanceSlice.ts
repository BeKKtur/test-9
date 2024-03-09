import {ApiTransaction, Transaction} from "../types";
import {createSlice} from "@reduxjs/toolkit";
import {deleteTransaction, fetchOneTransaction, fetchTransaction, updateTransaction} from "./FinanceThunk";

interface State {
    transactions: Transaction[];
    transactionLoading: boolean;
    delete: boolean | string;
    updateLoading: boolean;
    oneTransaction: ApiTransaction | boolean;
    oneTransactionLoading: boolean;
}

const initialState:State = {
    transactions: [],
    transactionLoading: false,
    delete: false,
    updateLoading: false,
    oneTransaction: false,
    oneTransactionLoading: false,
}

const financeSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTransaction.pending, (state) => {
            state.transactionLoading = true;
        }).addCase(fetchTransaction.fulfilled, (state,{payload: transaction}) => {
            state.transactionLoading = false;
            state.transactions = transaction;
        }).addCase(fetchTransaction.rejected, (state) => {
            state.transactionLoading = false;
        });

        builder.addCase(deleteTransaction.pending, (state, action) => {
            state.delete = action.meta.arg
        }).addCase(deleteTransaction.fulfilled, (state) => {
            state.delete = false
        }).addCase(deleteTransaction.rejected, (state) => {
            state.delete = false
        });

        builder.addCase(updateTransaction.pending,(state) => {
            state.updateLoading = true
        }).addCase(updateTransaction.fulfilled,(state) => {
            state.updateLoading = false
        }).addCase(updateTransaction.rejected,(state) => {
            state.updateLoading = false
        });

        builder.addCase(fetchOneTransaction.pending, (state) => {
            state.oneTransactionLoading = true;
        }).addCase(fetchOneTransaction.fulfilled, (state, {payload: oneTransaction}) => {
            state.oneTransaction = oneTransaction;
            state.oneTransactionLoading = false;
        }).addCase(fetchOneTransaction.rejected, (state) => {
            state.oneTransactionLoading = false;
        });
    }
});

export const transactionReducer = financeSlice.reducer;