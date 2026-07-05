import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Link,
    Paper,

    TextField,
    Typography,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";
const Login = () => {


    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false);

    const [rememberMe, setRememberMe] = useState(false);

    const [showPassword, setShowPassword] = useState(false);



    const validate = () => {
        let tempErrors = {};

        if (!formData.email.trim()) {
            tempErrors.email = "Email is required";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
        ) {
            tempErrors.email = "Invalid email address";
        }

        if (!formData.password.trim()) {
            tempErrors.password = "Password is required";
        }

        setErrors(tempErrors);

        return Object.keys(tempErrors).length === 0;
    };


    const handleLogin = async () => {

        if (!validate()) return;

        try {

            setLoading(true);

            const response = await fetch("http://localhost:3001/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            if (rememberMe) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
            } else {
                sessionStorage.setItem("token", data.token);
                sessionStorage.setItem("user", JSON.stringify(data.user));
            }

            if (data.user.role === "Admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/employee/dashboard");
            }

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
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
                        Task Management
                    </Typography>
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        margin="normal"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        margin="normal"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mt={1}
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                            }
                            label="Remember Me"
                        />

                        <Link
                            component={RouterLink}
                            to="/forgot-password"
                            underline="hover"
                        >
                            Forgot Password?
                        </Link>
                    </Box>


                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{
                            mt: 3,
                            py: 1.5,
                        }}
                        disabled={loading}
                        onClick={handleLogin}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </Button>

                    <Typography
                        textAlign="center"
                        mt={3}
                    >
                        Don't have an account?{" "}
                        <Link
                            component={RouterLink}
                            to="/register"
                            underline="hover"
                        >
                            Register
                        </Link>
                    </Typography>
                    {/* <FormControlLabel
                        control={
                            <Checkbox
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                        }
                        label="Remember Me"
                    /> */}
                </Paper>
            </Box>
        </Container>
    );
};

export default Login;