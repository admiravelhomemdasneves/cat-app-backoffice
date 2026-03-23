
import { useGetOrderStatus } from "../../api/orderStatus/getOrderStatus";
import { useUpdateStatus, useInactivateStatus } from "../../api/orderStatus/createOrderStatus";
import { useGetColors } from "../../api/colors/getColors";
import { useCreateColor } from "../../api/colors/createColors";
import ColorAutocompleteCell from "../../components/ColorAutocompleteCell";
import { Box } from "@mui/material";

export const StatusesStore = () => {
    const gridData = useGetOrderStatus();
    const colors = useGetColors();
    const { mutate: updateStatus } = useUpdateStatus();
    const { mutate: inactivateStatus } = useInactivateStatus();
    const { mutate: createColor } = useCreateColor();

    const handleCreateColor = (newColor, cb) => {
        createColor(newColor, {
            onSuccess: (response) => cb(response.data)
        });
    };
    
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
                flex: 0.3
            },
            {
                field: "description",
                headerName: "DESCRIPTION",
                editable: true,
                flex: 1
            },
            {
                field: "color",
                headerName: "COLOR",
                editable: true,
                flex: 0.6,
                valueGetter: (value, row) => row.color ?? null,
                renderEditCell: (params) => (
                    <ColorAutocompleteCell
                        value={params.value}
                        colorOptions={colors ?? []}
                        onCreateColor={handleCreateColor}
                        onChange={(newColor) => {
                            params.api.setEditCellValue({ id: params.id, field: "color", value: newColor });
                        }}
                    />
                ),
                renderCell: (params) => {
                    const color = params.value;
                    if (!color) return "—";
                    return (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Box sx={{
                                width: 16, height: 16, borderRadius: "3px",
                                backgroundColor: color.colorCode || "transparent",
                                border: "1px solid rgba(0,0,0,0.2)",
                                flexShrink: 0,
                            }} />
                            {color.colorName}
                        </Box>
                    );
                },
            },
            {
                field: "terminalStatus",
                headerName: "TERMINAL STATUS",
                editable: true,
                flex: 1
            },
        ],
        sampleRow: {
            "id_status": null,
            "name": "",
            "description": "",
            "color": null,
            "terminalStatus": false,
            "flagActive": true
        }
    };
}