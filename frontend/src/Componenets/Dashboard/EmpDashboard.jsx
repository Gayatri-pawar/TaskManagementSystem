import React from "react";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
    Paper,
    Chip,
    List,
    ListItem,
    ListItemText,
    Divider,
} from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useEffect, useMemo, useState } from "react";
import { getMyTasks } from "../Api/EmployeesApi";

const EmployeeDashboard = () => {


    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            setLoading(true);

            const data = await getMyTasks();

            console.log(data);

            setTasks(data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };




    const notifications = [
        "New Task Assigned",
        "Task Due Tomorrow",
        "Task Completed Successfully",
    ];

    const upcoming = [
        "Dashboard UI - Tomorrow",
        "API Testing - Today",
    ];

    const dashboard = {
        totalTasks: tasks.length,
        completed: tasks.filter(task => task.status === "Completed").length,
        pending: tasks.filter(task => task.status === "Pending").length,
        overdue: tasks.filter(task => {
            if (!task.due_date) return false;

            return (
                task.status !== "Completed" &&
                new Date(task.due_date) < new Date()
            );
        }).length,
    };

    const cards = [
        {
            title: "My Tasks",
            value: dashboard.totalTasks,
            icon: <AssignmentIcon fontSize="large" color="primary" />,
        },
        {
            title: "Completed",
            value: dashboard.completed,
            icon: <CheckCircleIcon fontSize="large" color="success" />,
        },
        {
            title: "Pending",
            value: dashboard.pending,
            icon: <PendingActionsIcon fontSize="large" color="warning" />,
        },
        {
            title: "Overdue",
            value: dashboard.overdue,
            icon: <WarningAmberIcon fontSize="large" color="error" />,
        },
    ];

    return (
        <Box
            sx={{
                p: 3,
                background: "#f5f7fb",
                minHeight: "100vh",
            }}
        >



            <Grid
                container
                spacing={4}
                sx={{
                    mb: 4,
                    display: "flex",
                    flexWrap: "nowrap",
                }}
            >

                {cards.map((card) => (

                    <Grid
                        item
                        key={card.title}
                        sx={{
                            flex: 1,
                            minWidth: 260,
                        }}
                    >

                        <Card
                            sx={{
                                borderRadius: 4,
                                height: 180,
                                width: "100%",
                                boxShadow: "0 6px 18px rgba(0,0,0,.08)",
                                transition: ".3s",

                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: "0 12px 28px rgba(0,0,0,.12)",
                                },
                            }}
                        >

                            <CardContent
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    p: 3,
                                }}
                            >

                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        width: "100%",
                                    }}
                                >
                                    <Box>

                                        <Typography
                                            sx={{
                                                color: "#666",
                                                fontWeight: 600,
                                                fontSize: 18,
                                            }}
                                        >
                                            {card.title}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                mt: 2,
                                                fontSize: 42,
                                                fontWeight: 700,
                                            }}
                                        >
                                            {card.value}
                                        </Typography>

                                    </Box>

                                    <Box
                                        sx={{
                                            width: 70,
                                            height: 70,
                                            borderRadius: "50%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            background: "#f5f8ff",
                                        }}
                                    >
                                        {card.icon}
                                    </Box>

                                </Box>

                            </CardContent>

                        </Card>

                    </Grid>

                ))}

            </Grid>

            {/* Bottom Section */}

            <Grid
                container
                spacing={3}
                alignItems="stretch"
            >

                {/* My Tasks */}

                <Grid item md={8} xs={12}>

                    <Paper
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            height: "100%",
                            boxShadow: "0 6px 18px rgba(0,0,0,.08)",
                        }}
                    >

                        <Box
                            display="flex"
                            alignItems="center"
                            mb={3}
                        >
                            <AssignmentIcon
                                color="primary"
                                sx={{ mr: 1 }}
                            />

                            <Typography
                                variant="h5"
                                fontWeight={700}
                            >
                                My Tasks
                            </Typography>
                        </Box>
                        {tasks.map((task, index) => (

                            <Box
                                key={index}
                                sx={{
                                    mb: 3,
                                    pb: 2,
                                    borderBottom: "1px solid #ececec",
                                }}
                            >

                                <Typography
                                    variant="h6"
                                    fontWeight={600}
                                >
                                    {task.title}
                                </Typography>

                                <Box
                                    display="flex"
                                    gap={1}
                                    mt={2}
                                    mb={2}
                                >

                                    <Chip
                                        label={task.priority}
                                        color={
                                            task.priority === "High"
                                                ? "error"
                                                : task.priority === "Medium"
                                                    ? "warning"
                                                    : "success"
                                        }
                                    />

                                    <Chip
                                        label={task.status}
                                        color={
                                            task.status === "Completed"
                                                ? "success"
                                                : task.status === "Pending"
                                                    ? "warning"
                                                    : "primary"
                                        }
                                    />

                                </Box>

                                <Typography
                                    variant="body2"
                                    mt={1}
                                >
                                    Due Date : {task.due_date?.split("T")[0]}
                                </Typography>

                                <Divider sx={{ mt: 2 }} />

                            </Box>

                        ))}

                    </Paper>

                </Grid>

                {/* Right Side */}

                <Grid item md={4} xs={12}>

                    <Paper
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            mb: 3,
                            boxShadow: "0 6px 18px rgba(0,0,0,.08)",
                        }}
                    >

                        <Typography
                            variant="h6"
                            mb={2}
                        >
                            <Box
                                display="flex"
                                alignItems="center"
                                mb={2}
                            >
                                <PendingActionsIcon
                                    color="primary"
                                    sx={{ mr: 1 }}
                                />

                                <Typography
                                    variant="h5"
                                    fontWeight={700}
                                >
                                    Upcoming Deadlines
                                </Typography>
                            </Box>
                        </Typography>

                        <List>

                            {upcoming.map((item, index) => (

                                <ListItem key={index}>

                                    <ListItemText
                                        primary={item}
                                    />

                                </ListItem>

                            ))}

                        </List>

                    </Paper>

                    <Paper
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            boxShadow: "0 6px 18px rgba(0,0,0,.08)",
                        }}
                    >
                        <Box
                            display="flex"
                            alignItems="center"
                            mb={2}
                        >
                            <NotificationsIcon
                                color="primary"
                                sx={{ mr: 1 }}
                            />

                            <Typography
                                variant="h5"
                                fontWeight={700}
                            >
                                Notifications
                            </Typography>
                        </Box>

                        <List>

                            {notifications.map((item, index) => (

                                <ListItem key={index}>

                                    <ListItemText
                                        primary={item}
                                    />

                                </ListItem>

                            ))}

                        </List>

                    </Paper>

                </Grid>

            </Grid>

        </Box>
    );
};

export default EmployeeDashboard;