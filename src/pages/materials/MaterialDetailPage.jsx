import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Box, Button, Chip, CircularProgress, Grid, TextField, Typography, Accordion, AccordionSummary, AccordionDetails, useTheme } from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Header from "../../components/Header";
import MaterialForm from "./components/MaterialForm";
import MaterialAppearanceForm from "./components/MaterialAppearanceForm";
import MaterialVariantsPanel from "./components/MaterialVariantsPanel";
import PriceQuantityForm from "./components/PriceQuantityForm";
import { MaterialDetailPageStore } from "./MaterialDetailPageStore";
import { tokens } from "../../theme";

const MaterialDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { state } = useLocation();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { isPending, material, updateMaterial } = MaterialDetailPageStore(Number(id), state?.material ?? null);

    const [formData, setFormData] = React.useState(null);
    const [tagInput, setTagInput] = React.useState("");

    React.useEffect(() => {
        setFormData(null);
    }, [id]);

    React.useEffect(() => {
        if (material && formData === null) {
            setFormData(material);
        }
    }, [material, formData]);

    const handleChange = (updated) => {
        setFormData(updated);
        updateMaterial(updated);
    };

    const accordionSx = {
        backgroundColor: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(4px)",
        "&.Mui-expanded": { margin: "8px 0" },
    };

    if (isPending || formData === null) {
        return <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh"><CircularProgress /></Box>;
    }

    return (
        <Box p={2}>
            <Header
                title={`Material #${id}${formData?.name ? ` - ${formData.name}` : ''}`}
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
            <Grid container spacing={2} mt={1}>
                <Grid item xs={8}>
                    <Box display="flex" flexDirection="column" gap={1}>
                        <Accordion defaultExpanded sx={accordionSx}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography component="span" variant="h5" color={colors.grey[100]} fontWeight="bold">
                                    BASIC DETAILS
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <MaterialForm formData={formData} onChange={handleChange} />
                            </AccordionDetails>
                        </Accordion>
                        <Accordion defaultExpanded sx={accordionSx}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography component="span" variant="h5" color={colors.grey[100]} fontWeight="bold">
                                    PRICES
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box display="flex" flexDirection="column" gap={2}>
                                    <Box>
                                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                            Cost
                                        </Typography>
                                        <PriceQuantityForm
                                            value={formData.costPrice}
                                            onChange={(v) => handleChange({ ...formData, costPrice: v })}
                                        />
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                            Retail Price
                                        </Typography>
                                        <PriceQuantityForm
                                            value={formData.retailPrice}
                                            onChange={(v) => handleChange({ ...formData, retailPrice: v })}
                                        />
                                    </Box>
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion defaultExpanded sx={accordionSx}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography component="span" variant="h5" color={colors.grey[100]} fontWeight="bold">
                                    ADDITIONAL INFORMATION
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box display="flex" flexDirection="column" gap={2}>
                                    <TextField
                                        fullWidth
                                        multiline
                                        minRows={3}
                                        label="Description"
                                        value={formData.description ?? ""}
                                        onChange={(e) => handleChange({ ...formData, description: e.target.value })}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Add tag"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key !== "Enter") return;
                                            e.preventDefault();
                                            const trimmed = tagInput.trim();
                                            if (!trimmed) return;
                                            const existing = formData.tags ?? [];
                                            const duplicate = existing.some(t => t.tagName.toLowerCase() === trimmed.toLowerCase());
                                            if (duplicate) return;
                                            handleChange({ ...formData, tags: [...existing, { idMaterialTag: null, tagName: trimmed }] });
                                            setTagInput("");
                                        }}
                                        helperText="Press Enter to add"
                                    />
                                    {(formData.tags ?? []).length > 0 && (
                                        <Box display="flex" flexWrap="wrap" gap={1}>
                                            {(formData.tags ?? []).map((tag, idx) => (
                                                <Chip
                                                    key={tag.idMaterialTag ?? `new-${idx}`}
                                                    label={tag.tagName}
                                                    onDelete={() => handleChange({
                                                        ...formData,
                                                        tags: (formData.tags ?? []).filter((_, i) => i !== idx),
                                                    })}
                                                />
                                            ))}
                                        </Box>
                                    )}
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box display="flex" flexDirection="column" gap={1}>
                        <Accordion defaultExpanded sx={accordionSx}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography component="span" variant="h5" color={colors.grey[100]} fontWeight="bold">
                                    APPEARANCE
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <MaterialAppearanceForm formData={formData} onChange={handleChange} />
                            </AccordionDetails>
                        </Accordion>
                        <Accordion defaultExpanded sx={accordionSx}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography component="span" variant="h5" color={colors.grey[100]} fontWeight="bold">
                                    VARIANTS
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <MaterialVariantsPanel currentMaterial={formData} />
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default MaterialDetailPage;
