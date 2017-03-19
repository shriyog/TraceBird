function updateDatabase(latitude, longitude) {

    var user = firebase.auth().currentUser;

    if (user != null) {
        name = user.displayName;
        email = user.email;
        uid = user.uid;
        firebase.database().ref('/users/' + uid).set({
            Latitude: latitude,
            Longitude: longitude,
            Timestamp: "" + new Date(),
            Name: name
        });
        
        console.log("db update");
        console.log(latitude,longitude);
    }
    else
    alert("user null error. Login first");
}
