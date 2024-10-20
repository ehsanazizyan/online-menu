import UserMenu from "@/dataBase/module/schemaUser";
import ConnectDB from "@/dataBase/utils/connectDB";
import { hashPassword } from "@/helper/hashPassword";

export default async function handler(req, res) {
    if (req.method !== "POST") return;
    try {
        await ConnectDB();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "مشکلی در سرور رخ داده لطفا بعدا امتحان کنید" });
    }

    try {
        const { email, phone, password } = req.body;

        if (!email || !phone || !password) {
            return res.status(401).json({ error: "لطفا تمامی فیلدها را پر کنید" });
        }

        const isExist = await UserMenu.findOne({ email: email, phone: phone });

        if (isExist !== null) {
            return res.status(401).json({ error: "این کاربر قبلا ثبته نام کرده است " });
        }

        const hasPass = await hashPassword(password);

        const createdUser = await UserMenu.create({
            email: email,
            password: hasPass,
            phone: phone,
        });

        if (createdUser) {
            return res.status(200).json({ message: "ثبت نام انجام شد" });
        } else {
            return res
                .status(401)
                .json({ error: "ثبته نام انجام نشد لطفا بعدا دوباره امتحان کنید" });
        }
    } catch (error) {
        console.log({ API_SignUp_ERROR: error });
        return res.status(500).json({ error: "مشکلی در سرور رخ داده لطفا بعدا امتحان کنید" });
    }
}
