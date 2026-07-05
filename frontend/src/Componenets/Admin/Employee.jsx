
import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Paper,
    Typography,
    TextField,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    TablePagination,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { toast } from "react-toastify";

import AddEditEmployeeDialog from "./AddEditEmployeeDialog";

import {
    getEmployees,
    deleteEmployee,
} from "../Api/EmployeeApi";

const Employee = () => {

    const [employees, setEmployees] = useState([]);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(false);

    const [openDialog, setOpenDialog] = useState(false);

    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const [deleteDialog, setDeleteDialog] = useState(false);

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(5);

    // ===========================
    // Fetch Employees
    // ===========================

    const fetchEmployees = async () => {

        try {

            setLoading(true);

            const data = await getEmployees();

            setEmployees(data);

        } catch (error) {

            toast.error(error.message);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchEmployees();

    }, []);


    const handleDelete = async () => {
        try {
            await deleteEmployee(selectedEmployee.id);
            toast.success("Employee deleted successfully");
            setDeleteDialog(false);
            fetchEmployees();
        } catch (error) {
            toast.error(error.message);
        }
    };


    const filteredEmployees = employees.filter((emp) => {
        return (

            emp.full_name
                ?.toLowerCase()
                .includes(search.toLowerCase())

            ||

            emp.email
                ?.toLowerCase()
                .includes(search.toLowerCase())

            ||

            emp.department
                ?.toLowerCase()
                .includes(search.toLowerCase())

            ||

            emp.designation
                ?.toLowerCase()
                .includes(search.toLowerCase())

        );

    });

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
                    Employee Management
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{ backgroundColor: "#002984", color: "#fff" }}
                    onClick={() => {

                        setSelectedEmployee(null);

                        setOpenDialog(true);

                    }}
                >
                    Add Employee
                </Button>

            </Box>

            <Paper sx={{ p: 2, borderRadius: 3 }}>

                <TextField
                    fullWidth
                    placeholder="Search Employee..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{ mb: 3 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />

                <TableContainer>
                    <Table>
                        <TableHead sx={{ backgroundColor: "#002984" }}>
                            <TableRow>
                                <TableCell sx={{ color: "#fff" }}> <b>Name</b>  </TableCell>
                                <TableCell sx={{ color: "#fff" }}> <b>Email</b>  </TableCell>
                                <TableCell sx={{ color: "#fff" }}><b>Department</b></TableCell>
                                <TableCell sx={{ color: "#fff" }}> <b>Designation</b> </TableCell>
                                <TableCell sx={{ color: "#fff" }}><b>Status</b> </TableCell>
                                <TableCell sx={{ color: "#fff" }} align="center"><b>Actions</b> </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        align="center"
                                    >
                                        Loading...
                                    </TableCell>

                                </TableRow>

                            ) : filteredEmployees.length === 0 ? (

                                <TableRow>

                                    <TableCell
                                        colSpan={6}
                                        align="center"
                                    >
                                        No Employees Found
                                    </TableCell>

                                </TableRow>

                            ) : (

                                filteredEmployees
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((employee) => (

                                        <TableRow key={employee.id}>
                                            <TableCell> {employee.full_name}  </TableCell>
                                            <TableCell> {employee.email} </TableCell>
                                            <TableCell> {employee.department} </TableCell>
                                            <TableCell>   {employee.designation} </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={
                                                        employee.is_active ? "Active" : "Inactive"
                                                    }
                                                    color={
                                                        employee.is_active ? "success" : "error"
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => {
                                                        setSelectedEmployee(employee);
                                                        setOpenDialog(true);
                                                    }}
                                                >
                                                    <EditIcon />
                                                </IconButton>

                                                <IconButton
                                                    color="error"
                                                    onClick={() => {
                                                        setSelectedEmployee(employee);
                                                        setDeleteDialog(true);
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                            )}
                        </TableBody>
                    </Table>  </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={filteredEmployees.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(e, newPage) => setPage(newPage)}
                    onRowsPerPageChange={(e) => {
                        setRowsPerPage(parseInt(e.target.value));
                        setPage(0);
                    }}
                />

            </Paper>

            <AddEditEmployeeDialog
                open={openDialog}
                handleClose={() => setOpenDialog(false)}
                employee={selectedEmployee}
                refreshData={fetchEmployees}
            />

            <Dialog
                open={deleteDialog}
                onClose={() => setDeleteDialog(false)}
            >

                <DialogTitle>

                    Delete Employee

                </DialogTitle>

                <DialogContent>

                    <DialogContentText>

                        Are you sure you want to delete this employee?

                    </DialogContentText>

                </DialogContent>

                <DialogActions>

                    <Button
                        onClick={() => setDeleteDialog(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        color="error"
                        variant="contained"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>

                </DialogActions>

            </Dialog>

        </Box>

    );

};

export default Employee;