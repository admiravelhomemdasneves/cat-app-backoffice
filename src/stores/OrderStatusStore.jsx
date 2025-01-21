import { randomInt } from '@mui/x-data-grid-generator';
import Services from "../api/services";
import apiClient from "../api/apiClient";

const OrderStatusStore = {

    pageTitle : "ORDER STATUS",

    pageSubtitle : "Welcome to your order's statuses page",
    
    orderStatusColumns : [
        { field: "id_status", headerName: "ID" },
        {
            field: "name",
            headerName: "NAME",
            flex: 1,
            cellClassName: "name-column--cell",
            editable: true,
        },
        { field: "description", headerName: "DESCRIPTION", flex: 1, editable: true },
    ],

    visibilityModel: {
        "id_status" : false
    },

    idField : "id_status",

    sampleRow : { id_status: randomInt(), name: "", description: ""},

    GetOrderStatus: async (setData) => {
        //const result = await Services.FindAllRequest(Services.GET_ALL_ORDER_STATUS);
        const result = await apiClient.get(Services.GET_ALL_ORDER_STATUS, null);
        setData(result);
    },
    
    DeleteOrderStatus: async (id) => {
        //await Services.DeleteRequest(Services.DELETE_ID_ORDER_STATUS, id);
        await apiClient.delete(Services.DELETE_ID_ORDER_STATUS + `/${id}`);
    },

    SaveOrderStatus: async (updatedRow) => {
        //await Services.SaveRequest(Services.PUT_ID_ORDER_STATUS, updatedRow);
        await apiClient.put(Services.PUT_ID_ORDER_STATUS, updatedRow);
    },
}

  export default OrderStatusStore;