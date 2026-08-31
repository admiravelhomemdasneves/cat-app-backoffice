import React from "react";
import { RolesStore } from "./RolesStore";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import DataTable from "../../components/DataTable";
import RolePermissionForm from "./components/RolePermissionForm";
import { usePagePermission } from "../../hooks/usePagePermission";

const RolesPage = () => {
    const { pageTitle, pageSubtitle, columnsDefinition, rowIdField, sampleRow, gridData, isPending, updateHook, deleteHook } = RolesStore();
    const { canCreate, canEdit, canDelete } = usePagePermission('/roles');

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
                        <RolePermissionForm initialData={initialData} onChange={onChange} />
                    )}
                    editRecordComponent={({ initialData, onChange }) => (
                        <RolePermissionForm initialData={initialData} onChange={onChange} />
                    )}
                    allowRowEditOnGrid={false}
                    allowAdd={canCreate}
                    allowEdit={canEdit}
                    allowDelete={canDelete}
                />
            </Box>
        </Box>
    );
};

export default RolesPage;
