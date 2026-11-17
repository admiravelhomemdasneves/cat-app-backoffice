import { useState, useEffect } from "react";
import {
    Typography, Box, TextField, Grid, Autocomplete, useTheme, alpha,
    Accordion, AccordionSummary, AccordionDetails,
    Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, InputAdornment,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { VAT_COUNTRY_RATES } from '../../../constants/vatRates';
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
    recalculateHook,
    borderLeft = 1,
    twoColumn = false,
}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [orderData, setOrderData] = useState(order);
    const [orderContents, setOrderContents] = useState([]);
    const [vatRateInput, setVatRateInput] = useState(() => order?.vatRate != null ? String(order.vatRate) : "");
    const [editingBillAddress, setEditingBillAddress] = useState(false);
    const [billAddressForm, setBillAddressForm] = useState({ street: "", door_number: "", zip_code: "", city: "", country: "" });

    // Create-new-contact dialog
    const [createContactOpen, setCreateContactOpen] = useState(false);
    const [newContactForm, setNewContactForm] = useState({});

    // Address edit dialog
    const [editingAddress, setEditingAddress] = useState(null); // 'shippingAddress' | 'billingAddress'
    const [addressForm, setAddressForm] = useState({});

    useEffect(() => {
        setOrderData(order);
        setOrderContents(order?.orderContents ?? []);
        setVatRateInput(order?.vatRate != null ? String(order.vatRate) : "");
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

    const handleOpenBillAddressEdit = () => {
        const existing = orderData?.billAddress ?? "";
        const parts = existing.split(", ");
        setBillAddressForm({
            street:      parts[0] ?? "",
            door_number: parts[1] ?? "",
            zip_code:    parts[2] ?? "",
            city:        parts[3] ?? "",
            country:     parts[4] ?? "",
        });
        setEditingBillAddress(true);
    };

    const handleSaveBillAddress = () => {
        const formatted = [
            billAddressForm.street ?? "",
            billAddressForm.door_number ?? "",
            billAddressForm.zip_code ?? "",
            billAddressForm.city ?? "",
            billAddressForm.country ?? "",
        ].join(", ");
        const updated = { ...orderData, billAddress: formatted.replace(/^[,\s]+|[,\s]+$/g, '') || null };
        setOrderData(updated);
        orderUpdateHook?.(updated);
        setEditingBillAddress(false);
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

    const billingAccordion = (
        <Accordion defaultExpanded sx={accordionSx}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography component="span" variant="h5" color={colors.grey[100]} fontWeight="bold">
                    BILLING INFORMATION
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={6}>
                        <Autocomplete
                            freeSolo
                            options={VAT_COUNTRY_RATES}
                            getOptionLabel={(option) => typeof option === 'string' ? option : option.label}
                            inputValue={vatRateInput}
                            onInputChange={(_, val) => setVatRateInput(val)}
                            onChange={(_, newValue) => {
                                const rate = typeof newValue === 'object' && newValue !== null
                                    ? newValue.rate
                                    : (newValue !== '' && newValue !== null ? Number(newValue) : null);
                                const updated = { ...orderData, vatRate: (rate != null && !isNaN(rate)) ? rate : null };
                                setOrderData(updated);
                                orderUpdateHook?.(updated);
                            }}
                            onBlur={() => {
                                const rate = Number(vatRateInput);
                                if (vatRateInput !== '' && !isNaN(rate)) {
                                    const updated = { ...orderData, vatRate: rate };
                                    setOrderData(updated);
                                    orderUpdateHook?.(updated);
                                }
                            }}
                            renderOption={(props, option) => <li {...props} key={option.label}>{option.label}</li>}
                            renderInput={(params) => (
                                <TextField {...params} label="VAT Rate" size="small" fullWidth sx={fieldSx} />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Order Price"
                            type="number"
                            fullWidth
                            size="small"
                            value={orderData?.totalAmount ?? ""}
                            sx={fieldSx}
                            onChange={(e) => {
                                const updated = { ...orderData, totalAmount: e.target.value !== "" ? Number(e.target.value) : null };
                                setOrderData(updated);
                                orderUpdateHook?.(updated);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="NIF"
                            fullWidth
                            size="small"
                            value={orderData?.nif ?? ""}
                            sx={fieldSx}
                            onChange={(e) => {
                                const updated = { ...orderData, nif: e.target.value || null };
                                setOrderData(updated);
                                orderUpdateHook?.(updated);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Bill Address"
                            fullWidth
                            size="small"
                            value={(orderData?.billAddress ?? "").split(", ").filter(Boolean).join(", ")}
                            disabled
                            sx={fieldSx}
                            InputProps={{
                                readOnly: true,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton size="small" title="Edit bill address" onClick={handleOpenBillAddressEdit}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    );

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
                                const statusColor = orderData?.status?.colorCode;
                                return (
                                    <TextField
                                        {...params}
                                        label="Status"
                                        variant="outlined"
                                        size="small"
                                        sx={fieldSx}
                                        InputProps={{
                                            ...params.InputProps,
                                            startAdornment: (
                                                <>
                                                    {statusColor && (
                                                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: statusColor, flexShrink: 0, mr: 0.75 }} />
                                                    )}
                                                    {params.InputProps.startAdornment}
                                                </>
                                            ),
                                        }}
                                    />
                                );
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
                                const priorityColor = orderData?.priority?.colorCode;
                                return (
                                    <TextField
                                        {...params}
                                        label="Priority"
                                        variant="outlined"
                                        size="small"
                                        sx={fieldSx}
                                        InputProps={{
                                            ...params.InputProps,
                                            startAdornment: (
                                                <>
                                                    {priorityColor && (
                                                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: priorityColor, flexShrink: 0, mr: 0.75 }} />
                                                    )}
                                                    {params.InputProps.startAdornment}
                                                </>
                                            ),
                                        }}
                                    />
                                );
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
                                const newContact = value?.value ?? null;
                                const b = newContact?.billingAddress;
                                const addr = b
                                    ? [b.street ?? "", b.door_number ?? "", b.zip_code ?? "", b.city ?? "", b.country ?? ""].join(", ").replace(/^[,\s]+|[,\s]+$/g, '')
                                    : null;
                                const updatedOrder = { ...orderData, contact: newContact, billAddress: addr || null, nif: newContact?.nif ?? null };
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
                            {billingAccordion}
                            {clientDetailsAccordion}
                        </Box>
                    </Grid>
                </Grid>
            ) : (
                <Box display="flex" flexDirection="column" gap={1}>
                    {orderDetailsAccordion}
                    {billingAccordion}
                    {clientDetailsAccordion}
                    {orderContentsAccordion}
                    {notesAccordion}
                </Box>
            )}
            {addressDialog}
            {createContactDialog}
            <Dialog open={editingBillAddress} onClose={() => setEditingBillAddress(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Edit Bill Address</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} mt={0}>
                        <Grid item xs={8}>
                            <TextField fullWidth label="Street" size="small" value={billAddressForm.street ?? ""}
                                onChange={(e) => setBillAddressForm(f => ({ ...f, street: e.target.value }))} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField fullWidth label="Door Number" size="small" value={billAddressForm.door_number ?? ""}
                                onChange={(e) => setBillAddressForm(f => ({ ...f, door_number: e.target.value }))} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField fullWidth label="Zip Code" size="small" value={billAddressForm.zip_code ?? ""}
                                onChange={(e) => setBillAddressForm(f => ({ ...f, zip_code: e.target.value }))} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField fullWidth label="City" size="small" value={billAddressForm.city ?? ""}
                                onChange={(e) => setBillAddressForm(f => ({ ...f, city: e.target.value }))} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField fullWidth label="Country" size="small" value={billAddressForm.country ?? ""}
                                onChange={(e) => setBillAddressForm(f => ({ ...f, country: e.target.value }))} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditingBillAddress(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSaveBillAddress}>Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default OrderDetailsView;
