import { useState, useEffect } from "react";
import {
    Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Paper,
    Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

import AddTaskDialog from "./AddTaskDialog";

import { getTasks, deleteTask } from "../Api/TasksApi";

import { toast } from "react-toastify";
const Tasks = () => {


    const [deleteDialog, setDeleteDialog] = useState(false);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [open, setOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const [selectedTask, setSelectedTask] = useState(null);

    const handleAdd = () => {
        setSelectedTask(null);
        setOpen(true);
    };


    const filteredTasks = tasks.filter((task) => {

        const searchMatch =
            task.title.toLowerCase().includes(search.toLowerCase()) ||
            task.employee.toLowerCase().includes(search.toLowerCase());

        const statusMatch =
            statusFilter === "" || task.status === statusFilter;

        const priorityMatch =
            priorityFilter === "" || task.priority === priorityFilter;

        return searchMatch && statusMatch && priorityMatch;
    });


    const fetchTasks = async () => {
        try {
            setLoading(true);
            const data = await getTasks();
            setTasks(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleEdit = (task) => {
        if (task.status === "Completed") {
            toast.error("Completed task cannot be edited.");
            return;
        }
        setSelectedTask(task);
        setOpen(true);
    };

    const handleDeleteClick = (task) => {
        setSelectedTask(task);
        setDeleteDialog(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await deleteTask(selectedTask.id);
            toast.success(response.message);
            fetchTasks();
        } catch (error) {
            toast.error("Unable to delete");
        }
        setDeleteDialog(false);
    };

    return (

        <Box>

            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
            >

                <Typography
                    variant="h4"
                    fontWeight="bold"
                >
                    Task Management
                </Typography>

                <Button
                    variant="contained"
                    onClick={() => {
                        setOpen(true);
                    }}
                    sx={{ backgroundColor: "#002984" }}
                >
                    Add Task
                </Button>
            </Box>

            <Paper
                sx={{
                    p: 2,
                    borderRadius: 3,
                }}
            >

                <Grid
                    container
                    spacing={2}
                    mb={3}
                >

                    <Grid item xs={12} md={4}>

                        <TextField
                            fullWidth
                            placeholder="Search Task..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />

                    </Grid>

                    <Grid item xs={12} md={4}>

                        <FormControl fullWidth>

                            <InputLabel>Status</InputLabel>

                            <Select
                                value={statusFilter}
                                label="Status"
                                onChange={(e) =>
                                    setStatusFilter(e.target.value)
                                }
                            >

                                <MenuItem value="">
                                    All
                                </MenuItem>

                                <MenuItem value="Pending">
                                    Pending
                                </MenuItem>

                                <MenuItem value="In Progress">
                                    In Progress
                                </MenuItem>

                                <MenuItem value="Completed">
                                    Completed
                                </MenuItem>

                            </Select>

                        </FormControl>

                    </Grid>

                    <Grid item xs={12} md={4}>

                        <FormControl fullWidth>

                            <InputLabel>Priority</InputLabel>

                            <Select
                                value={priorityFilter}
                                label="Priority"
                                onChange={(e) =>
                                    setPriorityFilter(e.target.value)
                                }
                            >

                                <MenuItem value="">
                                    All
                                </MenuItem>

                                <MenuItem value="High">
                                    High
                                </MenuItem>

                                <MenuItem value="Medium">
                                    Medium
                                </MenuItem>

                                <MenuItem value="Low">
                                    Low
                                </MenuItem>

                            </Select>

                        </FormControl>

                    </Grid>

                </Grid>

                <TableContainer sx={{ pt: 3 }}>

                    <Table>

                        <TableHead sx={{ backgroundColor: "#002984" }}>
                            <TableRow>
                                <TableCell sx={{ color: "#fff" }}><b>Title</b></TableCell>
                                <TableCell sx={{ color: "#fff" }}><b>Assigned To</b></TableCell>
                                <TableCell sx={{ color: "#fff" }}><b>Priority</b></TableCell>
                                <TableCell sx={{ color: "#fff" }}><b>Status</b></TableCell>
                                <TableCell sx={{ color: "#fff" }}><b>Start Date</b></TableCell>
                                <TableCell sx={{ color: "#fff" }}><b>Due Date</b></TableCell>
                                <TableCell sx={{ color: "#fff" }} align="center"><b>Actions</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {filteredTasks
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((task) => (

                                    <TableRow key={task.id}>

                                        <TableCell>{task.title}</TableCell>

                                        <TableCell>{task.full_name}</TableCell>

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
                                                    task.status === "Completed"
                                                        ? "success"
                                                        : task.status === "Pending"
                                                            ? "warning"
                                                            : "info"
                                                }
                                            />

                                        </TableCell>

                                        <TableCell>{task.start_Date}</TableCell>

                                        <TableCell>{task.due_Date}</TableCell>

                                        <TableCell align="center">

                                            <IconButton
                                                onClick={() => handleEdit(task)}
                                            >
                                                <EditIcon />
                                            </IconButton>

                                            <IconButton
                                                color="error"
                                                onClick={() => handleDeleteClick(task)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>

                                        </TableCell>

                                    </TableRow>

                                ))}

                        </TableBody>

                    </Table>

                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 10]}
                    component="div"
                    count={filteredTasks.length}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={(e, newPage) => setPage(newPage)}
                    onRowsPerPageChange={(e) => {

                        setRowsPerPage(parseInt(e.target.value, 10));

                        setPage(0);

                    }}
                />

            </Paper>

            <AddTaskDialog
                open={open}
                handleClose={() => setOpen(false)}
                selectedTask={selectedTask}
                getTasks={fetchTasks}
            />

            <Dialog
                open={deleteDialog}
                onClose={() => setDeleteDialog(false)}
            >

                <DialogTitle>
                    Delete Task
                </DialogTitle>

                <DialogContent>

                    <DialogContentText>

                        Are you sure you want to delete this task?

                    </DialogContentText>

                </DialogContent>

                <DialogActions>

                    <Button
                        onClick={() => setDeleteDialog(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        color="error"
                        onClick={confirmDelete}
                    >
                        Delete
                    </Button>
                </DialogActions>

            </Dialog>

        </Box>

    );

};

export default Tasks;