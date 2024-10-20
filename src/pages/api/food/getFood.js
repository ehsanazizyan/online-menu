import { FoodMenu } from "@/dataBase/module/categoriesSchema";
import ConnectDB from "@/dataBase/utils/connectDB";

export default async function handler(req, res) {
    if (req.method !== "POST") return;
    try {
        await ConnectDB();
    } catch (error) {
        return res.status(500).json({ error: "مشکلی در سرور رخ داده" });
    }

    const body = req.body;
    const { idCategory, Activiti } = body;

    //اگر مقدار Activiti  === true بود یعنی این غذا ها باید در
    // صفحه اصلی نمایش داده شود در غیر این صورت در قسمت مدیریت نمایش داده میشود

    if (Activiti) {
        const foodsInCategory = await FoodMenu.find({
            isActive: true,
        }).populate("category");

        return res.status(200).json(foodsInCategory);
    } else {
        const foodsInCategory = await FoodMenu.find({
            category: idCategory,
        }).populate("category");

        return res.status(200).json(foodsInCategory);
    }
}

// //___________________________________________________________________________________

// برای دریافت غذاهای مرتبط با هر دسته‌بندی، شما می‌توانید از تابع populate() در کوئری‌های مرتبط با مدل FoodMenu
//استفاده کنید. این تابع به شما اجازه می‌دهد تا اطلاعات مرتبط با مدل‌های دیگر را در یک کوئری به صورت همزمان بازیابی کنید.

// برای مثال، اگر می‌خواهید همه غذاهای مرتبط با یک دسته‌بندی خاص را دریافت کنید، می‌توانید به این صورت عمل کنید:

// const categoryId = "your_category_id_here"; // شناسه دسته‌بندی مورد نظر

// // کوئری برای دریافت غذاهای مرتبط با دسته‌بندی
// const foodsInCategory = await FoodMenu.find({ category: categoryId }).populate("category");

// console.log(foodsInCategory);
// در این کوئری، ما از populate("category")
//استفاده کرده‌ایم تا اطلاعات مرتبط با دسته‌بندی را همزمان با غذاها بازیابی کنیم. این کار باعث می‌شود که شما اطلاعات دسته‌بندی را در همان کوئری در اختیار داشته باشید.

// لطفاً شناسه دسته‌بندی مورد نظر خود را جایگزین your_category_id_here
//کنید. این کد باید در قسمتی از برنامه‌ی شما که مرتبط با دریافت غذاها است، قرار گیرد.

// //___________________________________________________________________________________

// برای دریافت زیرمجموعه‌های مختلف دسته‌بندی‌ها، شما می‌توانید از یک کوئری پیچیده‌تر استفاده کنید که از $in
// برای فیلتر کردن چندین دسته‌بندی استفاده می‌کند. در اینجا یک نمونه کد برای دریافت غذاهای مربوط به چندین دسته‌بندی مختلف آورده شده است:

// const categoryIds = ["category_id_1", "category_id_2", "category_id_3"]; // شناسه‌های دسته‌بندی‌های مورد نظر

// // کوئری برای دریافت غذاهای مرتبط با چندین دسته‌بندی
// const foodsInCategories = await FoodMenu.find({
//    category: { $in: categoryIds }
// }).populate("category");

// console.log(foodsInCategories);
// در این کد، categoryIds یک آرایه از شناسه‌های دسته‌بندی‌هایی است که می‌خواهید غذاهای مربوط به آن‌ها را دریافت کنید. با استفاده از { $in: categoryIds }،
//ما به مونگوس می‌گوییم که فقط آن دسته از غذاها را برگرداند که دسته‌بندی آن‌ها در آرایه categoryIds قرار دارد.

// این روش به شما اجازه می‌دهد تا غذاهای مربوط به چندین دسته‌بندی را به صورت همزمان دریافت کنید. امیدوارم این پاسخ به شما کمک کند!
