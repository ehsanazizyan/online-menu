import { e2p, sp } from "./changeNumber";

function calculateTotalQuantity(selectedItems) {
    const res = selectedItems.reduce((accumulator, current) => {
        return (accumulator += current.quantity);
    }, 0);
    return res;
}

function calculateTotalPrice(selectedItems) {
    const res = selectedItems.reduce((accumulator, current) => {
        return (accumulator += current.price * current.quantity);
    }, 0);
    return res;
}

export { calculateTotalQuantity, calculateTotalPrice };
