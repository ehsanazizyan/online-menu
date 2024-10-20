import axios from "axios";
import { useState } from "react";
import { MdFoodBank } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";

// import styles from "./AddFood.module.css";
import {
    Container,
    Typography,
    TextField,
    TextareaAutosize,
    MenuItem,
    Select,
    Button,
    Divider,
} from "@mui/material";

export default function AddFood({ categoryList }) {
    const [isDisabled, setIsDisabled] = useState(false);
    const [form, setForm] = useState({
        name: "",
        price: "",
        details: [],
        categoryID: "",
    });

    const submitHandler = async (e) => {
        e.preventDefault();

        if (form.name.length === 0 || form.price.length === 0 || form.categoryID.length === 0) {
            toast.error("تعیین این موارد ضروری است (نام و قیمت و دسته)");
            setIsDisabled(true);
            setTimeout(() => setIsDisabled(false), 5000);
            return;
        }
        axios
            .post("/api/food/addFood", { form })
            .then((res) => {
                setIsDisabled(false);

                if (res.data.message) {
                    toast.success(res.data.message);
                }
            })
            .catch((error) => {
                console.log(error);
                if (error.response.status === 400 || 500) {
                    setIsDisabled(true);
                    toast.error(error.response.data.error);
                }
            });
    };

    const formHandler = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => {
            return {
                ...prevForm,
                [name]: name === "details" ? value.split("\n") : value,
            };
        });
    };

    const handleCategoryChange = (e) => {
        setForm((prevForm) => ({
            ...prevForm,
            categoryID: e.target.value,
        }));
    };

    return (
        <Container>
            <Toaster />
            <Typography
                variant="h3"
                component="h3"
                gutterBottom
                style={{ display: "flex", marginTop: "30px" }}>
                افزودن غذا
                <MdFoodBank
                    style={{
                        color: "tomato",
                        fontSize: " 2.5rem",
                    }}
                />
            </Typography>

            <form
                onSubmit={submitHandler}
                onChange={formHandler}
                style={{
                    display: "flex",
                    flexDirection: "column",
                }}>
                <TextField
                    label="نام غذا"
                    variant="outlined"
                    id="name"
                    name="name"
                    style={{ width: "300px", marginTop: "30px", fontSize: "1.2rem" }}
                />

                <TextField
                    label="قیمت"
                    variant="outlined"
                    id="price"
                    name="price"
                    type="number"
                    style={{ width: "300px", marginTop: "30px", fontSize: "1.2rem" }}
                />

                <Typography
                    variant="body1"
                    component="label"
                    htmlFor="details"
                    style={{ width: "300px", marginTop: "30px", fontSize: "1.2rem" }}>
                    مواد تشکیل دهنده:
                </Typography>
                <TextareaAutosize
                    placeholder="مواد تشکیل دهنده غذا را وارد کنید (هر ماده را در یک خط جدا کنید)"
                    id="details"
                    name="details"
                    minRows={8}
                    style={{ width: "300px", padding: "10px", fontSize: "1.2rem" }}
                />

                <Select
                    label="دسته بندی"
                    id="categoryID"
                    name="categoryID"
                    onChange={handleCategoryChange}
                    value={form.categoryID}
                    displayEmpty
                    style={{ width: "300px", marginTop: "30px" }}>
                    <MenuItem value="" disabled>
                        انتخاب کنید
                    </MenuItem>
                    {categoryList?.map((item) => (
                        <MenuItem key={item._id} value={item._id}>
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isDisabled}
                    style={{ margin: "8px 0", marginTop: "30px", width: "300px" }}>
                    ذخیره
                </Button>
            </form>
            <Divider />
        </Container>
    );
}
