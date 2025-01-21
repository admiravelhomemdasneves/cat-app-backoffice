class ContactEntity {
    constructor(id_contact, first_name, last_name, street, door_number, zip_code, city, country) {
      this._id_contact = id_contact;
      this._first_name = first_name;
      this._last_name = last_name;
      this._street = street;
      this._door_number = door_number;
      this._zip_code = zip_code;
      this._city = city;
      this._country = country;
    }
  
    // Method to convert the entity to a plain object
    toObject() {
      return {
        id_contact: this._id_contact,
        first_name: this._first_name,
        last_name: this._last_name,
        street: this._street,
        door_number: this._door_number,
        zip_code: this._zip_code,
        city: this._city,
        country: this._country,
      };
    }
  
    // Getter for id_contact
    getIdContact() {
      return this._id_contact;
    }
  
    // Setter for id_contact
    setIdContact(id_contact) {
      this._id_contact = id_contact;
    }
  
    // Getter for first_name
    getFirstName() {
      return this._first_name;
    }
  
    // Setter for first_name
    setFirstName(first_name) {
      this._first_name = first_name;
    }
  
    // Getter for last_name
    getLastName() {
      return this._last_name;
    }
  
    // Setter for last_name
    setLastName(last_name) {
      this._last_name = last_name;
    }
  
    getFullName() {
      return this.getFirstName() + " " + this.getLastName();
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
  
  export function toContactEntity(object){
    return new ContactEntity(
      object.id_contact,
      object.first_name,
      object.last_name,
      object.street,
      object.door_number,
      object.zip_code,
      object.city,
      object.country,
    );
  }

  export default ContactEntity;  