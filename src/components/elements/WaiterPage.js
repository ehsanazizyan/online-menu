import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Accordion,
    AccordionSummary,
    Box,
    AccordionDetails,
    Typography,
    Grid,
    Divider,
    tabClasses,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { e2p, sp } from "@/helper/changeNumber";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function WaiterPage() {
    const [orders, setOrders] = useState([]);
    const [colors, setColors] = useState({});
    const [newOrder, setNewOrder] = useState([]);

    const socket = io();
    const audioRef = useRef();

    //_____________________________________________________________________

    const playSound = (audioRef) => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        }
    };

    //_____________________________________________________________________

    useEffect(() => {
        getOrders();

        if (socket) {
            socket.on("receive-array", (receivedArray) => {
                axios
                    .post("/api/orders/postOrders", receivedArray)
                    .then((res) => {
                        getOrders();
                        //  audioRef.current.play();
                        playSound(audioRef);

                        res.data.map((item) => {
                            setNewOrder((prevNewOrder) => [...prevNewOrder, item._id]);
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                        toast.error("خطا در ذخیره سفارش جدید در سرور ");
                    });
            });
        }
        return () => socket.off("receive-array");
    }, []);
    //_____________________________________________________________________

    //ارسال تایید سفارش و جمع قیمت کل سفارش به یک میز خاص

    const sendResponseToCustomer = (customerId, response) => {
        if (socket) {
            socket.emit("send-response-to-customer", { customerId, response });
        }
    };
    //_____________________________________________________________________

    function getOrders() {
        axios
            .get("/api/orders/getOrders")
            .then((res) => setOrders(groupOrdersByTable(res.data)))
            .catch((err) => {
                console.log(err);
                toast.error("خطا در بارگذاری سفارش جدید در سرور ");
            });
    }

    //_____________________________________________________________________

    function groupOrdersByTable(orders) {
        return orders.reduce((acc, order) => {
            if (!acc[order.tableNumber]) {
                acc[order.tableNumber] = [];
            }
            acc[order.tableNumber].push(order);
            return acc;
        }, {});
    }

    //_____________________________________________________________________

    //این فانکشن قیمت سفارشات ذخیره شده در دیتابیس راگرفته و بر اساس شماره هر میز باهم جمع میکند
    const totalPrice = () => {
        let orderInfo = {};
        Object.entries(orders).map(([tableNumber, order]) => {
            const res = order.reduce((accumulator, current) => {
                if (+tableNumber === +current.tableNumber) {
                    return (orderInfo[tableNumber] = accumulator +=
                        current.price * current.quantity);
                }
                return res;
            }, 0);
        });
        return orderInfo;
    };

    //_____________________________________________________________________

    const deleteOrderHandler = (tableNumber) => {
        axios
            .delete(`/api/orders/deleteOrder`, {
                data: tableNumber,
            })
            .then((res) => getOrders())
            .catch((err) => {
                console.log(err);
                toast.error("خطا در حذف سفارش جدید در سرور ");
            });
    };

    //_____________________________________________________________________
    //این کد رنگ بک گراند سفارشات جدیدی که مشتری سفارش میدهد را به مدت 3 ثانیه قرمز میکند
    useEffect(() => {
        Object.entries(orders).map(([tableNumber, oldOrder]) => {
            oldOrder.forEach((item) => {
                if (newOrder.some((item2) => item2 === item._id)) {
                    setColors((prevesColors) => ({
                        ...prevesColors,
                        [item._id]: "red",
                    }));
                    setTimeout(() => {
                        setColors((prevColors) => ({
                            ...prevColors,
                            [item._id]: "#F7F9F9",
                        }));
                        setNewOrder([]);
                    }, 10000);
                }
            });
        });
    }, [orders]);

    return (
        <>
            <div style={{ width: "100%" }}>
                <audio ref={audioRef} src="/iphone message sound.mp3" preload="auto" />
                <Toaster />
                <TableContainer
                    component={Paper}
                    sx={{
                        width: "100%",
                        margin: "auto",
                        marginBottom: "80px",
                    }}>
                    <Table aria-label="simple table">
                        <TableBody>
                            {Object.entries(orders).map(([tableNumber, order]) => (
                                <TableRow
                                    key={tableNumber}
                                    sx={{
                                        "& > *": { borderBottom: "unset" },
                                    }}>
                                    <TableCell align="center">
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header">
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        width: "80%",
                                                        alignItems: "center",
                                                    }}>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => {
                                                            deleteOrderHandler(tableNumber);
                                                            sendResponseToCustomer(
                                                                tableNumber,
                                                                totalPrice()[tableNumber]
                                                            );
                                                        }}>
                                                        تصویه
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        disabled={!!newOrder.length}
                                                        onClick={() =>
                                                            sendResponseToCustomer(
                                                                tableNumber,
                                                                totalPrice()[tableNumber]
                                                            )
                                                        }>
                                                        تایید
                                                    </Button>
                                                    <Typography
                                                        variant="h6"
                                                        sx={{ marginTop: "10px" }}>
                                                        میز :{tableNumber}
                                                    </Typography>
                                                    <Typography variant="h6">
                                                        جمع کل
                                                        <span
                                                            style={{
                                                                marginRight: "20px",
                                                                fontSize: "1.6rem",
                                                                color: "#495057",
                                                            }}>
                                                            {e2p(sp(totalPrice()[tableNumber]))}
                                                        </span>
                                                    </Typography>
                                                </Box>
                                            </AccordionSummary>

                                            <AccordionDetails>
                                                {order.map((item) => (
                                                    <Grid
                                                        key={item._id}
                                                        container
                                                        sx={{
                                                            padding: "20px",
                                                            backgroundColor:
                                                                colors[item._id] || "#F7F9F9",
                                                            borderRadius: "5px",
                                                            fontSize: "1.2rem",
                                                        }}>
                                                        <Grid
                                                            item
                                                            style={{
                                                                textAlign: "right",
                                                            }}
                                                            xs={4}>
                                                            <Typography variant="h6">
                                                                <input
                                                                    type="checkbox"
                                                                    style={{ marginLeft: "15px" }}
                                                                />
                                                                {item.name}
                                                            </Typography>
                                                            <Divider />
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            style={{ textAlign: " center" }}
                                                            xs={4}>
                                                            <Typography variant="h6">
                                                                تعداد : {item.quantity}
                                                            </Typography>
                                                            <Divider />
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            style={{ textAlign: "left" }}
                                                            xs={4}>
                                                            <Typography variant="h6">
                                                                ت {e2p(sp(item?.price))}
                                                            </Typography>
                                                            <Divider />
                                                        </Grid>
                                                    </Grid>
                                                ))}
                                            </AccordionDetails>
                                        </Accordion>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}
