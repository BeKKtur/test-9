import {useState} from "react";
import AddCategory from "../addCategory/AddCategory";

const Category = () => {

    const [modal,setModal] = useState(false)

    const onClickModal = () => {
        setModal(!modal)
    }

    return (
        <div className='container'>
            <div>
                <h3>Categories</h3>
                <button onClick={onClickModal}>Add</button>
            </div>
            {modal && (
                <div className='modal'>

                    <div className='modal_box'>
                        <button onClick={onClickModal} className='button'>X</button>
                        <AddCategory/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Category;