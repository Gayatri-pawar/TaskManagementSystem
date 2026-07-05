import pool from "../config/db.js";

export const createTask = async (req, res) => {
    try {
        const {
            title,
            description,
            assigned_to,
            priority,
            status,
            due_date,
        } = req.body;

        const created_by = req.user.id; // From JWT
        const start_date = new Date().toISOString().split("T")[0];

        await pool.query(
            `INSERT INTO tasks
            (title, description, assigned_to, created_by, priority, status, start_date, due_date)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                title,
                description,
                assigned_to,
                created_by,
                priority,
                status,
                start_date,
                due_date,
            ]
        );

        res.status(201).json({
            message: "Task Created Successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error",
        });
    }
};


export const getTasks = async (req, res) => {
    try {
        const [rows] = await pool.query(`SELECT tasks.*, users.full_name FROM tasks JOIN users ON tasks.assigned_to=users.id ORDER BY tasks.id DESC`);
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error"
        });
    }

};

export const getTaskById = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM tasks WHERE id=?",
            [req.params.id]);
        res.json(rows[0]);
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error"
        });

    }
};

export const updateTask = async (req, res) => {
    try {
        const { title, description, assigned_to, priority, status, due_date } = req.body;
        await pool.query(`UPDATE tasks SET title=?, description=?, assigned_to=?, priority=?, status=?, due_date=? WHERE id=?`, [title,
            description, assigned_to, priority, status, due_date, req.params.id]);
        res.json({ message: "Task Updated" });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }

};


export const deleteTask = async (req, res) => {
    try {
        await pool.query("DELETE FROM tasks WHERE id=?", [req.params.id
        ]);
        res.json({ message: "Task Deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });

    }

};

export const updateTaskStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const taskId = req.params.id;
        const userId = req.user.id;
        const [task] = await pool.query(`SELECT * FROM tasks WHERE id = ? AND assigned_to = ?`, [taskId, userId]);
        if (task.length === 0) {
            return res.status(404).json({
                message: "Task not found or not assigned to you",
            });
        }
        await pool.query(`UPDATE tasks SET status = ?, updated_at = NOW() WHERE id = ?`, [status, taskId]);
        res.status(200).json({
            message: "Task status updated successfully",
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error",
        });
    }
};