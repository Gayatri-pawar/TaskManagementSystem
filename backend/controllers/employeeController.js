import pool from "../config/db.js";

// ============================
// Get All Employees
// ============================
export const getEmployees = async (req, res) => {
    try {

        const [rows] = await pool.query(`
            SELECT
                id,
                full_name,
                email,
                department,
                designation,
                is_active
            FROM employees
            ORDER BY id DESC
        `);

        res.status(200).json(rows);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }
};

// ============================
// Get Employee By ID
// ============================
export const getEmployeeById = async (req, res) => {

    try {

        const [rows] = await pool.query(
            `SELECT
                id,
                full_name,
                email,
                department,
                designation,
                is_active
            FROM employees
            WHERE id = ?`,
            [req.params.id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.status(200).json(rows[0]);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// ============================
// Create Employee
// ============================
export const createEmployee = async (req, res) => {

    try {

        const {
            full_name,
            email,
            department,
            designation,
            is_active
        } = req.body;

        await pool.query(
            `INSERT INTO employees
            (
                full_name,
                email,
                department,
                designation,
                is_active
            )
            VALUES (?,?,?,?,?)`,
            [
                full_name,
                email,
                department,
                designation,
                is_active
            ]
        );

        res.status(201).json({
            message: "Employee Created Successfully"
        });

    } catch (error) {

        console.log(error);

        if (error.code === "ER_DUP_ENTRY") {

            return res.status(400).json({
                message: "Email already exists."
            });

        }

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// ============================
// Update Employee
// ============================
export const updateEmployee = async (req, res) => {

    try {

        const {
            full_name,
            email,
            department,
            designation,
            is_active
        } = req.body;

        const [result] = await pool.query(
            `UPDATE employees
             SET
                full_name=?,
                email=?,
                department=?,
                designation=?,
                is_active=?
             WHERE id=?`,
            [
                full_name,
                email,
                department,
                designation,
                is_active,
                req.params.id
            ]
        );

        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: "Employee not found"
            });

        }

        res.json({
            message: "Employee Updated Successfully"
        });

    } catch (error) {

        console.log(error);

        if (error.code === "ER_DUP_ENTRY") {

            return res.status(400).json({
                message: "Email already exists."
            });

        }

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// ============================
// Delete Employee
// ============================
export const deleteEmployee = async (req, res) => {

    try {

        const [result] = await pool.query(
            "DELETE FROM employees WHERE id=?",
            [req.params.id]
        );

        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: "Employee not found"
            });

        }

        res.json({
            message: "Employee Deleted Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};


// Get Task of employee:
export const getMyTasks = async (req, res) => {
    try {
        const userId = req.user.id;

        const [tasks] = await pool.query(
            "SELECT * FROM tasks WHERE assigned_to = ?",
            [userId]
        );

        res.json(tasks);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};