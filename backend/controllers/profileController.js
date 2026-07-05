import db from "../config/db.js";
import bcrypt from "bcrypt";

// GET PROFILE
export const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const [rows] = await db.query(`
SELECT
    u.id,
    u.full_name,
    u.email,
    u.role,
    u.is_active,
    e.department,
    e.designation
FROM users u
LEFT JOIN employees e
ON u.email = e.email
WHERE u.id = ?
`, [userId]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.json(rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { full_name, department, designation } = req.body;
        await db.query(`UPDATE users SET full_name = ?  WHERE id = ? `, [full_name, userId]);
        await db.query(
            `UPDATE employees
     SET department = ?, designation = ?
     WHERE email = (
         SELECT email FROM users WHERE id = ?
     )`,
            [department, designation, userId]
        );
        res.json({ message: "Profile Updated Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });

    }
};

export const changePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { currentPassword, newPassword, confirmPassword } = req.body;
        // Validate required fields
        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        // Password validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            return res.status(400).json({
                message:
                    "Password must be at least 8 characters and contain uppercase, lowercase and a number.",
            });
        }

        // Get current password from DB
        const [rows] = await db.query(
            "SELECT password FROM users WHERE id = ?",
            [userId]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        // Verify current password
        const isMatch = await bcrypt.compare(
            currentPassword,
            rows[0].password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Current password is incorrect",
            });
        }

        // Prevent same password reuse
        const samePassword = await bcrypt.compare(
            newPassword,
            rows[0].password
        );

        if (samePassword) {
            return res.status(400).json({
                message:
                    "New password cannot be the same as the current password.",
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(
            newPassword,
            10
        );

        // Update password
        await db.query(
            "UPDATE users SET password = ? WHERE id = ?",
            [hashedPassword, userId]
        );

        res.json({ success: true, message: "Password changed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error",
        });
    }
};