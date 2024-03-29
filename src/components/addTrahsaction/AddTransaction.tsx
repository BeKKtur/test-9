import {CATEGORY, OPTIONS} from "../../component";
import {ApiTransaction, TransactionMutation} from "../../types";
import * as React from "react";
import {useEffect, useState} from "react";
import {useAppDispatch} from "../../app/hooks";
import {fetchCategories} from "../../store/FinanceThunk";

interface Props {
    onSubmit: (transaction:ApiTransaction) => void
    extending?: TransactionMutation;
}

const initialState:TransactionMutation = {
    date: '',
    type: '',
    category: '',
    amount: ''
}

const AddTransaction:React.FC<Props> = ({ onSubmit ,extending = initialState}) => {
    const [transaction, setTransaction] = useState(extending);
    const dispatch = useAppDispatch()

    const now = new Date();
    const createdAt = now.toISOString();

    const onTransactionSubmit = (e:React.FormEvent) => {
        e.preventDefault();
            onSubmit({
                date:  createdAt,
                type: transaction.type,
                category: transaction.category,
                amount: parseFloat(transaction.amount)
            });
    }

    const onChange = (e:React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        e.preventDefault();
        setTransaction(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    useEffect(() => {
        dispatch(fetchCategories)
    }, [dispatch]);




    return (
        <div>
            <form onSubmit={onTransactionSubmit} className='form'>
                <hr/>
                <div>
                    <h3>Type</h3>
                    <select
                        name="type"
                        id="type"
                        required
                        onChange={onChange}
                    >
                        <option>Select type</option>
                        {OPTIONS.map(type => (
                            <option value={type.value} key={type.value}>{type.label}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <h3>Category</h3>
                    <select
                        name="category"
                        id="category"
                        required
                        onChange={onChange}
                    >
                        <option>Select category</option>
                        {CATEGORY.map(category => (
                            <option value={category.value} key={category.value}>{category.label}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <h3>Amount</h3>
                    <input
                        type="number"
                        name='amount'
                        id='amount'
                        required
                        placeholder='KGS'
                        onChange={onChange}
                    />
                </div>
                <hr/>
                <div>
                    <button>safe</button>
                </div>
            </form>
        </div>
    );
};

export default AddTransaction;