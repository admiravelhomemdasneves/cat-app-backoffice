import React from "react";
import {
    Box, Grid, Typography, TextField, Button, Paper, Divider,
    CircularProgress, Alert, Snackbar, useTheme,
} from "@mui/material";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { CompanySettingsStore } from "./CompanySettingsStore";

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

// ─── Main Page ─────────────────────────────────────────────────────────────────

const CompanySettingsPage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const {
        isPending,
        isAdmin,
        companyForm,
        setCompanyForm,
        snack,
        setSnack,
        handleSaveCompany,
        savingCompany,
    } = CompanySettingsStore();

    if (isPending) {
        return <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh"><CircularProgress /></Box>;
    }

    return (
        <Box p={2}>
            <Header title="Company Settings" subtitle="Manage your company information" />

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 3, backgroundColor: colors.primary[400] }}>
                        <SectionHeader icon={BusinessOutlinedIcon} title="Company" />
                        <Divider sx={{ mb: 3 }} />
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth label="Company Name"
                                    value={companyForm.name}
                                    onChange={e => setCompanyForm(c => ({ ...c, name: e.target.value }))}
                                    InputProps={{ readOnly: !isAdmin }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth label="Company Email" type="email"
                                    value={companyForm.email}
                                    onChange={e => setCompanyForm(c => ({ ...c, email: e.target.value }))}
                                    InputProps={{ readOnly: !isAdmin }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth label="VAT Number"
                                    value={companyForm.vatNumber}
                                    onChange={e => setCompanyForm(c => ({ ...c, vatNumber: e.target.value }))}
                                    InputProps={{ readOnly: !isAdmin }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth label="Address"
                                    value={companyForm.address}
                                    onChange={e => setCompanyForm(c => ({ ...c, address: e.target.value }))}
                                    InputProps={{ readOnly: !isAdmin }}
                                />
                            </Grid>
                            {isAdmin && (
                                <Grid item xs={12} sm={3} sx={{ mt: 1 }}>
                                    <Button
                                        fullWidth variant="contained"
                                        onClick={handleSaveCompany}
                                        disabled={savingCompany}
                                    >
                                        {savingCompany ? <CircularProgress size={20} /> : "Save Company"}
                                    </Button>
                                </Grid>
                            )}
                        </Grid>
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

export default CompanySettingsPage;
