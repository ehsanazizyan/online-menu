import { Category } from "@/dataBase/module/categoriesSchema";
import ConnectDB from "@/dataBase/utils/connectDB";

export default async function handler(req, res) {
    if (req.method !== "GET") return;
    try {
        await ConnectDB();
    } catch (error) {
        res.status(500).json({ error: " مشکل در اتصال به سرور" });
    }
    const id = req.query.idCategory;

    const response = await Category.findOne({ _id: id });

    if (!response) {
        res.status(404).json({ error: "Category not found" });
    } else {
        res.status(200).json(response);
    }
}
