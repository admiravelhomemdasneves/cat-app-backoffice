class OrderStatusEntity {
    constructor(id_status, name, description) {
      this._id_status = id_status;
      this._name = name;
      this._description = description;
    }
  
    toObject() {
      return {
        id_status: this._id_status,
        name: this._name,
        description: this._description,
      };
    }
  
    getIdStatus() {
      return this._id_status;
    }
  
    setIdStatus(id_status) {
      this._id_status = id_status;
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
  }

  export function toOrderStatusEntity(object){
    return new OrderStatusEntity(
      object.id_status,
      object.name,
      object.description,
    );
  }
  
  export default OrderStatusEntity;