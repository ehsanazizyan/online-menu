import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import styles from "./SignupPage.module.css";

import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Loader from "../template/Loader";
import validation from "@/helper/validation";

export default function SigninPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
        phone: "",
    });

    async function submitHandler(e) {
        e.preventDefault();
        setIsLoading(true);

        const valid = validation(form.email, form.password, form.phone);

        if (valid.status === 401) {
            toast.error(valid.error);
            setIsLoading(false);
            return;
        }

        const res = await signIn("credentials", {
            phone: form.phone,
            email: form.email,
            password: form.password,
            redirect: false,
        });

        if (res.error) {
            toast.error(res.error);
            setTimeout(() => router.replace("/signup"), 7000);
        }

        if (res.status === 200) router.replace("/");

        setIsLoading(false);
    }

    const changeHandler = (e) => {
        const name = e.target.name;
        let value = e.target.value.trim();

        setForm((form) => ({ ...form, [name]: value }));
    };

    return (
        <div className={styles.form}>
            <h3> فرم ورود به حساب کاربری </h3>
            <form onSubmit={submitHandler} onChange={changeHandler}>
                <label htmlFor="email">ایمیل :</label>
                <input type="email" name="email" id="email" />

                <label htmlFor="phone">شماره موبایل : </label>
                <input onWheel={(e) => e.preventDefault()} type="number" name="phone" id="phone" />

                <label htmlFor="password">رمز عبور :</label>
                <input type="password" name="password" id="password" />
                {isLoading ? <Loader /> : <button type="submit"> ورود</button>}
            </form>
            <Toaster />
        </div>
    );
}
