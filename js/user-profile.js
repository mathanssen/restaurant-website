// Matheus Hanssen 101303562

redirectToLogIn();

// Display information from the current user
if ("currentUser" in localStorage) {
  let user = JSON.parse(localStorage.getItem("currentUser"));

  document.getElementById("username").innerHTML += user.username;
  document.getElementById("email").innerHTML += user.email;
  document.getElementById("phone").innerHTML += user.phone;
  document.getElementById("city").innerHTML += user.city;
  document.getElementById("street").innerHTML += user.street;
}

function deleteAccount() {
  // Get variables from local storage
  var currentUser = JSON.parse(localStorage.getItem("currentUser"));
  var currentUsername = currentUser.username;
  var userList = JSON.parse(localStorage.getItem("userList"));

  // Get confirmation
  var deleteAlert = confirm("Are you sure you want to delete your account?");
  if (deleteAlert == true) {
    for (let user in userList) {
      var newUserList = [];
      if (currentUsername == userList[user].username) {
        for (let u in userList) {
          if (currentUsername != userList[u].username) {
            newUserList.push(userList[u]);
          }
        }
        localStorage.setItem("userList", JSON.stringify(newUserList));
        localStorage.removeItem("currentUser");
        if ("CartList" in localStorage) {
          localStorage.removeItem("CartList");
        }
        if ("Order" in localStorage) {
          localStorage.removeItem("Order");
        }
        break;
      }
    }
  } else {
    event.preventDefault();
  }
}

function signOut() {
  console.log("sign out");
}
