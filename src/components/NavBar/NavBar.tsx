import {Link} from "react-router-dom";
import {useState} from "react";
import AddTransaction from "../addTrahsaction/AddTransaction";
import {useAppDispatch} from "../../app/hooks";
import {addTransaction} from "../../store/FinanceThunk";
import {ApiTransaction} from "../../types";

const NavBar = () => {
    const dispatch = useAppDispatch();
    const [modal, setModal] = useState(false);

    const onClickModal = () => {
        setModal(!modal);
    }

    const onSubmit = async (apiTransaction:ApiTransaction) => {
        await dispatch(addTransaction(apiTransaction));
    }

    return (
        <div>
            <nav>
                <div className="nav">
                    <h3 className="navbar-brand m-0">Finance Tracker</h3>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className='link'>
                            <Link className="button" to='category'>Categories</Link>
                            <button className="button" onClick={onClickModal}>Add</button>
                        </ul>
                    </div>
                </div>
            </nav>
            {modal && (
                <div className='modal'>
                    <div className='modal_box'>
                        <button onClick={onClickModal}>X</button>
                        <h3>Add Expense/Income</h3>
                        <AddTransaction onSubmit={onSubmit}/>
                    </div>
                </div>

            )}
        </div>
    );
};

export default NavBar;