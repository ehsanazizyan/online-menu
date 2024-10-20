import UserMenu from "@/dataBase/module/schemaUser";
import ConnectDB from "@/dataBase/utils/connectDB";
import { verifyPassword } from "@/helper/hashPassword";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOption = {
    session: { strategy: "jwt" },
    providers: [
        CredentialsProvider({
            async authorize(credentials, req) {
                try {
                    await ConnectDB();
                } catch (error) {
                    console.log(error);
                    throw new Error("مشکلی در سرور رخ داده");
                }
                const { email, phone, password } = credentials;

                const isExist = await UserMenu.findOne({
                    email: email,
                    phone: phone,
                });

                if (isExist === null) {
                    throw new Error(
                        "کاربری  با این مشخصات ثبت نام نکرده است تاچند ثانیه دیگر به صفحه مربوط به ثبت نام منتقل خواهید شد"
                    );
                }
                const verifyPass = await verifyPassword(password, isExist.password);

                if (!verifyPass) throw new Error("رمز عبور اشتباه است");

                return { email };
            },
        }),
    ],
};

export default NextAuth(authOption);
