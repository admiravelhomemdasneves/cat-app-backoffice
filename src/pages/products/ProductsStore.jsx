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
                flex: 1
            },
            {
                field: "brand",
                headerName: "BRAND",
                editable: true,
                flex: 1
            },
            {
                field: "store",
                headerName: "STORE",
                editable: true,
                flex: 1
            },
            {
                field: "sku",
                headerName: "SKU",
                editable: true,
                flex: 1
            },
            {
                field: "catalogReference",
                headerName: "REFERENCE",
                editable: true,
                flex: 1
            },
            {
                field: "product_type",
                headerName: "PRODUCT TYPE",
                editable: true,
                flex: 1
            },
            {
                field: "size",
                headerName: "SIZE",
                editable: true,
                flex: 1
            },
            {
                field: "colorName",
                headerName: "COLOR",
                editable: true,
                flex: 1
            },
            {
                field: "colorCode",
                headerName: "COLOR CODE",
                editable: true,
                flex: 1
            },
            {
                field: "description",
                headerName: "DESCRIPTION",
                editable: true,
                flex: 1
            },
            {
                field: "price",
                headerName: "PRICE",
                editable: true,
                flex: 1
            },
            {
                field: "vat",
                headerName: "VAT",
                editable: true,
                flex: 1
            },
            {
                field: "imageUrl",
                headerName: "IMAGE URL",
                editable: true,
                flex: 1
            }
        ],
        sampleRow: {
            "id_product": null,
            "name": "",
            "brand": "",
            "productType": "",
            "size": "",
            "colorName": null,
            "colorCode": null,
            "description": "",
            "sku": "",
            "catalogReference": "",
            "store": null,
            "price": null,
            "vat": null,
            "imageUrl": null,
            "flagActive": true
        }
    };
}