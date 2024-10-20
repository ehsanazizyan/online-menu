import { FoodMenu } from "@/dataBase/module/categoriesSchema";
import ConnectDB from "@/dataBase/utils/connectDB";

export default async function handler(req, res) {
    try {
        await ConnectDB();
    } catch (error) {
        res.status(500).json({ error: "خطا در اتصال به پایگاه داده" });
    }

    if (req.method !== "DELETE") return;
    const { id } = req.body;

    try {
        const food = await FoodMenu.findByIdAndDelete(id);
        res.status(200).json(food);
    } catch (error) {
        res.status(500).json(error);
    }
}
