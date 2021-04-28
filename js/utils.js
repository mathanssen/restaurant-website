// Matheus Hanssen 101303562

class User {
  constructor(username, password, email, phone, city, street) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.phone = phone;
    this.city = city;
    this.street = street;
    this.order = {};
    this.shippingAddress = {};
    this.cartList = [];
  }
}

// Check if passwords are the same
function validatePassword(password, repeatedPassword) {
  if (password != repeatedPassword) {
    return false;
  } else {
    return true;
  }
}

// Check if email already exists
function validateEmail(email) {
  var userList = JSON.parse(localStorage.getItem("userList"));
  for (let user in userList) {
    if (email == userList[user].email) {
      return true;
    }
  }
  return false;
}

// Check if phone already exists
function validatePhone(phone) {
  var userList = JSON.parse(localStorage.getItem("userList"));
  for (let user in userList) {
    if (phone == userList[user].phone) {
      return true;
    }
  }
  return false;
}

// Check if username already exists
function validateUsername(username) {
  var userList = JSON.parse(localStorage.getItem("userList"));
  for (let user in userList) {
    if (username == userList[user].username) {
      return true;
    }
  }
  return false;
}

// Check if phone number is valid
function phoneNumberIsValid(phoneNumber) {
  let re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  if (re.test(phoneNumber)) {
    return true;
  } else {
    return false;
  }
}

// Check if email is valid
function emailIsValid(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email)) {
    return true;
  } else {
    return false;
  }
}

// Get password from username
function getPassword(username) {
  var userList = JSON.parse(localStorage.getItem("userList"));
  for (let user in userList) {
    if (username == userList[user].username) {
      return userList[user].password;
    }
  }
}

// Get user object from username
function getUser(username) {
  var userList = JSON.parse(localStorage.getItem("userList"));
  for (let user in userList) {
    if (username == userList[user].username) {
      return userList[user];
    }
  }
}

// Redirect if it was loaded directly
function redirectToLogIn() {
  var referrer = document.referrer;
  console.log(referrer.length);
  if (referrer.length == 0) {
    $(location).attr("href", "sign-in.html");
  }
}

// Update user information about the orders
function updateInformation(key, value) {
  // Get variables from local storage
  var userList = JSON.parse(localStorage.getItem("userList"));
  var currentUser = JSON.parse(localStorage.getItem("currentUser"));
  var currentUsername = currentUser.username;

  // Change information and update local storage
  for (let user in userList) {
    var newUserList = [];
    if (currentUsername == userList[user].username) {
      for (let u in userList) {
        if (currentUsername != userList[u].username) {
          newUserList.push(userList[u]);
        }
      }
      newUser = userList[user];
      if (key == "CartList") {
        newUser.cartList = value;
      }
      if (key == "Order") {
        newUser.order = value;
      }
      if (key == "ShippingAddress") {
        newUser.shippingAddress = value;
      }
      newUserList.push(newUser);
      localStorage.setItem("userList", JSON.stringify(newUserList));
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      break;
    }
  }
}

// Update local storage information (cart, shipping and orders)
function updateLocalStorage() {
  // Get variables from local storage
  var userList = JSON.parse(localStorage.getItem("userList"));
  var currentUser = JSON.parse(localStorage.getItem("currentUser"));
  var currentUsername = currentUser.username;

  // Change information and update local storage
  for (let user in userList) {
    if (currentUsername == userList[user].username) {
      let cartList = userList[user].cartList;
      let orders = userList[user].order;
      let shippingAddress = userList[user].shippingAddress;
      localStorage.setItem("CartList", JSON.stringify(cartList));
      localStorage.setItem("Order", JSON.stringify(orders));
      localStorage.setItem("ShippingAddress", JSON.stringify(shippingAddress));
      break;
    }
  }
}
