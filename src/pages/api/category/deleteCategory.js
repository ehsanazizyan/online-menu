import { Category } from "@/dataBase/module/categoriesSchema";
import ConnectDB from "@/dataBase/utils/connectDB";

export default async function handler(req, res) {
    if (req.method !== "DELETE") return;
    try {
        await ConnectDB();
    } catch (error) {
        res.status(500).json({ error: "خطا در اتصال به پایگاه داده" });
    }
    const id = req.body.id;

    const response = await Category.findOneAndDelete({ _id: id });
    if (response._id) {
        res.status(200).json({ message: "مورد حذف شد" });
    } else {
        res.status(404).json({ error: "خطا در حذف مورد" });
    }
}
