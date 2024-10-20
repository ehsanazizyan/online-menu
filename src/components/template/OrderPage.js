import { e2p, sp } from "@/helper/changeNumber";

import Link from "next/link";
import { Grid, ListItem, Typography, useTheme, useMediaQuery, Button } from "@mui/material";
import FoodControls from "./FoodControls";
import { useSelector } from "react-redux";
import { calculateTotalQuantity } from "@/helper/calculate";

// OrderDrinks import
import styled from "@emotion/styled";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useEffect, useState } from "react";
import axios from "axios";
// OrderDrinks import

export default function OrderPage({ food }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const counter = useSelector((counter) => counter.counter);
    const { selectedItems, totalPrice } = counter;

    return (
        <Grid container padding={5}>
            {food && (
                <>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Typography
                            variant="h5"
                            textAlign="center"
                            marginTop={3}
                            fontWeight={700}
                            color="#884EA0"
                            sx={{ fontSize: isMobile ? "1.2rem" : "1.5rem" }}>
                            {food.name}
                        </Typography>
                        <Grid item xs={12} sm={4}>
                            <Typography
                                variant="body1"
                                sx={{
                                    backgroundColor: "#6495ED",
                                    marginRight: isMobile ? 0 : "auto",
                                    fontSize: "1.2rem",
                                    padding: "5px 10px",
                                    borderRadius: "5px",
                                    color: "#fff",
                                    textAlign: "center",
                                    marginTop: isMobile ? 5 : 0,
                                    width: !isMobile ? "300px" : "auto",
                                }}>
                                قیمت به ازای هر پرس : {e2p(sp(food.price))} ت
                            </Typography>
                        </Grid>
                        <ListItem
                            sx={{
                                display: "flex",
                                flexDirection: isMobile ? "column" : "row",
                                alignItems: "center",
                                margin: "50px 0",
                            }}>
                            <Typography variant="h5" fontWeight={700} gutterBottom>
                                ترکیبات :
                            </Typography>
                            {food?.details?.map((item) => (
                                <Grid item xs={12} sm={8} key={item}>
                                    <Typography
                                        variant="body1"
                                        fontWeight={500}
                                        m={1}
                                        color="#A04000">
                                        {item}
                                    </Typography>
                                </Grid>
                            ))}
                        </ListItem>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <FoodControls food={food} />
                    </Grid>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div
                            style={{
                                marginBottom: "20px",
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                            }}>
                            <Typography ml={5} variant="span" style={{ marginRight: "30px" }}>
                                غذاهای شما : {calculateTotalQuantity(selectedItems)}
                            </Typography>
                            <Typography variant="span">
                                کل پرداختی : {e2p(sp(totalPrice))} ت
                            </Typography>
                        </div>
                        <Link
                            href="/cart"
                            style={{
                                width: "100%",
                                textAlign: "center",
                                margin: "auto",
                                display: "block",
                                textDecoration: "none",
                                backgroundColor: "blue",
                                color: "white",
                                padding: "3px  10px",
                                borderRadius: "5px",
                            }}>
                            مشاهده سفره من وثبت سفارش
                        </Link>
                        {selectedItems.length ? <OrderDrinks /> : null}
                    </div>
                </>
            )}
        </Grid>
    );
}

const OrderDrinks = () => {
    const [open, setOpen] = useState(false);
    const [drinks, setDrinks] = useState([]);

    useEffect(() => {
        axios
            .get("/api/getDrinks")
            .then((res) => setDrinks(res.data))
            .catch((error) => console.log(error));
    }, []);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    return (
        <div>
            <Button
                onClick={toggleDrawer(true)}
                sx={{ backgroundColor: "#abc4ff", color: "#4c5c68", marginTop: "20px" }}>
                نوشیدنی
            </Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 300 }} role="presentation">
                    <List>
                        {drinks.length &&
                            drinks.map((item) => (
                                <div key={item._id}>
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemText primary={e2p(sp(item.price))} />
                                            <ListItemText primary={item.name} />
                                        </ListItemButton>
                                    </ListItem>
                                    <Grid item xs={12} sx={{ width: "100%" }}>
                                        <FoodControls food={item} />
                                    </Grid>
                                    <Divider color="primary" />
                                </div>
                            ))}
                    </List>
                </Box>
            </Drawer>
        </div>
    );
};
