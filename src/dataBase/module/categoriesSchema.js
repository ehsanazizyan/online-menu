import { Schema, model, models } from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true, // اطمینان حاصل کنید که نام دسته‌بندی منحصر به فرد است
    },
});

// مدل دسته‌بندی
const Category = models.Category || model("Category", categorySchema);

//______________________________________________________________________________________________

// اسکیمای غذا با استفاده از مرجع دسته‌بندی
const foodSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    details: {
        type: [String],
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category", // ارجاع به مدل دسته‌بندی
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
});

// مدل غذا
const FoodMenu = models.FoodMenu || model("FoodMenu", foodSchema);

export { FoodMenu, Category };

////////////////////////////

// import { Schema, model, models } from "mongoose";

// const categorySchema = new Schema({
//    name: {
//       type: String,
//       required: true,
//       unique: true, // اطمینان حاصل کنید که نام دسته‌بندی منحصر به فرد است
//    },
// });

// // مدل دسته‌بندی
// const fCategory = models.fCategory || model("fCategory", categorySchema);

// // اسکیمای غذا با استفاده از مرجع دسته‌بندی
// const foodSchema = new Schema({
//    name: {
//       type: String,
//       required: true,
//    },
//    price: {
//       type: Number,
//       required: true,
//    },
//    details: {
//       type: [String],
//       required: true,
//    },
//    category: {
//       type: Schema.Types.ObjectId,
//       ref: "Category", // ارجاع به مدل دسته‌بندی
//       required: true,
//    },
// });

// // مدل غذا
// const Food = models.Food || model("Food", foodSchema);

// export { Food, fCategory };
