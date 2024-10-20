import { FoodMenu } from "@/dataBase/module/categoriesSchema";
import ConnectDB from "@/dataBase/utils/connectDB";

export default async function handler(req, res) {
    if (req.method !== "POST") return;

    try {
        await ConnectDB();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "خطا در اتصال به پایگاه داده" });
    }
    const body = req.body;

    const { name, details, categoryID, price } = body.form;

    // const category = await Category.findOne({ _id: categoryID });
    // if (!category) {
    //    // اگر دسته‌بندی وجود ندارد، یک دسته‌بندی جدید ایجاد می‌کنیم
    //    const newCategory = await Category.create({ name: name });
    //    categoryId = newCategory._id;
    // } else {
    //    categoryId = category._id;
    // }

    const response = await FoodMenu.create({
        name: name,
        price: price,
        category: categoryID, // استفاده از آی‌دی دسته‌بندی
        details: details,
    });
    if (response) {
        return res.status(200).json({ message: "غذا ثبت شد" });
    } else {
        return res.status(400).json({ error: "غذا ثبت نشد " });
    }
}

//////////
// import { Category } from "@/module/categoriesSchema";
// import connectDB from "@/utils/connectDB";
// import { NextResponse } from "next/server";

// export async function POST(req, res) {
//    try {
//       await connectDB();
//       const body = await req.json();

//       const { name, details, categoryName, price } = body;

//       // const response = await Category.create({
//       //    name: name,
//       //    price: price,
//       //    category: category,
//       //    details: details,
//       // });
//    } catch (error) {
//       console.log(error);
//    }

//    return NextResponse.json({ message: "POST POST" });
// }
