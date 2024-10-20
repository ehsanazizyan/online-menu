import { useEffect, useState } from "react";

//show categoryList and delete categoryList and show foods list
// import ShowListData from "../template/ShowListData";
import axios from "axios";
import AddFood from "../template/AddFood";
import AddCategory from "../template/AddCategory";
import ShowListData from "../template/ShowListData";

export default function ManagerPage() {
    const [categoryName, setCategoryName] = useState("");
    const [categoryList, setCategoryList] = useState([]);
    useEffect(() => {
        getAllCategory();
    }, []);

    function getAllCategory() {
        axios
            .get("/api/category/getCategories")
            .then((res) => setCategoryList(res.data))
            .catch((error) => console.log(error));
    }

    return (
        <div style={{ marginTop: "70px" }}>
            <AddFood categoryList={categoryList} />

            <AddCategory
                setCategoryName={setCategoryName}
                categoryName={categoryName}
                getAllCategory={getAllCategory}
            />
            <ShowListData
                setCategoryList={setCategoryList}
                categoryList={categoryList}
                getAllCategory={getAllCategory}
            />
        </div>
    );
}
