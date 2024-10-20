import { Category } from "@/dataBase/module/categoriesSchema";
import ConnectDB from "@/dataBase/utils/connectDB";

export default async function handler(req, res) {
    if (req.method !== "PATCH") return;
    try {
        await ConnectDB();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "مشکلی در اتصال به سرور رخ داده" });
    }
    const body = await req.body;
    const { idCategory, newNameCategory } = body;

    if (!newNameCategory) {
        return res.status(400).json({ error: "یک اسم جدید را وارد کنید" });
    }
    const oldName = await Category.findOne({ name: newNameCategory });

    if (oldName) {
        return res.status(400).json({ error: "اسم جدید در حال حاضر وجود دارد" });
    }
    const data = await Category.findById({ _id: idCategory });
    data.name = newNameCategory;
    data.save();

    return res.status(200).json({ message: "مورد ویرایش شد" });
}
