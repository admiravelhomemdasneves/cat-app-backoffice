import React from "react";
import { Grid, TextField, Typography, Select, MenuItem, InputAdornment } from "@mui/material";

const CURRENCY_SYMBOLS = {
    EUR: "€", USD: "$", GBP: "£", JPY: "¥", CHF: "Fr", CAD: "CA$",
    AUD: "A$", CNY: "¥", INR: "₹", BRL: "R$", MXN: "$", SEK: "kr",
    NOK: "kr", DKK: "kr", SGD: "S$", HKD: "HK$", KRW: "₩", ZAR: "R",
    AED: "د.إ", PLN: "zł",
};

const CURRENCIES = Object.keys(CURRENCY_SYMBOLS);

const DEFAULTS = { priceValue: null, currency: "EUR", quantity: 1, quantityMetric: "Unit" };

const PriceQuantityForm = ({ value, onChange }) => {
    const data = { ...DEFAULTS, ...value };

    const handle = (field, val) => onChange({ ...data, [field]: val });

    return (
        <Grid container spacing={2} alignItems="center">
            <Grid item xs={5}>
                <TextField
                    fullWidth
                    label="Price"
                    type="number"
                    inputProps={{ step: "0.01", min: "0" }}
                    value={data.priceValue ?? ""}
                    onChange={(e) => handle("priceValue", e.target.value === "" ? null : Number(e.target.value))}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Select
                                    value={data.currency ?? "EUR"}
                                    onChange={(e) => handle("currency", e.target.value)}
                                    variant="standard"
                                    disableUnderline
                                    renderValue={(val) => CURRENCY_SYMBOLS[val] ?? val}
                                    sx={{ fontSize: "0.85rem", minWidth: 32 }}
                                >
                                    {CURRENCIES.map((c) => (
                                        <MenuItem key={c} value={c} sx={{ fontSize: "0.85rem" }}>
                                            {c} ({CURRENCY_SYMBOLS[c]})
                                        </MenuItem>
                                    ))}
                                </Select>
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <Grid item xs="auto">
                <Typography variant="body2" color="text.secondary" sx={{ userSelect: "none" }}>
                    per
                </Typography>
            </Grid>
            <Grid item xs={3}>
                <TextField
                    fullWidth
                    label="Quantity"
                    type="number"
                    inputProps={{ step: "0.01", min: "0" }}
                    value={data.quantity ?? ""}
                    onChange={(e) => handle("quantity", e.target.value === "" ? null : Number(e.target.value))}
                />
            </Grid>
            <Grid item xs>
                <TextField
                    fullWidth
                    label="Unit"
                    value={data.quantityMetric ?? ""}
                    onChange={(e) => handle("quantityMetric", e.target.value)}
                />
            </Grid>
        </Grid>
    );
};

export default PriceQuantityForm;
