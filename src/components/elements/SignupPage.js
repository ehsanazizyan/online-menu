import { useState } from "react";
import axios from "axios";
import styles from "./SignupPage.module.css";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import validation from "@/helper/validation";
import Loader from "../template/Loader";

export default function SignupPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
        phone: "",
    });

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const valid = validation(form.email, form.password, form.phone);
        if (valid.status === 401) {
            toast.error(valid.error);
            setIsLoading(false);
            return;
        }

        axios
            .post("/api/signup", form)
            .then((res) => {
                setIsLoading(false);
                if (res.data.message) {
                    toast.success(res.data.message);
                    router.replace("/signin");
                }
            })
            .catch((error) => {
                setIsLoading(false);
                if (error.response.status === 401 || 500) {
                    toast.error(error.response.data.error);
                }
                console.log(error);
            });
    };

    const changeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value.trim();
        setForm((form) => ({ ...form, [name]: value }));
    };

    return (
        <div className={styles.form}>
            <h3>فرم ثبت نام</h3>
            <form onSubmit={submitHandler} onChange={changeHandler}>
                <label htmlFor="email">ایمیل :</label>
                <input type="email" name="email" id="email" />

                <label htmlFor="phone">شماره موبایل : </label>
                <input onWheel={(e) => e.preventDefault()} type="number" name="phone" id="phone" />

                <label htmlFor="password">رمز عبور :</label>
                <input type="password" name="password" id="password" />
                {isLoading ? <Loader /> : <button type="submit"> ثبت نام</button>}
            </form>
            <Toaster />
        </div>
    );
}
