import { useGetOrders } from "../../api/orders/getOrders";
import { useGetOrderStatus } from '../../api/orderStatus/getOrderStatus';
import { useGetContacts } from '../../api/contacts/getContacts';
import { useGetPriorities } from '../../api/priorities/getPriorities';
import { useUpdateOrderDTO, useInactivateOrder } from "../../api/orders/createOrder";
import { useGetProductParameters } from '../../api/products/getProducts';
import { useGetPrintingServices } from '../../api/printingServices/getPrintingServices';
import { useUpdateOrderItemDTO, useInactivateOrderProduct } from '../../api/orderProducts/createOrderProducts';
import AutocompleteProductSelector from "./components/AutocompleteProductSelector";

export const OrdersStore = () => {
    const gridData = useGetOrders();
    const orderStatus = useGetOrderStatus();
    const contacts = useGetContacts();
    const priorities = useGetPriorities();
    const { mutate: updateOrder } = useUpdateOrderDTO();
    const { mutate: inactivateOrder } = useInactivateOrder();
    const contactsOptions = contacts && contacts.map(entry => ({ id: entry.idContact, label: `${entry.firstName || " "} ${entry.lastName || " "}`, value: entry }));
    const statusOptions = orderStatus && orderStatus.map(entry => ({ id: entry.id_status, label: entry.name, value: entry }));
    const prioritiesOptions = priorities && priorities.map(entry => ({ id: entry.id_priority, label: entry.name, value: entry }));

    return {
        pageTitle: "ORDERS",
        pageSubtitle: "Welcome to your orders page", 
        rowIdField : 'idOrder',
        gridData : gridData || [],
        updateHook : updateOrder,
        deleteHook : inactivateOrder,
        columnsDefinition: [
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
        prioritiesOptions: prioritiesOptions
    }
};

export const OrderDetailStore = () => {
    const products = useGetProductParameters();
    const printingServices = useGetPrintingServices();
    const { mutate: updateOrderProduct } = useUpdateOrderItemDTO();
    const { mutate: inactivateOrderProduct } = useInactivateOrderProduct(); 

    const distinctProducts = Object.values(
        (products ?? []).reduce((acc, param) => {
            if (!acc[param.idProduct]) {
                acc[param.idProduct] = {
                    idProduct: param.idProduct,
                    idProductParameter: param.idProductParameter,
                    name: `${param.brand || ""} - ${param.name || ""}`,
                    imageUrl: param.defaultSku ? param.imageUrl : null,
                    color: param.defaultSku ? param.color : null,
                    size: param.defaultSku ? param.size : null,
                };
            } else if (param.defaultSku) {
                acc[param.idProduct].idProductParameter = param.idProductParameter;
                acc[param.idProduct].imageUrl = param.imageUrl;
                acc[param.idProduct].color = param.color;
                acc[param.idProduct].size = param.size;
            }
            return acc;
        }, {})
    );

    const distinctColorOptionsFormatter = (idProduct) => {
        return Object.values(
            (products ?? [])
                .filter(p => p.idProduct === idProduct)
                .reduce((acc, param) => {
                    const key = param.color?.idColor ?? "null";
                    if (!acc[key]) {
                        acc[key] = {
                            idColor: param.color?.idColor ?? null,
                            colorName: param.color?.colorName ?? "N/A",
                            colorCode: param.color?.colorCode ?? null,
                            imageUrl: param.imageUrl,
                            size: param.size,
                        };
                    }
                    return acc;
                }, {})
        );
    };

    const distinctSizeOptionsFormatter = (idProduct, idColor) => {
        return Object.values(
            (products ?? [])
                .filter(p => {
                    const colorMatch = idColor === null
                        ? p.color == null
                        : p.color?.idColor === idColor;
                    return p.idProduct === idProduct && colorMatch;
                })
                .reduce((acc, param) => {
                    const sizeValue = param.size || null;  // ← treats "" as null
                    const key = sizeValue ?? "null";
                    if (!acc[key]) {
                        acc[key] = {
                            id: param.idProductParameter,
                            name: sizeValue ?? "N/A",      // ← "" becomes "N/A"
                            imageUrl: param.imageUrl,
                        };
                    }
                    return acc;
                }, {})
        );
    };

    return {
        detailRowIdField: 'idOrderItem',
        detailUpdateHook: updateOrderProduct,
        detailDeleteHook: inactivateOrderProduct,
        detailColumnsDefinition: [
            {
                field: "product",
                headerName: "PRODUCT",
                flex: 1.2,
                editable: true,
                valueGetter: (value, row) => {
                    if (!row.product) return null;
                    return distinctProducts.find(p => p.idProduct === row.product.idProduct) ?? null;
                },
                renderEditCell: (params) => (
                    <AutocompleteProductSelector
                        products={products ?? []}
                        distinctProducts={distinctProducts}
                        distinctColorOptionsFormatter={distinctColorOptionsFormatter}
                        distinctSizeOptionsFormatter={distinctSizeOptionsFormatter}
                        value={params.value}
                        onChange={(resolved) => {
                            params.api.setEditCellValue({ id: params.id, field: "product", value: resolved });
                        }}
                        width={600}
                        previewWidth={250}
                    />
                ),
                renderCell: (params) => {
                    const product = params.value;
                    if (!product) return "—";
                    const parts = [
                        product.name,
                        product.color?.colorName,
                        product.size
                    ].filter(Boolean).join(" - ");
                    return parts;
                },
            },
            {
                field: "printingService",
                headerName: "SERVICE",
                editable: true,
                type: "singleSelect",
                valueOptions: () => [{id: -1, label: 'Vazio'}, ...(printingServices?.map(entry => ({ id: entry.id_printing_service, label: entry.name })) ?? [])],
                getOptionValue: (value) => value.id,
                getOptionLabel: (value) => value.label,
                valueGetter: (value) => value && value.id_printing_service ? value.id_printing_service : -1,
                valueSetter: (value, row) => ({ ...row, printingService: value !== -1 ? printingServices.find(entry => entry.id_printing_service === value) : null }),
                flex: 0.5
            },
            {
                field: "quantity",
                headerName: "QUANTITY",
                editable: true,
                flex: 0.4
            },
            {
                field: "description",
                headerName: "NOTES",
                editable: true,
                flex: 1
            },
        ],
        detailSampleRow: {
            idOrderItem: null,
            description: null,
            product: null,
            printingService: null,
            quantity: 0,
            flagActive: true
        }
    };
};