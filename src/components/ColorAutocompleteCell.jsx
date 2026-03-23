import React, { useState, useRef } from "react";
import { Autocomplete, TextField, Box, Modal, Paper, Divider, Button, Grid, Typography, InputAdornment, IconButton, createFilterOptions } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Close";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";

const filter = createFilterOptions();

const ColorForm = ({ open, initialName, onConfirm, onCancel, colorOptions = [] }) => {
    const [form, setForm] = React.useState({ colorName: initialName || "", colorCode: "", colorFunction: "" });
    const colorInputRef = useRef(null);

    // Derive distinct colorFunction options from existing colors
    const colorFunctionOptions = [...new Set(
        colorOptions
            .map(c => c.colorFunction)
            .filter(Boolean)
    )];

    React.useEffect(() => {
        if (open) setForm({ colorName: initialName || "", colorCode: "", colorFunction: "" });
    }, [open, initialName]);

    return (
        <Modal open={open} onClose={onCancel}>
            <Paper sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 360, borderRadius: 2, overflow: "hidden" }}>
                <Box sx={{ p: 3 }}>
                    <Typography variant="h6" mb={2}>New Color</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Color Name"
                                value={form.colorName}
                                onChange={(e) => setForm(p => ({ ...p, colorName: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <input
                                ref={colorInputRef}
                                type="color"
                                value={form.colorCode || "#ffffff"}
                                onChange={(e) => setForm(p => ({ ...p, colorCode: e.target.value }))}
                                style={{ position: "relative", opacity: 0, pointerEvents: "none", width: 0, height: 0, left: "335px", top: "50%" }}
                            />
                            <TextField
                                fullWidth
                                label="Color Code (hex)"
                                value={form.colorCode}
                                onChange={(e) => setForm(p => ({ ...p, colorCode: e.target.value }))}
                                InputProps={{
                                    startAdornment: form.colorCode && (
                                        <InputAdornment position="start">
                                            <Box sx={{ width: 20, height: 20, borderRadius: "4px", backgroundColor: form.colorCode, border: "1px solid rgba(0,0,0,0.2)" }} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => colorInputRef.current.click()} edge="end">
                                                <FormatColorFillIcon sx={{ color: form.colorCode || "inherit" }} />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                freeSolo
                                options={colorFunctionOptions}
                                value={form.colorFunction}
                                onInputChange={(_, newValue) => setForm(p => ({ ...p, colorFunction: newValue }))}
                                renderInput={(params) => (
                                    <TextField {...params} fullWidth label="Color Function" />
                                )}
                            />
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

const ColorAutocompleteCell = ({ value, onChange, colorOptions = [], onCreateColor }) => {
    const [colorModalOpen, setColorModalOpen] = useState(false);
    const [pendingColorName, setPendingColorName] = useState("");

    return (
        <>
            <Autocomplete
                fullWidth
                value={value ?? null}
                options={[
                    { isNew: true, colorName: "Create new color", inputValue: "", colorFunction: "\x00" }, // ← sorts before everything
                    ...[...colorOptions].sort((a, b) => {
                        const fa = a.colorFunction ?? "";
                        const fb = b.colorFunction ?? "";
                        return fa.localeCompare(fb);
                    })
                ]}
                groupBy={(option) => option.isNew ? "" : option.colorFunction ?? "No Function"}
                filterOptions={(options, params) => {
                    // Filter only the real color options, keep isNew always
                    const newOption = options.find(o => o.isNew);
                    const rest = options.filter(o => !o.isNew);
                    const filtered = filter(rest, params);
                    return [newOption, ...filtered];
                }}
                getOptionLabel={(o) => {
                    if (typeof o === "string") return o;
                    if (o?.inputValue) return o.inputValue;
                    return o?.colorName ?? "";
                }}
                isOptionEqualToValue={(option, val) => option.idColor === val?.idColor}
                onChange={(_, newValue) => {
                    if (newValue?.isNew) {
                        setPendingColorName(newValue.inputValue);
                        setColorModalOpen(true);
                    } else {
                        onChange(newValue);
                    }
                }}
                renderOption={(props, option) => (
                    <li {...props} key={option?.idColor ?? "create-color"}>
                        {option?.isNew
                            ? <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "primary.main" }}>
                                <AddIcon fontSize="small" /> Create new color
                              </Box>
                            : <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                <Box sx={{
                                    width: 16, height: 16, borderRadius: "3px",
                                    backgroundColor: option?.colorCode || "transparent",
                                    border: "1px solid rgba(0,0,0,0.2)",
                                    flexShrink: 0,
                                }} />
                                {option?.colorName}
                              </Box>
                        }
                    </li>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        size="small"
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: value?.colorCode ? (
                                <InputAdornment position="start">
                                    <Box sx={{ width: 16, height: 16, borderRadius: "3px", backgroundColor: value.colorCode, border: "1px solid rgba(0,0,0,0.2)" }} />
                                </InputAdornment>
                            ) : null,
                        }}
                    />
                )}
                componentsProps={{
                    paper: {
                        sx: {
                            "& .MuiAutocomplete-groupLabel": {
                                fontWeight: "bold",
                                fontSize: 11,
                                textTransform: "uppercase",
                                color: "text.secondary",
                                backgroundColor: "action.hover",
                                lineHeight: "1.2",      // ← tighter line height
                                paddingTop: 1,      // ← reduce top padding
                                paddingBottom: 1,   // ← reduce bottom padding
                            },
                            "& .MuiAutocomplete-groupLabel:empty": {
                                display: "none",  // ← hides the empty group header
                                padding: 0,
                                minHeight: 0,
                            },
                            "& .MuiAutocomplete-groupUl": {
                                padding: 1,
                            },
                        }
                    }
                }}
            />
            <ColorForm
                open={colorModalOpen}
                initialName={pendingColorName}
                colorOptions={colorOptions}  // ← pass it down
                onConfirm={(newColor) => {
                    onCreateColor?.(newColor, (created) => onChange(created));
                    setColorModalOpen(false);
                }}
                onCancel={() => setColorModalOpen(false)}
            />
        </>
    );
};

export default ColorAutocompleteCell;