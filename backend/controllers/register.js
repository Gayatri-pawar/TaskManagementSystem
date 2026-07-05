import db from "../config/db.js";

export const register = async (req, res) => {
    try {
        const { full_name, email, password, role } = req.body;

        // check user exists
        const [existingUser] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

        if (existingUser.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        // //  password match check :
        // if (password !== confirmPassword) {
        //     return res.status(400).json({ message: "Passwords do not match" });
        // }

        await db.query("INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)", [full_name, email, password, role]);
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("Error during registration:", error);

        res.status(500).json({ message: "Server error" });
    }
};