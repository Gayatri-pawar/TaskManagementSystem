import React, { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    MenuItem,
    TextField,
    Button,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@mui/material";

import { getAllTasksForReports } from "../Api/AdminReportApi";
import { getEmployees } from "../Api/EmployeeApi";
import TablePagination from "@mui/material/TablePagination";

export default function Reports() {
    const [tasks, setTasks] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(false);
    const [employees, setEmployees] = useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [reportType, setReportType] = useState("Completed");
    const [employee, setEmployee] = useState("All");

    useEffect(() => {
        loadEmployees();
    }, []);

    useEffect(() => {
        loadData(reportType, employee);
    }, [reportType, employee]);

    const loadData = async (status, emp) => {
        try {
            setLoading(true);

            const data = await getAllTasksForReports(
                status || "All",
                emp || "All"
            );
            console.log("Tasks API:", data);
            setTasks(data);
            setFiltered(data);

        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const loadEmployees = async () => {
        try {
            const data = await getEmployees();

            setEmployees([
                {
                    id: "All",
                    full_name: "All"
                },
                ...data
            ]);

        } catch (error) {
            console.error(error);
        }
    };




    // COUNTS
    const counts = {
        Completed: tasks.filter((t) => t.status === "Completed").length,
        Pending: tasks.filter((t) => t.status === "Pending").length,
        Overdue: tasks.filter((t) => t.status === "Overdue").length,
        All: tasks.length,
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // CSV DOWNLOAD
    const downloadCSV = () => {
        const headers = [
            "ID",
            "Title",
            "Employee",
            "Status",
            "Priority",
            "Start Date",
            "Due Date",
        ];



        const rows = filtered.map((t) => [
            t.id,
            t.title,
            t.full_name,
            t.status,
            t.priority,
            t.startDate,
            t.dueDate,
        ]);

        const csvContent =
            "data:text/csv;charset=utf-8," +
            [headers, ...rows].map((e) => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);

        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute(
            "download",
            `${reportType}_${employee}_report.csv`
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Box p={3}>
            <Typography variant="h4" mb={2}>
                Reports Dashboard
            </Typography>

            {/* FILTER SECTION */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Grid container spacing={3}>

                        {/* REPORT TYPE */}
                        <Grid item xs={12} md={5}>
                            <TextField
                                select
                                fullWidth
                                label="Report Type"
                                value={reportType}
                                onChange={(e) => setReportType(e.target.value)}
                            >
                                <MenuItem value="All">All</MenuItem>
                                <MenuItem value="Completed">Completed</MenuItem>
                                <MenuItem value="Pending">Pending</MenuItem>
                                <MenuItem value="Overdue">Overdue</MenuItem>
                            </TextField>
                        </Grid>

                        {/* EMPLOYEE (WIDER SPACING IMPROVED) */}
                        <Grid item xs={12} md={4}>
                            <TextField
                                select
                                fullWidth
                                label="Employee"
                                value={employee}
                                onChange={(e) => setEmployee(e.target.value)}
                            >
                                {employees.map((emp) => (
                                    <MenuItem
                                        key={emp.id}
                                        value={emp.id}
                                    >
                                        {emp.full_name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        {/* DOWNLOAD */}
                        <Grid item xs={12} md={4}>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={downloadCSV}
                                sx={{ height: "56px", backgroundColor: "#002984" }}
                            >
                                Download Report
                            </Button>
                        </Grid>

                    </Grid>
                </CardContent>
            </Card>

            {/* STATS CARDS */}
            <Grid container spacing={2} mb={3}>
                {Object.keys(counts).map((key) => (
                    <Grid item xs={12} md={3} key={key}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{key}</Typography>
                                <Typography variant="h4">
                                    {counts[key]}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* TABLE */}
            <Card>
                <CardContent>
                    <Typography variant="h6" mb={2}>
                        Report Data
                    </Typography>

                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#002984" }}>
                                <TableCell sx={{ color: "#fff" }}><b>ID</b></TableCell>
                                <TableCell sx={{ color: "#fff" }}><b>Title</b></TableCell>
                                <TableCell sx={{ color: "#fff" }}><b>Employee</b></TableCell>
                                <TableCell sx={{ color: "#fff" }}><b>Status</b></TableCell>
                                <TableCell sx={{ color: "#fff" }}><b>Priority</b></TableCell>
                                <TableCell sx={{ color: "#fff" }}><b>Start Date</b></TableCell>
                                <TableCell sx={{ color: "#fff" }}><b>Due Date</b></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {filtered
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((task) => (
                                    <TableRow key={task.id}>
                                        <TableCell>{task.id}</TableCell>
                                        <TableCell>{task.title}</TableCell>
                                        <TableCell>{task.full_name}</TableCell>
                                        <TableCell>{task.status}</TableCell>
                                        <TableCell>{task.priority}</TableCell>
                                        <TableCell>{task.startDate}</TableCell>
                                        <TableCell>{task.dueDate}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        component="div"
                        count={filtered.length}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                    />
                </CardContent>
            </Card>
        </Box>
    );
}