import React, { useState } from "react";
import { OrdersStore, OrderDetailStore } from "./OrdersStore";
import { useRecalculateOrder } from "../../api/orders/createOrder";
import { Box, Grid } from "@mui/material";
import Header from "../../components/Header";
import DataTable from "../../components/DataTable";
import OrderDetailsView from "./components/OrderDetailsView";
import { usePagePermission } from "../../hooks/usePagePermission";

const OrdersPage = () => {
  const {pageTitle, pageSubtitle, columnsDefinition, rowIdField, sampleRow, gridData, isPending, updateHook, deleteHook, contactOptions, statusOptions, prioritiesOptions, contactUpdateHook} = OrdersStore();
  const {
    contentsRowIdField, contentsUpdateHook, contentsDeleteHook, contentsColumnsDefinition, contentsSampleRow,
  } = OrderDetailStore();
  const { mutate: recalculateOrder } = useRecalculateOrder();
  const { canCreate, canEdit, canDelete } = usePagePermission('/orders');
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
          <Box sx={{ flex: 1, height: '700px' }}>
            <DataTable
              gridData={gridData}
              columnsDefinition={columnsDefinition}
              sampleRow={sampleRow}
              rowIdField={rowIdField}
              updateHook={updateHook}
              deleteHook={deleteHook}
              loading={isPending}
              onRowSelection={(row) => setSelectedOrderId(row?.[rowIdField] ?? null)}
              allowAdd={canCreate}
              allowEdit={canEdit}
              allowDelete={canDelete}
            />
          </Box>
        </Grid>
        {selectedOrder && (
          <Grid item xs={12 - gridSize}>
            <OrderDetailsView
              order={selectedOrder}
              orderUpdateHook={updateHook}
              contactUpdateHook={contactUpdateHook}
              recalculateHook={recalculateOrder}
              contactOptions={contactOptions}
              statusOptions={statusOptions}
              prioritiesOptions={prioritiesOptions}
              contentsColumnsDefinition={contentsColumnsDefinition}
              contentsSampleRow={contentsSampleRow}
              contentsRowIdField={contentsRowIdField}
              contentsUpdateHook={contentsUpdateHook}
              contentsDeleteHook={contentsDeleteHook}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  )
};

export default OrdersPage;
