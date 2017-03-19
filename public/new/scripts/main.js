init();
var isTraceStarted = false;

function init() {
    //alert(checkRole());
    //check if trace was already started using session var
    if (sessionStorage.getItem("isTraceStarted")=="true"){
        //continue the trace
        startProducer();
    }
    else {
        //new loading ...
    }
}

function startProducer() {
    document.getElementById('map-canvas').style.display = "block";
    initializeMap();
    watchCurrentPosition();
    showShareBanner();
    isTraceStarted = true;
    sessionStorage.setItem("isTraceStarted", isTraceStarted);
}

function checkRole() {
    //parse url to get the id
    var id = getParameterByName("id", null);
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
