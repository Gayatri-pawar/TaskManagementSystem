import db from "../config/db.js";

// ===============================
// DASHBOARD SUMMARY
// ===============================
export const getDashboardSummary = async (req, res) => {
    try {

        const [[employeeCount]] = await db.query(
            "SELECT COUNT(*) AS totalEmployees FROM users"
        );

        const [[taskCount]] = await db.query(
            "SELECT COUNT(*) AS totalTasks FROM tasks"
        );

        const [[completedCount]] = await db.query(
            "SELECT COUNT(*) AS completedTasks FROM tasks WHERE status = 'Completed'"
        );

        const [[pendingCount]] = await db.query(
            "SELECT COUNT(*) AS pendingTasks FROM tasks WHERE status = 'Pending'"
        );

        res.json({
            totalEmployees: employeeCount.totalEmployees,
            totalTasks: taskCount.totalTasks,
            completedTasks: completedCount.completedTasks,
            pendingTasks: pendingCount.pendingTasks
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// ===============================
// RECENT TASKS
// ===============================
export const getRecentTasks = async (req, res) => {
    try {

        const [rows] = await db.query(`
            SELECT 
                t.id,
                t.title,
                t.priority,
                t.status,
                u.full_name AS employee
            FROM tasks t
            LEFT JOIN users u ON t.assigned_to = u.id
            ORDER BY t.id DESC
            LIMIT 5
        `);

        res.json(rows);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};