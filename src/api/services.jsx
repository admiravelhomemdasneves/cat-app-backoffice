const Services = {
  POST_LOGIN: `/auth/login`,

  BO_GET_ALL_CONTACTS: `/bo/contact`,
  BO_SAVE_CONTACT: `/bo/contact/save`,
  BO_INACTIVATE_CONTACT: `/bo/contact/inactivate`,

  BO_GET_ALL_PRODUCTS: `/bo/product`,
  BO_INACTIVATE_PRODUCT: `/bo/product/inactivate`,
  BO_SAVE_PRODUCT: `/bo/product/save`,

  BO_GET_ALL_VATS: "/bo/vat",
  BO_SAVE_VAT: "/bo/vat/save",
  BO_INACTIVATE_VAT: "/bo/vat/inactivate",

  BO_GET_ALL_COLORS: "/bo/color",
  BO_SAVE_COLOR: "/bo/color/save",
  BO_INACTIVATE_COLOR: "/bo/color/inactivate",

  BO_GET_ALL_STORES: "/bo/store",
  BO_SAVE_STORE: "/bo/store/save",
  BO_INACTIVATE_STORE: "/bo/store/inactivate",

  BO_GET_ALL_PRODUCT_PARAMETERS: "/bo/product-parameter",
  BO_GET_PRODUCT_PARAMETERS_BY_PRODUCT: "/bo/product-parameter/product",
  BO_SAVE_PRODUCT_PARAMETER: "/bo/product-parameter/save",
  BO_INACTIVATE_PRODUCT_PARAMETER: "/bo/product-parameter/inactivate",

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