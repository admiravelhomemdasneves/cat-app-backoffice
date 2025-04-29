const Services = {
  POST_LOGIN: `/auth/login`,

  GET_ALL_CONTACTS : `/contact`,
  GET_ID_CONTACT : `/contact`,
  INACTIVATE_CONTACT : `/contact/inactivate`,
  PUT_ID_CONTACT : `/contact`,

  GET_ALL_PRODUCTS : `/product`,
  GET_ID_PRODUCT : `/product`,
  DELETE_ID_PRODUCT : `/product`,
  PUT_ID_PRODUCT : `/product`,

  GET_ALL_ORDER_PRODUCTS : `/orderProduct`,
  GET_ID_ORDER_PRODUCT : `/orderProduct`,
  DELETE_ID_ORDER_PRODUCT : `/orderProduct`,
  PUT_ID_ORDER_PRODUCT : `/orderProduct`,
  ORDER_PRODUCT_INACTIVATE : `/orderProduct/inactivate`,

  GET_ALL_ORDER_PRODUCTS_SPECS : `/orderProductSpecs`,
  GET_ID_ORDER_PRODUCT_SPECS : `/orderProductSpecs`,
  DELETE_ID_ORDER_PRODUCT_SPECS : `/orderProductSpecs`,
  PUT_ID_ORDER_PRODUCT_SPECS : `/orderProductSpecs`,

  GET_ALL_ORDER_STATUS : `/orderStatus`,
  GET_ID_ORDER_STATUS : `/orderStatus`,
  DELETE_ID_ORDER_STATUS : `/orderStatus`,
  PUT_ID_ORDER_STATUS : `/orderStatus`,

  GET_ALL_ORDER_PRIORITY : `/orderPriority`,
  GET_ID_ORDER_PRIORITY : `/orderPriority`,
  DELETE_ID_ORDER_PRIORITY : `/orderPriority`,
  PUT_ID_ORDER_PRIORITY : `/orderPriority`,
  INACTIVATE_PRIORITY : `/orderPriority/inactivate`,

  GET_ALL_PRINTING_SERVICE : `/printingService`,
  GET_ID_PRINTING_SERVICE : `/printingService`,
  DELETE_ID_PRINTING_SERVICE : `/printingService`,
  PUT_ID_PRINTING_SERVICE : `/printingService`,

  
  GET_ALL_ORDERS : `/order`,
  GET_ID_ORDER : `/order`,
  ORDER_CREATE_NEW : `/order/new`,
  ORDER_INACTIVATE : `/order/inactivate`,
  GET_COMPLETE_ID_ORDER : `/order/complete`,
  DELETE_ID_ORDER : `/order`,
  PUT_ID_ORDER : `/order`,

  FindAllRequest: async (service) => {
    try {
      const response = await fetch(service);
      const result = await response.json();
      return result; // Return the result to the caller
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Re-throw the error to propagate it to the caller
    }
  },

  FindRequestById: async (service, id) => {
    try {
      const response = await fetch(service + `/${id}`, {method: "GET"});
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error fetching contacts:", error);
      throw error; // Re-throw the error to propagate it to the caller
    }
  },

  RequestParameter: async (service, parameter, value, requestMethod) => {
    const url = service + `?${parameter}` + `=${value}`;

    try {
      const response = await fetch(url, {method: requestMethod});
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error in RequestParameter: ", url, " - ", error);
      throw error; // Re-throw the error to propagate it to the caller
    }
  },

  DeleteRequest: async (service, id) => {
  try {
      const response = await fetch(service + `/${id}`, {
      method: "DELETE",
      });

      if (!response.ok) {
      throw new Error(response.statusText);
      }
  } catch (error) {
      console.error("Error deleting contact:", error);
      throw error; // Re-throw the error to propagate it to the caller
  }
  },

  SaveRequest: async (service, updatedRow) => {        
  try {
      await fetch(service, {
      method: "PUT",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(updatedRow),
      })
      .then((res) => res.json())
      .then((result) => {
          console.log("UPDATED ROW: ", updatedRow);
          console.log("PUT REQUEST RESPONSE: ", result);
      })
      .catch((err) => console.log("error"));
  } catch (error) {
      console.error("Error saving:", error);
      throw error; // Re-throw the error to propagate it to the caller
  }
  },
}

export default Services;