import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db.js';
import authRoute from './routes/authRoute.js';
// import adminRoute from './routes/adminRoute.js';
import taskRoute from './routes/taskRoute.js';
import employeeRoute from "./routes/employeeRoute.js";
import admindashboardRoute from "./routes/admindashboardRoute.js";
import adminReportRoute from "./routes/adminReportRoute.js";
import profileRoutes from "./routes/ProfileRoute.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoute);
app.use("/api/employees", employeeRoute);
// app.use('/api/admin', adminRoute);
app.use("/api/tasks", taskRoute);
app.use("/api/dashboard", admindashboardRoute);
app.use("/api/reports", adminReportRoute);
app.use("/api/profile", profileRoutes);

// Check DB Connection : 
if (pool) {
    console.log("Database connection successful");
} else {
    console.error("Database connection failed");
}

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});


