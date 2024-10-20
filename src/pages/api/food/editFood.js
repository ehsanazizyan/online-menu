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
    const { name, price, details } = body.editFoodForm;
    const { idFood } = body;

    const data = await FoodMenu.findById({ _id: idFood });
    data.name = name || data.name;
    data.price = price || data.price;
    data.details = details.length <= 0 ? data.details : details;
    data.save();

    return res.status(200).json(data);
}
