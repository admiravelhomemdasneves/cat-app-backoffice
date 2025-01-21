import OrderEntity from './orderEntity';
import ProductEntity from './productEntity';
import PrintingServiceEntity from './printingServiceEntity';

class OrderProductEntity {
  constructor(id_order_product, order, description, product, printingService) {
    this._id_order_product = id_order_product;
    this._order = order ? new OrderEntity(
      order.id_order,
      order.name,
      order.description,
      order.orderStatus,
      order.contact,
      order.orderPriority,
      order.date_requested,
      order.date_status,
      order.date_conclusion,
      order.date_due
    ) : null;
    this._description = description;
    this._product = product ? new ProductEntity(
      product.id_product,
      product.name,
      product.brand,
      product.productType,
      product.description
    ) : null;
    this._printingService = printingService ? new PrintingServiceEntity(
      printingService.id_printing_service,
      printingService.name,
      printingService.description
    ) : null;
  }

  toObject() {
    return {
      id_order_product: this._id_order_product,
      order: this._order ? this._order.toObject() : null,
      description: this._description,
      product: this._product ? this._product.toObject() : null,
      printingService: this._printingService ? this._printingService.toObject() : null,
    };
  }

  // Getters and setters for each property
  getIdOrderProduct() {
    return this._id_order_product;
  }

  setIdOrderProduct(id_order_product) {
    this._id_order_product = id_order_product;
  }

  getOrder() {
    return this._order;
  }

  setOrder(order) {
    this._order = new OrderEntity(
      order.id_order,
      order.name,
      order.description,
      order.orderStatus,
      order.contact,
      order.orderPriority,
      order.date_requested,
      order.date_status,
      order.date_conclusion,
      order.date_due
    );
  }

  getDescription() {
    return this._description;
  }

  setDescription(description) {
    this._description = description;
  }

  getProduct() {
    return this._product;
  }

  setProduct(product) {
    this._product = product;
  }

  getPrintingService() {
    return this._printingService;
  }

  setPrintingService(printingService) {
    this._printingService = printingService;
  }
}

export function toOrderProductEntity(object) {
  return new OrderProductEntity(
    object.id_order_product,
    object.order,
    object.description,
    object.product,
    object.printingService,
  );
}

export default OrderProductEntity;
