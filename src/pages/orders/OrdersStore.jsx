import Link from '@mui/material/Link';
import { useGetOrders } from "../../api/orders/getOrders";
import { useGetOrderStatus } from '../../api/orderStatus/getOrderStatus';
import { useGetContacts } from '../../api/contacts/getContacts';
import { useGetPriorities } from '../../api/priorities/getPriorities';
import { useCreateOrder, useUpdateOrder, useInactivateOrder } from "../../api/orders/createOrder";
import { randomId } from '@mui/x-data-grid-generator';

const OrdersStore = () => {
    const gridData = useGetOrders();
    const orderStatus = useGetOrderStatus();
    const contacts = useGetContacts();
    const priorities = useGetPriorities();
    const { mutate: createOrder } = useCreateOrder();
    const { mutate: updateOrder } = useUpdateOrder();
    const { mutate: inactivateOrder } = useInactivateOrder();

    return {
        pageTitle: "ORDERS",
        pageSubtitle: "Welcome to your orders page",
        rowIdField : 'id_order',
        gridData : gridData || [],
        createHook: createOrder,
        updateHook : updateOrder,
        deleteHook : inactivateOrder,
        columnsDefinition: [
            {
                field: "name",
                headerName: "NAME",
                editable: true,
                renderCell: (params) => (
                    <Link href={`/orders/${params.id}`} color="secondary"> {params.value} </Link>
                ),
            },
            {
                field: "description",
                headerName: "DESCRIPTION",
                editable: true,
            },
            {
                field: "contact",
                headerName: "CLIENT",
                editable: true,
                type: "singleSelect",
                valueOptions: () => [{value: null, label: 'Vazio'}, ...contacts.map(entry => ({ value: entry.id_contact, label: `${entry.first_name || " "} ${entry.last_name || " "}` }) )],
                valueFormatter: (data) => {
                    if (data) {
                        return `${data.first_name || " "} ${data.last_name || " "}`;
                    }

                    return "";
                }
            },
            {
                field: "orderStatus",
                headerName: "STATUS",
                editable: true,
                type: "singleSelect",
                getOptionValue: (value) => value.id,
                getOptionLabel: (value) => value.label,
                valueOptions: () => [{id: null, label: 'Vazio'}, ...orderStatus.map(entry => ({ id: entry.id_status, label: entry.name }) )],
                valueFormatter: (data) => {
                    if (data && data.name) {
                        return data.name;
                    }

                    return "";
                },
            },
            {
                field: "orderPriority",
                headerName: "PRIORITY",
                editable: true,
                type: "singleSelect",
                getOptionValue: (value) => value.id,
                getOptionLabel: (value) => value.label,
                valueOptions: () => [{id: null, label: 'Vazio'}, ...priorities.map(entry => ({ id: entry.id_priority, label: entry.name }) )],
                valueFormatter: (data) => {
                    if (data && data.name) {
                        return data.name;
                    }

                    return "";
                }
            },
            {
                field: "date_requested",
                headerName: "CREATION DATE",
                editable: false,
                type: "date",
                valueFormatter: (data) => {
                    if (data) {
                        return new Date(data).toLocaleDateString("en-GB");
                    }

                    return "";
                },
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
            }
        ],
        sampleRow: {
            "id_order": null,
            "name": "",
            "description": "",
            "orderStatus": null,
            "contact": null,
            "date_requested": null,
            "date_status": null,
            "date_conclusion": null,
            "date_due": null,
            "flagActive": true
        }
    }
};

export default OrdersStore;
