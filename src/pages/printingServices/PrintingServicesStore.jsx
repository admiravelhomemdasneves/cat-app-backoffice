import { useGetPrintingServices } from "../../api/printingServices/getPrintingServices";
import { useUpdatePrintingService, useInactivatePrintingService } from "../../api/printingServices/createPrintingServices";

export const PrintingServicesStore = () => {
    const gridData = useGetPrintingServices();
    const { mutate: updatePrintingServices } = useUpdatePrintingService();
    const { mutate: inactivatePrintingServices } = useInactivatePrintingService();
    
    return {
        pageTitle: "PRINTING SERVICES",
        pageSubtitle: "Welcome to your printing services page",
        rowIdField : 'id_printing_service',
        gridData : gridData || [],
        updateHook : updatePrintingServices,
        deleteHook : inactivatePrintingServices,
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
            "id_printing_service": null,
            "name": "",
            "description": "",
            "flagActive": true
        }
    };
}