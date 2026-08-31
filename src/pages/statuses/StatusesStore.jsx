import { useGetOrderStatus } from "../../api/orderStatus/getOrderStatus";
import { useUpdateStatus, useInactivateStatus } from "../../api/orderStatus/createOrderStatus";
import ColorPickerCell from "../../components/ColorPickerCell";
import { Box, Typography } from "@mui/material";

export const StatusesStore = () => {
    const { data: gridData, isPending } = useGetOrderStatus();
    const { mutate: updateStatus } = useUpdateStatus();
    const { mutate: inactivateStatus } = useInactivateStatus();

    return {
        pageTitle: "STATUSES",
        pageSubtitle: "Welcome to your statuses page",
        rowIdField : 'id_status',
        gridData : gridData || [],
        isPending,
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
                field: "colorCode",
                headerName: "COLOR",
                editable: true,
                flex: 0.6,
                renderEditCell: (params) => (
                    <ColorPickerCell
                        value={params.value}
                        onChange={(hex) => params.api.setEditCellValue({ id: params.id, field: "colorCode", value: hex })}
                    />
                ),
                renderCell: (params) => {
                    if (!params.value) return "—";
                    return (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Box sx={{
                                width: 16, height: 16, borderRadius: "3px",
                                backgroundColor: params.value,
                                border: "1px solid rgba(0,0,0,0.2)",
                                flexShrink: 0,
                            }} />
                            <Typography variant="caption" sx={{ fontFamily: "monospace" }}>{params.value}</Typography>
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
            "colorCode": null,
            "terminalStatus": false,
            "flagActive": true
        }
    };
}
