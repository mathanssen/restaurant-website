/* Wei Xu(101059762) */
/* Matheus Hanssen (101303562) */

redirectToLogIn();

var carList;

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

$(window).load(getCartList());

function getCartList() {
  if ("CartList" in localStorage) {
    cartList = JSON.parse(localStorage.getItem("CartList"));

    if (cartList.length == 0) {
      $("#orderBtn").hide();
    } else {
      for (i = 0; i < cartList.length; i++) {
        let item =
          '<tr class="d-flex">' +
          '<td class="col-1">' +
          cartList[i].Id +
          "</td>" +
          '<td class="col-7">' +
          cartList[i].Title +
          "</td>" +
          '<td class="col-2">' +
          formatter.format(cartList[i].Price) +
          "</td>" +
          '<td class="col-2">' +
          '<input class="form-control" type="number" value="' +
          cartList[i].Quality +
          '" id="qualityInput' +
          cartList[i].Id +
          '" min="0" onchange="changeQuality(' +
          cartList[i].Id +
          ')">' +
          "</td>" +
          "<tr>";
        $("#cartBody").append(item);
      }
    }
  }
}

function changeQuality(id) {
  if ($("#qualityInput" + id).val() == 0) {
    // delete
    cartList = cartList.filter((menu) => menu.Id != id);
  } else {
    // update
    var idx = cartList.findIndex((menu) => menu.Id == id);
    cartList[idx].Quality = parseInt($("#qualityInput" + id).val());
  }

  localStorage.setItem("CartList", JSON.stringify(cartList));

  $("#cartBody").text("");
  getCartList();
}
