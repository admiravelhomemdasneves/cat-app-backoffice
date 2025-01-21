import { randomInt } from '@mui/x-data-grid-generator';
import Services from "../api/services";
import apiClient from "../api/apiClient";

const OrderPriorityStore = {

    pageTitle : "ORDER PRIORITY",

    pageSubtitle : "Welcome to your order's priorities page",
    
    orderPriorityColumns : [
        { field: "id_priority", headerName: "ID" },
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
        "id_priority" : false
    },

    idField : "id_priority",

    sampleRow : { id_priority: randomInt(), name: "", description: ""},

    GetOrderPriority: async (setData) => {
        //const result = await Services.FindAllRequest(Services.GET_ALL_ORDER_PRIORITY);
        const result = await apiClient.get(Services.GET_ALL_ORDER_PRIORITY, null);
        setData(result);
    },
    
    DeleteOrderPriority: async (id) => {
        //await Services.DeleteRequest(Services.DELETE_ID_ORDER_PRIORITY, id);
        await apiClient.delete(Services.DELETE_ID_ORDER_PRIORITY + `/${id}`);
    },

    SaveOrderPriority: async (updatedRow) => {
        //await Services.SaveRequest(Services.PUT_ID_ORDER_PRIORITY, updatedRow);
        await apiClient.put(Services.PUT_ID_ORDER_PRIORITY, updatedRow);
    },
}

  export default OrderPriorityStore;