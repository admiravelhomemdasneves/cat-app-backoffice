import React from "react";
import { Grid, TextField } from "@mui/material";

const MaterialForm = ({ initialData = {}, onChange }) => {
    const [form, setForm] = React.useState(() => ({
        idMaterial: null,
        name: "",
        description: "",
        category: "",
        cost: "",
        seller: "",
        brand: "",
        parentId: "",
        flagActive: true,
        ...initialData,
    }));

    const handleChange = (field, value) => {
        const updated = { ...form, [field]: value };
        setForm(updated);
        onChange?.(updated);
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={8}>
                <TextField
                    fullWidth
                    label="Name"
                    value={form.name ?? ""}
                    onChange={(e) => handleChange("name", e.target.value)}
                />
            </Grid>

            <Grid item xs={4}>
                <TextField
                    fullWidth
                    label="Category"
                    value={form.category ?? ""}
                    onChange={(e) => handleChange("category", e.target.value)}
                />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    label="Description"
                    value={form.description ?? ""}
                    onChange={(e) => handleChange("description", e.target.value)}
                />
            </Grid>

            <Grid item xs={6}>
                <TextField
                    fullWidth
                    label="Brand"
                    value={form.brand ?? ""}
                    onChange={(e) => handleChange("brand", e.target.value)}
                />
            </Grid>

            <Grid item xs={6}>
                <TextField
                    fullWidth
                    label="Seller"
                    value={form.seller ?? ""}
                    onChange={(e) => handleChange("seller", e.target.value)}
                />
            </Grid>

            <Grid item xs={6}>
                <TextField
                    fullWidth
                    label="Cost"
                    type="number"
                    value={form.cost ?? ""}
                    onChange={(e) => handleChange("cost", e.target.value === "" ? null : Number(e.target.value))}
                    inputProps={{ step: "0.01", min: "0" }}
                />
            </Grid>

            <Grid item xs={6}>
                <TextField
                    fullWidth
                    label="Parent ID"
                    type="number"
                    value={form.parentId ?? ""}
                    onChange={(e) => handleChange("parentId", e.target.value === "" ? null : Number(e.target.value))}
                    helperText="ID of the parent material if this is a variant"
                />
            </Grid>
        </Grid>
    );
};

export default MaterialForm;
