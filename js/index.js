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
    } else {
        // No user is signed in.
        $(".user_div").hide();
        $(".login_div").show();
    }
});

firestore.collection("minigames").get().then(function(querySnapshot) {
    var miniGameCards = "";

    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        miniGameCards += '<div id="'+doc.id+'" class="card custom-card mx-2 mb-3">'
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
    $('#minigame-card').html(miniGameCards);
});

function createNewGame() {
    var gameId = getGameId();
    var selectedMiniGames = getSelectedMiniGames();
    var user = firebase.auth().currentUser.uid;
    
    firestore.collection("games").doc(gameId).set({
        miniGames: selectedMiniGames,
        user: user
    })
    .then(function() {
        console.log("Document written with ID: ", gameId, selectedMiniGames);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
};

function getSelectedMiniGames() {
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
    };
    return randomstring;
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

