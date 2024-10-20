import WaiterPage from "@/components/elements/WaiterPage";
import UserMenu from "@/dataBase/module/schemaUser";
import ConnectDB from "@/dataBase/utils/connectDB";
import { getSession } from "next-auth/react";

const Waiter = () => {
    return <WaiterPage />;
};
export default Waiter;

export async function getServerSideProps(context) {
    const request = context.req;

    try {
        await ConnectDB();
    } catch (error) {
        console.log(error);
        if (error) {
            return {
                redirect: { destination: "/", permanent: false },
            };
        }
    }

    const session = await getSession({ req: request });

    if (!session) {
        return {
            redirect: { destination: "/signin", permanent: false },
        };
    }

    const response = await UserMenu.findOne({ email: session?.user?.email });
    console.log(response.role);

    if (response.role !== "WAITER" && response.role !== "MANAGER") {
        return {
            redirect: { destination: "/", permanent: false },
        };
    }

    return {
        props: {},
    };
}
