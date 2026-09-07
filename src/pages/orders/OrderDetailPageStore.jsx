import { useGetOrderById } from "../../api/orders/getOrderById";
import { useGetOrderStatus } from "../../api/orderStatus/getOrderStatus";
import { useGetContacts } from "../../api/contacts/getContacts";
import { useGetPriorities } from "../../api/priorities/getPriorities";
import { useUpdateOrderDTO, useRecalculateOrder } from "../../api/orders/createOrder";
import { useUpdateContact } from "../../api/contacts/createContacts";
import { OrderDetailStore } from "./OrdersStore";

export const OrderDetailPageStore = (orderId, initialOrder = null) => {
    const { data: fetchedOrder, isPending: fetchPending } = useGetOrderById(orderId);
    const order = fetchedOrder ?? initialOrder;
    const isPending = !order && fetchPending;
    const { data: orderStatus } = useGetOrderStatus();
    const { data: contacts } = useGetContacts();
    const { data: priorities } = useGetPriorities();
    const { mutate: updateOrder } = useUpdateOrderDTO();
    const { mutate: updateContact } = useUpdateContact();
    const { mutate: recalculateOrder } = useRecalculateOrder();

    const contactOptions = contacts?.map(c => ({
        id: c.idContact,
        label: `${c.firstName || ""} ${c.lastName || ""}`.trim(),
        value: c,
    }));
    const statusOptions = orderStatus?.map(s => ({ id: s.id_status, label: s.name, value: s }));
    const prioritiesOptions = priorities?.map(p => ({ id: p.id_priority, label: p.name, value: p }));

    const {
        contentsRowIdField, contentsColumnsDefinition, contentsSampleRow, contentsUpdateHook, contentsDeleteHook,
    } = OrderDetailStore();

    return {
        isPending,
        order,
        orderUpdateHook: updateOrder,
        contactUpdateHook: updateContact,
        recalculateHook: recalculateOrder,
        contactOptions,
        statusOptions,
        prioritiesOptions,
        contentsRowIdField,
        contentsColumnsDefinition,
        contentsSampleRow,
        contentsUpdateHook,
        contentsDeleteHook,
    };
};
