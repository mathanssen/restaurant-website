// Matheus Hanssen 101303562

// Create list of users and store
if ("userList" in localStorage) {
  var userList = JSON.parse(localStorage.getItem("userList"));
} else {
  var userList = [];
}

function createAccount() {
  // Get variables from form
  var username = document.forms["signUpForm"]["username"].value;
  var password = document.forms["signUpForm"]["password"].value;
  var repeatedPassword = document.forms["signUpForm"]["repeatedPassword"].value;
  var email = document.forms["signUpForm"]["email"].value;
  var phone = document.forms["signUpForm"]["phone"].value;
  var city = document.forms["signUpForm"]["city"].value;
  var street = document.forms["signUpForm"]["street"].value;

  // Create variable to debug
  var errors = "";

  // Validate fields
  let passwordsAreEqual = validatePassword(password, repeatedPassword);
  let usernameExists = validateUsername(username);
  let emailExists = validateEmail(email);
  let phoneExists = validatePhone(phone);
  let phoneIsValid = phoneNumberIsValid(phone);
  let emailValid = emailIsValid(email);

  // Check all the possible errors
  if (passwordsAreEqual == false) {
    errors += "Passwords do not match" + "\n";
  }
  if (usernameExists == true) {
    errors += "Username already exists" + "\n";
  }
  if (emailExists == true) {
    errors += "Email already exists" + "\n";
  }
  if (emailValid == false && email != "") {
    errors += "Email is not valid" + "\n";
  }
  if (phoneExists == true) {
    errors += "Phone already exists" + "\n";
  }
  if (phoneIsValid == false && phone != "") {
    errors += "Phone number is not valid";
  }

  // Create account
  if (errors == "") {
    if (
      username != "" &&
      password != "" &&
      repeatedPassword != "" &&
      email != "" &&
      phone != "" &&
      city != "" &&
      street != ""
    ) {
      const newUser = new User(username, password, email, phone, city, street);
      userList.push(newUser);
      localStorage.setItem("userList", JSON.stringify(userList));
      localStorage.setItem("currentUser", JSON.stringify(newUser));
    }
  } else {
    event.preventDefault();
    alert(errors);
  }
}

function logIn() {
  // Get variables from the form
  var username = document.forms["signInForm"]["username"].value;
  var password = document.forms["signInForm"]["password"].value;

  // Check if username exists
  let usernameExists = validateUsername(username);
  var loggedIn = true;

  // Log in if the username exists and the password is correct
  if (username == "" || password == "") {
    loggedIn = false;
    alert("One or more fields are empty");
  } else {
    if (usernameExists == true) {
      let correctPassword = getPassword(username);
      if (password != correctPassword) {
        loggedIn = false;
        alert("Password is not correct");
      }
    } else {
      loggedIn = false;
      alert("User does not exist");
    }

    if (loggedIn == true) {
      let userLogged = getUser(username);
      localStorage.setItem("currentUser", JSON.stringify(userLogged));
    } else {
      event.preventDefault();
    }
  }
}
