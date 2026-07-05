import db from "../config/db.js";



export const getAllReports = async (req, res) => {
    try {
        let { status, employeeId } = req.query;

        let sql = `
            SELECT 
                t.id,
                t.title,
                t.description,
                t.status,
                t.priority,
                t.start_date AS startDate,
                t.due_date AS dueDate,
                e.full_name AS employee
            FROM tasks t
            LEFT JOIN employees e ON t.assigned_to = e.id
            WHERE 1=1
        `;

        const params = [];

        // STATUS FILTER
        if (status && status !== "All") {
            sql += " AND t.status = ?";
            params.push(status);
        }

        // EMPLOYEE FILTER
        if (employeeId && employeeId !== "All") {
            sql += " AND t.assigned_to = ?";
            params.push(employeeId);
        }

        const [rows] = await db.query(sql, params);

        res.json(rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};


export const getReportSummary = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) AS completed,
                SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) AS pending,
                SUM(CASE WHEN status = 'Overdue' THEN 1 ELSE 0 END) AS overdue,
                COUNT(*) AS total
            FROM tasks
        `);

        res.json(rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};