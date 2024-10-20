import { Category } from "@/dataBase/module/categoriesSchema";
import ConnectDB from "@/dataBase/utils/connectDB";

export default async function handler(req, res) {
    if (req.method !== "POST") return;
    try {
        await ConnectDB();
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: "مشکلی در اتصال به سرور پیش آمده لطفا بعدا امتحان کنید" });
    }
    const body = req.body;

    if (!body.categoryName) return res.status(400).json({ error: "لطفا دسته بندی را وارد کنید" });

    const isCategory = await Category.findOne({ name: body.categoryName });
    if (isCategory) return res.status(400).json({ error: "این دسته بندی قبلا ایجاد شده" });

    const newCategory = await Category.create({
        name: body.categoryName,
    });
    if (newCategory) {
        return res.status(200).json({ message: "دسته بندی افزوده شد" });
    } else {
        return res
            .status(500)
            .json({ error: "مشکلی درایجاد دسته بندی به وجود آمده لطفا بعدا دوباره امتحان کنید" });
    }
}
