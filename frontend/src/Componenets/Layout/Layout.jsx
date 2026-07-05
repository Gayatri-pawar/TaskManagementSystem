import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

import {
    AppBar,
    Avatar,
    Box,
    CssBaseline,
    Divider,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    Button,
    IconButton
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import NotificationsIcon from "@mui/icons-material/Notifications";
import GroupIcon from "@mui/icons-material/Group";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";


const drawerWidth = 220;


const Layout = () => {

    const user =
        JSON.parse(localStorage.getItem("user")) ||
        JSON.parse(sessionStorage.getItem("user"));

    const role = user?.role;

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);


    const theme = useTheme();

    const isMobile = useMediaQuery(
        theme.breakpoints.down("md")
    );


    const employeeMenu = [
        {
            title: "Dashboard",
            icon: <DashboardIcon />,
            path: "/employee/dashboard",
        },
        {
            title: "My Tasks",
            icon: <AssignmentIcon />,
            path: "/employee/mytasks",
        },
        {
            title: "Notifications",
            icon: <NotificationsIcon />,
            path: "/employee/notifications",
        },

        {
            title: "Profile",
            icon: <PersonIcon />,
            path: "/employee/profile",
        },
    ];

    const adminMenu = [
        {
            title: "Dashboard",
            icon: <DashboardIcon />,
            path: "/admin/dashboard",
        },
        {
            title: "Employees",
            icon: <GroupIcon />,
            path: "/admin/employees",
        },
        {
            title: "Tasks",
            icon: <AssignmentIcon />,
            path: "/admin/tasks",
        },
        {
            title: "Reports",
            icon: <AssessmentIcon />,
            path: "/admin/reports",
        },
        {
            title: "Profile",
            icon: <PersonIcon />,
            path: "/admin/profile",
        },
    ];


    const menu =
        role === "Admin"
            ? adminMenu
            : employeeMenu;

    const handleLogout = () => {
        navigate("/login");
    };


    useEffect(() => {
        console.log("logged user", user);
    }, []);


    return (

        <Box
            sx={{
                display: "flex",
                background: "#f5f7fb",
                minHeight: "100vh"
            }}
        >

            <CssBaseline />


            {/* SIDEBAR */}

            <Drawer

                variant={
                    isMobile
                        ? "temporary"
                        : "permanent"
                }


                open={
                    isMobile
                        ? open
                        : true
                }


                onClose={() => {
                    setOpen(false)
                }}


                sx={{

                    width: drawerWidth,


                    "& .MuiDrawer-paper": {

                        width: {
                            xs: 200,
                            md: 220
                        },


                        background: "#002984",

                        color: "#fff",


                        position: "fixed",

                        top: "50%",


                        transform: "translateY(-50%)",


                        height: "60vh",


                        borderRadius: "10px",


                        boxShadow:
                            "0px 10px 30px rgba(0,0,0,0.3)"
                    }

                }}


            >


                <Toolbar>

                    <Typography
                        variant="h6"
                        fontWeight="bold"
                    >
                        Employee Task System
                    </Typography>


                </Toolbar>


                <Divider
                    sx={{
                        background:
                            "rgba(255,255,255,0.3)"
                    }}
                />


                <List>
                    {menu.map((item) => (
                        <ListItemButton
                            key={item.title}
                            component={Link}
                            to={item.path}
                        >
                            <ListItemIcon sx={{ color: "#fff" }}>
                                {item.icon}
                            </ListItemIcon>

                            <ListItemText primary={item.title} />
                        </ListItemButton>
                    ))}
                </List>



            </Drawer>







            {/* RIGHT SIDE CONTENT */}


            <Box
                sx={{
                    flexGrow: 1,

                    ml: {
                        xs: 0,
                        md: "20px"
                    }

                }}
            >



                {/* TOOLBAR */}


                <AppBar
                    position="fixed"
                    color="inherit"
                    sx={{
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                        marginTop: "15px",
                        marginRight: "20px",
                        width: "calc(100% - 30px)",
                        borderRadius: "15px",
                        boxShadow: "0px 10px 30px rgba(0,0,0,0.15)",
                        background: "#002984",
                        color: "#fff"
                    }}
                >



                    <Toolbar>


                        {
                            isMobile && (

                                <IconButton

                                    onClick={() => {
                                        setOpen(true)
                                    }}

                                >

                                    <MenuIcon
                                        sx={{
                                            color: "#fff"
                                        }}
                                    />


                                </IconButton>

                            )
                        }



                        <Typography
                            sx={{
                                flexGrow: 1
                            }}
                        >

                            Employee Task System

                        </Typography>





                        <Typography

                            sx={{

                                mr: 2,

                                display: {
                                    xs: "none",
                                    sm: "block"
                                }

                            }}

                        >

                            Welcome,
                            {user?.email}

                        </Typography>





                        <Avatar>

                            {
                                user?.full_name
                                    ?.charAt(0)
                                    ?.toUpperCase()
                                ||
                                "U"
                            }


                        </Avatar>





                        <Button

                            onClick={handleLogout}


                            sx={{

                                background: "#ff7961",

                                color: "#fff",

                                ml: 1

                            }}

                        >

                            Logout

                        </Button>



                    </Toolbar>


                </AppBar>





                {/* PAGE CONTENT */}


                <Box
                    sx={{
                        p: 3,
                        mt: 10
                    }}
                >
                    <Outlet />
                </Box>



            </Box>



        </Box>

    );

};


export default Layout;