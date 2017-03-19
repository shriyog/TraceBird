var myLatLng;
var myOptions;
var map;
var marker;

//Producer: creates own map
function initializeMap() {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(location) {
      buildMap(location.coords.latitude, location.coords.longitude);
    });
  }
  else {
    alert("Geolocation is not supported by this browser");
  }

}

//common
function buildMap(latitude, longitude) {
  myLatLng = new google.maps.LatLng(latitude, longitude);
  myOptions = {
    zoom: 12,
    center: myLatLng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById('map-canvas'), myOptions);
  marker = new google.maps.Marker({
    position: myLatLng,
    map: map
  });
  marker.setMap(map);
}

//common
function setMarkerPosition(latitude, longitude) {
  marker.setPosition(new google.maps.LatLng(latitude, longitude));
  console.log(latitude, longitude);
}


//producer: sets marker when it's location changes
function watchCurrentPosition() {
  if (navigator.geolocation) {
    var positionTimer = navigator.geolocation.watchPosition(function(position) {
      //oprations to performs when user location is changed
      //set marker
      setMarkerPosition(position.coords.latitude, position.coords.longitude);
      map.panTo(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    });
  }
  else {
    alert("Geolocation is not supported by this browser");
  }
}
