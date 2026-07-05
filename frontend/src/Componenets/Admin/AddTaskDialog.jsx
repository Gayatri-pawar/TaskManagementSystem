import {
    Box, Button, Dialog, DialogActions,
    DialogContent, DialogTitle, Grid, MenuItem, TextField
} from "@mui/material";
import { toast } from "react-toastify";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { createTask, updateTask } from "../Api/TasksApi";
import dayjs from "dayjs";
import { useEffect, useState } from "react";


const employeeList = [
    { id: 2, name: "Gayatri" },
    { id: 3, name: "Rahul" },
    { id: 4, name: "Sneha" },
    { id: 5, name: "Rohan" },
];

export default function AddEditTask({
    open,
    handleClose,
    selectedTask,
    getTasks,
}) {


    useEffect(() => {
        if (selectedTask) {
            setFormData({
                title: selectedTask.title,
                description: selectedTask.description,
                assigned_to: selectedTask.assigned_to,
                priority: selectedTask.priority,
                status: selectedTask.status,
                dueDate: dayjs(selectedTask.due_date),
            });
        } else {
            setFormData({
                title: "",
                description: "",
                assigned_to: "",
                priority: "Medium",
                status: "Pending",
                dueDate: dayjs(),
            });
        }
    }, [selectedTask]);

    const [formData, setFormData] = useState({

        title: "",

        description: "",

        assigned_to: "",

        priority: "Medium",

        status: "Pending",

        dueDate: dayjs(),

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };

    const handleSave = async () => {

        if (!formData.title.trim())
            return toast.error("Task Name required");

        if (!formData.assigned_to)
            return toast.error("Select Employee");

        try {

            const payload = {
                title: formData.title,
                description: formData.description,
                assigned_to: formData.assigned_to,
                priority: formData.priority,
                status: formData.status,
                due_date: formData.dueDate.format("YYYY-MM-DD"),
            };

            if (selectedTask) {

                await updateTask(selectedTask.id, payload);

                toast.success("Task Updated Successfully");

            } else {

                await createTask(payload);

                toast.success("Task Added Successfully");

            }

            getTasks();

            handleClose();

        } catch (error) {

            console.log(error);

            toast.error("Something went wrong");

        }

    };

    return (

        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
        >

            <DialogTitle>
                {selectedTask ? "Edit Task" : "Add Task"}
            </DialogTitle>

            <DialogContent>

                <Grid
                    container
                    spacing={2}
                    mt={1}
                >

                    <Grid size={{ xs: 12, md: 6 }}>

                        <TextField
                            fullWidth
                            label="Task Name"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <TextField
                            fullWidth
                            select
                            label="Assign Employee"
                            name="assigned_to"
                            value={formData.assigned_to}
                            onChange={handleChange}
                        >

                            {employeeList.map(emp => (

                                <MenuItem
                                    key={emp.id}
                                    value={emp.id}
                                >

                                    {emp.name}

                                </MenuItem>

                            ))}

                        </TextField>

                    </Grid>

                    <Grid size={12}>

                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>

                        <TextField
                            fullWidth
                            select
                            label="Priority"
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                        >

                            <MenuItem value="Low">Low</MenuItem>

                            <MenuItem value="Medium">Medium</MenuItem>

                            <MenuItem value="High">High</MenuItem>

                        </TextField>

                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>

                        <TextField
                            fullWidth
                            select
                            label="Status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >

                            <MenuItem value="Pending">
                                Pending
                            </MenuItem>

                            <MenuItem value="In Progress">
                                In Progress
                            </MenuItem>

                            <MenuItem value="Completed">
                                Completed
                            </MenuItem>

                        </TextField>

                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>

                        <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                        >

                            <DatePicker
                                label="Due Date"
                                value={formData.dueDate}
                                onChange={(value) =>
                                    setFormData({
                                        ...formData,
                                        dueDate: value,
                                    })
                                }
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                    },
                                }}
                            />

                        </LocalizationProvider>

                    </Grid>

                </Grid>

            </DialogContent>

            <DialogActions>

                <Button
                    onClick={handleClose}
                >

                    Cancel

                </Button>

                <Button
                    variant="contained"
                    onClick={handleSave}
                >
                    {selectedTask ? "Update" : "Save"}
                </Button>

            </DialogActions>

        </Dialog>

    );

}