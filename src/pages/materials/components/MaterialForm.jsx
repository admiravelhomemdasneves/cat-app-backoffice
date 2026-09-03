import React from "react";
import { Grid, TextField } from "@mui/material";

const MaterialForm = ({ formData = {}, onChange }) => {
    const handle = (field, value) => onChange({ ...formData, [field]: value });

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Name"
                    value={formData.name ?? ""}
                    onChange={(e) => handle("name", e.target.value)}
                />
            </Grid>

            <Grid item xs={4}>
                <TextField
                    fullWidth
                    label="Category"
                    value={formData.category ?? ""}
                    onChange={(e) => handle("category", e.target.value)}
                />
            </Grid>

            <Grid item xs={4}>
                <TextField
                    fullWidth
                    label="Seller"
                    value={formData.seller ?? ""}
                    onChange={(e) => handle("seller", e.target.value)}
                />
            </Grid>

            <Grid item xs={4}>
                <TextField
                    fullWidth
                    label="Brand"
                    value={formData.brand ?? ""}
                    onChange={(e) => handle("brand", e.target.value)}
                />
            </Grid>
        </Grid>
    );
};

export default MaterialForm;
