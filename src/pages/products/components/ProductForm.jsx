import React from "react";
import { Grid, TextField, Box, Typography, Divider } from "@mui/material";
import DataTable from "../../../components/DataTable";
import ProductParametersForm from "./ProductParametersForm";
import { ProductParametersStore } from "../ProductParametersStore";

const ProductForm = ({ initialData = {}, onChange }) => {
    const {
        rowIdField,
        columnsDefinition, sampleRow,
        storeOptions, colorOptions, vatOptions,
        createColor, createVat,
    } = ProductParametersStore();

    const [form, setForm] = React.useState(() => {
        const defaults = {
            idProduct: null,
            catalogReference: "",
            name: "",
            brand: "",
            productType: "",
            description: "",
            parameters: [],
            flagActive: true,
        };
        return { ...defaults, ...initialData };
    });

    const handleChange = (field, value) => {
        const updated = { ...form, [field]: value };
        setForm(updated);
        onChange?.(updated);
    };

    const handleParameterUpdate = (updatedParam) => {
        const exists = (form.parameters || []).some((p) => p[rowIdField] === updatedParam[rowIdField]);
        const updatedParameters = exists
            ? (form.parameters || []).map((p) => p[rowIdField] === updatedParam[rowIdField] ? updatedParam : p)
            : [...(form.parameters || []), updatedParam];
        const updated = { ...form, parameters: updatedParameters };
        setForm(updated);
        onChange?.(updated);
    };

    const handleParameterDelete = (id) => {
        const updatedParameters = (form.parameters || []).filter((p) => p[rowIdField] !== id);
        const updated = { ...form, parameters: updatedParameters };
        setForm(updated);
        onChange?.(updated);
    };

    return (
        <Box>
            <Grid container spacing={3}>

                <Grid item xs={6}>
                    <TextField fullWidth label="Catalog Reference" value={form.catalogReference}
                        onChange={(e) => handleChange("catalogReference", e.target.value)} />
                </Grid>

                <Grid item xs={6}>
                    <TextField fullWidth label="Name" value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)} />
                </Grid>

                <Grid item xs={6}>
                    <TextField fullWidth label="Brand" value={form.brand}
                        onChange={(e) => handleChange("brand", e.target.value)} />
                </Grid>

                <Grid item xs={6}>
                    <TextField fullWidth label="Product Type" value={form.productType}
                        onChange={(e) => handleChange("productType", e.target.value)} />
                </Grid>

                <Grid item xs={12}>
                    <TextField fullWidth multiline rows={3} label="Description" value={form.description}
                        onChange={(e) => handleChange("description", e.target.value)} />
                </Grid>

                {/* Parameters DataTable */}
                <Grid item xs={12}>
                    <Divider sx={{ mb: 1 }} />
                    <Typography variant="h6" mb={1}>Product Parameters</Typography>
                    <DataTable
                        gridData={form.parameters}
                        columnsDefinition={columnsDefinition}
                        sampleRow={sampleRow}
                        rowIdField={rowIdField}
                        updateHook={handleParameterUpdate}  // ← local state only, no API call
                        deleteHook={handleParameterDelete}  // ← local state only, no API call
                        allowRowEditOnGrid={false}
                        addRecordComponent={({ initialData: paramInitialData, onChange: paramOnChange }) => (
                            <ProductParametersForm
                                initialData={paramInitialData}
                                onChange={paramOnChange}
                                storeOptions={storeOptions}
                                colorOptions={colorOptions}
                                vatOptions={vatOptions}
                                onCreateColor={(newColor, cb) => createColor(newColor, { onSuccess: cb })}
                                onCreateVat={(newVat, cb) => createVat(newVat, { onSuccess: cb })}
                            />
                        )}
                        editRecordComponent={({ initialData: paramInitialData, onChange: paramOnChange }) => (
                            <ProductParametersForm
                                initialData={paramInitialData}
                                onChange={paramOnChange}
                                storeOptions={storeOptions}
                                colorOptions={colorOptions}
                                vatOptions={vatOptions}
                                onCreateColor={(newColor, cb) => createColor(newColor, { onSuccess: cb })}
                                onCreateVat={(newVat, cb) => createVat(newVat, { onSuccess: cb })}
                            />
                        )}
                    />
                </Grid>

            </Grid>
        </Box>
    );
};

export default ProductForm;