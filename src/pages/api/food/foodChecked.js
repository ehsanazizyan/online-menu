import { FoodMenu } from "@/dataBase/module/categoriesSchema";
import ConnectDB from "@/dataBase/utils/connectDB";

export default async function handler(req, res) {
    if (req.method !== "PATCH") return;
    try {
        await ConnectDB();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "خطا در اتصال به سرور" });
    }
    const body = req.body;

    const { id, check } = body;
    const data = await FoodMenu.findById({ _id: id });
    data.isActive = check;

    data.save();

    return res.status(200).json(data);
}
