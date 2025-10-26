const firebaseConfig = {
  apiKey: "AIzaSyDTR4_vw3x8pTxIAiS8Y0-3T4APCwotpyg",
  authDomain: "cycl-77b6c.firebaseapp.com",
  databaseURL: "https://cycl-77b6c.firebaseio.com",
  projectId: "cycl-77b6c",
  storageBucket: "cycl-77b6c.appspot.com",
  messagingSenderId: "139900263133",
  appId: "1:139900263133:web:9c72ae1fd6569fe6a1d934",
  measurementId: "G-VPV104NQQW",
};

firebase.initializeApp(firebaseConfig);

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

mapboxgl.accessToken =
  "pk.eyJ1IjoiY3ljbG1vYmlsZWFwcCIsImEiOiJja3lxODBqYmwwYW10Mnd0Z2dxdDZxZGF2In0.ElRjKCz4QVFOQ8l_0hJjSw";

const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v11", // style URL
  center: [10.76460523138374, 59.91834370141862],
  zoom: 16, // starting zoom
  maxZoom: 20,
  minZoom: 5,
});
// Initialize the geolocate control.
var geolocate = new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true,
  },
  // When active the map will receive updates to the device's location as it changes.
  trackUserLocation: true,
});

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition((position) => {
    // jump to coordinates at current zoom
    // jump with zoom, pitch, and bearing options
    map.jumpTo({
      center: [position.coords.longitude, position.coords.latitude],
      zoom: 8,
    });
  });
}
// Add the control to the map.
map.addControl(geolocate);
map.on("load", function () {
  geolocate.trigger(); //<- Automatically activates geolocation
});
//markers

const geojson = {
  type: "FeatureCollection",
  features: [
    // {
    //   type: "Feature",
    //   properties: {
    //     message: "1002",
    //     iconSize: [50, 50],
    //   },
    //   geometry: {
    //     type: "Point",
    //     coordinates: [10.76460523138374,59.91834370141862],
    //   },
    // },
    {
      type: "Feature",
      properties: {
        message: "1003",
        iconSize: [50, 50],
      },
      geometry: {
        type: "Point",
        coordinates: [10.764263195787748, 59.91817618677919],
      },
    },
    {
      type: "Feature",
      properties: {
        message: "1004",
        iconSize: [50, 50],
      },
      geometry: {
        type: "Point",
        coordinates: [10.748327479238924, 59.956241418026366],
      },
    },
    {
      type: "Feature",
      properties: {
        message: "1005",
        iconSize: [50, 50],
      },
      geometry: {
        type: "Point",
        coordinates: [10.778079542079354, 59.931660958662064],
      },
    },
  ],
};

var modal = document.getElementById("myModal");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

window.addEventListener("load", function () {
  if (document.body.clientWidth < 500) {
    document.getElementById("applyModalWindowResize").style.justifyContent =
      "start";
  } else {
    document.getElementById("applyModalWindowResize").style.justifyContent =
      "center";
  }
});

window.addEventListener("resize", function () {
  if (document.body.clientWidth < 500) {
    document.getElementById("applyModalWindowResize").style.justifyContent =
      "start";
  } else {
    document.getElementById("applyModalWindowResize").style.justifyContent =
      "center";
  }
});

// Add markers to the map.
for (const marker of geojson.features) {
  // Create a DOM element for each marker.
  var isMarkerClickable = true;
  var timeout;
  const el = document.createElement("div");
  const width = marker.properties.iconSize[0];
  const height = marker.properties.iconSize[1];
  el.className = "marker";
  el.style.backgroundImage = `url('Images/logo.png')`;
  el.style.width = `${width}px`;
  el.style.height = `${height}px`;
  el.style.backgroundSize = "100%";
  el.style.zIndex = "0";
  el.style.pointerEvents = "auto";
  // el.style.pointerEvents = "none";

  new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(map);

  //Location distance
  geolocate.on("geolocate", function (e) {
    var lon = e.coords.longitude;
    var lat = e.coords.latitude;
    var position = [lon, lat];
    //console.log(position);

    var from = position; //lng, lat
    var to = marker.geometry.coordinates; //lng, lat
    var modal = document.getElementById("myModal");

    var options = {
      units: "miles",
    };

    var distance = turf.distance(to, from, options);
    console.log(distance);

    //Marker onclick
    //gives wrong output for bagcount
    el.addEventListener("click", () => {
      if (isMarkerClickable) {
        isMarkerClickable = false;
        //0 point 012 0.095
        if (distance > 111111.095) {
          var divAlert = document.getElementById("alertdiv");
          //gi den 3 sec delay
          divAlert.style.display = "block";
          var close = document
            .getElementById("closeAlert")
            .addEventListener("click", function () {
              divAlert.style.display = "none";
            });
        } else {
          switch (marker.properties.message) {
            // case "1002":
            //   modal.style.display = "flex";
            //   document.getElementById("returnstation").innerHTML = "1002";
            //   document.getElementById("place").innerHTML = "Hersleb V.gående";
            //   document.getElementById("adress").innerHTML = "Herslebs gate";

            //   var divAlert = document.getElementById("alertdiv");
            //   divAlert.style.display = "none";
            //   return bagcount();

            //   break;
            //   return;
            case "1003":
              modal.style.display = "flex";
              document.getElementById("returnstation").innerHTML = "1003";
              document.getElementById("place").innerHTML = "Hersleb V.gående";
              document.getElementById("adress").innerHTML = "Herslebs gate";
              bagcount();
              var divAlert = document.getElementById("alertdiv");
              divAlert.style.display = "none";
              return;
              break;

            case "1004":
              modal.style.display = "flex";
              document.getElementById("returnstation").innerHTML = "1004";
              document.getElementById("place").innerHTML = "Bydel Nordre Aker";
              document.getElementById("adress").innerHTML =
                "Gunnar Johnsons vei 3-11";
              var divAlert = document.getElementById("alertdiv");
              divAlert.style.display = "none";
              bagcount();
              return;
              break;

            case "1005":
              modal.style.display = "flex";
              document.getElementById("returnstation").innerHTML = "1005";
              document.getElementById("place").innerHTML = "Home";
              document.getElementById("adress").innerHTML = "Rosenhoff";
              var divAlert = document.getElementById("alertdiv");
              divAlert.style.display = "none";
              bagcount();
              return;
              break;
          }

          //function bagcounter
          function bagcount() {
            switch (marker.properties.message) {
              // case "1002":
              //   var bagcounter = firebase
              //     .database()
              //     .ref()
              //     .child("place")
              //     .child("bag");
              //   checkbag();
              //   var bagcount = firebase.database().ref("place/").child("bag");
              //   bagcount.transaction(function (bagcountr) {
              //     return bagcountr + 1;
              //   });

              //   break;
              case "1003":
                var bagcounter = firebase
                  .database()
                  .ref()
                  .child("place")
                  .child("bag3");
                checkbag();
                modal.style.display = "flex";
                var bagcount = firebase.database().ref("place/").child("bag3");
                bagcount.transaction(function (bagcountr) {
                  return bagcountr + 1;
                });

                break;

              case "1004":
                modal.style.display = "flex";
                var bagcount = firebase.database().ref("place/").child("bag4");
                bagcount.transaction(function (bagcountr) {
                  return bagcountr + 1;
                });
                var bagcounter = firebase
                  .database()
                  .ref()
                  .child("place")
                  .child("bag4");
                checkbag();

                break;
            }

            function checkbag() {
              bagcounter.transaction(function (bagcountr) {
                var bagcapicity = document.getElementById("bagQauntity");
                var fullbag = 75;
                var percent = Math.round((bagcountr / fullbag) * 100);
                bagcapicity.innerHTML = percent + "% full";

                if (bagcountr > 75) {
                  modal.style.display = "none";
                  var bagfullAlert = document.getElementById("fullbagAlert");

                  bagfullAlert.style.display = "block";
                  var closeAlertBag = document
                    .getElementById("closeFullbagAlert")
                    .addEventListener("click", function () {
                      bagfullAlert.style.display = "none";
                    });

                  return;
                } else {
                  modal.style.display = "flex";
                  return bagcountr;
                }
              });
            }
          }
          var span = document.getElementsByClassName("close")[0];
        }
      } else {
        timeout && clearTimeout(timeout);
        timeout = setTimeout(() => {
          isMarkerClickable = true;
        }, 1000);
      }
    });
  });
}

//check if signed in

var scnnrbtn = document.getElementById("scannbtn");
var database = firebase.database();
var user = firebase.auth().currentUser;
var email = firebase.auth().currentUser && firebase.auth().currentUser.email;
var signoutbtn = document.getElementById("logoff");

scnnrbtn.addEventListener("click", function () {
  firebase.auth().onAuthStateChanged((FirebaseUser) => {
    if (FirebaseUser) {
      window.location.href = "scanner.html";
      console.log(FirebaseUser);
    } else {
      console.log("not logged in");
      window.location.href = "login.html";
    }

    var users = firebase.database().child(uid).child("users/");

    users.push({
      info: {
        email: email,
      },
    });
  });
  var uid = firebase.auth().currentUser.uid;
});

firebase.auth().onAuthStateChanged((FirebaseUser) => {
  var redeem = document.getElementById("redeem");

  redeem.addEventListener("click", function () {
    if (FirebaseUser) {
      window.location.href = "Redeem.html";
      console.log(FirebaseUser);
    } else {
      console.log("not logged in");
      window.location.href = "login.html";
    }
  });
});
