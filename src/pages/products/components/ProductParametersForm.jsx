import React, { useState } from "react";
import { Grid, TextField, Box, Typography, Autocomplete, createFilterOptions, Modal, Paper, Divider, Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Close";

const filter = createFilterOptions();

// ─── Nested "Create Color" modal ───────────────────────────────────────────────
const ColorForm = ({ open, initialName, onConfirm, onCancel }) => {
    const [form, setForm] = React.useState({ colorName: initialName || "", colorCode: "" });

    React.useEffect(() => {
        if (open) setForm({ colorName: initialName || "", colorCode: "" });
    }, [open, initialName]);

    return (
        <Modal open={open} onClose={onCancel}>
            <Paper sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 360, borderRadius: 2, overflow: "hidden" }}>
                <Box sx={{ p: 3 }}>
                    <Typography variant="h6" mb={2}>New Color</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Color Name" value={form.colorName} onChange={(e) => setForm(p => ({ ...p, colorName: e.target.value }))} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Color Code (hex)" value={form.colorCode} onChange={(e) => setForm(p => ({ ...p, colorCode: e.target.value }))} />
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
    colorOptions = [],
    vatOptions = [],
    onCreateColor,
    onCreateVat,
}) => {
    const defaults = {
        idProductParameter: null,
        sku: "",
        size: "",
        imageUrl: "",
        defaultSku: false,
        store: null,
        color: null,
        vat: null,
        price: null,
        flagActive: true,
    };

    const [form, setForm] = React.useState(() => ({ ...defaults, ...initialData }));
    const [colorModalOpen, setColorModalOpen] = useState(false);
    const [vatModalOpen, setVatModalOpen] = useState(false);
    const [pendingColorName, setPendingColorName] = useState("");

    const handleChange = (field, value) => {
        const updated = { ...form, [field]: value };
        setForm(updated);
        onChange?.(updated);
    };

    const handleColorConfirm = (newColor) => {
        onCreateColor?.(newColor, (created) => {
            handleChange("color", created);
        });
        setColorModalOpen(false);
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

                {/* Color Autocomplete with "Create new" */}
                <Grid item xs={12}>
                    <Autocomplete
                        options={colorOptions}
                        getOptionLabel={(o) => {
                            if (typeof o === "string") return o;
                            if (o?.inputValue) return o.inputValue;
                            return o?.colorName ?? "";
                        }}
                        value={form.color}
                        filterOptions={(options, params) => {
                            const filtered = filter(options, params);
                            if (params.inputValue !== "") {
                                filtered.push({ label: `Create "${params.inputValue}"`, inputValue: params.inputValue, isNew: true });
                            }
                            return filtered;
                        }}
                        onChange={(_, value) => {
                            if (value?.isNew) {
                                setPendingColorName(value.inputValue);
                                setColorModalOpen(true);
                            } else {
                                handleChange("color", value);
                            }
                        }}
                        renderOption={(props, option) => (
                            <li {...props} key={option?.idColor ?? option?.inputValue}>
                                {option?.isNew ? <em>{option.label}</em> : option?.colorName}
                            </li>
                        )}
                        renderInput={(params) => <TextField {...params} label="Color" fullWidth />}
                    />
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
                            if (params.inputValue !== "") {
                                filtered.push({ label: `Create "${params.inputValue}"`, inputValue: params.inputValue, isNew: true });
                            }
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
                            <li {...props} key={option?.idVat ?? option?.inputValue}>
                                {option?.isNew ? <em>{option.label}</em> : `${option.country} - ${(option.vatRate * 100).toFixed(0)}%`}
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

            {/* Nested modals */}
            <ColorForm
                open={colorModalOpen}
                initialName={pendingColorName}
                onConfirm={handleColorConfirm}
                onCancel={() => setColorModalOpen(false)}
            />
            <VatForm
                open={vatModalOpen}
                onConfirm={handleVatConfirm}
                onCancel={() => setVatModalOpen(false)}
            />
        </Box>
    );
};

export default ProductParametersForm;