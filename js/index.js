// Initialize Firebase

var config = {
  apiKey: "AIzaSyDKtbbK0x-MUqXupFZkDBbFxzPlU9ArBNQ",
  authDomain: "the-quest-3.firebaseapp.com",
  databaseURL: "https://the-quest-3.firebaseio.com",
  projectId: "the-quest-3",
  storageBucket: "",
  messagingSenderId: "216176601003"
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "TEST: Welcome User : " + email_id;
    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);
  });

}

function logout(){
  firebase.auth().signOut();
}


function randomString(){
  //var userRandomNumber = document.getElementById("randomnumber_field").value;
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZ";
	var string_length = 5;
  var randomstring = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
	document.randform.randomfield.value = randomstring;
}

db.collection("games").doc("G2B3").collection("minigames").doc("chargethebattery")({
  name: "Charge The Battery",
})
.then(function() {
  console.log("Document successfully written!");
})
.catch(function(error) {
  console.error("Error writing document: ", error);
});