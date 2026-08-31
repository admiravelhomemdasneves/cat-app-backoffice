import React, { useState } from "react";
import { Grid, TextField, Box, Typography, Autocomplete, createFilterOptions, Modal, Paper, Divider, Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import ColorPickerCell from "../../../components/ColorPickerCell";

const filter = createFilterOptions();

// ─── Nested "Create VAT" modal ─────────────────────────────────────────────────
const VatForm = ({ open, onConfirm, onCancel }) => {
    const [form, setForm] = React.useState({ country: "", vatRate: "" });

    React.useEffect(() => {
        if (open) setForm({ country: "", vatRate: "" });
    }, [open]);

    return (
        <Modal open={open} onClose={onCancel}>
            <Paper sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 360, borderRadius: 2, overflow: "hidden" }}>
                <Box sx={{ p: 3 }}>
                    <Typography variant="h6" mb={2}>New VAT</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Country" value={form.country} onChange={(e) => setForm(p => ({ ...p, country: e.target.value }))} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="VAT Rate (e.g. 0.23)" type="number" value={form.vatRate} onChange={(e) => setForm(p => ({ ...p, vatRate: e.target.value }))} />
                        </Grid>
                    </Grid>
                </Box>
                <Divider />
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, p: 2 }}>
                    <Button variant="outlined" startIcon={<CancelIcon />} onClick={onCancel}>Cancel</Button>
                    <Button variant="contained" startIcon={<CheckIcon />} onClick={() => onConfirm(form)}>Confirm</Button>
                </Box>
            </Paper>
        </Modal>
    );
};

// ─── Main ProductParametersForm ────────────────────────────────────────────────
const ProductParametersForm = ({
    initialData = {},
    onChange,
    storeOptions = [],
    vatOptions = [],
    onCreateVat,
}) => {
    const defaults = {
        idProductParameter: null,
        sku: "",
        size: "",
        imageUrl: "",
        defaultSku: false,
        store: null,
        colorName: "",
        colorCode: null,
        vat: null,
        price: null,
        flagActive: true,
    };

    const [form, setForm] = React.useState(() => ({ ...defaults, ...initialData }));
    const [vatModalOpen, setVatModalOpen] = useState(false);

    const handleChange = (field, value) => {
        const updated = { ...form, [field]: value };
        setForm(updated);
        onChange?.(updated);
    };

    const handleVatConfirm = (newVat) => {
        onCreateVat?.(newVat, (created) => {
            handleChange("vat", created);
        });
        setVatModalOpen(false);
    };

    return (
        <Box>
            <Grid container spacing={3}>

                {/* SKU + Size */}
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="SKU"
                        value={form.sku}
                        onChange={(e) => handleChange("sku", e.target.value)}
                    />
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Size"
                        value={form.size}
                        onChange={(e) => handleChange("size", e.target.value)}
                    />
                </Grid>

                {/* Store Autocomplete */}
                <Grid item xs={12}>
                    <Autocomplete
                        options={storeOptions}
                        getOptionLabel={(o) => o?.name ?? ""}
                        value={form.store}
                        onChange={(_, value) => handleChange("store", value)}
                        renderInput={(params) => <TextField {...params} label="Store" fullWidth />}
                    />
                </Grid>

                {/* Color: name + picker side by side */}
                <Grid item xs={8}>
                    <TextField
                        fullWidth
                        label="Color Name"
                        value={form.colorName ?? ""}
                        onChange={(e) => handleChange("colorName", e.target.value)}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>Color</Typography>
                        <ColorPickerCell
                            value={form.colorCode}
                            onChange={(hex) => handleChange("colorCode", hex)}
                        />
                    </Box>
                </Grid>

                {/* VAT Autocomplete with "Create new" */}
                <Grid item xs={12}>
                    <Autocomplete
                        options={vatOptions}
                        getOptionLabel={(o) => {
                            if (o?.inputValue) return o.inputValue;
                            return o?.country ? `${o.country} - ${(o.vatRate * 100).toFixed(0)}%` : "";
                        }}
                        value={form.vat}
                        filterOptions={(options, params) => {
                            const filtered = filter(options, params);
                            filtered.unshift({ isNew: true, inputValue: "" });
                            return filtered;
                        }}
                        onChange={(_, value) => {
                            if (value?.isNew) {
                                setVatModalOpen(true);
                            } else {
                                handleChange("vat", value);
                            }
                        }}
                        renderOption={(props, option) => (
                            <li {...props} key={option?.idVat ?? "create-vat"}>
                                {option?.isNew
                                    ? <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "primary.main" }}>
                                        <AddIcon fontSize="small" /> Create new VAT
                                    </Box>
                                    : `${option.country} - ${(option.vatRate * 100).toFixed(0)}%`
                                }
                            </li>
                        )}
                        renderInput={(params) => <TextField {...params} label="VAT" fullWidth />}
                    />
                </Grid>

                {/* Image URL */}
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Image URL"
                        value={form.imageUrl}
                        onChange={(e) => handleChange("imageUrl", e.target.value)}
                    />
                </Grid>

                {/* Default SKU */}
                <Grid item xs={12}>
                    <Autocomplete
                        options={[{ label: "Yes", value: true }, { label: "No", value: false }]}
                        getOptionLabel={(o) => o?.label ?? ""}
                        value={form.defaultSku === true ? { label: "Yes", value: true } : { label: "No", value: false }}
                        onChange={(_, value) => handleChange("defaultSku", value?.value ?? false)}
                        renderInput={(params) => <TextField {...params} label="Default SKU" fullWidth />}
                    />
                </Grid>

            </Grid>

            <VatForm
                open={vatModalOpen}
                onConfirm={handleVatConfirm}
                onCancel={() => setVatModalOpen(false)}
            />
        </Box>
    );
};

export default ProductParametersForm;
