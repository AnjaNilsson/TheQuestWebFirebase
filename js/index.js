// Initialize Firebase
var config = {

};
firebase.initializeApp(config);





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
            document.getElementById("user_para").innerHTML = "TEST: Welcome User : " + email_id;
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



