import { useGetOrders } from "../../api/orders/getOrders";
import { createIdLinkColumn } from "../../utils/columnHelpers";
import { useGetOrderStatus } from '../../api/orderStatus/getOrderStatus';
import { useGetContacts } from '../../api/contacts/getContacts';
import { useGetPriorities } from '../../api/priorities/getPriorities';
import { useUpdateOrderDTO, useInactivateOrder } from "../../api/orders/createOrder";
import { useUpdateContact } from "../../api/contacts/createContacts";
import { useGetPrintingServices } from '../../api/printingServices/getPrintingServices';
import { useUpdateOrderItem, useInactivateOrderItem, useCalculateOrderItemPrice } from '../../api/orderItems/createOrderItems';
import { useGetMaterials } from '../../api/materials/getMaterials';
import { Autocomplete, TextField, Box, Tooltip, IconButton, Typography } from "@mui/material";
import BoltIcon from '@mui/icons-material/Bolt';
import FunctionsIcon from '@mui/icons-material/Functions';

export const OrdersStore = () => {
    const { data: gridData, isPending } = useGetOrders();
    const { data: orderStatus } = useGetOrderStatus();
    const { data: contacts } = useGetContacts();
    const { data: priorities } = useGetPriorities();
    const { mutate: updateOrder } = useUpdateOrderDTO();
    const { mutate: inactivateOrder } = useInactivateOrder();
    const { mutate: updateContact } = useUpdateContact();
    const contactsOptions = contacts && contacts.map(entry => ({ id: entry.idContact, label: `${entry.firstName || " "} ${entry.lastName || " "}`, value: entry }));
    const statusOptions = orderStatus && orderStatus.map(entry => ({ id: entry.id_status, label: entry.name, value: entry }));
    const prioritiesOptions = priorities && priorities.map(entry => ({ id: entry.id_priority, label: entry.name, value: entry }));

    return {
        pageTitle: "ORDERS",
        pageSubtitle: "Welcome to your orders page",
        rowIdField : 'idOrder',
        gridData : gridData || [],
        isPending,
        updateHook : updateOrder,
        deleteHook : inactivateOrder,
        columnsDefinition: [
            createIdLinkColumn({ field: 'idOrder', pathPrefix: 'orders', headerName: 'ORDER', getState: (row) => ({ order: row }) }),
            {
                field: "contact",
                headerName: "CLIENT",
                editable: true,
                type: "singleSelect",
                valueOptions: () => [{id: -1, label: 'Vazio'}, ...contactsOptions],
                getOptionValue: (value) => value.id,
                getOptionLabel: (value) => value.label,
                valueGetter: (value) => value && value.idContact ? value.idContact : -1,
                valueSetter: (value, row) => { return { ...row, contact: value !== -1 ? contacts.find(entry => entry.idContact === value) : null }},
                flex: 1
            },
            {
                field: "status",
                headerName: "STATUS",
                editable: true,
                type: "singleSelect",
                valueOptions: () => [{id: -1, label: 'Vazio'}, ...statusOptions],
                getOptionValue: (value) => value.id,
                getOptionLabel: (value) => value.label,
                valueGetter: (value) => value && value.id_status ? value.id_status : -1,
                valueSetter: (value, row) => { return { ...row, status: value !== -1 ? orderStatus.find(entry => entry.id_status === value) : null }},
                flex: 1
            },
            {
                field: "priority",
                headerName: "PRIORITY",
                editable: true,
                type: "singleSelect",
                valueOptions: () => [{id: -1, label: "Vazio"}, ...prioritiesOptions],
                getOptionValue: (value) => value.id,
                getOptionLabel: (value) => value.label,
                valueGetter: (value) => value && value.id_priority ? value.id_priority : -1,
                valueSetter: (value, row) => { return { ...row, priority: value !== -1 ? priorities.find(entry => entry.id_priority === value) : null }},
                flex: 1
            },
            {
                field: "dateDue",
                headerName: "DUE DATE",
                editable: true,
                type: "date",
                valueFormatter: (data) => {
                    if (data) {
                        return new Date(data).toLocaleDateString("en-GB");
                    }

                    return "";
                },
                flex: 1
            }
        ],
        sampleRow: {
            "idOrder": null,
            "description": "",
            "status": null,
            "contact": null,
            "priority": null,
            "dateRequested": null,
            "dateStatus": null,
            "dateConclusion": null,
            "dateDue": null,
            "flagActive": true
        },
        contactOptions: contactsOptions,
        statusOptions: statusOptions,
        prioritiesOptions: prioritiesOptions,
        contactUpdateHook: updateContact,
    }
};

export const OrderDetailStore = () => {
    const { data: printingServices } = useGetPrintingServices();
    const { data: materials } = useGetMaterials();
    const { mutate: updateOrderItem } = useUpdateOrderItem();
    const { mutate: inactivateOrderItem } = useInactivateOrderItem();
    const { mutateAsync: calculatePrice } = useCalculateOrderItemPrice();

    return {
        contentsRowIdField: 'idOrderItem',
        contentsUpdateHook: updateOrderItem,
        contentsDeleteHook: inactivateOrderItem,
        contentsColumnsDefinition: [
            {
                field: "material",
                headerName: "MATERIAL",
                editable: true,
                flex: 1.0,
                valueGetter: (value) => value ?? null,
                renderCell: (params) => {
                    const m = params.value;
                    if (!m) return "—";
                    return [m.brand, m.name].filter(Boolean).join(" - ");
                },
                renderEditCell: (params) => {
                    const options = materials ?? [];
                    return (
                        <Autocomplete
                            options={options}
                            getOptionLabel={(opt) => [opt.brand, opt.name].filter(Boolean).join(" - ")}
                            isOptionEqualToValue={(opt, val) => opt.idMaterial === val?.idMaterial}
                            value={params.value ?? null}
                            onChange={(_, newValue) => {
                                params.api.setEditCellValue({ id: params.id, field: "material", value: newValue });
                            }}
                            renderOption={(props, option) => {
                                const { key, ...rest } = props;
                                const imageUrl = option.images?.[0]?.imageUrl;
                                return (
                                    <Box component="li" key={key} {...rest} sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 0.5 }}>
                                        <Box
                                            sx={{
                                                width: 44,
                                                height: 44,
                                                flexShrink: 0,
                                                borderRadius: 1,
                                                backgroundColor: "action.hover",
                                                backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
                                                backgroundSize: "contain",
                                                backgroundRepeat: "no-repeat",
                                                backgroundPosition: "center",
                                            }}
                                        />
                                        <Box>
                                            <Typography variant="body2" fontWeight="bold" noWrap>
                                                {option.name || "—"}
                                            </Typography>
                                            {option.brand && (
                                                <Typography variant="caption" color="text.secondary" noWrap>
                                                    {option.brand}
                                                </Typography>
                                            )}
                                        </Box>
                                    </Box>
                                );
                            }}
                            renderInput={(inputParams) => (
                                <TextField
                                    {...inputParams}
                                    variant="outlined"
                                    autoFocus
                                    sx={{ height: "100%", "& .MuiOutlinedInput-root": { height: "100%" } }}
                                />
                            )}
                            sx={{ width: "100%", minWidth: 220, height: "100%" }}
                            clearOnEscape
                        />
                    );
                },
            },
            {
                field: "service",
                headerName: "SERVICE",
                editable: true,
                type: "singleSelect",
                valueOptions: () => [{ id: -1, label: 'Vazio' }, ...(printingServices?.map(entry => ({ id: entry.id_printing_service, label: entry.name })) ?? [])],
                getOptionValue: (value) => value.id,
                getOptionLabel: (value) => value.label,
                valueGetter: (value) => value && value.id_printing_service ? value.id_printing_service : -1,
                valueSetter: (value, row) => ({ ...row, service: value !== -1 ? printingServices.find(entry => entry.id_printing_service === value) : null }),
                flex: 0.7,
            },
            {
                field: "quantity",
                headerName: "QUANTITY",
                editable: true,
                type: "number",
                flex: 0.4,
            },
            {
                field: "serviceRate",
                headerName: "RATE",
                editable: true,
                type: "number",
                flex: 0.5,
                renderCell: (params) => params.value != null ? Number(params.value).toFixed(2) : "",
                renderEditCell: (params) => {
                    const service = params.row.service;
                    const hasService = service != null;
                    return (
                        <Box display="flex" alignItems="center" width="100%" px={0.5} gap={0.5}>
                            <TextField
                                type="number"
                                value={params.value ?? ""}
                                onChange={(e) => {
                                    const v = e.target.value;
                                    params.api.setEditCellValue({
                                        id: params.id,
                                        field: "serviceRate",
                                        value: v === "" ? null : Number(v),
                                    });
                                }}
                                variant="standard"
                                size="small"
                                inputProps={{ style: { textAlign: "right" } }}
                                sx={{ flex: 1 }}
                                autoFocus
                            />
                            <Tooltip
                                title="Fill with the selected service's current rate"
                                placement="top"
                                arrow
                                enterDelay={700}
                            >
                                <span>
                                    <IconButton
                                        size="small"
                                        disabled={!hasService}
                                        onClick={() => {
                                            params.api.setEditCellValue({
                                                id: params.id,
                                                field: "serviceRate",
                                                value: service.rate || null,
                                            });
                                        }}
                                        tabIndex={-1}
                                    >
                                        <BoltIcon fontSize="small" />
                                    </IconButton>
                                </span>
                            </Tooltip>
                        </Box>
                    );
                },
            },
            {
                field: "serviceHours",
                headerName: "WORK HOURS",
                editable: true,
                type: "number",
                flex: 0.4,
            },
            {
                field: "price",
                headerName: "PRICE",
                editable: true,
                type: "number",
                flex: 0.5,
                renderCell: (params) => params.value != null ? Number(params.value).toFixed(2) : "",
                renderEditCell: (params) => {
                    const hasId = params.row.idOrderItem != null;
                    return (
                        <Box display="flex" alignItems="center" width="100%" px={0.5} gap={0.5}>
                            <TextField
                                type="number"
                                value={params.value ?? ""}
                                onChange={(e) => {
                                    const v = e.target.value;
                                    params.api.setEditCellValue({
                                        id: params.id,
                                        field: "price",
                                        value: v === "" ? null : Number(v),
                                    });
                                }}
                                variant="standard"
                                size="small"
                                inputProps={{ style: { textAlign: "right" } }}
                                sx={{ flex: 1 }}
                                autoFocus
                            />
                            <Tooltip
                                title="Calculate: material retail price × quantity, plus service rate × work hours (or × quantity for per-unit services)"
                                placement="top"
                                arrow
                                enterDelay={700}
                            >
                                <span>
                                    <IconButton
                                        size="small"
                                        disabled={!hasId}
                                        onClick={async () => {
                                            try {
                                                const result = await calculatePrice(params.row.idOrderItem);
                                                if (result?.price != null) {
                                                    params.api.setEditCellValue({
                                                        id: params.id,
                                                        field: "price",
                                                        value: result.price,
                                                    });
                                                }
                                            } catch (_) {}
                                        }}
                                        tabIndex={-1}
                                    >
                                        <FunctionsIcon fontSize="small" />
                                    </IconButton>
                                </span>
                            </Tooltip>
                        </Box>
                    );
                },
            },
        ],
        contentsSampleRow: {
            idOrderItem: null,
            material: null,
            service: null,
            quantity: null,
            serviceRate: null,
            serviceHours: null,
            price: null,
            flagActive: true,
        },
    };
};
