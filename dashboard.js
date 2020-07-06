(function () {
  console.log("Dashboard  v12");
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
  const db = firebase.firestore();
  const btnLogout = document.getElementById("btnlogout");
  const btnAdd = document.getElementById("btnAdd");
  const btnClear = document.getElementById("btnClear");
  const btnSearch = document.getElementById("btnSearch");
  const productList = document.querySelector("#productList");
  const txtName = document.querySelector("#txtName");
  const txtQuantity = document.querySelector("#txtQuantity");

  //fetching email
  var email;
  var name = "";

  //realtime lisnter
  auth.onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) {
      //console.log(firebaseUser);

      user = firebase.auth().currentUser;
      email = user.email;
      //console.log(email);
      fetchdata();
      if (user.displayName != null) {
        name = user.displayName;
      }
      document.getElementById("title").innerHTML = "Welcome " + name;

      // console.log(name);
    } else {
      //console.log("not logged in");
    }
  });

  // function to display data from the database
  function render(doc) {
    let li = document.createElement("li");
    li.classList.add("list-group-item", "justify-content-between");
    let name = document.createElement("big");
    let quantity = document.createElement("span");
    let btnDelete = document.createElement("button");
    let deleteIcon = document.createElement("i");

    deleteIcon.classList.add("material-icons");
    deleteIcon.innerHTML = "delete_sweep";
    btnDelete.classList.add("btn", "btn-outline-danger");
    btnDelete.appendChild(deleteIcon);

    btnDelete.innerHTML += " Delete";
    quantity.classList.add("badge", "badge-pill", "badge-primary", "ml-2");
    li.id = doc.id;
    //li.setAttribute("data-id", doc.id);
    name.textContent = doc.data().name;
    quantity.textContent = doc.data().quantity;

    li.appendChild(name);
    name.appendChild(quantity);
    li.appendChild(btnDelete);
    productList.appendChild(li);

    btnDelete.addEventListener("click", (e) => {
      let id = e.target.parentElement.id;
      db.collection("users").doc(email).collection("data").doc(id).delete();
    });
  }

  //realtime listener
  function fetchdata() {
    //fetching data
    var product = db
      .collection("users")
      .doc(email)
      .collection("data")
      .orderBy("name");
    product.onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();

      changes.forEach((change) => {
        //console.log(change.doc.data());
        if (change.type == "added") {
          render(change.doc);
        } else if (change.type == "removed") {
          let li = document.getElementById(change.doc.id);
          productList.removeChild(li);
        }
      });
    });
  }

  //logout function
  btnLogout.addEventListener("click", (e) => {
    firebase.auth().signOut();
    //console.log("Signout");
    window.location.href = "index.html";
  });

  //Add button functionality
  btnAdd.addEventListener("click", (e) => {
    // console.log("Add button clicked");

    //console.log(txtName.value, txtQuantity.value);
    db.collection("users").doc(email).collection("data").add({
      name: txtName.value,
      quantity: txtQuantity.value,
    });
    txtName.value = "";
    txtQuantity.value = "";
  });
  //Search button functionality
  btnSearch.addEventListener("click", (e) => {
    //console.log("Search button clicked");
    productList.innerHTML = "";
    var product = db
      .collection("users")
      .doc(email)
      .collection("data")
      .where("name", "==", txtName.value);
    product.get().then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.exists) {
          // console.log("Document data:", doc.data());
          render(doc);
        } else {
          // doc.data() will be undefined in this case
          // console.log("No such document!");
        }
      });
    });
  });
  //Clear button functionality
  btnClear.addEventListener("click", (e) => {
    // console.log("clear button clicked");
    txtName.value = "";
    txtQuantity.value = "";
  });
})();
