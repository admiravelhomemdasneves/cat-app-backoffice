const Services = {
  POST_LOGIN: `/auth/login`,

  GET_ALL_CONTACTS : `/contact`,
  GET_ID_CONTACT : `/contact`,
  INACTIVATE_CONTACT : `/contact/inactivate`,
  PUT_ID_CONTACT : `/contact`,

  GET_ALL_PRODUCTS : `/product`,
  GET_ID_PRODUCT : `/product`,
  PUT_ID_PRODUCT : `/product`,
  INACTIVATE_PRODUCT : `/product/inactivate`,

  GET_ALL_ORDER_PRODUCTS : `/orderProduct`,
  GET_ID_ORDER_PRODUCT : `/orderProduct`,
  PUT_ID_ORDER_PRODUCT : `/orderProduct`,
  ORDER_PRODUCT_INACTIVATE : `/orderProduct/inactivate`,

  GET_ALL_ORDER_STATUS : `/orderStatus`,
  GET_ID_ORDER_STATUS : `/orderStatus`,
  PUT_ID_ORDER_STATUS : `/orderStatus`,
  INACTIVATE_STATUS : `/orderStatus/inactivate`,

  GET_ALL_ORDER_PRIORITY : `/orderPriority`,
  GET_ID_ORDER_PRIORITY : `/orderPriority`,
  PUT_ID_ORDER_PRIORITY : `/orderPriority`,
  INACTIVATE_PRIORITY : `/orderPriority/inactivate`,

  GET_ALL_PRINTING_SERVICE : `/printingService`,
  GET_ID_PRINTING_SERVICE : `/printingService`,
  PUT_ID_PRINTING_SERVICE : `/printingService`,
  INACTIVATE_PRINTING_SERVICE : `/printingService/inactivate`,
  
  GET_ALL_ORDERS : `/order`,
  GET_ID_ORDER : `/order`,
  ORDER_INACTIVATE : `/order/inactivate`,
  PUT_ID_ORDER : `/order`,
}

export default Services;