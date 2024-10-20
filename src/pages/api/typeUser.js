import UserMenu from "@/dataBase/module/schemaUser";
import ConnectDB from "@/dataBase/utils/connectDB";

export default async function handler(req, res) {
    try {
        await ConnectDB();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    const { email } = req.query;

    const typeUser = await UserMenu.findOne({ email: email });
    res.status(200).json({ role: typeUser?.role });
}
