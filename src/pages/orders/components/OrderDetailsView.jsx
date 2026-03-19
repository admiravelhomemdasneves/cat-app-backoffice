import { useState, useEffect } from "react";
import { Typography, Box, TextField, Grid, Autocomplete, useTheme, alpha, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
    const [description, setDescription] = useState(order?.description ?? "");

    useEffect(() => {
        setOrderData(order);
        setProducts(order?.orderItems ?? []);
    }, [order]);

    const sampleRowWithOrder = {
        ...sampleRow,
        idOrder: order?.idOrder
    };
    
    return (
        <Box p={2}
            borderLeft={1} 
            borderColor="divider"
        >
            <Accordion defaultExpanded sx={{backgroundColor: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(4px)"}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                    <Typography component="span" variant="h5" color={colors.grey[100]} fontWeight="bold">
                        ORDER DETAILS
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Autocomplete
                                value={orderData && orderData.status && orderData.status.name ? orderData.status.name : "Vazio"}
                                options={[{id: -1, label: 'Vazio'}, ...statusOptions]}
                                onChange={(event, value) => {
                                    const updatedOrder = { ...orderData, status: value?.value || {id: -1, label: 'Vazio'} };
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
                                value={orderData && orderData.priority && orderData.priority.name ? orderData.priority.name : "Vazio"}
                                options={[{id: -1, label: 'Vazio'}, ...prioritiesOptions]}
                                onChange={(event, value) => {
                                    const updatedOrder = { ...orderData, priority: value?.value || {id: -1, label: 'Vazio'} };
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
                                value={order?.dateRequested && new Date(order?.dateRequested).toLocaleDateString("en-GB")}
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
                                value={(orderData?.dateDue && new Date(orderData?.dateDue).toISOString().split("T")[0]) || ""}
                                onChange={(e) => {
                                    const updatedOrder = { ...orderData, dateDue: e.target?.value }
                                    orderUpdateHook(updatedOrder);
                                    setOrderData(updatedOrder);
                                }}
                                label="Due Date"
                                type="date"
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
                                value={orderData?.description}
                                onChange={(e) => {
                                    const updatedOrder = { ...orderData, description: e.target?.value || null}
                                    orderUpdateHook(updatedOrder);
                                    setOrderData(updatedOrder);
                                }}
                                label="Notes"
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
                    </Grid>
                </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded sx={{backgroundColor: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(4px)"}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                    <Typography component="span" variant="h5" color={colors.grey[100]} fontWeight="bold">
                        CLIENT DETAILS
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Autocomplete
                                value={`${orderData?.contact?.firstName ?? ""} ${orderData?.contact?.lastName ?? ""}`.trim() || "Vazio"}
                                options={[{id: -1, label: 'Vazio'}, ...contactOptions]}
                                onChange={(event, value) => {
                                    const updatedOrder = { ...orderData, contact: value?.value || {id: -1, label: 'Vazio'} };
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
                            <TextField
                                value={`${orderData?.contact?.nif}` || "Vazio"}
                                label="NIF"
                                variant="outlined"
                                fullWidth
                                disabled
                                size="small"
                                sx={{
                                    backgroundColor: alpha(colors.primary[500], 0.6)
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                value={`${orderData?.contact?.phoneNumber}` || "Vazio"}
                                label="Phone Number"
                                variant="outlined"
                                fullWidth
                                disabled
                                size="small"
                                sx={{
                                    backgroundColor: alpha(colors.primary[500], 0.6)
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                value={`${orderData?.contact?.email}` || "Vazio"}
                                label="Email"
                                variant="outlined"
                                fullWidth
                                disabled
                                size="small"
                                sx={{
                                    backgroundColor: alpha(colors.primary[500], 0.6)
                                }}
                            />
                        </Grid>

                        {
                            orderData?.contact?.shippingAddress &&
                                <Grid item xs={12} key={orderData?.contact?.shippingAddress.id_address}>
                                    <TextField
                                    label={`${orderData?.contact?.shippingAddress.addressType} Address` || "Address"}
                                    value={`${orderData?.contact?.shippingAddress.street}, ${orderData?.contact?.shippingAddress.door_number}, ${orderData?.contact?.shippingAddress.zip_code}, ${orderData?.contact?.shippingAddress.city}, ${orderData?.contact?.shippingAddress.country}`.trim() || "Address"}
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    disabled
                                    InputProps={{ readOnly: true }}
                                    sx={{
                                        backgroundColor: alpha(colors.primary[500], 0.6)
                                    }}
                                    />
                                </Grid>
                        }

                        {
                            orderData?.contact?.billingAddress &&
                                <Grid item xs={12} key={orderData?.contact?.billingAddress.id_address}>
                                    <TextField
                                    label={`${orderData?.contact?.billingAddress.addressType} Address` || "Address"}
                                    value={`${orderData?.contact?.billingAddress.street}, ${orderData?.contact?.billingAddress.door_number}, ${orderData?.contact?.billingAddress.zip_code}, ${orderData?.contact?.billingAddress.city}, ${orderData?.contact?.billingAddress.country}`.trim() || "Address"}
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    disabled
                                    InputProps={{ readOnly: true }}
                                    sx={{
                                        backgroundColor: alpha(colors.primary[500], 0.6)
                                    }}
                                    />
                                </Grid>
                        }
                    </Grid>
                </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded sx={{backgroundColor: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(4px)"}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                    <Typography component="span" variant="h5" color={colors.grey[100]} fontWeight="bold">
                        PRODUCTS DETAILS
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <DataTable
                                gridData={products}
                                columnsDefinition={columnsDefinition}
                                sampleRow={sampleRowWithOrder}
                                rowIdField={rowIdField}
                                updateHook={productUpdateHook}
                                deleteHook={productDeleteHook}
                            />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default OrderDetailsView;