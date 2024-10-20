import { useEffect, useState } from "react";

export default function Test() {
    useEffect(() => {
        logHandler();
    }, []);
    const logHandler = (one, two) => {
        console.log(one, two);
    };
    return (
        <div style={{ padding: "30px", marginTop: "60px" }}>
            {logHandler("one", "two")}
            sds
        </div>
    );
}
