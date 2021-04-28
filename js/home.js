/* Wei Xu(101059762) */
/* Matheus Hanssen (101303562) */

var menuList = [];
var cartList = [];

//url to fetch all menus
const countryURL =
  "https://gist.githubusercontent.com/skd09/8d8a685ffbdae387ebe041f28384c13c/raw/26e97cec1e18243e3d88c90d78d2886535a4b3a6/menu.json";

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// Get user information and update local storage

//fetch data from url
let response = fetch(countryURL)
  .then((response) => response.json())
  .then((data) => {
    redirectToLogIn();

    updateLocalStorage();

    if ("CartList" in localStorage) {
      cartList = JSON.parse(localStorage.getItem("CartList"));
    }

    //successfully received the data
    //we can now process it

    console.log(data);

    for (i = 0; i < data.length; i++) {
      menuList.push({
        Id: data[i].Id,
        Description: data[i].Description,
        Title: data[i].Title,
        Ratings: data[i].Ratings,
        Price: data[i].Price,
        Image: data[i].Image,
        Available: data[i].Available,
        Category: data[i].Category,
      });

      let availableClass = "";
      if (data[i].Available != 1) {
        availableClass = "disabled";
      }

      let item =
        '<div class="col">' +
        '<div class="card text-center h-100">' +
        '<a id="menuDetail" href="" data-bs-toggle="modal" data-bs-target="#detailModal" onclick="modalClick(event,' +
        data[i].Id +
        ')"><img src="' +
        data[i].Image +
        '" class="card-img-top WHRadio"></a>' +
        '<div class="card-body">' +
        '<h5 class="card-title">' +
        data[i].Title +
        "</h5>" +
        '<p class="card-text">Ratings: ' +
        data[i].Ratings +
        "</p>" +
        '<p class="price">' +
        formatter.format(data[i].Price) +
        "</p>" +
        "</div>" +
        '<div class="card-footer bg-transparent border-0">' +
        '<button type="button" class="btn btn-primary" ' +
        availableClass +
        ' onclick="addToCart(' +
        data[i].Id +
        ')">Add to Cart</button>' +
        "</div>" +
        "</div>" +
        "</div>";

      $("#data").append(item);
    }
  })
  .catch((err) => {
    alert(err);
  });

function modalClick(event, id) {
  event.preventDefault();

  const selectedMenu = menuList.filter((menu) => menu.Id == id);
  let avilablity;

  $("#pTitle").text(selectedMenu[0].Title);
  $("#pImage").attr("src", selectedMenu[0].Image);
  $("#pDescription").text(selectedMenu[0].Description);
  $("#pRatings").text("Ratings: " + selectedMenu[0].Ratings);
  $("#pPrice").text("Price: $" + selectedMenu[0].Price);
  $("#pCategory").text("Category: " + selectedMenu[0].Category);

  if (selectedMenu[0].Available == 1) {
    avilablity = "Yes";
  } else {
    avilablity = "No";
  }
  $("#pAvailable").text("Available: " + avilablity);
}

function filter() {
  let filteredMenu = menuList;

  if ($("#titleFilter").val() != "") {
    filteredMenu = filteredMenu.filter(
      (menu) => menu.Title.search($("#titleFilter").val()) != -1
    );
  }

  if ($("#maxPriceFilter").val() != "") {
    filteredMenu = filteredMenu.filter(
      (menu) => menu.Price <= $("#maxPriceFilter").val()
    );
  }

  if ($("#availableFilter").val() != "2") {
    filteredMenu = filteredMenu.filter(
      (menu) => menu.Available == $("#availableFilter").val()
    );
  }

  $("#data").text("");

  for (i = 0; i < filteredMenu.length; i++) {
    let availableClass = "";
    if (filteredMenu[i].Available != 1) {
      availableClass = "disabled";
    }

    let item =
      '<div class="col">' +
      '<div class="card text-center h-100">' +
      '<a id="menuDetail" href="" data-bs-toggle="modal" data-bs-target="#detailModal" onclick="modalClick(event,' +
      filteredMenu[i].Id +
      ')"><img src="' +
      filteredMenu[i].Image +
      '" class="card-img-top WHRadio"></a>' +
      '<div class="card-body">' +
      '<h5 class="card-title">' +
      filteredMenu[i].Title +
      "</h5>" +
      '<p class="card-text">Ratings: ' +
      filteredMenu[i].Ratings +
      "</p>" +
      '<p class="price">' +
      formatter.format(filteredMenu[i].Price) +
      "</p>" +
      "</div>" +
      '<div class="card-footer bg-transparent border-0">' +
      '<button type="button" class="btn btn-primary" ' +
      availableClass +
      ' onclick="addToCart(' +
      filteredMenu[i].Id +
      ')">Add to Cart</button>' +
      "</div>" +
      "</div>" +
      "</div>";

    $("#data").append(item);
  }
}

function addToCart(id) {
  const selectedMenu = menuList.filter((menu) => menu.Id == id);

  if (cartList.filter((menu) => menu.Id == id) == "") {
    cartList.push({
      Id: selectedMenu[0].Id,
      Title: selectedMenu[0].Title,
      Price: selectedMenu[0].Price,
      Quality: 1,
    });
  } else {
    cartList.filter((menu) => menu.Id == id)[0].Quality++;
  }

  localStorage.setItem("CartList", JSON.stringify(cartList));
  console.log(JSON.parse(localStorage.CartList));

  // Update user information
  updateInformation("CartList", cartList);

  alert(selectedMenu[0].Title + " has been added to cart.");
}
