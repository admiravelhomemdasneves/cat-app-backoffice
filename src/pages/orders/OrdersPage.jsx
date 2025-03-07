import React from "react";
import OrdersStore from "./OrdersStore";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import DataTable from "../../components/DataTable";

const OrdersPage = () => {
  const { pageTitle, pageSubtitle, columnsDefinition, rowIdField, sampleRow, gridData, createHook, updateHook, deleteHook } = OrdersStore();

  return (
    <Box p={2}>
      <Header 
        title={ pageTitle } 
        subtitle={ pageSubtitle } 
      />
      <DataTable
        gridData={gridData}
        columnsDefinition={columnsDefinition}
        sampleRow={sampleRow}
        rowIdField={rowIdField}
        createHook={createHook}
        updateHook={updateHook}
        deleteHook={deleteHook}
      />
    </Box>
  )
};

export default OrdersPage;