import React, { useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Chip,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Typography,
    Divider,
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DoneIcon from "@mui/icons-material/Done";
import ScheduleIcon from "@mui/icons-material/Schedule";

const Notifications = () => {

    const [notifications] = useState([
        {
            id: 1,
            title: "New Task Assigned",
            message: "Create Login API has been assigned to you.",
            type: "Assigned",
            time: "03 Jul 2026 | 10:30 AM",
            read: false,
        },
        {
            id: 2,
            title: "Task Due Tomorrow",
            message: "Dashboard UI is due tomorrow.",
            type: "Due",
            time: "03 Jul 2026 | 09:15 AM",
            read: false,
        },
        {
            id: 3,
            title: "Task Completed",
            message: "Employee Module marked as completed.",
            type: "Completed",
            time: "02 Jul 2026 | 04:00 PM",
            read: true,
        },
    ]);

    const getIcon = (type) => {
        switch (type) {
            case "Assigned":
                return <AssignmentIcon />;
            case "Due":
                return <ScheduleIcon />;
            case "Completed":
                return <DoneIcon />;
            default:
                return <NotificationsIcon />;
        }
    };

    return (
        <Box>

            <Typography
                variant="h4"
                fontWeight="bold"
                mb={3}
            >
                Notifications
            </Typography>

            <Card elevation={3}>

                <CardContent>

                    <List>

                        {notifications.map((item, index) => (

                            <React.Fragment key={item.id}>

                                <ListItem>

                                    <ListItemAvatar>

                                        <Avatar color="primary">
                                            {getIcon(item.type)}
                                        </Avatar>

                                    </ListItemAvatar>

                                    <ListItemText
                                        primary={item.title}
                                        secondary={
                                            <>
                                                <Typography variant="body2">
                                                    {item.message}
                                                </Typography>

                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                >
                                                    {item.time}
                                                </Typography>
                                            </>
                                        }
                                    />

                                    <Chip
                                        label={item.read ? "Read" : "Unread"}
                                        color={item.read ? "success" : "error"}
                                    />

                                </ListItem>

                                {index !== notifications.length - 1 && (
                                    <Divider />
                                )}

                            </React.Fragment>

                        ))}

                    </List>

                </CardContent>

            </Card>

        </Box>
    );
};

export default Notifications;