import OrdersSchema from "@/dataBase/module/ordersSchema";
import ConnectDB from "@/dataBase/utils/connectDB";

export default async function handler(req, res) {
    try {
        await ConnectDB();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "خطا در بارگذاری سفارش جدید در سرور" });
    }

    const result = await OrdersSchema.find();
    res.status(200).json(result);
}
