import { useGetProducts } from "../../api/products/getProducts";
import { useUpdateProduct, useInactivateProduct } from "../../api/products/createProducts";
import { createIdLinkColumn } from "../../utils/columnHelpers";

export const ProductsStore = () => {
    const { data: gridData, isPending } = useGetProducts();
    const { mutate: updateProduct } = useUpdateProduct();
    const { mutate: inactivateProduct } = useInactivateProduct();

    return {
        pageTitle: "PRODUCTS",
        pageSubtitle: "Welcome to your products page",
        rowIdField: 'idProduct',
        gridData: gridData || [],
        isPending,
        updateHook: updateProduct,
        deleteHook: inactivateProduct,
        columnsDefinition: [
            createIdLinkColumn({ field: 'idProduct', pathPrefix: 'products', headerName: 'ID', getState: (row) => ({ product: row }) }),
            {
                field: "catalogReference",
                headerName: "REFERENCE",
                editable: true,
                flex: 1
            },
            {
                field: "name",
                headerName: "NAME",
                editable: true,
                flex: 1
            },
            {
                field: "brand",
                headerName: "BRAND",
                editable: true,
                flex: 1
            },
            {
                field: "productType",
                headerName: "PRODUCT TYPE",
                editable: true,
                flex: 1
            },
            {
                field: "description",
                headerName: "DESCRIPTION",
                editable: true,
                flex: 1
            },
        ],
        sampleRow: {
            idProduct: null,
            catalogReference: "",
            name: "",
            brand: "",
            productType: "",
            description: "",
            parameters: [],
            flagActive: true
        }
    };
}