import { useGetOrders } from "../../api/orders/getOrders";
import { useGetOrderStatus } from '../../api/orderStatus/getOrderStatus';
import { useGetContacts } from '../../api/contacts/getContacts';
import { useGetPriorities } from '../../api/priorities/getPriorities';
import { useUpdateOrder, useInactivateOrder } from "../../api/orders/createOrder";
import { useGetProducts } from '../../api/products/getProducts';
import { useGetPrintingServices } from '../../api/printingServices/getPrintingServices';
import { useUpdateOrderProduct, useInactivateOrderProduct } from '../../api/orderProducts/createOrderProducts';

export const OrdersStore = () => {
    const gridData = useGetOrders();
    const orderStatus = useGetOrderStatus();
    const contacts = useGetContacts();
    const priorities = useGetPriorities();
    const { mutate: updateOrder } = useUpdateOrder();
    const { mutate: inactivateOrder } = useInactivateOrder();
    const contactsOptions = contacts && contacts.map(entry => ({ id: entry.id_contact, label: `${entry.first_name || " "} ${entry.last_name || " "}`, value: entry }));
    const statusOptions = orderStatus && orderStatus.map(entry => ({ id: entry.id_status, label: entry.name, value: entry }));
    const prioritiesOptions = priorities && priorities.map(entry => ({ id: entry.id_priority, label: entry.name, value: entry }));

    return {
        pageTitle: "ORDERS",
        pageSubtitle: "Welcome to your orders page",
        rowIdField : 'id_order',
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
                valueGetter: (value) => value && value.id_contact ? value.id_contact : -1,
                valueSetter: (value, row) => { return { ...row, contact: value !== -1 ? contacts.find(entry => entry.id_contact === value) : null }},
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
                field: "date_due",
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
            "id_order": null,
            "description": "",
            "status": null,
            "contact": null,
            "priority": null,
            "date_requested": null,
            "date_status": null,
            "date_conclusion": null,
            "date_due": null,
            "flagActive": true
        },
        contactOptions: contactsOptions,
        statusOptions: statusOptions,
        prioritiesOptions: prioritiesOptions
    }
};

export const OrderDetailStore = () => {
    const products = useGetProducts();
    const printingServices = useGetPrintingServices();
    const { mutate: updateOrderProduct } = useUpdateOrderProduct();
    const { mutate: inactivateOrderProduct } = useInactivateOrderProduct();

    return {
        detailRowIdField : 'id_order_product',
        detailUpdateHook : updateOrderProduct,
        detailDeleteHook : inactivateOrderProduct,
        detailColumnsDefinition: [
            {
                field: "product",
                headerName: "PRODUCT",
                editable: true,
                type: "singleSelect",
                valueOptions: () => [{id: -1, label: 'Vazio'}, ...products.map(entry => ({ id: entry.id_product, label: `${entry.brand || " "} - ${entry.name || " "}` }) )],
                getOptionValue: (value) => value.id,
                getOptionLabel: (value) => value.label,
                valueGetter: (value) => value && value.id_product ? value.id_product : -1,
                valueSetter: (value, row) => { return { ...row, product: value !== -1 ? products.find(entry => entry.id_product === value) : null }},
                flex: 0.8
            },
            {
                field: "printingService",
                headerName: "SERVICE",
                editable: true,
                type: "singleSelect",
                valueOptions: () => [{id: -1, label: 'Vazio'}, ...printingServices.map(entry => ({ id: entry.id_printing_service, label: entry.name }) )],
                getOptionValue: (value) => value.id,
                getOptionLabel: (value) => value.label,
                valueGetter: (value) => value && value.id_printing_service ? value.id_printing_service : -1,
                valueSetter: (value, row) => { return { ...row, printingService: value !== -1 ? printingServices.find(entry => entry.id_printing_service === value) : null }},
                flex: 0.5
            },
            {
                field: "quantity",
                headerName: "QUANTITY",
                editable: true,
                flex: 0.5
            },
            {
                field: "description",
                headerName: "NOTES",
                editable: true,
                flex: 1
            },
        ],
        detailSampleRow: {
            "id_order_product": null,
            "description": null,
            "product": null,
            "printingService": null,
            "quantity": 0,
            "flagActive": true
        }
    }
};