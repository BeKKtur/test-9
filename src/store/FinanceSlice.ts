import {ApiTransaction, Category, Transaction} from "../types";
import {createSlice} from "@reduxjs/toolkit";
import {
    deleteCategory,
    deleteTransaction,
    fetchCategories,
    fetchOneTransaction,
    fetchTransaction,
    updateTransaction
} from "./FinanceThunk";

interface State {
    transactions: Transaction[];
    transactionLoading: boolean;
    deleteTransaction: boolean | string;
    updateLoading: boolean;
    oneTransaction: ApiTransaction | boolean;
    oneTransactionLoading: boolean;
    category: Category[];
    categoryLoading: boolean;
    deleteCategory: boolean | string
}

const initialState:State = {
    transactions: [],
    transactionLoading: false,
    deleteTransaction: false,
    updateLoading: false,
    oneTransaction: false,
    oneTransactionLoading: false,
    category: [],
    categoryLoading: false,
    deleteCategory: false
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
            state.deleteTransaction = action.meta.arg
        }).addCase(deleteTransaction.fulfilled, (state) => {
            state.deleteTransaction = false
        }).addCase(deleteTransaction.rejected, (state) => {
            state.deleteTransaction = false
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

        builder.addCase(fetchCategories.pending, (state) => {
            state.categoryLoading = true;
        }).addCase(fetchCategories.fulfilled, (state,{payload: category}) => {
            state.categoryLoading = false;
            state.category = category;
        }).addCase(fetchCategories.rejected, (state) => {
            state.categoryLoading = false;
        });

        builder.addCase(deleteCategory.pending, (state, action) => {
            state.deleteCategory = action.meta.arg
        }).addCase(deleteCategory.fulfilled, (state) => {
            state.deleteCategory = false
        }).addCase(deleteCategory.rejected, (state) => {
            state.deleteCategory = false
        });
    }
});

export const transactionReducer = financeSlice.reducer;