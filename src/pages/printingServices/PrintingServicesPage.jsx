import React from "react";
import { PrintingServicesStore } from "./PrintingServicesStore";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import DataTable from "../../components/DataTable";

const PrintingServicesPage = () => {
    const {pageTitle, pageSubtitle, columnsDefinition, rowIdField, sampleRow, gridData, updateHook, deleteHook} = PrintingServicesStore();

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
            />
        </Box>
        </Box>
    )
}

export default PrintingServicesPage;