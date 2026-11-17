import { Box, IconButton, useTheme, Divider, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ColorModeContext, tokens } from "../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const navigate = useNavigate();

    const [menuAnchor, setMenuAnchor] = useState(null);

    const handleUserMenuOpen = (e) => setMenuAnchor(e.currentTarget);
    const handleUserMenuClose = () => setMenuAnchor(null);

    const handleUserSettings = () => {
        handleUserMenuClose();
        navigate("/settings");
    };

    const handleSignOut = () => {
        handleUserMenuClose();
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
    <Box>
        <Box display="flex" justifyContent="flex-end" mr="30px" ml="30px" mt="10px" mb="10px">
            {/* SEARCH BAR */}
            <Box
                display="flex"
                backgroundColor={colors.primary[400]}
                borderRadius="3px"
            >
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
                <IconButton type="button" sx={{ p:1 }}>
                    <SearchIcon />
                </IconButton>
            </Box>

            { /* ICONS */}
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </IconButton>
                <IconButton>
                    <NotificationsOutlinedIcon />
                </IconButton>
                <IconButton>
                    <SettingsOutlinedIcon />
                </IconButton>
                <IconButton onClick={handleUserMenuOpen}>
                    <PersonOutlinedIcon />
                </IconButton>
            </Box>
        </Box>

        <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={handleUserMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
            <MenuItem onClick={handleUserSettings}>
                <ListItemIcon><ManageAccountsOutlinedIcon fontSize="small" /></ListItemIcon>
                <ListItemText>User Settings</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleSignOut}>
                <ListItemIcon><LogoutOutlinedIcon fontSize="small" /></ListItemIcon>
                <ListItemText>Sign Out</ListItemText>
            </MenuItem>
        </Menu>

        <Divider/>
    </Box>
    );
};

export default Topbar;
