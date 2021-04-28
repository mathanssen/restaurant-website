// Matheus Hanssen 101303562

redirectToLogIn();

function saveInformation() {
  // Get values from the form
  var username = document.forms["editForm"]["username"].value;
  var email = document.forms["editForm"]["email"].value;
  var phone = document.forms["editForm"]["phone"].value;
  var city = document.forms["editForm"]["city"].value;
  var street = document.forms["editForm"]["street"].value;

  // Get variables from local storage
  var currentUser = JSON.parse(localStorage.getItem("currentUser"));
  var currentUsername = currentUser.username;
  var userList = JSON.parse(localStorage.getItem("userList"));

  // Validate if username, email and phone already exist
  let usernameExists = validateUsername(username);
  let emailExists = validateEmail(email);
  let phoneExists = validatePhone(phone);

  // Check if information is valid
  let phoneIsValid = phoneNumberIsValid(phone);
  let emailValid = emailIsValid(email);

  // Boolean to check what fields will be changed
  var changeUsername = false;
  var changeEmail = false;
  var changePhone = false;
  var changeCity = false;
  var changeStreet = false;

  // Check information that can be changed
  var error = false;
  if (username != "") {
    if (usernameExists == true && username != currentUsername) {
      alert("Username already exists" + "\n");
      error = true;
      event.preventDefault();
    } else if (username == currentUsername) {
      changeUsername = false;
    } else {
      changeUsername = true;
    }
  }
  if (email != "") {
    if (emailExists == true) {
      alert("Email already exists" + "\n");
      error = true;
      event.preventDefault();
    } else {
      if (emailValid == false) {
        alert("Email is not valid" + "\n");
        error = true;
        event.preventDefault();
      } else {
        changeEmail = true;
      }
    }
  }
  if (phone != "") {
    if (phoneExists == true) {
      alert("Phone number already exists" + "\n");
      error = true;
      event.preventDefault();
    } else {
      if (phoneIsValid == false) {
        alert("Phone number is not valid");
        error = true;
        event.preventDefault();
      } else {
        changePhone = true;
      }
    }
  }
  if (city != "") {
    changeCity = true;
  }
  if (street != "") {
    changeStreet = true;
  }

  // Change information and update local storage
  if (error == false) {
    for (let user in userList) {
      var newUserList = [];
      if (currentUsername == userList[user].username) {
        for (let u in userList) {
          if (currentUsername != userList[u].username) {
            newUserList.push(userList[u]);
          }
        }
        newUser = userList[user];
        if (changeUsername == true) {
          newUser.username = username;
        }
        if (changeEmail == true) {
          newUser.email = email;
        }
        if (changePhone == true) {
          newUser.phone = phone;
        }
        if (changeCity == true) {
          newUser.city = city;
        }
        if (changeStreet == true) {
          newUser.street = street;
        }
        newUserList.push(newUser);
        localStorage.setItem("userList", JSON.stringify(newUserList));
        localStorage.setItem("currentUser", JSON.stringify(newUser));
        if (
          changeUsername == true ||
          changeEmail == true ||
          changePhone == true ||
          changeCity == true ||
          changeStreet == true
        ) {
          alert("Profile updated!");
        }
        break;
      }
    }
  }
}

function changePassword() {
  // Get values from the form
  var oldPassword = document.forms["changePasswordForm"]["oldPassword"].value;
  var password = document.forms["changePasswordForm"]["password"].value;
  var repeatedPassword =
    document.forms["changePasswordForm"]["repeatedPassword"].value;

  // Get variables from local storage
  var currentUser = JSON.parse(localStorage.getItem("currentUser"));
  var currentUsername = currentUser.username;
  var currentPassword = currentUser.password;
  var userList = JSON.parse(localStorage.getItem("userList"));

  // Validate passwords
  let oldPasswordIsCorrect = true;
  if (currentPassword != oldPassword) {
    oldPasswordIsCorrect = false;
  }
  let passwordsAreEqual = validatePassword(password, repeatedPassword);

  // Check if password can be changed
  if (password == "" || repeatedPassword == "" || oldPassword == "") {
    alert("One or more fields are empty");
    event.preventDefault();
  } else {
    if (passwordsAreEqual == false) {
      alert("Passwords must be the same");
      event.preventDefault();
    } else if (oldPasswordIsCorrect == false) {
      alert("Password is not correct");
      event.preventDefault();
    } else {
      for (let user in userList) {
        var newUserList = [];
        if (currentUsername == userList[user].username) {
          for (let u in userList) {
            if (currentUsername != userList[u].username) {
              newUserList.push(userList[u]);
            }
          }
          newUser = userList[user];
          newUser.password = password;
          newUserList.push(newUser);
          localStorage.setItem("userList", JSON.stringify(newUserList));
          localStorage.setItem("currentUser", JSON.stringify(newUser));
          alert("Password changed!");
          break;
        }
      }
    }
  }
}
