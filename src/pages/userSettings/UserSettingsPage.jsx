import React from "react";
import {
    Box, Grid, Typography, TextField, Button, Paper, Divider,
    CircularProgress, Alert, Snackbar, Chip, useTheme,
} from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { UserSettingsStore } from "./UserSettingsStore";

// ─── Section Header ────────────────────────────────────────────────────────────

const SectionHeader = ({ icon: Icon, title }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box display="flex" alignItems="center" gap={1} mb={2}>
            <Icon sx={{ color: colors.secondary[400] }} />
            <Typography variant="h5" fontWeight="bold">{title}</Typography>
        </Box>
    );
};

// ─── Info Row ──────────────────────────────────────────────────────────────────

const InfoRow = ({ label, children }) => (
    <Box display="flex" justifyContent="space-between" alignItems="center" py={1.5}
        sx={{ borderBottom: "1px solid", borderColor: "divider" }}>
        <Typography variant="body2" color="text.secondary">{label}</Typography>
        <Box>{children}</Box>
    </Box>
);

// ─── Main Page ─────────────────────────────────────────────────────────────────

const UserSettingsPage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const {
        isPending,
        currentUser,
        profile,
        setProfile,
        snack,
        setSnack,
        handleSaveProfile,
        savingProfile,
    } = UserSettingsStore();

    if (isPending) {
        return <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh"><CircularProgress /></Box>;
    }

    return (
        <Box p={2}>
            <Header title="User Settings" subtitle="Manage your account" />

            <Grid container spacing={3}>

                {/* ─── My Profile ─────────────────────────────────────────────── */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, height: "100%", backgroundColor: colors.primary[400] }}>
                        <SectionHeader icon={PersonOutlinedIcon} title="My Profile" />
                        <Divider sx={{ mb: 3 }} />
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth label="Username"
                                    value={profile.username}
                                    onChange={e => setProfile(p => ({ ...p, username: e.target.value }))}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth label="Email" type="email"
                                    value={profile.email}
                                    onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ mt: 1 }}>
                                <Button
                                    fullWidth variant="contained"
                                    onClick={handleSaveProfile}
                                    disabled={savingProfile}
                                >
                                    {savingProfile ? <CircularProgress size={20} /> : "Save Profile"}
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                {/* ─── Account Info ────────────────────────────────────────────── */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, height: "100%", backgroundColor: colors.primary[400] }}>
                        <SectionHeader icon={BadgeOutlinedIcon} title="Account Info" />
                        <Divider sx={{ mb: 1 }} />
                        <InfoRow label="Role">
                            <Typography variant="body2" fontWeight="bold">
                                {currentUser?.accessLevelName || "—"}
                            </Typography>
                        </InfoRow>
                        <InfoRow label="Company">
                            <Typography variant="body2" fontWeight="bold">
                                {currentUser?.companyName || "—"}
                            </Typography>
                        </InfoRow>
                        <InfoRow label="Status">
                            {currentUser?.enabled
                                ? <Chip label="Active" color="success" size="small" />
                                : <Chip label="Pending" color="warning" size="small" />
                            }
                        </InfoRow>
                    </Paper>
                </Grid>

            </Grid>

            {/* ─── Snackbar ────────────────────────────────────────────────────── */}
            <Snackbar
                open={snack.open}
                autoHideDuration={4000}
                onClose={() => setSnack(s => ({ ...s, open: false }))}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert severity={snack.severity} onClose={() => setSnack(s => ({ ...s, open: false }))}>
                    {snack.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default UserSettingsPage;
