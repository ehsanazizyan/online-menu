import { Badge, IconButton, MenuItem, Typography } from "@mui/material";
import Link from "next/link";
import { SiInstagram } from "react-icons/si";
import { FaGithub, FaTelegram } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";

export default function LayoutWaiter({ children }) {
    return (
        <>
            <header
                style={{
                    backgroundColor: "#595655",
                    color: "white",
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "20px",
                    fontSize: "0.9rem",
                }}>
                <Link href="/waiter">صفحه گارسون</Link>
                <Link href="/">صفحه اصلی</Link>
            </header>
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
