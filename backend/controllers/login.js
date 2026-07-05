import db from "../config/db.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

        if (rows.length === 0) {
            return res.status(400).json({ message: "Invalid email" });
        }

        const user = rows[0];

        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
            },
            "secretkey",
            {
                expiresIn: "1d",
            }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                role: user.role,
            }
        });

        console.log("Login user", user);
        console.log("User Id", user.id);
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Server error" });
    }
};