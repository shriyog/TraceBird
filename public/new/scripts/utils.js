//producer
//shows url, whatsapp share
function showShareBanner() {
  var banner = document.getElementById('shareBanner');
  var shareURL = "https://tracebird-5c028.firebaseapp.com/new/index.html?id=" + currentUser.uid;
  banner.innerHTML = "<input type='text' id='shareURL' value=" + shareURL + " class='field left' readonly> \
  <br>\
  <a href='whatsapp://send?text=Check me out at " + shareURL + " ' class='button button-default'>Share using WhatsApp</a>";
  document.getElementById('shareBanner').style.display = 'block';
}

//consumer
//shows display name of trackee, footer with maps and start own trace buttons
function showDisplayBanner(name, latitude, longitude) {
  var shareBanner = document.getElementById('shareBanner');
  shareBanner.innerHTML = "<div id='displayBanner'><h5 class='title'>Showing realtime location of " + name + "</h5></div>"

  var footerBanner = document.getElementById('footerBanner');
  footerBanner.innerHTML = "<a class='button button-warning' href='geo:0,0?q=" + latitude + "," + longitude + "(" + name + ")'>Open in Maps</a>\
  <a class='button button-primary' href='/new/index.html'>Start your own trail</a>"
  document.getElementById('shareBanner').style.display = 'block';
}
