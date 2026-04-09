class CurrentUserDTO {
  constructor(user) {
    this._id = user._id;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.age = user.age;
    this.role = user.role;
    this.cart = user.cart?._id || null;   // Solo el ID del carrito, no el objeto completo
  }
}

export default CurrentUserDTO;
