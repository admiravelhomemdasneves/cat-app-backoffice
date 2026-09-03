import React from "react";
import { ColaboratorsStore } from "./ColaboratorsStore";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import DataTable from "../../components/DataTable";
import ColaboratorForm from "./components/ColaboratorForm";
import { usePagePermission } from "../../hooks/usePagePermission";

const ColaboratorsPage = () => {
    const { pageTitle, pageSubtitle, columnsDefinition, rowIdField, sampleRow, gridData, isPending, updateHook, deleteHook } = ColaboratorsStore();
    const { canCreate, canEdit, canDelete } = usePagePermission('/colaborators');

    return (
        <Box p={2}>
            <Header title={pageTitle} subtitle={pageSubtitle} />
            <Box sx={{ flex: 1, height: '700px' }}>
                <DataTable
                    gridData={gridData}
                    columnsDefinition={columnsDefinition}
                    sampleRow={sampleRow}
                    rowIdField={rowIdField}
                    updateHook={updateHook}
                    deleteHook={deleteHook}
                    loading={isPending}
                    addRecordComponent={({ initialData, onChange }) => (
                        <ColaboratorForm initialData={initialData} onChange={onChange} />
                    )}
                    editRecordComponent={({ initialData, onChange }) => (
                        <ColaboratorForm initialData={initialData} onChange={onChange} />
                    )}
                    allowRowEditOnGrid={false}
                    allowAdd={canCreate}
                    allowEdit={canEdit}
                    allowDelete={canDelete}
                    allowDuplicate={false}
                />
            </Box>
        </Box>
    );
};

export default ColaboratorsPage;
