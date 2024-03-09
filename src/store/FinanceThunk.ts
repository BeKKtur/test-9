import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    ApiCategories,
    ApiCategory,
    ApiTransaction,
    ApiTransactions,
    Category,
    Transaction,
    UpdateTransaction
} from "../types";
import axiosApi from "../axiosApi";
export const fetchTransaction = createAsyncThunk<Transaction[]>(
    'transaction/fetchTransaction',
    async () => {
        const {data:transaction} = await axiosApi.get<ApiTransactions | null>('/transactions.json');
        if (transaction === null){
            return []

        }
        return Object.keys(transaction).map(id => ({
            id,
            ...transaction[id]
        }))
    }
);

export const fetchCategories = createAsyncThunk<Category[]>(
    'category/fetchCategories',
    async () => {
        const {data:category} = await axiosApi.get<ApiCategories | null>('/categories.json');
        if (category === null){
            return []
        }
        return Object.keys(category).map(id => ({
            id,
            ...category[id]
        }))
    }
)

export const addTransaction = createAsyncThunk<void ,ApiTransaction>(
        'transaction/addTransaction',
    async (add) => {
            await  axiosApi.post('/transactions.json', add)
    }
);

export const addCategory = createAsyncThunk<void ,ApiCategory>(
    'category/addCategory',
    async (add) => {
        await axiosApi.post('/categories.json', add);
    }
)

export const deleteTransaction = createAsyncThunk<void,string>(
    'transaction/deleteTransaction',
    async (id) => {
        await axiosApi.delete(`/transactions/${id}.json`);
    }
);

export const deleteCategory = createAsyncThunk<void,string>(
    'category/deleteCategory',
    async (id:string) => {
        await axiosApi.delete(`/categories/${id}.json`);
    }
)
export const updateTransaction = createAsyncThunk<void,UpdateTransaction>(
    'transaction/updateTransaction',
    async ({transactionId,apiTransaction}) => {
        await axiosApi.put(`/transactions/${transactionId}.json`, apiTransaction);
    }
);

export const fetchOneTransaction = createAsyncThunk<ApiTransaction, string>(
    'transaction/fetchOneTransaction',
    async (transactionId, thunkAPI) => {
        const {data: transaction} = await axiosApi.get<ApiTransaction | null>(`/dishes/${transactionId}.json`);
        if (transaction === null) {
            return thunkAPI.rejectWithValue({code: 'not_found'});
        }
        return transaction;
    },
);