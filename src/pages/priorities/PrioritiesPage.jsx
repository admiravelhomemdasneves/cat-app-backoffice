import React from "react";
import { PrioritiesStore } from "./PrioritiesStore";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import DataTable from "../../components/DataTable";
import { usePagePermission } from "../../hooks/usePagePermission";

const PrioritiesPage = () => {
    const {pageTitle, pageSubtitle, columnsDefinition, rowIdField, sampleRow, gridData, isPending, updateHook, deleteHook} = PrioritiesStore();
    const { canCreate, canEdit, canDelete } = usePagePermission('/orderPriority');

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
                allowAdd={canCreate}
                allowEdit={canEdit}
                allowDelete={canDelete}
            />
        </Box>
        </Box>
    )
}

export default PrioritiesPage;