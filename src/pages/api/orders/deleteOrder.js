import OrdersSchema from "@/dataBase/module/ordersSchema";
import ConnectDB from "@/dataBase/utils/connectDB";

export default async function handler(req, res) {
    try {
        await ConnectDB();
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: "مشکلی در اتصال به سرور پیش آمده لطفا بعدا امتحان کنید" });
    }
    try {
        const tableNumber = req.body;
        const result = await OrdersSchema.deleteMany({ tableNumber });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}
