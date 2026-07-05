import { useEffect, useState } from "react";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    MenuItem,
    TextField,
} from "@mui/material";

import { toast } from "react-toastify";

import {
    createEmployee,
    updateEmployee
} from "../Api/EmployeeApi";

const AddEditEmployeeDialog = ({
    open,
    handleClose,
    employee,
    refreshData,
}) => {

    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        department: "",
        designation: "",
        is_active: 1,
    });

    // =========================
    // Set data for edit mode
    // =========================
    useEffect(() => {

        if (employee) {

            setFormData({
                full_name: employee.full_name || "",
                email: employee.email || "",
                department: employee.department || "",
                designation: employee.designation || "",
                is_active: employee.is_active ?? 1,
            });

        } else {

            setFormData({
                full_name: "",
                email: "",
                department: "",
                designation: "",
                is_active: 1,
            });

        }

    }, [employee]);

    // =========================
    // Handle change
    // =========================
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async () => {
        try {
            if (employee) {
                await updateEmployee(employee.id, formData);
            } else {
                await createEmployee(formData);
            }

            toast.success("Saved successfully");

            await refreshData();
            handleClose();

        } catch (error) {
            toast.error(error.message);
        }
    };

    return (

        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
        >

            <DialogTitle>

                {employee ? "Edit Employee" : "Add Employee"}

            </DialogTitle>

            <DialogContent>

                <Grid container spacing={2} mt={1}>

                    <Grid item xs={12}>

                        <TextField
                            fullWidth
                            label="Full Name"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid item xs={12}>

                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid item xs={6}>

                        <TextField
                            fullWidth
                            label="Department"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid item xs={6}>

                        <TextField
                            fullWidth
                            label="Designation"
                            name="designation"
                            value={formData.designation}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid item xs={12}>

                        <TextField
                            select
                            fullWidth
                            label="Status"
                            name="is_active"
                            value={formData.is_active}
                            onChange={handleChange}
                        >

                            <MenuItem value={1}>Active</MenuItem>
                            <MenuItem value={0}>Inactive</MenuItem>

                        </TextField>

                    </Grid>

                </Grid>

            </DialogContent>

            <DialogActions>

                <Button onClick={handleClose}>
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                >
                    {employee ? "Update" : "Save"}
                </Button>

            </DialogActions>

        </Dialog>

    );
};

export default AddEditEmployeeDialog;