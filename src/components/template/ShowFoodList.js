import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ShowFoodList.module.css";
import toast, { Toaster } from "react-hot-toast";

import { e2p, sp } from "@/helper/changeNumber";

export default function ShowFoodList({ idCategory }) {
    const [foodList, setFoodList] = useState([]);
    const [showFoodEdit, setShowFoodEdit] = useState({
        isShow: false,
        idFood: "",
    });

    useEffect(() => {
        getFood();
    }, []);

    function getFood() {
        axios
            .post("/api/food/getFood", { idCategory, Activiti: false })
            .then((res) => {
                setFoodList(res.data);
            })
            .catch((error) => {
                toast.error("مشکلی در ارتباط با سرور پیش آمده لطفا بعدا اقدام کنید");
                console.log(error);
            });
    }

    const checkHadnler = (id, e) => {
        const hasChecked = e.target.checked;
        axios
            .patch("/api/food/foodChecked", { id, check: hasChecked })
            .then((res) => {
                if (res.status === 200) {
                    getFood();
                    setShowFoodEdit({ isShow: false });
                }
            })
            .catch((error) => {
                toast.error("مشکلی در فعال کردن این غذا پیش آمده لطفا بعدا اقدام کنید");
                console.log(error);
            });
    };

    const deleteFoodHandler = (id) => {
        axios
            .delete(`/api/food/deleteFood`, { data: { id } })
            .then((res) => {
                if (res.status === 200) {
                    getFood();
                }
            })
            .catch((error) => {
                toast.error("مشکلی در حذف این غذا پیش آمده لطفا بعدا اقدام کنید");
                console.log(error);
            });
    };

    return (
        <div className={styles.container}>
            <Toaster />
            {foodList.length ? (
                foodList.map((item) => (
                    <div key={item._id} className={styles.food}>
                        <div>
                            <input
                                type="checkbox"
                                onChange={(e) => checkHadnler(item._id, e)}
                                checked={item.isActive}
                            />
                            <span>نمایش در منو</span>
                        </div>
                        <button
                            onClick={() =>
                                setShowFoodEdit({
                                    idFood: item._id,
                                    isShow: !showFoodEdit.isShow,
                                })
                            }>
                            ویرایش
                        </button>
                        {showFoodEdit.isShow && item._id === showFoodEdit.idFood && (
                            <FoodEdit
                                food={item}
                                setShowFoodEdit={setShowFoodEdit}
                                getFood={getFood}
                            />
                        )}
                        <label> {item.name} </label>
                        <span>{e2p(sp(item.price))} : قیمت </span>
                        <button onClick={() => deleteFoodHandler(item._id)}>حذف</button>
                    </div>
                ))
            ) : (
                <h3>برای این دسته غذایی ثبت نشده</h3>
            )}
        </div>
    );
}

//_____________________________________________________________________________________________

const FoodEdit = ({ food, setShowFoodEdit, getFood }) => {
    const [editFoodForm, setEditFoodForm] = useState({
        name: "",
        price: "",
        details: [],
    });
    const [isDisabled, setIsDisabled] = useState(false);

    const changeFoodHandler = (e) => {
        e.preventDefault();
        setIsDisabled(true);

        const idFood = food._id;
        axios
            .patch("/api/food/editFood", { editFoodForm, idFood })
            .then((res) => {
                console.log(res);
                if (res.data._id) {
                    setIsDisabled(false);
                    getFood();
                    setShowFoodEdit({ isShow: false });
                }
            })
            .catch((error) => {
                console.log(error);
                setIsDisabled(true);
                toast.error("مشکلی در ویرایش غذا پیش آمده لطفا بعدا اقدام کنید");
            });
    };

    const formHandler = (e) => {
        const { name, value } = e.target;
        setEditFoodForm((preveditFood) => {
            return {
                ...preveditFood,
                [name]: name === "details" ? value.split("\n") : value,
            };
        });
    };

    return (
        <div className={styles.editfood}>
            <form onChange={formHandler} onSubmit={changeFoodHandler}>
                <label htmlFor="name"> نام غذا : </label>
                <input type="text" id="name" name="name" />

                <label htmlFor="price">قیمت : </label>
                <input type="number" id="price" name="price" />

                <label htmlFor="details"> مواد تشکیل دهنده : </label>
                <textarea
                    placeholder="مواد تشکیل دهنده غذا را وارد کنید (هر ماده را در یک خط جدا کنید)"
                    type="text"
                    id="details"
                    name="details"
                    rows="4"
                    cols="30"
                />
                <div>
                    <button type="submit" disabled={isDisabled}>
                        ذخیره
                    </button>
                    <button onClick={() => setShowFoodEdit({ isShow: false })}>لغو</button>
                </div>
            </form>
        </div>
    );
}
