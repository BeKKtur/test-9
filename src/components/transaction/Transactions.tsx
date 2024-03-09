import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useEffect, useState} from "react";
import {deleteTransaction, fetchTransaction, updateTransaction} from "../../store/FinanceThunk";
import dayjs from 'dayjs';
import AddTransaction from "../addTrahsaction/AddTransaction";
import {ApiTransaction} from "../../types";
import {useParams} from "react-router-dom";

const Transactions = () => {
    const {id} = useParams()
    const dispatch = useAppDispatch();
    const transactions = useAppSelector(state => state.transaction.transactions);
    const [modal, setModal] = useState(false);

    const onClickModal = () => {
        setModal(!modal)
    }

    const removeTransaction = async (id:string) => {
        await dispatch(deleteTransaction(id));
        await dispatch(fetchTransaction());
    }

    const onSubmit = async (apiTransaction:ApiTransaction) => {
        if (id) {
            await dispatch(updateTransaction({transactionId: id, apiTransaction}));
        }
    }


    useEffect(() => {
        dispatch(fetchTransaction())
    }, [fetchTransaction]);

    const total = transactions.reduce((acc, value) => {
        return acc + value.amount
    },0)

    console.log(total)

    return (
        <div className='container'>
            <div>
                <h1>Total:{total}</h1>
            </div>
            {transactions.map(transaction => (
                <div key={transaction.id} className='container'>
                    <div className='card'>
                        <div>
                            <p>{dayjs(transaction.date).format('DD.MM.YYYY HH:mm:ss')}</p>
                            <p>{transaction.category}</p>
                        </div>
                        <div>
                        <p>{transaction.amount}</p>
                            <div>
                                <button onClick={onClickModal}>Edit</button>
                                <button onClick={() => removeTransaction(transaction.id)}>delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {modal && (
                <div className='modal'>
                    <div className='modal_box'>
                        <button onClick={onClickModal}>X</button>
                        <h3>Edit Expense/Income</h3>
                        <AddTransaction onSubmit={onSubmit}/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Transactions;