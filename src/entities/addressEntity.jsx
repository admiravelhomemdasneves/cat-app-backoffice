class AddressEntity {
    constructor(id_address, street, door_number, zip_code, city, country) {
      this._id_address = id_address;
      this._street = street;
      this._door_number = door_number;
      this._zip_code = zip_code;
      this._city = city;
      this._country = country;
    }
  
    // Method to convert the entity to a plain object
    toObject() {
      return {
        id_address: this._id_address,
        street: this._street,
        door_number: this._door_number,
        zip_code: this._zip_code,
        city: this._city,
        country: this._country,
      };
    }
  
    // Getter for id_address
    getIdAddress() {
      return this._id_address;
    }
  
    // Setter for id_address
    setIdAddress(id_address) {
      this._id_address = id_address;
    }
  
    // Getter for street
    getStreet() {
      return this._street;
    }
  
    // Setter for street
    setStreet(street) {
      this._street = street;
    }
  
    // Getter for door_number
    getDoorNumber() {
      return this._door_number;
    }
  
    // Setter for door_number
    setDoorNumber(door_number) {
      this._door_number = door_number;
    }
  
    // Getter for zip_code
    getZipCode() {
      return this._zip_code;
    }
  
    // Setter for zip_code
    setZipCode(zip_code) {
      this._zip_code = zip_code;
    }
  
    // Getter for city
    getCity() {
      return this._city;
    }
  
    // Setter for city
    setCity(city) {
      this._city = city;
    }
  
    // Getter for country
    getCountry() {
      return this._country;
    }
  
    // Setter for country
    setCountry(country) {
      this._country = country;
    }
  }
  
  export default AddressEntity;  