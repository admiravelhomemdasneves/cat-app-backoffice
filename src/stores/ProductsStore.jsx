import { randomInt } from '@mui/x-data-grid-generator';
import Services from "../api/services";
import apiClient from "../api/apiClient";

const ProductsStore = {

    pageTitle : "PRODUCTS",

    pageSubtitle : "Welcome to your products page",
    
    productsColumns : [
        { field: "id_product", headerName: "ID" },
        {
            field: "name",
            headerName: "MODEL",
            flex: 1,
            cellClassName: "name-column--cell",
            editable: true,
        },
        {
            field: "brand",
            headerName: "BRAND",
            flex: 1,
            editable: true,
        },
        {
            field: "productType",
            headerName: "PRODUCT TYPE",
            flex: 1,
            editable: true,
        },
        { field: "description", headerName: "DESCRIPTION", flex: 1, editable: true },
    ],

    visibilityModel: {
        "id_product" : false
    },

    idField : "id_product",

    sampleRow : { id_product: randomInt(), name: "", description: ""},

    GetProducts: async (setData) => {
        //const result = await Services.FindAllRequest(Services.GET_ALL_PRODUCTS);
        const result = await apiClient.get(Services.GET_ALL_PRODUCTS, null);
        setData(result);
    },
    
    DeleteProducts: async (id) => {
        //await Services.DeleteRequest(Services.DELETE_ID_PRODUCT, id);
        await apiClient.delete(Services.DELETE_ID_PRODUCT + `/${id}`);
    },

    SaveProducts: async (updatedRow) => {
        //await Services.SaveRequest(Services.PUT_ID_PRODUCT, updatedRow);
        await apiClient.put(Services.PUT_ID_PRODUCT, updatedRow);
    },
}

  export default ProductsStore;