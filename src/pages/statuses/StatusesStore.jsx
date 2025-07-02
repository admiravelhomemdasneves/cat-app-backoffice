
import { useGetOrderStatus } from "../../api/orderStatus/getOrderStatus";
import { useUpdateStatus, useInactivateStatus } from "../../api/orderStatus/createOrderStatus";

export const StatusesStore = () => {
    const gridData = useGetOrderStatus();
    const { mutate: updateStatus } = useUpdateStatus();
    const { mutate: inactivateStatus } = useInactivateStatus();
    
    return {
        pageTitle: "STATUSES",
        pageSubtitle: "Welcome to your statuses page",
        rowIdField : 'id_status',
        gridData : gridData || [],
        updateHook : updateStatus,
        deleteHook : inactivateStatus,
        columnsDefinition: [
            {
                field: "name",
                headerName: "NAME",
                editable: true,
            },
            {
                field: "description",
                headerName: "DESCRIPTION",
                editable: true,
            },
        ],
        sampleRow: {
            "id_status": null,
            "name": "",
            "description": "",
            "flagActive": true
        }
    };
}