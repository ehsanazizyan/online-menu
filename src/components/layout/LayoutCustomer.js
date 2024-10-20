import { calculateTotalQuantity } from "@/helper/calculate";
import Link from "next/link";
import { useSelector } from "react-redux";
import { AppBar, Button, IconButton, MenuItem, Typography } from "@mui/material";
import { SiInstagram } from "react-icons/si";
import { FaGithub, FaTelegram } from "react-icons/fa";
import { useRouter } from "next/router";
import { MdOutlineMailOutline } from "react-icons/md";

export default function LayoutCustomer({ children }) {
    const { selectedItems } = useSelector((counter) => counter.counter);
    const router = useRouter();
    return (
        <>
            <AppBar>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        position: "fixed",
                        width: "100%",
                        zIndex: 5,
                        padding: "10px 0px",
                        backgroundColor: "#c5c3c6",
                    }}>
                    <Link href="/cart" sx={{ color: "black" }}>
                        <Typography variant="span" mr={5} fontSize="1.5rem" color="red">
                            {calculateTotalQuantity(selectedItems)}
                            🛒
                        </Typography>
                        <span style={{ color: "black", fontSize: "0.9rem" }}> سبد خرید</span>
                    </Link>

                    <Button
                        onClick={() => router.back()}
                        style={{ color: "black", marginLeft: "30px" }}>
                        منو
                    </Button>
                </div>
            </AppBar>

            <div style={{ minHeight: "85vh" }}>{children}</div>

            <footer
                style={{
                    backgroundColor: "#595655   ",
                    padding: "10px",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    marginTop: "100px",
                }}>
                <MenuItem>
                    <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                        <Link href="https://www.instagram.com/ehsan__azizyan" target="_blank">
                            <SiInstagram />
                        </Link>
                    </IconButton>
                    <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                        <Link href="https://www.instagram.com/ehsan__azizyan">
                            <FaTelegram />
                        </Link>
                    </IconButton>
                    <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                        <Link href="https://www.instagram.com/ehsan__azizyan">
                            <FaGithub />
                        </Link>
                    </IconButton>
                    <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                        <Link href="mailto:ehsanazizyan@gmail.com">
                            <MdOutlineMailOutline />
                        </Link>
                    </IconButton>
                </MenuItem>
            </footer>
        </>
    );
}
