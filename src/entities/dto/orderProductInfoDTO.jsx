import { toOrderProductEntity } from "../orderProductEntity";
import { toOrderProductSpecsEntity } from "../orderProductSpecsEntity";

class OrderProductInfoDTO {
    constructor (orderProduct, orderProductSpecs) {
        this._orderProduct = toOrderProductEntity(orderProduct);
        this._orderProductSpecs = Array.isArray(orderProductSpecs)
            ? orderProductSpecs.map(spec => toOrderProductSpecsEntity(spec))
            : null;
    }

    getOrderProduct() {
        return this._orderProduct;
    }

    getOrderProductSpecs() {
        return this._orderProductSpecs;
    }

    getOrderProductSpecByIndex(index) {
        if (index >= 0 && index < this._orderProductSpecs.length) {
            return this._orderProductSpecs[index];
        }
        return null;
    }
}

export default OrderProductInfoDTO;