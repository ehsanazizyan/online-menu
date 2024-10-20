import { useDispatch, useSelector } from "react-redux";

import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { e2p, sp } from "@/helper/changeNumber";
import FoodControls from "./FoodControls";
import io from "socket.io-client";
import { CHECKOUT } from "@/redux/features/ReduxCart";

import { useRouter } from "next/router";

export default function CartPage() {
    const socket = io();

    const router = useRouter();
    const dispatch = useDispatch();
    const { selectedItems, tableNumber, totalPrice } = useSelector((counter) => counter.counter);
    const [emptyCartMessage, settEmptyCartMessage] = useState("");
    const [isBrowser, setIsBrowser] = useState(false);
    const [response, setResponse] = useState("");

    //این قسمت از کد برای این است خالی بودن سبد خرید را نمایش دهد دلیل دیگر قبل از  مونت اولیه
    //selectedIttems در دسترس نیست
    useEffect(() => {
        if (!selectedItems.length) settEmptyCartMessage("😡 سفره شما خالی است 🤬");
        setIsBrowser(true);
    }, [selectedItems]);

    //_______________________________________________________________________________________________

    const orders = selectedItems?.map((item) => {
        const obj = {};
        (obj.price = item.price),
            (obj.name = item.name),
            (obj.quantity = item.quantity),
            (obj.tableNumber = tableNumber);

        return obj;
    });

    //_______________________________________________________________________________________________

    useEffect(() => {
        fetch("/api/socketServer/socket").finally(() => {
            socket.on("connect", () => {
                console.log("connected");
            });
        });
    }, []);

    const sendArray = () => {
        //ارسال سفارش به گارسون
        if (socket) {
            socket.emit("send-array", orders);
        }
    };

    //_____________________________________________________________________

    //گرفتن تایید از گارسون همراه با شماره میز و جمع قیمت تمامه سفارشات تا آن لحظه

    useEffect(() => {
        if (socket) {
            socket.emit("register-customer", `${tableNumber}`);
        }
    }, [socket]);

    useEffect(() => {
        if (socket) {
            socket.on("receive-response", (response) => {
                setResponse(response);

                setTimeout(() => {
                    dispatch(CHECKOUT());
                    router.back();
                }, 9000);
            });

            // return () => socket.off("receive-response");
        }
    }, [socket]);

    if (response) {
        return (
            <p style={{ marginTop: "60px" }}>
                سفارش تاییدشد صورت حساب شما تا این لحظه
                <span style={{ color: "red", fontSize: "1.2rem" }}>{e2p(sp(response))}</span> است
                سبد خریدشماخالی میشود تا آماده سفارشات بعدی شما باشد
            </p>
        );
    }

    //_______________________________________________________________________________________________

    if (!tableNumber)
        return (
            <div
                style={{
                    textAlign: "center",
                    marginTop: "80px",
                }}>
                <Typography
                    variant="p"
                    sx={{
                        backgroundColor: "red",
                        fontSize: "1.5rem",
                        borderRadius: "6px",
                        padding: "10px",
                        fontWeight: "600",
                    }}>
                    شما نمیتوانید سفارشی را ثبت کنید
                </Typography>
            </div>
        );

    //_______________________________________________________________________________________________

    if (emptyCartMessage) {
        return (
            <div
                style={{
                    textAlign: "center",
                    padding: "60px 0 0 0",
                }}>
                <Grid item margin="50px auto  0 auto" lg={12}>
                    <Typography
                        variant="p"
                        sx={{
                            backgroundColor: "red",
                            fontSize: "1.5rem",
                            borderRadius: "6px",
                            fontWeight: "600",
                        }}>
                        {emptyCartMessage}
                    </Typography>
                </Grid>
            </div>
        );
    }

    return (
        <>
            {isBrowser && (
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="h5" textAlign="center" marginTop={10}>
                            سفارشات میز شماره
                            <span
                                style={{
                                    backgroundColor: "blue",
                                    borderRadius: "50%",
                                    color: "#fff",
                                    padding: "18px 10px",
                                    fontSize: "0.8rem",
                                    marginRight: "20px",
                                }}>
                                {tableNumber}
                            </span>
                        </Typography>
                    </Grid>
                    <Grid item sm={12} lg={12}>
                        <Typography
                            variant="p"
                            sx={{
                                backgroundColor: "red",
                                width: "100%",
                                display: "block",
                                textAlign: "center",
                                marginTop: "30px",
                                fontSize: "1.3rem",
                                padding: "5px",
                            }}>
                            قیمت این سفارش شما:
                            <span
                                style={{
                                    margin: "0 10px",
                                    color: "red",
                                    backgroundColor: "white",
                                    padding: "0 10px",
                                }}>
                                {e2p(sp(totalPrice))}
                            </span>
                            تومان
                        </Typography>
                    </Grid>
                    <Grid item>
                        {selectedItems.map((item) => (
                            <Box
                                key={item._id}
                                component="section"
                                width="100%"
                                height="fit-content"
                                my={4}
                                display="flex"
                                alignItems="center"
                                gap={4}
                                p={2}
                                sx={{ p: 2, border: "1px dashed grey" }}>
                                <Typography variant="p">{item.name}</Typography>

                                <Typography variant="p">{sp(item.price)} ت </Typography>

                                <FoodControls food={item} />
                            </Box>
                        ))}
                    </Grid>
                    <Grid container justifyContent="center" alignItems="center">
                        <Button
                            size="large"
                            sx={{ backgroundColor: "#abc4ff", color: "#4c5c68" }}
                            onClick={sendArray}>
                            ثبت سفارش
                        </Button>
                    </Grid>
                </Grid>
            )}
        </>
    );
}
