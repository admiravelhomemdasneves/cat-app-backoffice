import React from "react";
import ContactsStore from "../stores/ContactsStore";
import DataTable from "../components/DataTable";

const ContactsPage = () => {
  return (
    <DataTable 
      storeGet = { ContactsStore.GetContacts }
      storeDelete = { ContactsStore.DeleteContact}
      storeSave = { ContactsStore.SaveContact }
      idField = { ContactsStore.idField }
      sampleRow = { ContactsStore.sampleRow}
      contentColumns = { ContactsStore.contactsColumns }
      visibilityModel = { ContactsStore.visibilityModel }
      pageTitle = { ContactsStore.pageTitle }
      pageSubtitle = { ContactsStore.pageSubtitle }
    />
  )
};

export default ContactsPage;
