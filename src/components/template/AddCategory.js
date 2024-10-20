import axios from "axios";
import styles from "./AddCategory.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

export default function AddCategory({ categoryName, setCategoryName, getAllCategory }) {
    const [isDisabled, setIsDisabled] = useState(false);
    const submitHandler = (e) => {
        e.preventDefault();
        setIsDisabled(true);
        axios
            .post("/api/category/addCategory", { categoryName })
            .then((res) => {
                if (res.status === 200) {
                    getAllCategory();
                    setIsDisabled(false);
                    setCategoryName("");
                    toast.success(res.data.message);
                }
            })
            .catch((error) => {
                console.log(error);
                if (error.response.status === 400 || 500) {
                    setIsDisabled(true);
                    toast.error(error.response.data.error);
                }
            });
    };
    return (
        <form onSubmit={submitHandler} className={styles.form}>
            <label htmlFor="categoryName">افزودن دسته بندی جدید</label>
            <div>
                <input
                    id="categoryName"
                    value={categoryName}
                    type="text"
                    placeholder="دسته..."
                    onChange={(e) => setCategoryName(e.target.value)}
                />
                <button type="submit" disabled={isDisabled}>
                    افزودن
                </button>
            </div>
            <Toaster />
        </form>
    );
}
