class PrintingServiceEntity {
    constructor(id_printing_service, name, description) {
      this._id_printing_service = id_printing_service;
      this._name = name;
      this._description = description;
    }
  
    toObject() {
      return {
        id_printing_service: this._id_printing_service,
        name: this._name,
        description: this._description,
      };
    }
  
    // Getter for id_printing_service
    getIdPrintingService() {
      return this._id_printing_service;
    }
  
    // Setter for id_printing_service
    setIdPrintingService(id_printing_service) {
      this._id_printing_service = id_printing_service;
    }
  
    // Getter for name
    getName() {
      return this._name;
    }
  
    // Setter for name
    setName(name) {
      this._name = name;
    }
  
    // Getter for description
    getDescription() {
      return this._description;
    }
  
    // Setter for description
    setDescription(description) {
      this._description = description;
    }
  }
  
  export default PrintingServiceEntity;
  