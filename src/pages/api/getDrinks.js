//این api  فقط زیر مجموعه هایی را برگشت میدهد که جزو  زیر مجموعه ایی با اسم  << نوشیدنی >> باشند

import { Category, FoodMenu } from "@/dataBase/module/categoriesSchema";
import ConnectDB from "@/dataBase/utils/connectDB";

export default async function handler(req, res) {
    if (req.method !== "GET") return;
    try {
        await ConnectDB();
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: "مشکلی در اتصال به سرور پیش آمده لطفا بعدا امتحان کنید" });
    }

    const result = await Category.find({ name: "نوشیدنی" });
    const categoryID = result[0]._id;

    const foodsInCategory = await FoodMenu.find({ category: categoryID });

    return res.status(200).json(foodsInCategory);
}
