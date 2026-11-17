import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Box, Button, CircularProgress, Paper } from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Header from "../../components/Header";
import ContactForm from "./components/ContactForm";
import { ContactDetailPageStore } from "./ContactDetailPageStore";

const ContactDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { state } = useLocation();

    const { isPending, contact, updateContact } = ContactDetailPageStore(Number(id), state?.contact ?? null);

    if (isPending) {
        return <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh"><CircularProgress /></Box>;
    }

    return (
        <Box p={2}>
            <Header
                title={`Contact #${id}${contact ? ` - ${[contact.firstName, contact.lastName].filter(Boolean).join(' ')}` : ''}`}
                subtitle="View and manage contact details"
            />
            <Box mb={3}>
                <Button
                    startIcon={<ArrowBackOutlinedIcon />}
                    onClick={() => navigate(-1)}
                    variant="outlined"
                    size="small"
                >
                    Back
                </Button>
            </Box>
            <Paper sx={{ p: 3 }}>
                <ContactForm initialData={contact} onChange={updateContact} />
            </Paper>
        </Box>
    );
};

export default ContactDetailPage;
