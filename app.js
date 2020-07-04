(function () {
  console.log("Beautiful");
  const firebaseConfig = {
    apiKey: "AIzaSyBt8l-yPXhyImLSTlsB-B3iQMisXB-h644",
    authDomain: "electrify-dab2d.firebaseapp.com",
    databaseURL: "https://electrify-dab2d.firebaseio.com",
    projectId: "electrify-dab2d",
    storageBucket: "electrify-dab2d.appspot.com",
    messagingSenderId: "1029529656307",
    appId: "1:1029529656307:web:04c0aff2cb83fd722f1086",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();

  const lEmail = document.getElementById("txtEmail");
  const lPass = document.getElementById("txtPassword");
  const btnlogin = document.getElementById("btnLogin");

  const sName = document.getElementById("signUpUserName");
  const sEmail = document.getElementById("signUpEmail");
  const sPass = document.getElementById("signUpPassword");
  const btnSignUp = document.getElementById("btnSignUp");

  //login
  btnlogin.addEventListener("click", (e) => {
    let alertdiv = document.querySelector("#alertLogin");
    if (alertdiv.hasChildNodes) {
      alertdiv.innerHTML = "";
    }

    const promise = auth.signInWithEmailAndPassword(lEmail.value, lPass.value);
    promise.catch((e) => {
      console.log(e.message);
      alertdiv.classList.add("alert", "alert-danger");
      var text = document.createTextNode(
        "Login Unsuccessful, something went wrong"
      );
      alertdiv.appendChild(text);
    });
  });

  //signup
  btnSignUp.addEventListener("click", (b) => {
    let alertdiv = document.querySelector("#alertSignUp");
    if (alertdiv.hasChildNodes) {
      alertdiv.innerHTML = "";
    }
    const promise = auth.createUserWithEmailAndPassword(
      sEmail.value,
      sPass.value
    );
    promise.then(function (result) {
      return result.user.updateProfile({
        displayName: sName.value,
      });
    });
    promise.catch((e) => {
      alertdiv.classList.add("alert", "alert-danger");
      var text = document.createTextNode("Unable to create account");
      alertdiv.appendChild(text);
    });
  }); //btnSignup method close

  //realtime listener
  firebase.auth().onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) {
      console.log(firebaseUser);
      window.location.href = "dashboard.html";
    } else {
      console.log("not logged in");
    }
  });
})();
