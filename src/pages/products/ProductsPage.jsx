import React, { useState } from "react";
import { ProductsStore } from "./ProductsStore";
import { Box, Grid } from "@mui/material";
import Header from "../../components/Header";
import DataTable from "../../components/DataTable";
import ProductForm from "./components/ProductForm";

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
                addRecordComponent={({ initialData, onChange }) => ( <ProductForm initialData={initialData} onChange={onChange}/> )}
                editRecordComponent={({ initialData, onChange }) => ( <ProductForm initialData={initialData} onChange={onChange} /> )}
                allowRowEditOnGrid={false}
            />
        </Box>
    )
}

export default ProductsPage;