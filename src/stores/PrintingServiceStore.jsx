import { randomInt } from '@mui/x-data-grid-generator';
import Services from "../api/services";
import apiClient from "../api/apiClient";

const PrintingServiceStore = {

    pageTitle : "PRINTING SERVICE",

    pageSubtitle : "Welcome to your printing services page",
    
    printingServiceColumns : [
        { field: "id_printing_service", headerName: "ID" },
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
        "id_printing_service" : false
    },

    idField : "id_printing_service",

    sampleRow : { id_printing_service: randomInt(), name: "", description: ""},

    GetPrintingService: async (setData) => {
        //const result = await Services.FindAllRequest(Services.GET_ALL_PRINTING_SERVICE);
        const result = await apiClient.get(Services.GET_ALL_PRINTING_SERVICE, null);
        setData(result);
    },
    
    DeletePrintingService: async (id) => {
        //await Services.DeleteRequest(Services.DELETE_ID_PRINTING_SERVICE, id);
        await apiClient.delete(Services.DELETE_ID_PRINTING_SERVICE + `/${id}`);
    },

    SavePrintingService: async (updatedRow) => {
        //await Services.SaveRequest(Services.PUT_ID_PRINTING_SERVICE, updatedRow);
        await apiClient.put(Services.PUT_ID_PRINTING_SERVICE, updatedRow);
    },
}

  export default PrintingServiceStore;