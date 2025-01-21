import OrderProductEntity from './orderProductEntity';

class OrderProductSpecsEntity {
  constructor(id_order_product_specs, orderProduct, quantity, size, color, flagStatus) {
    this._id_order_product_specs = id_order_product_specs;
    this._orderProduct = orderProduct; // This should be an instance of OrderProductEntity or a similar class
    this._quantity = quantity;
    this._size = size;
    this._color = color;
    this._flagStatus = flagStatus;
  }

  toObject() {
    return {
      id_order_product_specs: this._id_order_product_specs,
      orderProduct: this._orderProduct.toObject(), // Assuming orderProduct is an instance with a toObject method
      quantity: this._quantity,
      size: this._size,
      color: this._color,
      flagStatus: this._flagStatus,
    };
  }

  // Getter and Setter for id_order_product_specs
  getIdOrderProductSpecs() {
    return this._id_order_product_specs;
  }

  setIdOrderProductSpecs(id_order_product_specs) {
    this._id_order_product_specs = id_order_product_specs;
  }

  // Getter and Setter for orderProduct
  getOrderProduct() {
    return this._orderProduct;
  }

  setOrderProduct(orderProduct) {
    this._orderProduct = orderProduct;
  }

  // Getter and Setter for quantity
  getQuantity() {
    return this._quantity;
  }

  setQuantity(quantity) {
    this._quantity = quantity;
  }

  // Getter and Setter for size
  getSize() {
    return this._size;
  }

  setSize(size) {
    this._size = size;
  }

  // Getter and Setter for color
  getColor() {
    return this._color;
  }

  setColor(color) {
    this._color = color;
  }

  // Getter and Setter for flagStatus
  getFlagStatus() {
    return this._flagStatus;
  }

  setFlagStatus(flagStatus) {
    this._flagStatus = flagStatus;
  }
}

export function toOrderProductSpecsEntity(object) {
  return new OrderProductSpecsEntity(
    object.id_order_product_specs,
    object.orderProduct,
    object.quantity,
    object.size,
    object.color,
    object.flagStatus,
  );
}

export default OrderProductSpecsEntity;