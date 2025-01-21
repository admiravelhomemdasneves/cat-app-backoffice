import OrderStatusEntity from './orderStatusEntity';
import ContactEntity from './contactEntity';
import OrderPriorityEntity from './orderPriorityEntity';

class OrderEntity {
  constructor(id_order, name, description, orderStatus, contact, orderPriority, date_requested, date_status, date_conclusion, date_due) {
    this._id_order = id_order;
    this._name = name;
    this._description = description;
    this._orderStatus = orderStatus ? new OrderStatusEntity(orderStatus.id_status, orderStatus.name, orderStatus.description) : null;
    this._contact = contact ? new ContactEntity(contact.id_contact, contact.first_name, contact.last_name, contact.street, contact.door_number, contact.zip_code, contact.city, contact.country) : null;
    this._orderPriority = orderPriority ? new OrderPriorityEntity(orderPriority.id_priority, orderPriority.name, orderPriority.description) : null;
    this._date_requested = date_requested;
    this._date_status = date_status;
    this._date_conclusion = date_conclusion;
    this._date_due = date_due;
  }

  toObject() {
    return {
      id_order: this._id_order,
      name: this._name,
      description: this._description,
      orderStatus: this._orderStatus ? this._orderStatus.toObject() : null,
      contact: this._contact ? this._contact.toObject() : null,
      orderPriority: this._orderPriority ? this._orderPriority.toObject() : null,
      date_requested: this._date_requested,
      date_status: this._date_status,
      date_conclusion: this._date_conclusion,
      date_due: this._date_due,
    };
  }

  getIdOrder() {
    return this._id_order;
  }

  setIdOrder(id_order) {
    this._id_order = id_order;
  }

  getName() {
    return this._name;
  }

  setName(name) {
    this._name = name;
  }

  getDescription() {
    return this._description;
  }

  setDescription(description) {
    this._description = description;
  }

  getOrderStatus() {
    return this._orderStatus;
  }

  setOrderStatus(orderStatus) {
    this._orderStatus = orderStatus;
  }

  getContact() {
    return this._contact;
  }

  setContact(contact) {
    this._contact = contact;
  }

  getOrderPriority() {
    return this._orderPriority;
  }

  setOrderPriority(orderPriority) {
    this._orderPriority = orderPriority;
  }

  getDateRequested() {
    return this._date_requested;
  }

  setDateRequested(date_requested) {
    this._date_requested = date_requested;
  }

  getDateStatus() {
    return this._date_status;
  }

  setDateStatus(date_status) {
    this._date_status = date_status;
  }

  getDateConclusion() {
    return this._date_conclusion;
  }

  setDateConclusion(date_conclusion) {
    this._date_conclusion = date_conclusion;
  }

  getDateDue() {
    return this._date_due;
  }

  setDateDue(date_due) {
    this._date_due = date_due;
  }
}

export function toOrderEntity(object){
  return new OrderEntity(
    object.id_order,
    object.name,
    object.description,
    object.orderStatus,
    object.contact,
    object.orderPriority,
    object.date_requested,
    object.date_status,
    object.date_conclusion,
    object.date_due,
  );
}

export default OrderEntity;
