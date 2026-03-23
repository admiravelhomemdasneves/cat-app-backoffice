import { useGetPriorities } from "../../api/priorities/getPriorities";
import { useUpdatePriority, useInactivatePriority } from "../../api/priorities/createPriorities";
import { useGetColors } from "../../api/colors/getColors";
import { useCreateColor } from "../../api/colors/createColors";
import ColorAutocompleteCell from "../../components/ColorAutocompleteCell";
import { Box } from "@mui/material";

export const PrioritiesStore = () => {
    const gridData = useGetPriorities();
    const colors = useGetColors();
    const { mutate: updatePriority } = useUpdatePriority();
    const { mutate: inactivatePriority } = useInactivatePriority();
    const { mutate: createColor } = useCreateColor();

    const handleCreateColor = (newColor, cb) => {
        createColor(newColor, {
            onSuccess: (response) => cb(response.data)
        });
    };

    return {
        pageTitle: "PRIORITIES",
        pageSubtitle: "Welcome to your priorities page",
        rowIdField: 'id_priority',
        gridData: gridData || [],
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
        ],
        sampleRow: {
            id_priority: null,
            name: "",
            color: null,
            description: "",
            flagActive: true
        }
    };
}