import { useGetProducts } from "../../api/products/getProducts";
import { useUpdateProduct, useInactivateProduct } from "../../api/products/createProducts";

export const ProductsStore = () => {
    const gridData = useGetProducts();
    const { mutate: updateProduct } = useUpdateProduct();
    const { mutate: inactivateProduct } = useInactivateProduct();
    
    return {
        pageTitle: "PRODUCTS",
        pageSubtitle: "Welcome to your products page",
        rowIdField : 'id_product',
        gridData : gridData || [],
        updateHook : updateProduct,
        deleteHook : inactivateProduct,
        columnsDefinition: [
            {
                field: "name",
                headerName: "NAME",
                editable: true,
            },
            {
                field: "brand",
                headerName: "BRAND",
                editable: true,
            },
            {
                field: "product_type",
                headerName: "PRODUCT TYPE",
                editable: true,
            },
            {
                field: "description",
                headerName: "DESCRIPTION",
                editable: true,
            },
        ],
        sampleRow: {
            "id_product": null,
            "name": "",
            "brand": "",
            "product_type": "",
            "description": "",
            "flagActive": true
        }
    };
}