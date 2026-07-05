import {
    Box,
    Button,
    Container,
    FormControl,
    InputLabel,
    Link,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const Register = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "Employee",
    });


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async () => {

        if (!formData.full_name.trim()) {
            toast.error("Full Name is required");
            return;
        }

        if (!formData.email.trim()) {
            toast.error("Email is required");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(formData.email)) {
            toast.error("Enter a valid email address");
            return;
        }

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (!passwordRegex.test(formData.password)) {
            toast.error(
                "Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number."
            );
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {

            const response = await fetch(
                "http://localhost:3001/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || "Registration failed");
                return;
            }

            toast.success("Registration Successful");

            setFormData({
                full_name: "",
                email: "",
                password: "",
                confirmPassword: "",
                role: "Employee",
            });

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {

            console.error(error);
            toast.error("Something went wrong");

        }

    };


    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Paper
                    elevation={4}
                    sx={{
                        width: "100%",
                        p: 4,
                        borderRadius: 3,
                    }}
                >
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        textAlign="center"
                        gutterBottom
                    >
                        Employee Task System
                    </Typography>

                    <Typography
                        variant="body1"
                        color="text.secondary"
                        textAlign="center"
                        mb={4}
                    >
                        Create Your Account
                    </Typography>

                    <TextField
                        fullWidth
                        label="Full Name"
                        name="full_name"
                        value={formData.full_name}
                        margin="normal"
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={formData.email}
                        type="email"
                        margin="normal"
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        value={formData.password}
                        type="password"
                        margin="normal"
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        label="Confirm Password"
                        value={formData.confirmPassword}
                        name="confirmPassword"
                        type="password"
                        margin="normal"
                        onChange={handleChange}

                    />

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Role</InputLabel>
                        <Select
                            name="role"
                            value={formData.role}
                            label="Role"
                            onChange={handleChange}
                        >
                            <MenuItem value="Admin">Admin</MenuItem>
                            <MenuItem value="Employee">Employee</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        sx={{
                            mt: 3,
                            py: 1.5,
                        }}
                        onClick={handleSubmit}
                    >
                        Register
                    </Button>

                    <Typography
                        textAlign="center"
                        mt={3}
                    >
                        Already have an account?{" "}
                        <Link
                            component={RouterLink}
                            to="/login"
                            underline="hover"
                        >
                            Login
                        </Link>
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
};

export default Register;