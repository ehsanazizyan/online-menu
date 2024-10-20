import { model, models, Schema } from "mongoose";

const orders = new Schema({
    name: {
        type: String,
    },
    price: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
    tableNumber: {
        type: Number,
    },
    totalPrice: {
        type: String,
    },
});
const OrdersSchema = models.Orders || model("Orders", orders);

export default OrdersSchema;
