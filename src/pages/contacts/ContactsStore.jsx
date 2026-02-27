import React from "react";
import { useGetContacts } from "../../api/contacts/getContacts";
import { useUpdateContact } from "../../api/contacts/createContacts";
import { useInactivateContact } from "../../api/contacts/createContacts";
import { useGridApiContext } from "@mui/x-data-grid";
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, TextField, Button, Typography } from "@mui/material";

function AddressEditCell({ id, field, row, hasFocus }) {
    const apiRef = useGridApiContext();
    const address = row[field];
    const [open, setOpen] = React.useState(false);
    const closedManually = React.useRef(false);

    React.useEffect(() => {
        if (hasFocus && !closedManually.current) {
            setOpen(true);
        }
    }, [hasFocus]);

    const [form, setForm] = React.useState({
        street: address?.street || "",
        door_number: address?.door_number || "",
        zip_code: address?.zip_code || "",
        city: address?.city || "",
        country: address?.country || "",
    });

    const handleSave = () => {
        apiRef.current.setEditCellValue({ id, field, value: { ...address, ...form } });
        closedManually.current = true;
        setOpen(false);
    };

    const handleFocusOut = () => {
        apiRef.current.setEditCellValue({ id, field, value: { ...address, ...form } });
        closedManually.current = true;
        setOpen(false);
    };

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    if (!open) return (
        <Typography 
            variant="body2" 
            onClick={() => { closedManually.current = false; setOpen(true); }}
            sx={{ px: 1, display: "flex", alignItems: "center", height: "100%", cursor: "pointer" }}
        >
            {address?.street && address?.door_number && address?.zip_code && address?.city && address?.country
                ? `${address.street}, Nº ${address.door_number}, ${address.zip_code} ${address.city}, ${address.country}`
                : "N/A"
            }
        </Typography>
    );

    return (
        <Dialog open={open} onClose={handleFocusOut} disableRestoreFocus>
            <DialogTitle>Edit Address</DialogTitle>
            <DialogContent>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, pt: 1, width: 320 }}>
                    <Box sx={{ p: 1.5, backgroundColor: "#f5f5f5", borderRadius: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            {form.street && form.door_number && form.zip_code && form.city && form.country
                                ? `${form.street}, Nº ${form.door_number}, ${form.zip_code} ${form.city}, ${form.country}`
                                : "N/A"
                            }
                        </Typography>
                    </Box>
                    <TextField label="Street"      name="street"      value={form.street}      onChange={handleChange} size="small" fullWidth />
                    <TextField label="Door Number" name="door_number" value={form.door_number} onChange={handleChange} size="small" fullWidth />
                    <TextField label="Zip Code"    name="zip_code"    value={form.zip_code}    onChange={handleChange} size="small" fullWidth />
                    <TextField label="City"        name="city"        value={form.city}        onChange={handleChange} size="small" fullWidth />
                    <TextField label="Country"     name="country"     value={form.country}     onChange={handleChange} size="small" fullWidth />
                </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center" }}>
                <Button variant="contained" onClick={handleSave}>Confirm</Button>
            </DialogActions>
        </Dialog>
    );
}

export const ContactsStore = () => {
    const gridData = useGetContacts();
    const { mutate: updateContact } = useUpdateContact();
    const { mutate: inactivateOrder } = useInactivateContact();
    
    return {
        pageTitle: "CONTACTS",
        pageSubtitle: "Welcome to your contacts page",
        rowIdField : 'idContact',
        gridData : gridData || [],
        updateHook : updateContact,
        deleteHook : inactivateOrder,
        columnsDefinition: [
            {
                field: "firstName",
                headerName: "FIRST NAME",
                editable: true,
                flex: 1
            },
            {
                field: "lastName",
                headerName: "LAST NAME",
                editable: true,
                flex: 1
            },
            {
                field: "nif",
                headerName: "NIF",
                editable: true,
                flex: 1
            },
            {
                field: "phoneNumber",
                headerName: "PHONE NUMBER",
                editable: true,
                flex: 1
            },
            {
                field: "email",
                headerName: "EMAIL",
                editable: true,
                flex: 1
            },
            {
                field: "shippingAddress",
                headerName: "SHIPPING ADDRESS",
                editable: true,
                flex: 1,
                valueGetter: (value) => value,
                valueFormatter: (value) => value ? `${value.street}, Nº ${value.door_number}, ${value.zip_code} ${value.city}, ${value.country}` : "N/A",
                renderEditCell: (params) => <AddressEditCell {...params} />
            },
            {
                field: "billingAddress",
                headerName: "BILLING ADDRESS",
                editable: true,
                flex: 1,
                valueGetter: (value) => value,
                valueFormatter: (value) => value ? `${value.street}, Nº ${value.door_number}, ${value.zip_code} ${value.city}, ${value.country}` : "N/A",
                renderEditCell: (params) => <AddressEditCell {...params} />
            },
        ],
        sampleRow: {
            "idContact": null,
            "firstName": "",
            "lastName": "",
            "nif": "",
            "phoneNumber": "",
            "email": "",
            "shippingAddress": null,
            "billingAddress": null,
            "flagActive": true
        }
    };
}