//The information of this file is displayed in the path of the manager

import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoIosArrowUp } from "react-icons/io";

import styles from "./ShowListData.module.css";
import ShowFoodList from "./ShowFoodList";
import Loader from "./Loader";

export default function ShowListData({ categoryList, getAllCategory, setCategoryList }) {
    const [idCategory, setIdCategory] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);

    const deleteCategoryHandler = async (id) => {
        axios
            .delete("/api/category/deleteCategory", { data: { id: id } })
            .then((res) => {
                if (res.status === 200) {
                    getAllCategory();
                    toast.success(res.data.message);
                }
            })
            .catch((error) => {
                console.log(error);
                if (error.response.status === 404 || 500) {
                    toast.error(error.response.data.error);
                }
            });
    };

    const setIsExpandedHandler = (id) => {
        setIdCategory(id);
        setIsExpanded(!isExpanded);
    };

    if (!categoryList.length) {
        return (
            <div style={{ marginRight: "50%" }}>
                <Loader />
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Toaster />
            <h3>
                دسته های موجود
                <span> ⟪ {categoryList?.length} ⟫</span>
            </h3>
            {categoryList?.length ? (
                categoryList?.map((item) => (
                    <div key={item._id}>
                        <section className={styles.list}>
                            <span className={isExpanded ? styles.rotate : ""}>
                                <IoIosArrowUp
                                    className={item._id === idCategory && styles.arrow_icon}
                                    onClick={() => setIsExpandedHandler(item._id)}
                                />
                            </span>
                            <span>{item.name}</span>
                            <div className={styles.buttons}>
                                <button onClick={() => deleteCategoryHandler(item._id)}>حذف</button>
                                <EditCategory
                                    idCategory={item._id}
                                    setCategoryList={setCategoryList}
                                    categoryList={categoryList}
                                />
                            </div>
                        </section>
                        {item._id === idCategory && isExpanded ? (
                            <ShowFoodList idCategory={idCategory} />
                        ) : null}
                    </div>
                ))
            ) : (
                <p>دسته ایی وجود ندارد</p>
            )}
        </div>
    );
}

const EditCategory = ({ idCategory, setCategoryList, categoryList }) => {
    const [newNameCategory, setNewNameCategory] = useState("");
    const [showInput, setShowInput] = useState("");

    const getCategoryID = () => {
        axios
            .get("/api/category/getCategoryID", { params: { idCategory } })
            .then((res) => {
                if (res.status === 200) {
                    const newCategoryList = categoryList.map((item) =>
                        item._id === res.data._id ? { ...item, name: res.data.name } : item
                    );
                    setCategoryList(newCategoryList);
                }
            })
            .catch((error) => console.log(error));
    };

    const editHandler = () => {
        axios
            .patch(`/api/category/editCategory`, {
                idCategory,
                newNameCategory,
            })
            .then((res) => {
                if (res.status === 200) {
                    setNewNameCategory("");
                    setShowInput("");
                    toast.success(res.data.message);
                    getCategoryID();
                }
            })
            .catch((error) => {
                console.log(error);
                if (error.response.status === 400 || 500) {
                    toast.error(error.response.data.error);
                }
            });
    };
    return (
        <div className={styles.buttonChange}>
            <button onClick={() => setShowInput(idCategory)}>ویرایش </button>
            {showInput === idCategory && (
                <span>
                    <button onClick={editHandler}>تایید</button>
                    <input
                        placeholder="اسم جدید را وارد کنید"
                        value={newNameCategory}
                        type="text"
                        onChange={(e) => setNewNameCategory(e.target.value)}
                    />
                </span>
            )}
        </div>
    );
}
