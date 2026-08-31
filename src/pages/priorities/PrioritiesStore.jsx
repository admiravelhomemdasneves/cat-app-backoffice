import { useGetPriorities } from "../../api/priorities/getPriorities";
import { useUpdatePriority, useInactivatePriority } from "../../api/priorities/createPriorities";
import ColorPickerCell from "../../components/ColorPickerCell";
import { Box, Typography } from "@mui/material";

export const PrioritiesStore = () => {
    const { data: gridData, isPending } = useGetPriorities();
    const { mutate: updatePriority } = useUpdatePriority();
    const { mutate: inactivatePriority } = useInactivatePriority();

    return {
        pageTitle: "PRIORITIES",
        pageSubtitle: "Welcome to your priorities page",
        rowIdField: 'id_priority',
        gridData: gridData || [],
        isPending,
        updateHook: updatePriority,
        deleteHook: inactivatePriority,
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
        ],
        sampleRow: {
            id_priority: null,
            name: "",
            colorCode: null,
            description: "",
            flagActive: true
        }
    };
}
