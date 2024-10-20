import { Category } from "@/dataBase/module/categoriesSchema";
import ConnectDB from "@/dataBase/utils/connectDB";

export default async function handler(req, res) {
    if (req.method !== "GET") return;
    try {
        await ConnectDB();
    } catch (error) {
        return res.status(500).json({ error: "مشکلی در سرور رخ داده لطفا بعدا امتحان کنید" });
    }
    const data = await Category.find();
    if (!data) {
        return res.status(404).json({ error: "مشکلی در نمایش دسته ها به وجود آمده" });
    }
    return res.status(200).json(data);
}
