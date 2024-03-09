export interface ApiTransaction {
    date:string;
    category:string
    amount: number;
}

export interface Transaction extends ApiTransaction {
    [id: string];
}

export interface ApiTransactions {
    [id:string]: ApiTransaction;
}