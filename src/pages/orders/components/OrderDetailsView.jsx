import { useState, useEffect } from "react";
import { Box, TextField, Grid, Autocomplete, useTheme, alpha } from "@mui/material";
import DataTable from "../../../components/DataTable";
import { tokens } from "../../../theme";

const OrderDetailsView = ({ 
    order, 
    columnsDefinition, 
    sampleRow, 
    rowIdField,
    orderUpdateHook,
    productUpdateHook, 
    productDeleteHook, 
    contactOptions, 
    statusOptions, 
    prioritiesOptions 
}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [orderData, setOrderData] = useState(order);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setOrderData(order);
        setProducts(order?.orderProducts ?? []);
    }, [order]);

    const handleProductUpdate = (row) => {
        const updatedRow = { ...row, order: { id_order: order.id_order } };
        productUpdateHook(updatedRow);
    };

    return (
        <Box p={2}
            borderLeft={1} 
            borderColor="divider"
        >
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        value={order && order.name ? order.name : ""}
                        label="Title"
                        variant="outlined"
                        fullWidth
                        size="small"
                        sx={{
                            backgroundColor: alpha(colors.primary[500], 0.6)
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Autocomplete
                        disablePortal
                        value={orderData && orderData.status && orderData.status.name ? orderData.status.name : "Vazio"}
                        options={[{id: -1, label: 'Vazio'}, ...statusOptions]}
                        onChange={(event, value) => {
                            const updatedOrder = { ...orderData, status: value.value || null };
                            orderUpdateHook(updatedOrder);
                            setOrderData(updatedOrder);
                        }}
                        renderInput={(params) => {
                            const statusColor = orderData?.status?.color ? orderData.status.color : alpha(colors.primary[500], 0.6);

                            return (
                                <TextField
                                    {...params}
                                    label="Status"
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        backgroundColor: statusColor,
                                        borderRadius: 1
                                    }}
                                />
                            );
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Autocomplete
                        disablePortal
                        value={orderData && orderData.contact && orderData.contact.first_name ? orderData.contact.first_name : "Vazio"}
                        options={[{id: -1, label: 'Vazio'}, ...contactOptions]}
                        onChange={(event, value) => {
                            const updatedOrder = { ...orderData, contact: value.value || null };
                            orderUpdateHook(updatedOrder);
                            setOrderData(updatedOrder);
                        }}
                        renderInput={(params) => <TextField {...params} label="Client" variant="outlined" size="small" />}
                        sx={{
                            backgroundColor: alpha(colors.primary[500], 0.6)
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Autocomplete
                        disablePortal
                        value={orderData && orderData.priority && orderData.priority.name ? orderData.priority.name : "Vazio"}
                        options={[{id: -1, label: 'Vazio'}, ...prioritiesOptions]}
                        onChange={(event, value) => {
                            const updatedOrder = { ...orderData, priority: value.value || null };
                            orderUpdateHook(updatedOrder);
                            setOrderData(updatedOrder);
                        }}
                        renderInput={(params) => {
                            const priorityColor = orderData?.priority?.color ? orderData.priority.color : alpha(colors.primary[500], 0.6);

                            return (
                                <TextField
                                    {...params}
                                    label="Priority"
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        backgroundColor: priorityColor,
                                        borderRadius: 1
                                    }}
                                />
                            );
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        value={order?.date_requested && new Date(order?.date_requested).toLocaleDateString("en-GB")}
                        label="Creation Date"
                        variant="outlined"
                        fullWidth
                        size="small"
                        disabled
                        sx={{
                            backgroundColor: alpha(colors.primary[500], 0.6)
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        value={(order?.date_due && new Date(order?.date_due).toLocaleDateString("en-GB")) || ""}
                        label="Due Date"
                        //type="date"
                        variant="outlined"
                        fullWidth
                        size="small"
                        sx={{
                            backgroundColor: alpha(colors.primary[500], 0.6)
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        value={order?.description}
                        label="Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        size="small"
                        rows={4}
                        sx={{
                            backgroundColor: alpha(colors.primary[500], 0.6)
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <DataTable
                        gridData={products}
                        columnsDefinition={columnsDefinition}
                        sampleRow={sampleRow}
                        rowIdField={rowIdField}
                        updateHook={handleProductUpdate}
                        deleteHook={productDeleteHook}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default OrderDetailsView;