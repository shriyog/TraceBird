function updateDatabase(latitude, longitude) {

    if (currentUser != null) {
        firebase.database().ref('/users/' + currentUser.uid).set({
            Latitude: latitude,
            Longitude: longitude,
            Timestamp: "" + new Date(),
            Name: currentUser.displayName
        });
        
        console.log("db update");
        console.log(latitude,longitude);
    }
    else
        alert("DB update : user null error");
}
