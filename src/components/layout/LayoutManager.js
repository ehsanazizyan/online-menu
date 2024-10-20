import Link from "next/link";
import { useState } from "react";
import { SiInstagram } from "react-icons/si";
import { FaGithub, FaTelegram } from "react-icons/fa";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Badge, Divider } from "@mui/material";
import { MdOutlineMailOutline } from "react-icons/md";

export default function LayoutManager({ children }) {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <div>
            <AppBar position="fixed">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: "flex",
                                flexGrow: 1,
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "inherit",
                                textDecoration: "none",
                            }}>
                            LOGO
                        </Typography>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="image/img.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: "45px" }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}>
                                <MenuItem
                                    onClick={handleCloseUserMenu}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                    }}>
                                    <Typography variant="h6" mt={2}>
                                        <Link href="/manager">مدیریت</Link>
                                        <Divider color="red" />
                                    </Typography>
                                    <Typography variant="h6" mt={2}>
                                        <Link href="/waiter">سفارشات</Link>
                                        <Divider color="red" />
                                    </Typography>
                                    <Typography variant="h6" mt={2}>
                                        <Link href="/">صفحه اصلی</Link>
                                        <Divider color="red" />
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
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
        </div>
    );
}
