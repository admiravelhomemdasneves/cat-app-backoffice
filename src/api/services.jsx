const Services = {
  POST_LOGIN: `/auth/login`,

  GET_CURRENT_USER: `/users/me`,
  PUT_CURRENT_USER: `/users/me`,

  BO_GET_MY_COMPANY: `/bo/companies/mine`,
  BO_SAVE_COMPANY: `/bo/companies/save`,

  BO_GET_USERS: `/bo/users`,
  BO_SAVE_USER: `/bo/users/save`,
  BO_UPDATE_USER_ACCESS_LEVEL: `/bo/users`,
  BO_INACTIVATE_USER: `/bo/users/inactivate`,

  BO_GET_ACCESS_LEVELS: `/bo/accessLevels`,

  BO_GET_PAGES: `/bo/pages`,
  BO_SAVE_PAGE: `/bo/pages/save`,

  BO_GET_MY_PERMISSIONS: `/bo/permissions/mine`,
  BO_GET_ALL_PERMISSIONS: `/bo/permissions`,
  BO_SAVE_PERMISSION: `/bo/permissions/save`,
  BO_DELETE_PERMISSION: `/bo/permissions`,

  BO_GET_ALL_ORDERS : "/bo/orders",
  BO_SAVE_ORDER : "/bo/orders/save",

  BO_SAVE_ORDER_ITEM: "/bo/orderitems/save",
  BO_INACTIVATE_ORDER_ITEM: "/bo/orderitems/inactivate",
  BO_CALCULATE_ORDER_ITEM_PRICE: "/bo/orderitems",

  BO_GET_ALL_CONTACTS: "/bo/contact",
  BO_SAVE_CONTACT: "/bo/contact/save",
  BO_INACTIVATE_CONTACT: "/bo/contact/inactivate",

  BO_GET_ALL_VATS: "/bo/vat",
  BO_SAVE_VAT: "/bo/vat/save",
  BO_INACTIVATE_VAT: "/bo/vat/inactivate",

  BO_GET_ALL_STORES: "/bo/store",
  BO_SAVE_STORE: "/bo/store/save",
  BO_INACTIVATE_STORE: "/bo/store/inactivate",

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

  GET_ALL_MATERIALS:   `/material`,
  SAVE_MATERIAL:       `/material`,
  INACTIVATE_MATERIAL: `/material/inactivate`,
}

export default Services;