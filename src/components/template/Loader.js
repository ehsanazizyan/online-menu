import { ThreeDots } from "react-loader-spinner";

export default function Loader() {
    return (
        <div style={{ margin: "30px auto", width: "100%" }}>
            <ThreeDots
                visible={true}
                height="80"
                width="100"
                color="#4fa94d"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
}
