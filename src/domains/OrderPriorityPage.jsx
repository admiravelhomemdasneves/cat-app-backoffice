import React from "react";
import OrderPriorityStore from "../stores/OrderPriorityStore";
import DataTable from "../components/DataTable";

const OrderPriorityPage = () => {
  return (
    <DataTable 
      storeGet = { OrderPriorityStore.GetOrderPriority }
      storeDelete = { OrderPriorityStore.DeleteOrderPriority}
      storeSave = { OrderPriorityStore.SaveOrderPriority }
      idField = { OrderPriorityStore.idField }
      sampleRow = { OrderPriorityStore.sampleRow}
      contentColumns = { OrderPriorityStore.orderPriorityColumns }
      visibilityModel = { OrderPriorityStore.visibilityModel }
      pageTitle = { OrderPriorityStore.pageTitle }
      pageSubtitle = { OrderPriorityStore.pageSubtitle }
    />
  )
};

export default OrderPriorityPage;
