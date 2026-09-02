import { useGetStores } from "../../api/stores/getStores";
import { useGetVats } from "../../api/vats/getVats";
import { useCreateVat } from "../../api/vats/createVats";
import { Box, Typography } from "@mui/material";

export const ProductParametersStore = () => {
    const storeOptions = useGetStores() || [];
    const vatOptions = useGetVats() || [];
    const { mutate: createVat } = useCreateVat();

    return {
        rowIdField: "idProductParameter",
        storeOptions,
        vatOptions,
        createVat,
        columnsDefinition: [
            { field: "sku", headerName: "SKU", flex: 1 },
            { field: "size", headerName: "SIZE", flex: 1 },
            {
                field: "store",
                headerName: "STORE",
                flex: 1,
                valueFormatter: (value) => value?.name ?? "N/A",
            },
            {
                field: "colorName",
                headerName: "COLOR",
                flex: 1,
                renderCell: (params) => {
                    const colorCode = params.row.colorCode;
                    const colorName = params.row.colorName;
                    if (!colorCode && !colorName) return "N/A";
                    return (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, height: "100%" }}>
                            {colorCode && (
                                <Box sx={{
                                    width: 16, height: 16, borderRadius: "3px",
                                    backgroundColor: colorCode,
                                    border: "1px solid rgba(0,0,0,0.2)",
                                    flexShrink: 0,
                                }} />
                            )}
                            <Typography variant="body2">{colorName || colorCode}</Typography>
                        </Box>
                    );
                },
                valueFormatter: (value) => value ?? "N/A",
            },
            {
                field: "vat",
                headerName: "VAT",
                flex: 1,
                valueFormatter: (value) => value ? `${value.country} - ${(value.vatRate * 100).toFixed(0)}%` : "N/A",
            },
            {
                field: "price",
                headerName: "PRICE",
                flex: 1,
                valueFormatter: (value) => value ? `${value.price} ${value.currency}` : "N/A",
            },
            { field: "imageUrl", headerName: "IMAGE URL", flex: 1 },
            {
                field: "defaultSku",
                headerName: "DEFAULT SKU",
                flex: 1,
                valueFormatter: (value) => value ? "Yes" : "No",
            },
        ],
        sampleRow: {
            idProductParameter: null,
            sku: "",
            size: "",
            store: null,
            colorName: "",
            colorCode: null,
            vat: null,
            price: null,
            imageUrl: "",
            defaultSku: false,
            flagActive: true,
        },
    };
};
