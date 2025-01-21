class OrderPriorityEntity {
    constructor(id_priority, name, description) {
      this._id_priority = id_priority;
      this._name = name;
      this._description = description;
    }
  
    toObject() {
      return {
        id_priority: this._id_priority,
        name: this._name,
        description: this._description,
      };
    }
  
    getIdPriority() {
      return this._id_priority;
    }
  
    setIdPriority(id_priority) {
      this._id_priority = id_priority;
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

  export function toOrderPriorityEntity(object){
    return new OrderPriorityEntity(
      object.id_priority,
      object.name,
      object.description,
    );
  }
  
  export default OrderPriorityEntity;