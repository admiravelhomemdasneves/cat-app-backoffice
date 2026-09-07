import { useGetPrintingServices } from "../../api/printingServices/getPrintingServices";
import { useUpdatePrintingService, useInactivatePrintingService } from "../../api/printingServices/createPrintingServices";

export const PrintingServicesStore = () => {
    const { data: gridData, isPending } = useGetPrintingServices();
    const { mutate: updatePrintingServices } = useUpdatePrintingService();
    const { mutate: inactivatePrintingServices } = useInactivatePrintingService();

    return {
        pageTitle: "PRINTING SERVICES",
        pageSubtitle: "Welcome to your printing services page",
        rowIdField : 'id_printing_service',
        gridData : gridData || [],
        isPending,
        updateHook : updatePrintingServices,
        deleteHook : inactivatePrintingServices,
        columnsDefinition: [
            {
                field: "name",
                headerName: "NAME",
                editable: true,
                flex: 0.3
            },
            {
                field: "description",
                headerName: "DESCRIPTION",
                editable: true,
                flex: 1
            },
            {
                field: "rate",
                headerName: "RATE",
                editable: true,
                type: "number",
                flex: 0.4,
                valueFormatter: (value) => value != null ? value.toFixed(2) : "—",
            },
            {
                field: "rateType",
                headerName: "RATE TYPE",
                editable: true,
                type: "singleSelect",
                flex: 0.5,
                valueOptions: [
                    { value: "HOURLY", label: "Per Hour" },
                    { value: "PER_UNIT", label: "Per Unit" },
                ],
                valueFormatter: (value) => value === "HOURLY" ? "Per Hour" : value === "PER_UNIT" ? "Per Unit" : "—",
            },
        ],
        sampleRow: {
            "id_printing_service": null,
            "name": "",
            "description": "",
            "rate": 0,
            "rateType": "HOURLY",
            "flagActive": true
        }
    };
}