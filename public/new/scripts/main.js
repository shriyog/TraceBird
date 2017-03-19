init();
var isTraceStarted = false;
var id = null;
var currentUser = null;

function init() {

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            console.log("user is logged in");
            currentUser = user;
            //fade the sign in box away
            document.getElementById('signin-container').style.display = 'none';

            //check role
            if (checkRole() == "publisher") {
                //Refresh handling. check if trace was already started using session var
                if (sessionStorage.getItem("isTraceStarted") == "true") {
                    //continue the trace
                    startProducer();
                }
                else //new loading. show the intro share banner
                    document.getElementById('shareBanner').style.display = 'block';

            }
            else {
                //Consumer
                startConsumer();
            }
        }
        else {
            // No user is signed in.
            console.log("user not logged in");
            document.getElementById('signin-container').style.display = 'block';
            ui.start('#firebaseui-auth-container', uiConfig);
        }
    });

}

function startProducer() {
    document.getElementById('map-canvas').style.display = "block";
    initializeMap();
    watchCurrentPosition();
    showShareBanner();
    isTraceStarted = true;
    sessionStorage.setItem("isTraceStarted", isTraceStarted);
}

function startConsumer() {
    document.getElementById('map-canvas').style.display = "block";
    initializeMap();

    if (currentUser) {
        var dbRef = firebase.database().ref().child('users').child(id);

        //Retrieve info one time
        return dbRef.once('value').then(function(snapshot) {
            showDisplayBanner(snapshot.val().Name, snapshot.val().Latitude, snapshot.val().Longitude);
        });

        // Attach an asynchronous callback to read the data at our posts reference
        dbRef.on("value", function(snapshot) {
            console.log(snapshot.val());
            setMarkerPosition(snapshot.val().Latitude, snapshot.val().Longitude);
            map.panTo(new google.maps.LatLng(snapshot.val().Latitude, snapshot.val().Longitude));

            // Update the google maps app location link
            //            x.innerHTML = "<a href='geo:0,0?q=" + snapshot.val().Latitude + "," + snapshot.val().Longitude + "(" + snapshot.val().Name + ")'>open map</a>";
        }, function(errorObject) {
            console.log("The read failed: " + errorObject.code);
            alert("OOPS! No such trace. check your URL");
        });
    }
    else {
        alert("Consumer error: not signed");
    }

}

function checkRole() {
    //parse url to get the id
    id = getParameterByName("id", null);
    //query db to retrieve data
    if (id != null) {
        return "consumer";
    }
    else
        return "publisher";
}

function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
