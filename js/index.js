$(document).ready(function() {

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDKtbbK0x-MUqXupFZkDBbFxzPlU9ArBNQ",
    authDomain: "the-quest-3.firebaseapp.com",
    databaseURL: "https://the-quest-3.firebaseio.com",
    projectId: "the-quest-3",
    storageBucket: "the-quest-3.appspot.com",
    messagingSenderId: "216176601003"
};
firebase.initializeApp(config);

var minigameCards = "";

var firestore = firebase.firestore();

firestore.collection("minigames").get().then(function(querySnapshot) {

    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        minigameCards += '<div class="col-md-4">'
        + '<div class="card">'
        + '<div class="card-block">'
        + '<h4 class="card-title">'+doc.data().name+'</h4>'
        + '<p class="card-text p-y-1">'+doc.data().description+'</p>'
        + '<input class="form-check-input" type="checkbox" value="" id="defaultCheck1">'
        + '<label class="form-check-label" for="defaultCheck1"> </label>'
        + '</div>'
        + '</div>'
        + '</div>'
    });
    $('#minigame-card').html(minigameCards);
});

//TRYING TO ADD TO THE DATABSE -- NOT WORKING!!
/* var firestore = firebase.firestore();

const docRef = firestore.doc("samples/sandwichData");
const outputHeader = document.querySelector("#hotDogOutput");
const inputTextField = document.querySelector("#latestHodDogStatus");
const saveButton = document.querySelector("#saveButton");


saveButton.addEventListener("click", function () {
    const textToSave = inputTextField.value;
    console.log("I am going to save " + textToSave + " to Firestore");
    docRef.set({
        hotDogStatus: textToSave
    }).then(function() {
        console.log("Status Saved");
     }).catch(function (error) {
        console.log("Got an error: ", error);
    });
})
 */

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.

        $(".user_div").show();
        $(".login_div").hide();
/*         document.getElementsByClassName("user_div").style.display = "block";
        document.getElementsByClassName("login_div").style.display = "none"; */

        var user = firebase.auth().currentUser;

        if (user != null) {

            var email_id = user.email;
            // document.getElementById("user_para").innerHTML = "TEST: Welcome User : " + email_id;
        }

    } else {
        // No user is signed in.

        $(".user_div").hide();
        $(".login_div").show();
/*         document.getElementsByClassName("user_div").style.display = "none";
        document.getElementsByClassName("login_div").style.display = "block"; */

    }
});

function login() {

    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error : " + errorMessage);
    });

}

function logout() {
    firebase.auth().signOut();
}


function randomString() {
    //var userRandomNumber = document.getElementById("randomnumber_field").value;
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ";
    var string_length = 4;
    var randomstring = '';
    for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }
    document.randform.randomfield.value = randomstring;
}

});


