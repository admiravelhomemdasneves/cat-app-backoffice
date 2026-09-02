import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Box, Button, CircularProgress, Paper } from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Header from "../../components/Header";
import MaterialForm from "./components/MaterialForm";
import { MaterialDetailPageStore } from "./MaterialDetailPageStore";

const MaterialDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { state } = useLocation();

    const { isPending, material, updateMaterial } = MaterialDetailPageStore(Number(id), state?.material ?? null);

    if (isPending) {
        return <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh"><CircularProgress /></Box>;
    }

    return (
        <Box p={2}>
            <Header
                title={`Material #${id}${material?.name ? ` - ${material.name}` : ''}`}
                subtitle="View and manage material details"
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
                <MaterialForm initialData={material} onChange={updateMaterial} />
            </Paper>
        </Box>
    );
};

export default MaterialDetailPage;
