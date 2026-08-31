import React, { useState, useEffect } from "react";
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Typography } from "@mui/material";
import { useGetAccessLevels } from "../../../api/accessLevels/getAccessLevels";

const ColaboratorForm = ({ initialData, onChange }) => {
    const { data: accessLevels } = useGetAccessLevels();
    const isNew = !!initialData?.isNew;

    const [form, setForm] = useState({
        username: initialData?.username || "",
        email: initialData?.email || "",
        password: "",
        accessLevelId: initialData?.accessLevelId || "",
    });

    useEffect(() => {
        setForm({
            username: initialData?.username || "",
            email: initialData?.email || "",
            password: "",
            accessLevelId: initialData?.accessLevelId || "",
        });
    }, [initialData?.id]);

    const handleChange = (field, value) => {
        const updated = { ...form, [field]: value };
        setForm(updated);
        onChange(updated);
    };

    return (
        <Grid container spacing={2} sx={{ minWidth: 380 }}>
            <Grid item xs={12}>
                <Typography variant="h6" fontWeight="bold" mb={1}>
                    {isNew ? "Add Colaborator" : "Edit Colaborator"}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth label="Username"
                    value={form.username}
                    onChange={e => handleChange("username", e.target.value)}
                    InputProps={{ readOnly: !isNew }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth label="Email" type="email"
                    value={form.email}
                    onChange={e => handleChange("email", e.target.value)}
                    InputProps={{ readOnly: !isNew }}
                />
            </Grid>
            {isNew && (
                <Grid item xs={12}>
                    <TextField
                        fullWidth label="Temporary Password" type="password"
                        value={form.password}
                        onChange={e => handleChange("password", e.target.value)}
                    />
                </Grid>
            )}
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel>Access Level</InputLabel>
                    <Select
                        label="Access Level"
                        value={form.accessLevelId || ""}
                        onChange={e => handleChange("accessLevelId", e.target.value)}
                    >
                        {(accessLevels || []).map(al => (
                            <MenuItem key={al.idAccessLevel} value={al.idAccessLevel}>
                                {al.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default ColaboratorForm;
