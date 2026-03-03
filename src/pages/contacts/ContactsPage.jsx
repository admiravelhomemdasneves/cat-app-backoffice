import React from "react";
import { ContactsStore } from "./ContactsStore";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import DataTable from "../../components/DataTable";
import ContactForm from "./components/ContactForm";

const ContactsPage = () => {
    const {pageTitle, pageSubtitle, columnsDefinition, rowIdField, sampleRow, gridData, updateHook, deleteHook} = ContactsStore();

    return (
        <Box p={2}>
        <Header 
            title={pageTitle} 
            subtitle={pageSubtitle} 
        />
            <DataTable
                gridData={gridData}
                columnsDefinition={columnsDefinition}
                sampleRow={sampleRow}
                rowIdField={rowIdField}
                updateHook={updateHook}
                deleteHook={deleteHook}
                addRecordComponent={({ initialData, onChange }) => (
                    <ContactForm initialData={initialData} onChange={onChange} />
                )}
                editRecordComponent={({ initialData, onChange }) => (
                    <ContactForm initialData={initialData} onChange={onChange} />
                )}
                allowRowEditOnGrid={false}
            />
        </Box>
    )
}

export default ContactsPage;