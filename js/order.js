/* Wei Xu(101059762) */
/* Matheus Hanssen (101303562) */

redirectToLogIn();

var carList;
var subTotal = 0;
var deliveryFee = 5;
var order = [];

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

if ("CartList" in localStorage) {
  cartList = JSON.parse(localStorage.getItem("CartList"));

  if (cartList.length == 0) {
    $("#shippingBtn").hide();
  } else {
    for (i = 0; i < cartList.length; i++) {
      let total = cartList[i].Price * cartList[i].Quality;

      subTotal += total;

      let item =
        '<tr class="d-flex">' +
        '<td class="col-1">' +
        cartList[i].Id +
        "</td>" +
        '<td class="col-5">' +
        cartList[i].Title +
        "</td>" +
        '<td class="col-2">' +
        formatter.format(cartList[i].Price) +
        "</td>" +
        '<td class="col-2">' +
        cartList[i].Quality +
        "</td>" +
        '<td class="col-2">' +
        formatter.format(total) +
        "</td>" +
        "<tr>";
      $("#cartBody").append(item);
    }

    let discount;

    // Caculate discount
    if (subTotal > 100) {
      discount = subTotal * 0.3;
    } else if (subTotal > 80) {
      discount = subTotal * 0.2;
    } else {
      discount = subTotal * 0.05;
    }

    let tax = (subTotal - discount) * 0.13;

    let orderTotal = subTotal - discount + deliveryFee + tax;

    let totalItem =
      '<tr class="d-flex">' +
      '<td class="col-10" colspan="4">Subtotal</td>' +
      '<td class="col-2">' +
      formatter.format(subTotal) +
      "</td>" +
      "<tr>" +
      '<tr class="d-flex">' +
      '<td class="col-10" colspan="4">Discount</td>' +
      '<td class="col-2">' +
      formatter.format(discount) +
      "</td>" +
      "<tr>" +
      '<tr class="d-flex">' +
      '<td class="col-10" colspan="4">Delivery Fee</td>' +
      '<td class="col-2">' +
      formatter.format(deliveryFee) +
      "</td>" +
      "<tr>" +
      '<tr class="d-flex">' +
      '<td class="col-10" colspan="4">Tax</td>' +
      '<td class="col-2">' +
      formatter.format(tax) +
      "</td>" +
      "<tr>" +
      '<tr class="d-flex">' +
      '<td class="col-10" colspan="4"><b>Order Total</b></td>' +
      '<td class="col-2"><b>' +
      formatter.format(orderTotal) +
      "</b></td>" +
      "<tr>";
    $("#cartBody").append(totalItem);

    order = {
      MenuList: cartList,
      SubTotal: subTotal,
      Discount: discount,
      Tax: tax,
      OrderTotal: orderTotal,
      DeliveryFee: deliveryFee,
    };
    localStorage.Order = JSON.stringify(order);

    // Update user information
    updateInformation("Order", order);
  }
}
