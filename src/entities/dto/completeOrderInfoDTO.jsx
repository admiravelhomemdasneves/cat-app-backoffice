import { toOrderEntity } from "../orderEntity";
import OrderProductInfoDTO from "./orderProductInfoDTO";

class CompleteOrderInfoDTO {
    constructor (order, orderProducts) {
        this._order = toOrderEntity(order);
        this._orderProducts = Array.isArray(orderProducts)
            ? orderProducts.map(product => new OrderProductInfoDTO(product.orderProduct, product.orderProductSpecs))
            : null;
    }

    getOrderProducts() {
        return this._orderProducts;
    }

    getOrder() {
        return this._order;
    }

    getOrderName() {
        return this._order.getName();
    }

    getOrderDescription() {
        return this._order.getDescription();
    }

    getOrderStatusId() {
        return this._order.getOrderStatus().getIdStatus();
    }

    getOrderStatusName() {
        return this._order.getOrderStatus() ? this._order.getOrderStatus().getName() : null;
    }

    getOrderPriorityId() {
        return this._order.getOrderPriority().getIdPriority();
    }

    getOrderPriorityName() {
        return this._order.getOrderPriority() ? this._order.getOrderPriority().getName() : null;
    }

    getContactId() {
        return this._order.getContact().getIdContact();
    }

    getContactFirstName() {
        return this._order.getContact() ? this._order.getContact().getFirstName() : null;
    }

    getContactLastName() {
        return this._order.getContact() ? this._order.getContact().getLastName() : null;
    }

    getContactFullName() {
        return this.getContactFirstName() + " " + this.getContactLastName();
    }

    getContactFullAddress() {
        return this._order.getContact() ?
            this._order.getContact().getStreet() + " nº" + 
            this._order.getContact().getDoorNumber() + ", " +
            this._order.getContact().getZipCode() + " " + 
            this._order.getContact().getCity() + ", " +
            this._order.getContact().getCountry()
            : null;
    }
}

export default CompleteOrderInfoDTO;