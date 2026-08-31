import React from "react";
import { ProductsStore } from "./ProductsStore";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import DataTable from "../../components/DataTable";
import ProductForm from "./components/ProductForm";
import { usePagePermission } from "../../hooks/usePagePermission";

const ProductsPage = () => {
    const {pageTitle, pageSubtitle, columnsDefinition, rowIdField, sampleRow, gridData, isPending, updateHook, deleteHook} = ProductsStore();
    const { canCreate, canEdit, canDelete } = usePagePermission('/products');

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
                    addRecordComponent={({ initialData, onChange }) => ( <ProductForm initialData={initialData} onChange={onChange}/> )}
                    editRecordComponent={({ initialData, onChange }) => ( <ProductForm initialData={initialData} onChange={onChange} /> )}
                    allowRowEditOnGrid={false}
                    allowAdd={canCreate}
                    allowEdit={canEdit}
                    allowDelete={canDelete}
                />
            </Box>
        </Box>
    )
}

export default ProductsPage;