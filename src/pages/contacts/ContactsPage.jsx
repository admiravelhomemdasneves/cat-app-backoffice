import React from "react";
import { ContactsStore } from "./ContactsStore";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import DataTable from "../../components/DataTable";
import ContactForm from "./components/ContactForm";
import { usePagePermission } from "../../hooks/usePagePermission";

const ContactsPage = () => {
    const {pageTitle, pageSubtitle, columnsDefinition, rowIdField, sampleRow, gridData, isPending, updateHook, deleteHook} = ContactsStore();
    const { canCreate, canEdit, canDelete } = usePagePermission('/contacts');

    return (
        <Box p={2}>
        <Header
            title={pageTitle}
            subtitle={pageSubtitle}
        />
            <Box sx={{ flex: 1, height: '700px' }}>
                <DataTable
                    gridData={gridData}
                    columnsDefinition={columnsDefinition}
                    sampleRow={sampleRow}
                    rowIdField={rowIdField}
                    updateHook={updateHook}
                    deleteHook={deleteHook}
                    loading={isPending}
                    addRecordComponent={({ initialData, onChange }) => ( <ContactForm initialData={initialData} onChange={onChange}/> )}
                    editRecordComponent={({ initialData, onChange }) => ( <ContactForm initialData={initialData} onChange={onChange} /> )}
                    allowRowEditOnGrid={false}
                    allowAdd={canCreate}
                    allowEdit={canEdit}
                    allowDelete={canDelete}
                />
            </Box>
        </Box>
    )
}

export default ContactsPage;