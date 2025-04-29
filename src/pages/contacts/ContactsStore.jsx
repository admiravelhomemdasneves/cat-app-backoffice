import { useGetContacts } from "../../api/contacts/getContacts";
import { useUpdateContact } from "../../api/contacts/createContacts";
import { useInactivateContact } from "../../api/contacts/createContacts";

export const ContactsStore = () => {
    const gridData = useGetContacts();
    const { mutate: updateContact } = useUpdateContact();
    const { mutate: inactivateOrder } = useInactivateContact();
    
    return {
        pageTitle: "CONTACTS",
        pageSubtitle: "Welcome to your contacts page",
        rowIdField : 'id_contact',
        gridData : gridData || [],
        updateHook : updateContact,
        deleteHook : inactivateOrder,
        columnsDefinition: [
            {
                field: "first_name",
                headerName: "FIRST NAME",
                editable: true,
            },
            {
                field: "last_name",
                headerName: "LAST NAME",
                editable: true,
            },
        ],
        sampleRow: {
            "id_contact": null,
            "first_name": "",
            "last_name": "",
            "flagActive": true
        }
    };
}