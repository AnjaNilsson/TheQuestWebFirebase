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

var firestore = firebase.firestore();

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

firestore.collection("minigames").get().then(function(querySnapshot) {
    var minigameCards = "";

    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        minigameCards += '<div id="'+doc.id+'" class="card custom-card mx-2 mb-3">'
        + '<div class="card-body">'
        + '<h4 class="card-title">'+doc.data().name+'</h4>'
        + '<p class="card-text p-y-1">'+doc.data().description+'</p>'
        + '<label class="switch">'
        + '<input type="checkbox" id="check_'+doc.id+'">'
        + '<span for="check_'+doc.id+'" class="slider"></span>'
        + '</label>'
        + '<input type="number" class="form-control" id="lat_'+doc.id+'" placeholder="Latitude">'
        + '<input type="number" class="form-control" id="lon_'+doc.id+'" placeholder="Longitude">'
        + '</div>'
        + '</div>'

    });
    $('#minigame-card').html(minigameCards);
});


function createNewGame() {
    var gameId = getGameId();
    var selectedGames = [];
    var user = firebase.auth().currentUser.uid;
    
    var selectedGames = getSelected();

    firestore.collection("games").doc(gameId).set({
        config: selectedGames,
        user: user
    })
    .then(function() {
        console.log("Document written with ID: ", gameId, selectedGames);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

};


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

function getSelected() {
    var selected = [];
    $('.switch input:checked').each(function() {
        var selectedId = $(this).attr('id').substr(6);
        
        selected.push({
            [selectedId]: {
                "lat": $('#lat_' + selectedId).val(),
                "lon": $('#lon_' + selectedId).val()
            }
        });

    });
    return selected;
}

function getGameId() {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ";
    var string_length = 4;
    var randomstring = '';
    for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }

    return randomstring;
}

