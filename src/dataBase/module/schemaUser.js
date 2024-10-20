import { model, models, Schema } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: Number,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        default: "CUSTOMER",
    },

    createAt: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
});

const UserMenu = models?.UserMenu || model("UserMenu", userSchema);

export default UserMenu;
