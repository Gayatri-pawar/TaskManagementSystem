import React, { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
    Paper,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination
} from "@mui/material";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

import {
    getDashboardSummary,
    getRecentTasks
} from "../Api/AdminDashboardApi";

const AdminDashboard = () => {

    // only data layer added
    const [summary, setSummary] = useState(null);
    const [recentTasks, setRecentTasks] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    useEffect(() => {

        const fetchData = async () => {
            try {
                const summaryData = await getDashboardSummary();
                const taskData = await getRecentTasks();

                setSummary(summaryData);
                console.log("SUMMARY API:", summaryData);
                setRecentTasks(taskData);

            } catch (error) {
                console.log(error.message);
            }
        };

        fetchData();

    }, []);

    // ONLY REPLACEMENT: keep same structure, just inject API values
    const cards = [
        {
            title: "Total Employees",
            value: summary?.totalEmployees || 0,
            icon: <PeopleAltIcon fontSize="large" />,
            color: "#1976d2",
        },
        {
            title: "Total Tasks",
            value: summary?.totalTasks || 0,
            icon: <AssignmentIcon fontSize="large" />,
            color: "#7b1fa2",
        },
        {
            title: "Completed Tasks",
            value: summary?.completedTasks || 0,
            icon: <TaskAltIcon fontSize="large" />,
            color: "#2e7d32",
        },
        {
            title: "Pending Tasks",
            value: summary?.pendingTasks || 0,
            icon: <PendingActionsIcon fontSize="large" />,
            color: "#ed6c02",
        },
    ];

    return (
        <Box>

            <Typography
                variant="h4"
                fontWeight="bold"
                mb={3}
            >
                Admin Dashboard
            </Typography>

            <Grid container spacing={3} mb={4}>
                {cards.map((card) => (
                    <Grid item xs={12} sm={6} md={3} lg={3.5} key={card.title} >
                        <Card
                            sx={{
                                borderRadius: 3,
                                boxShadow: 4,
                                minHeight: 120,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                px: 2,
                            }}
                        >
                            <CardContent sx={{ width: "100%" }}>
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    {/* LEFT SIDE TEXT */}
                                    <Box>
                                        <Typography color="text.secondary">
                                            {card.title}
                                        </Typography>

                                        <Typography variant="h4" fontWeight="bold">
                                            {card.value}
                                        </Typography>
                                    </Box>

                                    {/* RIGHT SIDE ICON */}
                                    <Box
                                        sx={{
                                            background: card.color,
                                            color: "#fff",
                                            p: 1.5,
                                            borderRadius: "50%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
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

            <Paper
                sx={{
                    borderRadius: 3,
                    p: 2,
                }}
            >
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    mb={2}
                >
                    Recent Tasks
                </Typography>

                <TableContainer>

                    <Table>

                        <TableHead>

                            <TableRow sx={{ backgroundColor: "#002984" }}>
                                <TableCell sx={{ color: "#fff" }}><b>Task</b> </TableCell>
                                <TableCell sx={{ color: "#fff" }}> <b>Employee</b> </TableCell>
                                <TableCell sx={{ color: "#fff" }}><b>Priority</b></TableCell>
                                <TableCell sx={{ color: "#fff" }}><b>Status</b> </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {recentTasks
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((task) => (
                                    <TableRow key={task.id}>
                                        <TableCell> {task.title}  </TableCell>
                                        <TableCell> {task.employee}</TableCell>
                                        <TableCell>
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

                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={task.status}
                                                color={
                                                    task.status === "Completed" ? "success" : "warning"
                                                }
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        component="div"
                        count={recentTasks.length}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        onPageChange={(e, newPage) => setPage(newPage)}
                        onRowsPerPageChange={(e) => {
                            setRowsPerPage(parseInt(e.target.value, 10));
                            setPage(0);
                        }}
                    />
                </TableContainer>

            </Paper>

        </Box>
    );
};

export default AdminDashboard;