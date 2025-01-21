import React from "react";
import OrderStatusStore from "../stores/OrderStatusStore";
import DataTable from "../components/DataTable";

const OrderStatusPage = () => {
  return (
    <DataTable 
      storeGet = { OrderStatusStore.GetOrderStatus }
      storeDelete = { OrderStatusStore.DeleteOrderStatus}
      storeSave = { OrderStatusStore.SaveOrderStatus }
      idField = { OrderStatusStore.idField }
      sampleRow = { OrderStatusStore.sampleRow}
      contentColumns = { OrderStatusStore.orderStatusColumns }
      visibilityModel = { OrderStatusStore.visibilityModel }
      pageTitle = { OrderStatusStore.pageTitle }
      pageSubtitle = { OrderStatusStore.pageSubtitle }
    />
  )
};

export default OrderStatusPage;
