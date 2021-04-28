/* Wei Xu(101059762) */
/* Matheus Hanssen (101303562) */

redirectToLogIn();

var shippingAddress = [];

function phoneVerify(phoneNumber) {
  let phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  if (phoneRegex.test(phoneNumber)) {
    return true;
  } else {
    alert("Invalid Phone Number!");
    return false;
  }
}

function zipVerify(postalCode) {
  let postalCodeRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

  if (postalCodeRegex.test(postalCode)) {
    return true;
  } else {
    alert("Invalid Postal Code!");
    return false;
  }
}

function checkValidity() {
  let flag = true;

  if ($("#inputFirstname").val() == "" && flag == true) {
    alert("First name is required!");
    flag = false;
  }

  if ($("#inputLastname").val() == "" && flag == true) {
    alert("First name is required!");
    flag = false;
  }

  if ($("#inputLastname").val() == "" && flag == true) {
    alert("Last name is required!");
    flag = false;
  }

  if ($("#inputAddress").val() == "" && flag == true) {
    alert("Street Address is required!");
    flag = false;
  }

  if ($("#inputCity").val() == "" && flag == true) {
    alert("City is required!");
    flag = false;
  }

  if ($("#inputZip").val() == "" && flag == true) {
    alert("Postal Code is required!");
    flag = false;
  }

  if ($("#inputPhone").val() == "" && flag == true) {
    alert("Postal Code is required!");
    flag = false;
  }

  if ($("#inputPhone").val() != "" && flag == true) {
    flag = phoneVerify($("#inputPhone").val());
  }

  if ($("#inputZip").val() != "" && flag == true) {
    flag = zipVerify($("#inputZip").val());
  }

  return flag;
}

function confirmOrder(event) {
  if (!checkValidity()) {
    event.preventDefault();
  } else {
    shippingAddress = {
      firstname: $("#inputFirstname").val(),
      lastname: $("#inputLastname").val(),
      phoneNo: $("#inputPhone").val(),
      address: $("#inputAddress").val(),
      city: $("#inputCity").val(),
      province: $("#inputProvince").val(),
      postal: $("#inputZip").val(),
    };
    localStorage.ShippingAddress = JSON.stringify(shippingAddress);
    console.log(JSON.parse(localStorage.ShippingAddress));

    // Update user information
    updateInformation("ShippingAddress", shippingAddress);

    alert("Order has been placed!");
  }
}
