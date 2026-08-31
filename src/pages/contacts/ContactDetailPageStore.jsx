import { useGetContactById } from "../../api/contacts/getContactById";
import { useUpdateContact } from "../../api/contacts/createContacts";

export const ContactDetailPageStore = (contactId, initialContact = null) => {
    const { data: fetchedContact, isPending: fetchPending } = useGetContactById(contactId, { enabled: !initialContact });
    const contact = initialContact ?? fetchedContact;
    const isPending = !initialContact && fetchPending;
    const { mutate: updateContact } = useUpdateContact();

    return { isPending, contact, updateContact };
};
