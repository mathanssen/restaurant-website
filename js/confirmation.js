/* Wei Xu(101059762) */
/* Matheus Hanssen (101303562) */

redirectToLogIn();

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

if ("Order" in localStorage) {
  const order = JSON.parse(localStorage.getItem("Order"));
  const menuList = order.MenuList;

  for (i = 0; i < menuList.length; i++) {
    let total = menuList[i].Price * menuList[i].Quality;

    let item =
      '<tr class="d-flex">' +
      '<td class="col-1">' +
      menuList[i].Id +
      "</td>" +
      '<td class="col-5">' +
      menuList[i].Title +
      "</td>" +
      '<td class="col-2">' +
      formatter.format(menuList[i].Price) +
      "</td>" +
      '<td class="col-2">' +
      menuList[i].Quality +
      "</td>" +
      '<td class="col-2">' +
      formatter.format(total) +
      "</td>" +
      "<tr>";
    $("#orderBody").append(item);
  }

  let totalItem =
    '<tr class="d-flex">' +
    '<td class="col-10" colspan="4">Subtotal</td>' +
    '<td class="col-2">' +
    formatter.format(order.SubTotal) +
    "</td>" +
    "<tr>" +
    '<tr class="d-flex">' +
    '<td class="col-10" colspan="4">Discount</td>' +
    '<td class="col-2">' +
    formatter.format(order.Discount) +
    "</td>" +
    "<tr>" +
    '<tr class="d-flex">' +
    '<td class="col-10" colspan="4">Delivery Fee</td>' +
    '<td class="col-2">' +
    formatter.format(order.DeliveryFee) +
    "</td>" +
    "<tr>" +
    '<tr class="d-flex">' +
    '<td class="col-10" colspan="4">Tax</td>' +
    '<td class="col-2">' +
    formatter.format(order.Tax) +
    "</td>" +
    "<tr>" +
    '<tr class="d-flex">' +
    '<td class="col-10" colspan="4"><b>Order Total</b></td>' +
    '<td class="col-2"><b>' +
    formatter.format(order.OrderTotal) +
    "</b></td>" +
    "<tr>";
  $("#orderBody").append(totalItem);
}

if ("ShippingAddress" in localStorage) {
  const shippingInfo = JSON.parse(localStorage.getItem("ShippingAddress"));
  const nameItem =
    shippingInfo.firstname +
    " " +
    shippingInfo.lastname +
    " " +
    shippingInfo.phoneNo;
  const addressItem =
    shippingInfo.address +
    ", " +
    shippingInfo.city +
    ", " +
    shippingInfo.province +
    " " +
    shippingInfo.postal;

  $("#name").text(nameItem);
  $("#address").text(addressItem);
}
