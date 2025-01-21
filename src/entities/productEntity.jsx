class ProductEntity {
    constructor(id_product, name, brand, productType, description) {
      this._id_product = id_product;
      this._name = name;
      this._brand = brand;
      this._productType = productType;
      this._description = description;
    }
  
    toObject() {
      return {
        id_product: this._id_product,
        name: this._name,
        brand: this._brand,
        productType: this._productType,
        description: this._description,
      };
    }
    
    // Getter for id_product
    getIdProduct() {
      return this._id_product;
    }
  
    // Setter for id_product
    setIdProduct(id_product) {
      this._id_product = id_product;
    }
  
    // Getter for name
    getName() {
      return this._name;
    }
  
    // Setter for name
    setName(name) {
      this._name = name;
    }
  
    // Getter for brand
    getBrand() {
      return this._brand;
    }
  
    // Setter for brand
    setBrand(brand) {
      this._brand = brand;
    }
  
    // Getter for productType
    getProductType() {
      return this._productType;
    }
  
    // Setter for productType
    setProductType(productType) {
      this._productType = productType;
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
  
  export default ProductEntity;