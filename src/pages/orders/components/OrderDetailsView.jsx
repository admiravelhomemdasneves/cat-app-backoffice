import { useState, useEffect } from "react";
import { Box, TextField, Grid, Autocomplete } from "@mui/material";
import DataTable from "../../../components/DataTable";

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
                    />
                </Grid>
                <Grid item xs={6}>
                    <Autocomplete
                        disablePortal
                        value={orderData && orderData.orderStatus && orderData.orderStatus.name ? orderData.orderStatus.name : "Vazio"}
                        options={[{id: -1, label: 'Vazio'}, ...statusOptions]}
                        onChange={(event, value) => {
                            const updatedOrder = { ...orderData, orderStatus: value.value || null };
                            orderUpdateHook(updatedOrder);
                            setOrderData(updatedOrder);
                        }}
                        renderInput={(params) => <TextField {...params} label="Status" variant="outlined" size="small" />}
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
                    />
                </Grid>
                <Grid item xs={6}>
                    <Autocomplete
                        disablePortal
                        value={orderData && orderData.orderPriority && orderData.orderPriority.name ? orderData.orderPriority.name : "Vazio"}
                        options={[{id: -1, label: 'Vazio'}, ...prioritiesOptions]}
                        onChange={(event, value) => {
                            const updatedOrder = { ...orderData, orderPriority: value.value || null };
                            orderUpdateHook(updatedOrder);
                            setOrderData(updatedOrder);
                        }}
                        renderInput={(params) => <TextField {...params} label="Priority" variant="outlined" size="small" />}
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
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        value={(order?.date_due && new Date(order?.date_due).toLocaleDateString("en-GB")) || ""}
                        label="Due Date"
                        variant="outlined"
                        fullWidth
                        size="small"
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