import { randomInt } from '@mui/x-data-grid-generator';
import Services from "../api/services";
import apiClient from "../api/apiClient";

const ContactsStore = {

    pageTitle : "CONTACTS",

    pageSubtitle : "Welcome to your contacts page",
    
    contactsColumns : [
        { field: "id_contact", headerName: "ID" },
        {
            field: "first_name",
            headerName: "NAME",
            flex: 1,
            cellClassName: "name-column--cell",
            editable: true,
        },
        { field: "last_name", headerName: "SURNAME", flex: 1, editable: true },
        { field: "street", headerName: "STREET", flex: 1, editable: true },
        {
            field: "door_number",
            headerName: "DOOR NUMBER",
            headerAlign: "left",
            align: "left",
            flex: 1,
            editable: true,
        },
        {
            field: "zip_code",
            headerName: "ZIPCODE",
            headerAlign: "left",
            align: "left",
            flex: 1,
            editable: true,
        },
        { field: "city", headerName: "CITY", flex: 1, editable: true },
        { field: "country", headerName: "COUNTRY", flex: 1, editable: true },
        { field: "flagActive", headerName: "ACTIVE", flex: 1, editable: false },
    ],

    visibilityModel: {
        "id_contact" : false,
        "flagActive" : false
    },

    idField : "id_contact",

    sampleRow : { id_contact: randomInt(), first_name: "", last_name: "", street: "", door_number: "", zip_code: "", city: "", country: "", flagActive: true},

    GetContacts: async (setData) => {
        const result = await apiClient.get(Services.GET_ALL_CONTACTS, null);
        setData(result);
    },
    
    DeleteContact: async (id) => {
        await apiClient.get(Services.INACTIVATE_CONTACT + `/${id}`);
    },

    SaveContact: async (updatedRow) => {
        await apiClient.put(Services.PUT_ID_CONTACT, updatedRow);
    },
}

  export default ContactsStore;