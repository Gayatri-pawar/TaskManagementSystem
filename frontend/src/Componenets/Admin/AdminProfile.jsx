import React, { useEffect, useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Divider,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

import { getProfile, updateProfile, changePassword } from "../Api/AdminProfileApi";

export default function Profile() {
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const [profile, setProfile] = useState({
        full_name: "",
        email: "",
        role: "",
        department: "",
        designation: "",
        is_active: 1,
    });
    const [profileImage, setProfileImage] = useState(null);
    useEffect(() => {
        loadProfile();
    }, []);

    const handleImageUpload = (e) => {
        if (e.target.files[0]) {
            setProfileImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const loadProfile = async () => {
        try {
            setLoading(true);
            const data = await getProfile();
            console.log("Profile API Response:", data);
            setProfile(data);
            if (data.profile_image) {
                setProfileImage(
                    `http://localhost:3001/uploads/${data.profile_image}`
                );
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async () => {
        try {
            await updateProfile(profile);
            alert("Profile Updated Successfully");
            setEditMode(false);
            loadProfile();
        } catch (err) {
            console.log(err);
            alert(err.message);
        }
    };

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="70vh"
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box p={3}>
            <Typography variant="h4" mb={3}>
                My Profile
            </Typography>

            <Card elevation={3}>
                <CardContent>

                    <Grid container spacing={4}>

                        {/* LEFT SIDE */}

                        <Grid
                            item
                            xs={12}
                            md={4}
                            display="flex"
                            alignItems="center"
                            gap={3}
                        >
                            <Avatar
                                src={profileImage}
                                sx={{
                                    width: 130,
                                    height: 130,
                                    bgcolor: "#002984",
                                }}
                            >
                                {!profileImage && <PersonIcon sx={{ fontSize: 70 }} />}
                            </Avatar>

                            <Box>
                                <Typography variant="h5" fontWeight="bold">
                                    {profile.full_name}
                                </Typography>

                                <Typography color="text.secondary" mb={2}>
                                    {profile.role}
                                </Typography>

                                <Button
                                    variant="outlined"
                                    component="label"
                                    sx={{ backgroundColor: "#002984", color: "#fff" }}
                                >
                                    Upload Photo
                                    <input
                                        hidden
                                        accept="image/*"
                                        type="file"
                                        onChange={handleImageUpload}
                                    />
                                </Button>
                            </Box>
                        </Grid>

                        {/* RIGHT SIDE */}

                        <Grid item xs={12} md={8}>

                            <Grid container spacing={3}>

                                <Grid item xs={12} md={4}>
                                    <TextField
                                        fullWidth
                                        label="Full Name"
                                        name="full_name"
                                        value={profile.full_name}
                                        disabled={!editMode}
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        value={profile.email}
                                        disabled
                                    />
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <TextField
                                        fullWidth
                                        label="Role"
                                        value={profile.role}
                                        disabled
                                    />
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <TextField
                                        fullWidth
                                        label="Department"
                                        name="department"
                                        value={profile.department}
                                        disabled={!editMode}
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <TextField
                                        fullWidth
                                        label="Designation"
                                        name="designation"
                                        value={profile.designation}
                                        disabled={!editMode}
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <TextField
                                        fullWidth
                                        label="Status"
                                        value={profile.is_active ? "Active" : "Inactive"}
                                        disabled
                                    />
                                </Grid>
                            </Grid>

                            <Divider sx={{ my: 4 }} />

                            <Box display="flex" gap={2}>

                                {!editMode ? (
                                    <>
                                        <Button
                                            variant="contained"
                                            onClick={() => setEditMode(true)}
                                            sx={{ backgroundColor: "#002984" }}
                                        >
                                            Edit Profile
                                        </Button>

                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                        >
                                            Change Password
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            variant="contained"
                                            onClick={handleSave}
                                        >
                                            Save
                                        </Button>

                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => {
                                                setEditMode(false);
                                                loadProfile();
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </>
                                )}

                            </Box>

                        </Grid>

                    </Grid>

                </CardContent>
            </Card>
        </Box>
    );
}