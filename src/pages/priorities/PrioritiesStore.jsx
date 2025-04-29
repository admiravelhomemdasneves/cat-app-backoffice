import { useGetPriorities } from "../../api/priorities/getPriorities";
import { useUpdatePriority, useInactivatePriority } from "../../api/priorities/createPriorities";

export const PrioritiesStore = () => {
    const gridData = useGetPriorities();
    const { mutate: updatePriority } = useUpdatePriority();
    const { mutate: inactivatePriority } = useInactivatePriority();
    
    return {
        pageTitle: "PRIORITIES",
        pageSubtitle: "Welcome to your priorities page",
        rowIdField : 'id_priority',
        gridData : gridData || [],
        updateHook : updatePriority,
        deleteHook : inactivatePriority,
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
            "id_priority": null,
            "name": "",
            "description": "",
            "flagActive": true
        }
    };
}