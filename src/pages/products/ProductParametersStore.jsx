import { useGetStores } from "../../api/stores/getStores";
import { useGetColors } from "../../api/colors/getColors";
import { useGetVats } from "../../api/vats/getVats";
import { useCreateColor } from "../../api/colors/createColors";
import { useCreateVat } from "../../api/vats/createVats";

export const ProductParametersStore = () => {
    const storeOptions = useGetStores() || [];
    const colorOptions = useGetColors() || [];
    const vatOptions = useGetVats() || [];
    const { mutate: createColor } = useCreateColor();
    const { mutate: createVat } = useCreateVat();

    return {
        rowIdField: "idProductParameter",
        storeOptions,
        colorOptions,
        vatOptions,
        createColor,
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
                field: "color",
                headerName: "COLOR",
                flex: 1,
                valueFormatter: (value) => value?.colorName ?? "N/A",
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
            color: null,
            vat: null,
            price: null,
            imageUrl: "",
            defaultSku: false,
            flagActive: true,
        },
    };
};