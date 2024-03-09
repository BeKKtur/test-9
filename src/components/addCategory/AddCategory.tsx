import {OPTIONS} from "../../component";
import * as React from "react";
import {ApiCategory} from "../../types";
import {useState} from "react";

interface Props {
    onSubmit:(category:ApiCategory) => void
}

const AddCategory:React.FC<Props> = ({onSubmit}) => {
    const [category, setCategory] = useState<ApiCategory>({
        name: '',
        category: ''
    });

    const onSubmitCategory = (e:React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            name:category.name,
            category: category.category
        });
    }

    const onChange = (e:React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        e.preventDefault();
        setCategory(prevState => ({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }



    return (
        <div>
            <form className='form' onSubmit={onSubmitCategory}>
                <h2>Add category</h2>
                <hr/>
                <div>
                    <input
                        type="text"
                        name='name'
                        id='name'
                        required
                        placeholder='category'
                        onChange={onChange}
                    />
                </div>
                <div>
                    <select
                        name="category"
                        id="category"
                        required
                        onChange={onChange}
                    >
                        {OPTIONS.map(type => (
                            <option value={type.value} key={type.value}>{type.label}</option>
                        ))}
                    </select>
                </div>
                <hr/>
                <button>Safe</button>
            </form>
        </div>
    );
};

export default AddCategory;