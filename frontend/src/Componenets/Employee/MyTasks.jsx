import React, { useEffect, useMemo, useState } from "react";
import { getMyTasks, updateTaskStatus } from "../Api/EmployeesApi";
import {
    Box, Typography, Grid, TextField, MenuItem,
    Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Button
} from "@mui/material";
import { toast } from "react-toastify";
const MyTasks = () => {

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");
    const [priority, setPriority] = useState("All");
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            setLoading(true);
            const data = await getMyTasks();
            setTasks(data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (taskId) => {
        try {
            const response = await updateTaskStatus(taskId, "Completed");
            toast.success(response.message);
            await loadTasks();
        } catch (error) {
            toast.error(error.message);
        }
    };
    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => {

            const matchesSearch =
                task.title.toLowerCase().includes(search.toLowerCase());

            const matchesStatus =
                status === "All" || task.status === status;

            const matchesPriority =
                priority === "All" || task.priority === priority;

            return matchesSearch && matchesStatus && matchesPriority;
        });
    }, [search, status, priority]);

    const priorityColor = (value) => {
        switch (value) {
            case "High":
                return "error";
            case "Medium":
                return "warning";
            default:
                return "success";
        }
    };

    const statusColor = (value) => {
        switch (value) {
            case "Completed":
                return "success";
            case "Pending":
                return "warning";
            default:
                return "primary";
        }
    };

    return (
        <Box>

            <Typography
                variant="h4"
                fontWeight="bold"
                mb={3}
            >
                My Tasks
            </Typography>

            <Grid container spacing={2} mb={3}>

                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        label="Search Task"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        select
                        label="Status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                    </TextField>
                </Grid>

                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        select
                        label="Priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="High">High</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Low">Low</MenuItem>
                    </TextField>
                </Grid>

            </Grid>

            <TableContainer component={Paper} elevation={3} sx={{ mt: 3 }}>

                <Table>

                    <TableHead>

                        <TableRow sx={{ backgroundColor: "#002984" }}>

                            <TableCell sx={{ color: "#fff" }}><b>Title</b></TableCell>

                            <TableCell sx={{ color: "#fff" }}><b>Description</b></TableCell>

                            <TableCell sx={{ color: "#fff" }}><b>Priority</b></TableCell>

                            <TableCell sx={{ color: "#fff" }}><b>Status</b></TableCell>

                            <TableCell sx={{ color: "#fff" }}><b>Start Date</b></TableCell>

                            <TableCell sx={{ color: "#fff" }}><b>Due Date</b></TableCell>

                            <TableCell sx={{ color: "#fff" }}><b>Attachment</b></TableCell>

                            <TableCell align="center" sx={{ color: "#fff" }}><b>Action</b></TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {filteredTasks.map((task) => (

                            <TableRow key={task.id} hover>

                                <TableCell>{task.title}</TableCell>

                                <TableCell>{task.description}</TableCell>

                                <TableCell>

                                    <Chip
                                        label={task.priority}
                                        color={priorityColor(task.priority)}
                                    />

                                </TableCell>

                                <TableCell>

                                    <Chip
                                        label={task.status}
                                        color={statusColor(task.status)}
                                    />

                                </TableCell>

                                <TableCell>{task.start_date?.split("T")[0]}</TableCell>

                                <TableCell>{task.due_date?.split("T")[0]}</TableCell>

                                <TableCell>

                                    {task.attachment ? (
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            href={`http://localhost:3001/uploads/${task.attachment}`}
                                            target="_blank"
                                        >
                                            View
                                        </Button>
                                    ) : (
                                        "-"
                                    )}

                                </TableCell>

                                <TableCell align="center">

                                    <Button
                                        variant="contained"
                                        size="small"
                                        disabled={task.status === "Completed"}
                                        onClick={() => handleUpdateStatus(task.id)}
                                    >
                                        {task.status === "Completed"
                                            ? "Completed"
                                            : "Mark Completed"}
                                    </Button>

                                </TableCell>

                            </TableRow>

                        ))}

                    </TableBody>

                </Table>

            </TableContainer>

        </Box >
    );
};

export default MyTasks;