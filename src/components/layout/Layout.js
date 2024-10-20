import { useEffect, useState } from "react";
import LayoutCustomer from "./LayoutCustomer";
import LayoutManager from "./LayoutManager";
import LayoutWaiter from "./LayoutWaiter";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function Layout({ children }) {
    const [role, setRole] = useState(" ");
    const { data, status } = useSession();

    useEffect(() => {
        if (status === "unauthenticated") {
            setRole("CUSTOMER");
        } else {
            const typeUser = async () => {
                axios
                    .get("/api/typeUser", { params: { email: data?.user?.email } })
                    .then((res) => {
                        setRole(res.data.role);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            };
            typeUser();
        }
    }, [status, role]);

    if (role === "MANAGER") {
        return <LayoutManager>{children}</LayoutManager>;
    } else if (role === "WAITER") {
        return <LayoutWaiter>{children}</LayoutWaiter>;
    } else if (role === "CUSTOMER") {
        return <LayoutCustomer>{children}</LayoutCustomer>;
    }
}
