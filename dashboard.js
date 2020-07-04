(function () {
  console.log("Dashboard");
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

  const btnLogout = document.getElementById("btnlogout");

  //logout function
  btnLogout.addEventListener("click", (e) => {
    firebase.auth().signOut();
    console.log("Signout");
    window.location.href = "index.html";
  });

  //realtime lisnter
  firebase.auth().onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) {
      console.log(firebaseUser);
      var user = firebase.auth().currentUser;
      var name = "";
      if (user.displayName != null) {
        name = user.displayName;
      }
      document.getElementById("title").innerHTML = "Welcome " + name;

      console.log(name);
    } else {
      console.log("not logged in");
    }
  });
})();
