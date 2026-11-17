import React, { useState, useEffect } from "react";
import { Grid, FormControl, InputLabel, Select, MenuItem, Typography, FormControlLabel, Checkbox } from "@mui/material";
import { useGetAccessLevels } from "../../../api/accessLevels/getAccessLevels";
import { useGetPages } from "../../../api/pages/getPages";

const RolePermissionForm = ({ initialData, onChange }) => {
    const { data: accessLevels } = useGetAccessLevels();
    const { data: pages } = useGetPages();
    const isNew = !!initialData?.isNew;
    const isUniversal = !!initialData?.isUniversal;

    const [form, setForm] = useState({
        accessLevelId: initialData?.accessLevelId || "",
        backofficePageId: initialData?.backofficePageId || "",
        canView: initialData?.canView ?? true,
        canCreate: initialData?.canCreate ?? true,
        canEdit: initialData?.canEdit ?? true,
        canDelete: initialData?.canDelete ?? true,
    });

    useEffect(() => {
        setForm({
            accessLevelId: initialData?.accessLevelId || "",
            backofficePageId: initialData?.backofficePageId || "",
            canView: initialData?.canView ?? true,
            canCreate: initialData?.canCreate ?? true,
            canEdit: initialData?.canEdit ?? true,
            canDelete: initialData?.canDelete ?? true,
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
                    {isNew ? "Add Permission Rule" : "Edit Permission Rule"}
                </Typography>
                {isUniversal && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontStyle: "italic" }}>
                        Universal role — read only
                    </Typography>
                )}
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth disabled={!isNew || isUniversal}>
                    <InputLabel>Role</InputLabel>
                    <Select
                        label="Role"
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
            <Grid item xs={12}>
                <FormControl fullWidth disabled={!isNew || isUniversal}>
                    <InputLabel>Page</InputLabel>
                    <Select
                        label="Page"
                        value={form.backofficePageId || ""}
                        onChange={e => handleChange("backofficePageId", e.target.value)}
                    >
                        {(pages || []).map(p => (
                            <MenuItem key={p.id} value={p.id}>
                                {p.name} ({p.path})
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={!!form.canView}
                            onChange={e => handleChange("canView", e.target.checked)}
                            disabled={isUniversal}
                        />
                    }
                    label="Can View"
                />
            </Grid>
            <Grid item xs={6}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={!!form.canCreate}
                            onChange={e => handleChange("canCreate", e.target.checked)}
                            disabled={isUniversal}
                        />
                    }
                    label="Can Create"
                />
            </Grid>
            <Grid item xs={6}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={!!form.canEdit}
                            onChange={e => handleChange("canEdit", e.target.checked)}
                            disabled={isUniversal}
                        />
                    }
                    label="Can Edit"
                />
            </Grid>
            <Grid item xs={6}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={!!form.canDelete}
                            onChange={e => handleChange("canDelete", e.target.checked)}
                            disabled={isUniversal}
                        />
                    }
                    label="Can Delete"
                />
            </Grid>
        </Grid>
    );
};

export default RolePermissionForm;
