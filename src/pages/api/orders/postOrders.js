import OrdersSchema from "@/dataBase/module/ordersSchema";
import ConnectDB from "@/dataBase/utils/connectDB";

export default async function handler(req, res) {
    try {
        await ConnectDB();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "مشکل در اتصال به پایگاه داده" });
    }
    const body = req.body;

    const result = await OrdersSchema.create(body);
    res.status(200).json(result);
}
