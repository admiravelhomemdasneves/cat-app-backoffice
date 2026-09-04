import { useState, useEffect } from "react";
import {
    Typography, Box, TextField, Grid, Autocomplete, useTheme, alpha,
    Accordion, AccordionSummary, AccordionDetails,
    Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, InputAdornment,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DataTable from "../../../components/DataTable";
import ContactForm from "../../contacts/components/ContactForm";
import { tokens } from "../../../theme";

const ADDRESS_DEFAULTS = {
    shippingAddress: { id_address: null, street: "", door_number: "", zip_code: "", city: "", country: "", addressType: "Shipping", flagActive: true },
    billingAddress:  { id_address: null, street: "", door_number: "", zip_code: "", city: "", country: "", addressType: "Billing",  flagActive: true },
};

const formatAddress = (addr) => {
    if (!addr) return "";
    return [addr.street, addr.door_number, addr.zip_code, addr.city, addr.country].filter(Boolean).join(", ");
};

const OrderDetailsView = ({
    order,
    orderUpdateHook,
    contactUpdateHook,
    contactOptions,
    statusOptions,
    prioritiesOptions,
    contentsColumnsDefinition,
    contentsSampleRow,
    contentsRowIdField,
    contentsUpdateHook,
    contentsDeleteHook,
    borderLeft = 1,
    twoColumn = false,
}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [orderData, setOrderData] = useState(order);
    const [orderContents, setOrderContents] = useState([]);

    // Create-new-contact dialog
    const [createContactOpen, setCreateContactOpen] = useState(false);
    const [newContactForm, setNewContactForm] = useState({});

    // Address edit dialog
    const [editingAddress, setEditingAddress] = useState(null); // 'shippingAddress' | 'billingAddress'
    const [addressForm, setAddressForm] = useState({});

    useEffect(() => {
        setOrderData(order);
        setOrderContents(order?.orderContents ?? []);
    }, [order]);

    const contentsSampleRowWithOrder = { ...contentsSampleRow, idOrder: order?.idOrder };

    const accordionSx = {
        backgroundColor: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(4px)",
        "&.Mui-expanded": { margin: "8px 0" },
    };

    const fieldSx = { backgroundColor: alpha(colors.primary[500], 0.6) };

    const handleContactFieldChange = (field, value) => {
        if (!orderData?.contact) return;
        const updated = { ...orderData.contact, [field]: value };
        const updatedOrder = { ...orderData, contact: updated };
        setOrderData(updatedOrder);
        contactUpdateHook?.(updated);
    };

    const handleOpenAddressEdit = (type) => {
        setAddressForm({ ...(orderData?.contact?.[type] ?? ADDRESS_DEFAULTS[type]) });
        setEditingAddress(type);
    };

    const handleSaveAddress = () => {
        const updated = { ...orderData.contact, [editingAddress]: addressForm };
        const updatedOrder = { ...orderData, contact: updated };
        setOrderData(updatedOrder);
        contactUpdateHook?.(updated);
        setEditingAddress(null);
    };

    const handleCreateContact = () => {
        contactUpdateHook?.(newContactForm, {
            onSuccess: (createdContact) => {
                const updatedOrder = { ...orderData, contact: createdContact };
                orderUpdateHook?.(updatedOrder);
                setOrderData(updatedOrder);
                setCreateContactOpen(false);
                setNewContactForm({});
            },
        });
    };

    // ── Sub-sections ────────────────────────────────────────────────────────────

    const orderContentsAccordion = contentsColumnsDefinition ? (
        <Accordion defaultExpanded sx={accordionSx}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography component="span" variant="h5" color={colors.grey[100]} fontWeight="bold">
                    ORDER CONTENTS
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <DataTable
                    gridData={orderContents}
                    columnsDefinition={contentsColumnsDefinition}
                    sampleRow={contentsSampleRowWithOrder}
                    rowIdField={contentsRowIdField}
                    updateHook={contentsUpdateHook}
                    deleteHook={contentsDeleteHook}
                />
            </AccordionDetails>
        </Accordion>
    ) : null;

    const notesAccordion = (
        <Accordion defaultExpanded sx={accordionSx}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography component="span" variant="h5" color={colors.grey[100]} fontWeight="bold">
                    NOTES
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <TextField
                    value={orderData?.description ?? ""}
                    onChange={(e) => {
                        const updatedOrder = { ...orderData, description: e.target.value || null };
                        orderUpdateHook?.(updatedOrder);
                        setOrderData(updatedOrder);
                    }}
                    label="Notes"
                    variant="outlined"
                    fullWidth
                    multiline
                    size="small"
                    rows={4}
                    sx={fieldSx}
                />
            </AccordionDetails>
        </Accordion>
    );

    const orderDetailsAccordion = (
        <Accordion defaultExpanded sx={accordionSx}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography component="span" variant="h5" color={colors.grey[100]} fontWeight="bold">
                    ORDER DETAILS
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Autocomplete
                            value={orderData?.status?.name ?? "Vazio"}
                            getOptionKey={(option) => typeof option === "string" ? option : option.id}
                            options={[{ id: -1, label: 'Vazio' }, ...statusOptions]}
                            onChange={(_, value) => {
                                const updatedOrder = { ...orderData, status: value?.value || null };
                                orderUpdateHook?.(updatedOrder);
                                setOrderData(updatedOrder);
                            }}
                            renderInput={(params) => {
                                const statusColor = orderData?.status?.colorCode ?? alpha(colors.primary[500], 0.6);
                                return <TextField {...params} label="Status" variant="outlined" size="small" sx={{ backgroundColor: statusColor, borderRadius: 1 }} />;
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Autocomplete
                            value={orderData?.priority?.name ?? "Vazio"}
                            getOptionKey={(option) => typeof option === "string" ? option : option.id}
                            options={[{ id: -1, label: 'Vazio' }, ...prioritiesOptions]}
                            onChange={(_, value) => {
                                const updatedOrder = { ...orderData, priority: value?.value || null };
                                orderUpdateHook?.(updatedOrder);
                                setOrderData(updatedOrder);
                            }}
                            renderInput={(params) => {
                                const priorityColor = orderData?.priority?.colorCode ?? alpha(colors.primary[500], 0.6);
                                return <TextField {...params} label="Priority" variant="outlined" size="small" sx={{ backgroundColor: priorityColor, borderRadius: 1 }} />;
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            value={(order?.dateRequested && new Date(order.dateRequested).toISOString().split("T")[0]) ?? ""}
                            label="Creation Date"
                            variant="outlined"
                            type="date"
                            fullWidth
                            size="small"
                            disabled
                            sx={fieldSx}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            value={(orderData?.dateDue && new Date(orderData.dateDue).toISOString().split("T")[0]) || ""}
                            onChange={(e) => {
                                const updatedOrder = { ...orderData, dateDue: e.target.value };
                                orderUpdateHook?.(updatedOrder);
                                setOrderData(updatedOrder);
                            }}
                            label="Due Date"
                            type="date"
                            variant="outlined"
                            fullWidth
                            size="small"
                            sx={fieldSx}
                        />
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    );

    const enrichedContactOptions = [
        { id: "create-new", label: "＋ Create new contact" },
        { id: -1, label: 'Vazio' },
        ...(contactOptions ?? []),
    ];

    const clientDetailsAccordion = (
        <Accordion defaultExpanded sx={accordionSx}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography component="span" variant="h5" color={colors.grey[100]} fontWeight="bold">
                    CLIENT DETAILS
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Autocomplete
                            value={`${orderData?.contact?.firstName ?? ""} ${orderData?.contact?.lastName ?? ""}`.trim() || "Vazio"}
                            getOptionKey={(option) => typeof option === "string" ? option : option.id}
                            options={enrichedContactOptions}
                            onChange={(_, value) => {
                                if (value?.id === "create-new") {
                                    setNewContactForm({});
                                    setCreateContactOpen(true);
                                    return;
                                }
                                const updatedOrder = { ...orderData, contact: value?.value ?? null };
                                orderUpdateHook?.(updatedOrder);
                                setOrderData(updatedOrder);
                            }}
                            renderInput={(params) => <TextField {...params} label="Client" variant="outlined" size="small" />}
                            sx={fieldSx}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            value={orderData?.contact?.nif ?? ""}
                            onChange={(e) => handleContactFieldChange("nif", e.target.value)}
                            label="NIF"
                            variant="outlined"
                            fullWidth
                            size="small"
                            sx={fieldSx}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            value={orderData?.contact?.phoneNumber ?? ""}
                            onChange={(e) => handleContactFieldChange("phoneNumber", e.target.value)}
                            label="Phone Number"
                            variant="outlined"
                            fullWidth
                            size="small"
                            sx={fieldSx}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            value={orderData?.contact?.email ?? ""}
                            onChange={(e) => handleContactFieldChange("email", e.target.value)}
                            label="Email"
                            variant="outlined"
                            fullWidth
                            size="small"
                            sx={fieldSx}
                        />
                    </Grid>
                    {/* Shipping Address */}
                    <Grid item xs={12}>
                        <TextField
                            label="Shipping Address"
                            value={formatAddress(orderData?.contact?.shippingAddress)}
                            variant="outlined"
                            size="small"
                            fullWidth
                            disabled
                            InputProps={{
                                readOnly: true,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton size="small" onClick={() => handleOpenAddressEdit("shippingAddress")}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={fieldSx}
                        />
                    </Grid>
                    {/* Billing Address */}
                    <Grid item xs={12}>
                        <TextField
                            label="Billing Address"
                            value={formatAddress(orderData?.contact?.billingAddress)}
                            variant="outlined"
                            size="small"
                            fullWidth
                            disabled
                            InputProps={{
                                readOnly: true,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton size="small" onClick={() => handleOpenAddressEdit("billingAddress")}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={fieldSx}
                        />
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    );

    // ── Address edit dialog ──────────────────────────────────────────────────────

    const addressDialog = (
        <Dialog open={!!editingAddress} onClose={() => setEditingAddress(null)} maxWidth="sm" fullWidth>
            <DialogTitle>
                Edit {editingAddress === "shippingAddress" ? "Shipping" : "Billing"} Address
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2} mt={0}>
                    <Grid item xs={8}>
                        <TextField fullWidth label="Street" size="small" value={addressForm.street ?? ""}
                            onChange={(e) => setAddressForm(f => ({ ...f, street: e.target.value }))} />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField fullWidth label="Door Number" size="small" value={addressForm.door_number ?? ""}
                            onChange={(e) => setAddressForm(f => ({ ...f, door_number: e.target.value }))} />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField fullWidth label="Zip Code" size="small" value={addressForm.zip_code ?? ""}
                            onChange={(e) => setAddressForm(f => ({ ...f, zip_code: e.target.value }))} />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField fullWidth label="City" size="small" value={addressForm.city ?? ""}
                            onChange={(e) => setAddressForm(f => ({ ...f, city: e.target.value }))} />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField fullWidth label="Country" size="small" value={addressForm.country ?? ""}
                            onChange={(e) => setAddressForm(f => ({ ...f, country: e.target.value }))} />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setEditingAddress(null)}>Cancel</Button>
                <Button variant="contained" onClick={handleSaveAddress}>Save</Button>
            </DialogActions>
        </Dialog>
    );

    // ── Create contact dialog ────────────────────────────────────────────────────

    const createContactDialog = (
        <Dialog open={createContactOpen} onClose={() => setCreateContactOpen(false)} maxWidth="md" fullWidth>
            <DialogTitle>Create New Contact</DialogTitle>
            <DialogContent>
                <Box mt={1}>
                    <ContactForm initialData={newContactForm} onChange={setNewContactForm} />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setCreateContactOpen(false)}>Cancel</Button>
                <Button variant="contained" onClick={handleCreateContact}>Save</Button>
            </DialogActions>
        </Dialog>
    );

    // ── Layout ───────────────────────────────────────────────────────────────────

    return (
        <Box p={2} borderLeft={borderLeft} borderColor="divider">
            {twoColumn ? (
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Box display="flex" flexDirection="column" gap={1}>
                            {orderContentsAccordion}
                            {notesAccordion}
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box display="flex" flexDirection="column" gap={1}>
                            {orderDetailsAccordion}
                            {clientDetailsAccordion}
                        </Box>
                    </Grid>
                </Grid>
            ) : (
                <Box display="flex" flexDirection="column" gap={1}>
                    {orderDetailsAccordion}
                    {clientDetailsAccordion}
                    {orderContentsAccordion}
                    {notesAccordion}
                </Box>
            )}
            {addressDialog}
            {createContactDialog}
        </Box>
    );
};

export default OrderDetailsView;
