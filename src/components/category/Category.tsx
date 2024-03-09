import {useEffect, useState} from "react";
import AddCategory from "../addCategory/AddCategory";
import {ApiCategory} from "../../types";
import {
    addCategory,
    deleteCategory,
    fetchCategories,
} from "../../store/FinanceThunk";
import {useAppDispatch, useAppSelector} from "../../app/hooks";

const Category = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(state => state.transaction.category)

    const [modal, setModal] = useState(false);
    const onClickModal = () => {
        setModal(!modal);
    }

    const onSubmitCategories = async (apiCategory:ApiCategory) => {
        await dispatch(addCategory(apiCategory));
        await dispatch(fetchCategories())
    }

    const removeCategory = async (id:string) => {
        await dispatch(deleteCategory(id));
        await dispatch(fetchCategories());
    }

    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch]);

    console.log(categories)


    return (
        <div className='container'>
            <div className='div'>
                <h3>Categories</h3>
                <button onClick={onClickModal}>Add</button>
            </div>
            {categories.map(category => (
                <div key={category.id} className='card'>
                    <div>
                        <p>{category.name}</p>
                        <p>{category.category}</p>
                    </div>
                    <div>
                        <button onClick={() => removeCategory(category.id)}>Delete</button>
                    </div>
                </div>
            ))}
            {modal && (
                <div className='modal'>
                    <div className='modal_box'>
                        <button onClick={onClickModal} className='button'>X</button>
                        <AddCategory onSubmit={onSubmitCategories}/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Category;