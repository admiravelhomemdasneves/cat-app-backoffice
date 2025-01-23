import { randomInt } from "@mui/x-data-grid-generator";
import Services from "../api/services";
import { Box } from "@mui/material";
import Link from '@mui/material/Link';
import apiClient from "../api/apiClient";

const OrdersStore = {

  pageTitle: "ORDERS",

  pageSubtitle: "Welcome to your orders page",

  orderColumns: [
    { field: "id_order", headerName: "ID" },
    {
      field: "name",
      headerName: "NAME",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true,
      renderCell: (params) => (
        <Link href={`/orders/${params.id}`} color="secondary"> {params.value} </Link>
      ),
    },
    {
      field: "description",
      headerName: "DESCRIPTION",
      flex: 1,
      editable: true,
    },
    {
      field: "orderStatus",
      headerName: "STATUS",
      flex: 1,
      editable: true,
      type: "singleSelect",
      valueGetter: (params) => params.value,
      getOptionValue: (value) => value.id_status,
      getOptionLabel: (value) => value.name,
    },
    {
      field: "contact",
      headerName: "CLIENT",
      flex: 1,
      editable: true,
      type: "singleSelect",
      valueGetter: (params) => params.value,
      getOptionValue: (value) => value.id_contact,
      getOptionLabel: (value) => value.name,
    },
    {
      field: "orderPriority",
      headerName: "PRIORITY",
      flex: 1,
      editable: true,
      type: "singleSelect",
      valueGetter: (params) => params.value,
      getOptionValue: (value) => value.id_priority,
      getOptionLabel: (value) => value.name,
    },
    {
      field: "date_requested",
      headerName: "CREATION DATE",
      flex: 1,
      editable: false,
      type: "dateTime",
      valueGetter: ({ value }) => value && new Date(value),
      valueFormatter: (params) => {
        const { value } = params;

        if (value !== null) {
          if (value instanceof Date) {
            return value.toLocaleString("en-US", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            });
          }
        }
        return "";
      },
    },
    {
      field: "other",
      headerName: "OTHER",
      flex: 1,
      filterable: false,
      hideable: false,
      renderCell: ({row}) => {
        return (
          <Box>Ok!</Box>
        )
      }
    }
  ],

  visibilityModel: {
      "id_order" : false
  },

  idField: "id_order",

  sampleRow: { id_order: randomInt(), name: "", description: "", orderStatus: "", contact: "", orderPriority: "", date_requested: ""},

  GetOrder: async (setData) => {
    //const result = await Services.FindAllRequest(Services.GET_ALL_ORDERS);
    const result = await apiClient.get(Services.GET_ALL_ORDERS, null);
    
    // Transform each object to its Id
    const newResult = result.map((item) => ({
      ...item,
      contact: item.contact ? item.contact.id_contact : null,
      orderStatus: item.orderStatus ? item.orderStatus.id_status : null,
      orderPriority: item.orderPriority ? item.orderPriority.id_priority : null,
    }));

    console.log("NEW RESULT", newResult);
    setData(newResult);
  },

  DeleteOrder: async (id) => {
    //await Services.DeleteRequest(Services.DELETE_ID_ORDER, id);
    await apiClient.delete(Services.DELETE_ID_ORDER + `/${id}`);
  },

  SaveOrder: async (updatedRow) => {
    //await Services.SaveRequest(Services.PUT_ID_ORDER, updatedRow);
    await apiClient.put(Services.PUT_ID_ORDER, updatedRow);
  },
};

export default OrdersStore;
