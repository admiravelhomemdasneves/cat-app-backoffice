const BASE_URL = 'http://cat-app-g9audugfc0fmdpax.westeurope-01.azurewebsites.net/';
//const BASE_URL = 'http://localhost:8080/';

const Services = {
  POST_LOGIN: `${BASE_URL}auth/login`,
  POST_SIGN_UP: `${BASE_URL}auth/signup`,
  POST_VERIFY: `${BASE_URL}auth/verify`,
  POST_RESEND_VERIFICATION_CODE: `${BASE_URL}auth/resend`,

  GET_ALL_CONTACTS : `${BASE_URL}contact`,
  GET_ID_CONTACT : `${BASE_URL}contact`,
  DELETE_ID_CONTACT : `${BASE_URL}contact`,
  PUT_ID_CONTACT : `${BASE_URL}contact`,

  GET_ALL_PRODUCTS : `${BASE_URL}product`,
  GET_ID_PRODUCT : `${BASE_URL}product`,
  DELETE_ID_PRODUCT : `${BASE_URL}product`,
  PUT_ID_PRODUCT : `${BASE_URL}product`,

  GET_ALL_ORDER_PRODUCTS : `${BASE_URL}orderProduct`,
  GET_ID_ORDER_PRODUCT : `${BASE_URL}orderProduct`,
  DELETE_ID_ORDER_PRODUCT : `${BASE_URL}orderProduct`,
  PUT_ID_ORDER_PRODUCT : `${BASE_URL}orderProduct`,

  GET_ALL_ORDER_PRODUCTS_SPECS : `${BASE_URL}orderProductSpecs`,
  GET_ID_ORDER_PRODUCT_SPECS : `${BASE_URL}orderProductSpecs`,
  DELETE_ID_ORDER_PRODUCT_SPECS : `${BASE_URL}orderProductSpecs`,
  PUT_ID_ORDER_PRODUCT_SPECS : `${BASE_URL}orderProductSpecs`,

  GET_ALL_ORDER_STATUS : `${BASE_URL}orderStatus`,
  GET_ID_ORDER_STATUS : `${BASE_URL}orderStatus`,
  DELETE_ID_ORDER_STATUS : `${BASE_URL}orderStatus`,
  PUT_ID_ORDER_STATUS : `${BASE_URL}orderStatus`,

  GET_ALL_ORDER_PRIORITY : `${BASE_URL}orderPriority`,
  GET_ID_ORDER_PRIORITY : `${BASE_URL}orderPriority`,
  DELETE_ID_ORDER_PRIORITY : `${BASE_URL}orderPriority`,
  PUT_ID_ORDER_PRIORITY : `${BASE_URL}orderPriority`,

  GET_ALL_PRINTING_SERVICE : `${BASE_URL}printingService`,
  GET_ID_PRINTING_SERVICE : `${BASE_URL}printingService`,
  DELETE_ID_PRINTING_SERVICE : `${BASE_URL}printingService`,
  PUT_ID_PRINTING_SERVICE : `${BASE_URL}printingService`,

  GET_ALL_ORDERS : `${BASE_URL}order`,
  GET_ID_ORDER : `${BASE_URL}order`,
  GET_COMPLETE_ID_ORDER : `${BASE_URL}order/complete`,
  DELETE_ID_ORDER : `${BASE_URL}order`,
  PUT_ID_ORDER : `${BASE_URL}order`,

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