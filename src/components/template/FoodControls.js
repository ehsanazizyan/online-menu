import { useDispatch, useSelector } from "react-redux";
import { INCREMENT, DECREMENT, ADDITEMS, REMOVED } from "@/redux/features/ReduxCart";
import { Button, Grid, Typography } from "@mui/material";

import styled from "@emotion/styled";
const StyledGrid = styled(Grid)(({ theme }) => ({
    padding: "3px 10px",
    borderRadius: "5px",
    backgroundColor: "#90e0ef",
    color: "#fff",
    maxWidth: "fit-content",

    margin: "20px auto  30px auto",
    // "&:hover": {
    //     boxShadow: theme.shadows[6],
    // },
}));

export default function FoodControls({ food }) {
    const counter = useSelector((counter) => counter.counter);
    const { selectedItems } = counter;
    const dispatch = useDispatch();

    const quantityOfFood = selectedItems?.find((item) => item._id === food._id)?.quantity || 0;

    return (
        <Grid container>
            <StyledGrid>
                {quantityOfFood > 0 ? (
                    <>
                        <Button
                            onClick={() => dispatch(INCREMENT(food))}
                            sx={{ color: "white", fontSize: "0.6rem" }}>
                            ➕
                        </Button>
                        <Typography variant="span">
                            <Typography
                                variant="span"
                                marginTop={1}
                                sx={{
                                    display: "inline-block",
                                    backgroundColor: "white",
                                    padding: "3px 14px",
                                    borderRadius: "50%",
                                    color: "blue",
                                    marginBottom: "3px",
                                }}>
                                {quantityOfFood}
                            </Typography>
                        </Typography>
                        {quantityOfFood > 1 ? (
                            <Button
                                onClick={() => dispatch(DECREMENT(food))}
                                sx={{ color: "white", fontSize: "0.6rem" }}>
                                ➖
                            </Button>
                        ) : (
                            <Button
                                onClick={() => dispatch(REMOVED(food))}
                                sx={{ color: "#343a40", fontSize: "0.6rem" }}>
                                حذف
                            </Button>
                        )}
                    </>
                ) : (
                    <Button
                        onClick={() => dispatch(ADDITEMS(food))}
                        sx={{ color: "white", fontSize: "0.6rem" }}>
                        سفارش
                    </Button>
                )}
            </StyledGrid>
        </Grid>
    );
}
