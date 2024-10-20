import { calculateTotalPrice } from "@/helper/calculate";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedItems: [],
    // totalItems: "",
    totalPrice: "",
    tableNumber: "",
};

const foodSlice = createSlice({
    name: "food",
    initialState,
    reducers: {
        ADDITEMS: (state, action) => {
            if (!state.selectedItems.find((item) => item._id === action.payload._id)) {
                state.selectedItems.push({
                    ...action.payload,
                    quantity: 1,
                });
                state.totalPrice = calculateTotalPrice(state.selectedItems);
            }
        },
        INCREMENT: (state, action) => {
            const indexIN = state.selectedItems.findIndex(
                (item) => item._id === action.payload._id
            );
            state.selectedItems[indexIN].quantity++;
            state.totalPrice = calculateTotalPrice(state.selectedItems);
        },
        DECREMENT: (state, action) => {
            const indexDE = state.selectedItems.findIndex(
                (item) => item._id === action.payload._id
            );
            state.selectedItems[indexDE].quantity--;

            state.totalPrice = calculateTotalPrice(state.selectedItems);
        },
        REMOVED: (state, action) => {
            const res = state.selectedItems.filter((item) => item._id !== action.payload._id);
            state.selectedItems = res;

            state.totalPrice = calculateTotalPrice(state.selectedItems);
        },
        CHECKOUT: (state, action) => {
            (state.tableNumber = state.tableNumber),
                (state.totalPrice = ""),
                (state.selectedItems = []);
        },
        SAVETABLENUMBER: (state, action) => {
            if (!state.tableNumber?.length) {
                state.tableNumber = action.payload;
            }
        },
    },
});

export const { ADDITEMS, INCREMENT, DECREMENT, REMOVED, SAVETABLENUMBER, CHECKOUT } =
    foodSlice.actions;

export const { actions: foodActions, reducer: foodReducer } = foodSlice;
