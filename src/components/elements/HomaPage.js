import {
    Box,
    Button,
    CardMedia,
    Chip,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    Modal,
    Stack,
    SwipeableDrawer,
    Typography,
} from "@mui/material";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";

import axios from "axios";
import AnimatedTexts from "../template/AnimatedText";
import Link from "next/link";
import { e2p, sp } from "@/helper/changeNumber";
import OrderPage from "../template/OrderPage";

const StyledGrid = styled(Grid)(({ theme }) => ({
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    transition: "0.3s",
    "&:hover": {
        boxShadow: theme.shadows[6],
    },
}));

export default function HomePage() {
    const [category, setCategory] = useState([]);
    const [foodList, setFoodList] = useState([]);
    const [FocusCategory, setFocusCategory] = useState("");
    const [idFood, setIdFood] = useState("");
    const [openOrder, setOpenOrder] = useState(false);

    useEffect(() => {
        axios
            .get("/api/category/getCategories")
            .then((res) => setCategory(res.data))
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        axios
            .post("/api/food/getFood", { Activiti: true })
            .then((res) => setFoodList(res.data))
            .catch((error) => console.log(error));
    }, []);

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        setOpenOrder(open);
    };
    return (
        <Grid container sx={{ padding: "20px" }}>
            <Grid item xs={12}>
                <CardMedia
                    component="img"
                    height="200"
                    image="/image/img.jpg"
                    alt="Ku Restaurant"
                    sx={{
                        marginTop: "50px",
                        borderRadius: "12px",
                        boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
                    }}
                />
                <AnimatedTexts />
            </Grid>
            <Grid
                item
                xs={12}
                sx={{
                    zIndex: 1,
                    backdropFilter: "blur(10px)",
                    padding: "5px",
                    position: "sticky",
                }}>
                <Typography mr="20px" fontSize="1.2rem" variant="overline" fontWeight="700">
                    دسته غذاها :
                </Typography>
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        p: 1,
                        overflowX: "auto",
                        "&::-webkit-scrollbar": { display: "none" },
                    }}>
                    {category?.map((item) => {
                        return item.name === "نوشیدنی" ? (
                            ""
                        ) : (
                            <Link key={`${item._id}`} underline="none" href={`#${item._id}`}>
                                <Chip
                                    label={item.name}
                                    onClick={() => setFocusCategory(item._id)}
                                    sx={{
                                        backgroundColor:
                                            FocusCategory === item._id ? "#80BBF2 " : "default",
                                    }}
                                />
                            </Link>
                        );
                    })}
                </Stack>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <Typography
                    mr="13px"
                    variant="h4"
                    sx={{ pl: 2, marginTop: 15, padding: "5px", color: "tomato" }}>
                    لیست غذا
                </Typography>
                <Divider />

                {category.map((catItem) => {
                    return catItem.name === "نوشیدنی" ? (
                        ""
                    ) : (
                        <StyledGrid
                            key={catItem._id}
                            item
                            xs={12}
                            sx={{
                                backgroundColor:
                                    catItem._id === FocusCategory ? "#D3DAE0  " : "#fff",
                                color: catItem._id === FocusCategory ? "#fff" : "text.primary",
                                margin: "20px 0",
                            }}>
                            <Typography variant="h5" sx={{ pl: 2 }} id={catItem._id}>
                                {catItem.name}
                            </Typography>
                            <List>
                                {foodList
                                    ?.filter((foodItem) => foodItem.category?._id === catItem._id)
                                    ?.map((filteredFoodItem) => (
                                        <Box key={filteredFoodItem._id} display="flex">
                                            <ListItem
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "start",

                                                    borderBottom: "1px solid gray",
                                                }}>
                                                <Typography component="p" mb={2} fontWeight="500">
                                                    {filteredFoodItem.name}
                                                </Typography>
                                                <Typography component="p" fontWeight="700">
                                                    قیمت : {e2p(sp(filteredFoodItem.price))} ت
                                                </Typography>
                                            </ListItem>

                                            <IconButton
                                                onClick={() => {
                                                    setOpenOrder(true);
                                                    setIdFood(filteredFoodItem._id);
                                                }}
                                                color="primary"
                                                aria-label="add to shopping cart"
                                                size="small">
                                                سفارش
                                                <AddShoppingCartIcon />
                                            </IconButton>

                                            <SwipeableDrawer
                                                anchor="bottom"
                                                open={filteredFoodItem._id === idFood && openOrder}
                                                onClose={toggleDrawer(false)}
                                                onOpen={toggleDrawer(true)}>
                                                <OrderPage
                                                    food={
                                                        filteredFoodItem._id === idFood &&
                                                        filteredFoodItem
                                                    }
                                                />
                                            </SwipeableDrawer>
                                        </Box>
                                    ))}
                            </List>
                        </StyledGrid>
                    );
                })}
            </Grid>
        </Grid>
    );
}
