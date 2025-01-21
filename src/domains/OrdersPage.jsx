import React, { useState, useEffect } from "react";
import Services from "../api/services";
import OrdersStore from "../stores/OrdersStore";
import DataTable from "../components/DataTable";
import apiClient from "../api/apiClient";

const OrdersPage = () => {
  const [status, setStatus] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [priorities, setPriorities] = useState([]);

  //Fetch Options For SingleSelect Columns
  const fetchData = async () => {
    try {
      const statusFetch = await apiClient.get(Services.GET_ALL_ORDER_STATUS, null);
      setStatus(statusFetch);
    
      const contactsFetch = await apiClient.get(Services.GET_ALL_CONTACTS, null);
      setContacts(contactsFetch);
    
      const prioritiesFetch = await apiClient.get(Services.GET_ALL_ORDER_PRIORITY, null);
      setPriorities(prioritiesFetch);
    } catch (error) {
      console.log("ERROR: ", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array means this effect runs only once on mount

  //Update Options Of Columns With Single Select
  const updatedColumns = OrdersStore.orderColumns.map(column => {
    //Update valueOptions to show info from the database in singleSelect columns
    if (column.field === "orderStatus") { return {...column, valueOptions: [{id_status: null, name: ''}, ...status.map(item => ({ id_status: item.id_status, name: item.name }))]}; }
    if (column.field === "orderPriority") { return {...column, valueOptions: [{id_priority: null, name: ''}, ...priorities.map(item => ({ id_priority: item.id_priority, name: item.name }))]}; }
    if (column.field === "contact") { return {...column, valueOptions: [{id_contact: null, name: ''}, ...contacts.map(item => ({ id_contact: item.id_contact, name: `${item.first_name || " "} ${item.last_name || " "}` }))]}; }

    return column;
  });

  const transformData = (updatedRow) => {
    // Takes the ID's attributed to certain properties of the row and transforms them into the objects to be saved in the database
    let newTransformedRow = { ...updatedRow };

    if (updatedRow.orderStatus){
      const statusObject = status.find(obj => obj.id_status === updatedRow.orderStatus);
      newTransformedRow = { ...newTransformedRow, orderStatus: statusObject };
    }
    if (updatedRow.orderPriority){
      const priorityObject = priorities.find(obj => obj.id_priority === updatedRow.orderPriority);
      newTransformedRow = { ...newTransformedRow, orderPriority: priorityObject };
    }
    if (updatedRow.contact){
      const contactObject = contacts.find(obj => obj.id_contact === updatedRow.contact);
      newTransformedRow = { ...newTransformedRow, contact: contactObject };
    }

    return newTransformedRow;
  };

  return (
    <DataTable 
      storeGet = { OrdersStore.GetOrder }
      storeDelete = { OrdersStore.DeleteOrder }
      storeSave = { OrdersStore.SaveOrder }
      transformData = { transformData }
      idField = { OrdersStore.idField }
      sampleRow = { OrdersStore.sampleRow}
      contentColumns = { updatedColumns }
      visibilityModel = { OrdersStore.visibilityModel }
      pageTitle = { OrdersStore.pageTitle }
      pageSubtitle = { OrdersStore.pageSubtitle }
    />
  )
};

export default OrdersPage;
