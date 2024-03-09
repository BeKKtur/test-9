export interface ApiTransaction {
    date:string;
    type: string;
    category:string
    amount: number;
}

export interface Transaction extends ApiTransaction {
    [id: string];
}

export interface ApiTransactions {
    [id:string]: ApiTransaction;
}

export interface TransactionMutation {
    date:string;
    type: string;
    category:string;
    amount: string;
}

export interface UpdateTransaction {
    transactionId:string;
    apiTransaction: ApiTransaction;
}

export interface ApiCategory {
    name: string;
    category: string;
}

export interface ApiCategories {
    [id:string]: ApiCategory;
}

export interface Category extends ApiCategory {
    [id:string]
}