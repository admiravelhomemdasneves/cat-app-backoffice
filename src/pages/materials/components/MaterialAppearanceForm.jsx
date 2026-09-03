import React from "react";
import { Box, Grid, TextField, FormControlLabel, Checkbox, Autocomplete } from "@mui/material";
import { useGetMaterials } from "../../../api/materials/getMaterials";
import MaterialImageGallery from "./MaterialImageGallery";

const MaterialAppearanceForm = ({ formData = {}, onChange }) => {
    const [isVariant, setIsVariant] = React.useState(() => formData?.parentId != null);

    const { data: allMaterials } = useGetMaterials();

    const parentOptions = React.useMemo(() => {
        if (!allMaterials) return [];
        return allMaterials.filter(
            (m) => m.parentId == null && m.idMaterial !== formData.idMaterial
        );
    }, [allMaterials, formData.idMaterial]);

    const selectedParent = parentOptions.find((m) => m.idMaterial === formData.parentId) ?? null;

    const handleVariantToggle = (checked) => {
        setIsVariant(checked);
        if (!checked) {
            onChange({ ...formData, parentId: null });
        }
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <MaterialImageGallery
                    images={formData.images ?? []}
                    materialId={formData.idMaterial}
                    onImageUploaded={(newImage) =>
                        onChange({ ...formData, images: [...(formData.images ?? []), newImage] })
                    }
                    onImageDeleted={(deletedId) =>
                        onChange({ ...formData, images: (formData.images ?? []).filter(img => img.idMaterialImage !== deletedId) })
                    }
                />
            </Grid>

            <Grid item xs={4} display="flex" alignItems="center">
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isVariant}
                            onChange={(e) => handleVariantToggle(e.target.checked)}
                        />
                    }
                    label="Is a variant"
                />
            </Grid>

            <Grid item xs={8}>
                <Autocomplete
                    options={parentOptions}
                    getOptionLabel={(option) => option.name ?? ""}
                    value={isVariant ? selectedParent : null}
                    onChange={(_, selected) => onChange({ ...formData, parentId: selected?.idMaterial ?? null })}
                    isOptionEqualToValue={(option, value) => option.idMaterial === value?.idMaterial}
                    disabled={!isVariant}
                    freeSolo={false}
                    renderOption={(props, option) => {
                        const thumb = option.images?.[0]?.imageUrl;
                        return (
                            <Box component="li" {...props} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Box
                                    sx={{
                                        width: 32,
                                        height: 32,
                                        flexShrink: 0,
                                        borderRadius: 0.5,
                                        backgroundColor: "action.hover",
                                        backgroundImage: thumb ? `url(${thumb})` : "none",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                />
                                {option.name ?? ""}
                            </Box>
                        );
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Parent Material" fullWidth />
                    )}
                />
            </Grid>
        </Grid>
    );
};

export default MaterialAppearanceForm;
