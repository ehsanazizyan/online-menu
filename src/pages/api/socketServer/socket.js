// import { Server } from "socket.io";

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

// export default function handler(req, res) {
//     if (res.socket.server.io) {
//         console.log("Socket is already running");
//     } else {
//         console.log("Socket is initializing");
//         const io = new Server(res.socket.server);
//         io.on("connection", (socket) => {
//             socket.on("send-array", (array) => {
//                 // پردازش آرایه دریافتی
//                 // console.log("Array received:", array);
//                 // ارسال آرایه به تمام کلاینت‌ها
//                 socket.broadcast.emit("receive-array", array);
//                 // socket.broadcast.emit("order-confirmed", "سفارش شما تایید شده است");
//             });

//             socket.on("confirm-order", (data) => {
//                 // console.log("confirm-order", data);

//                 // ارسال پیام تایید به مشتری خاص
//                 socket.broadcast.emit("order-confirmed", data);
//             });
//         });
//         res.socket.server.io = io;
//     }
//     res.end();
// }

import { Server } from "socket.io";

export const config = {
    api: {
        bodyParser: false,
    },
};

export default function handler(req, res) {
    if (res.socket.server.io) {
        console.log("Socket is already running");
    } else {
        console.log("Socket is initializing");
        const io = new Server(res.socket.server);

        // ذخیره سازی socket.id هر مشتری
        const customerSockets = {};

        io.on("connection", (socket) => {
            // ثبت مشتری با شناسه خاص
            socket.on("register-customer", (customerId) => {
                customerSockets[customerId] = socket.id;
            });

            // ارسال پاسخ به مشتری خاص
            socket.on("send-response-to-customer", ({ customerId, response }) => {
                const customerSocketId = customerSockets[customerId];
                if (customerSocketId && io.sockets.sockets.get(customerSocketId)) {
                    io.to(customerSocketId).emit("receive-response", response);
                }
            });

            socket.on("send-array", (array) => {
                console.log("Array received:", array);
                socket.broadcast.emit("receive-array", array);
            });
        });

        res.socket.server.io = io;
    }
    res.end();
}
