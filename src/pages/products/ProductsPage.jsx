import React from "react";
import { ProductsStore } from "./ProductsStore";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import DataTable from "../../components/DataTable";

const ProductsPage = () => {
    const {pageTitle, pageSubtitle, columnsDefinition, rowIdField, sampleRow, gridData, updateHook, deleteHook} = ProductsStore();

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
        />
        </Box>
    )
}

export default ProductsPage;