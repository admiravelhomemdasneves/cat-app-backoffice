import React, { useState } from "react";
import { OrdersStore, OrderDetailStore } from "./OrdersStore";
import { Box, Grid } from "@mui/material";
import Header from "../../components/Header";
import DataTable from "../../components/DataTable";
import OrderDetailsView from "./components/OrderDetailsView";

const OrdersPage = () => {
  const {pageTitle, pageSubtitle, columnsDefinition, rowIdField, sampleRow, gridData, updateHook, deleteHook, contactOptions, statusOptions, prioritiesOptions} = OrdersStore();
  const {detailRowIdField, detailUpdateHook, detailDeleteHook, detailColumnsDefinition, detailSampleRow} = OrderDetailStore();
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const selectedOrder = gridData.find(o => o[rowIdField] === selectedOrderId) ?? null;

  const gridSize = selectedOrder ? 5 : 12;

  return (
    <Box p={2}>
      <Header 
        title={pageTitle} 
        subtitle={pageSubtitle} 
      />
      <Grid container spacing={2}>
        <Grid item xs={gridSize}>
          <DataTable
            gridData={gridData}
            columnsDefinition={columnsDefinition}
            sampleRow={sampleRow}
            rowIdField={rowIdField}
            updateHook={updateHook}
            deleteHook={deleteHook}
            onRowSelection={(row) => setSelectedOrderId(row?.[rowIdField] ?? null)}
          />
        </Grid>
        {selectedOrder && (
          <Grid item xs={12 - gridSize}>
            <OrderDetailsView 
              order={selectedOrder}
              columnsDefinition={detailColumnsDefinition}
              sampleRow={detailSampleRow}
              rowIdField={detailRowIdField}
              orderUpdateHook={updateHook}
              productUpdateHook={detailUpdateHook}
              productDeleteHook={detailDeleteHook}
              contactOptions={contactOptions}
              statusOptions={statusOptions}
              prioritiesOptions={prioritiesOptions}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  )
};

export default OrdersPage;