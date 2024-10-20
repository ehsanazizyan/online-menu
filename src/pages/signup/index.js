import SignupPage from "@/components/elements/SignupPage";
import UserMenu from "@/dataBase/module/schemaUser";
import ConnectDB from "@/dataBase/utils/connectDB";

import { getSession } from "next-auth/react";

export default function () {
    return <SignupPage />;
}

export async function getServerSideProps(context) {
    const request = context.req;
    //شاید یک شخص که قبلا ثبت نام نکرده و
    //session نداردبخواهد ثبت نام کند چون در این شرایط شرط بالا عمل نمیکند
    //ودسترسی به این صفحه آزاد میشود امااین برنامه برای دسترسی فقط 2نفر آزاد است با
    // این شرط زیر دسترسی بیش از 2 نفر کاملا محدود میشود

    try {
        await ConnectDB();
    } catch (error) {
        console.log(error);
        if (error) {
            return {
                redirect: { destination: "/", permanent: false },
            };
        }
    }
    const numberOfUsers = await UserMenu.find({});

    if (numberOfUsers.length >= 3) {
        return {
            redirect: { destination: "/", permanent: false },
        };
    }

    //اگر یکی از آن دونفر که ثبت نام کردند نباید اجازه دسترسی به این صفحه داشته باشد

    const session = await getSession({ req: request });
    if (session) {
        return {
            redirect: { destination: "/", permanent: false },
        };
    }

    return {
        props: {},
    };
}
