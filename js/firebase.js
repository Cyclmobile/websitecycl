(function (){
  const firebaseConfig = {
    apiKey: "AIzaSyDTR4_vw3x8pTxIAiS8Y0-3T4APCwotpyg",
    authDomain: "cycl-77b6c.firebaseapp.com",
    databaseURL: "https://cycl-77b6c.firebaseio.com",
    projectId: "cycl-77b6c",
    storageBucket: "cycl-77b6c.appspot.com",
    messagingSenderId: "139900263133",
    appId: "1:139900263133:web:9c72ae1fd6569fe6a1d934",
    measurementId: "G-VPV104NQQW"
  };
  
    var app = {
        // Application Constructor
        initialize: function() {
            this.bindEvents();
        },
        // Bind Event Listeners
        //
        // Bind any events that are required on startup. Common events are:
        // 'load', 'deviceready', 'offline', and 'online'.
        bindEvents: function() {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        },
        // deviceready Event Handler
        //
        // The scope of 'this' is the event. In order to call the 'receivedEvent'
        // function, we must explicitly call 'app.receivedEvent(...);'
        onDeviceReady: function() {
            app.receivedEvent('deviceready');
        },
        // Update DOM on a Received Event
        receivedEvent: function(id) {
            var parentElement = document.getElementById(id);
            var listeningElement = parentElement.querySelector('.listening');
            var receivedElement = parentElement.querySelector('.received');
  
            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');
  
            console.log('Received Event: ' + id);
        }
    };
  
    firebase.initializeApp(firebaseConfig);
  
  var scnnrbtn=document.getElementById("scannbtn");
  var signout=document.getElementById("hidesignoff");
  var redeem=document.getElementById("redeem");
  var signin=document.getElementById("hidesignin");
  var database = firebase.database();
  var user = firebase.auth().currentUser;
  var email= firebase.auth().currentUser && firebase.auth().currentUser.email;
  var signoutbtn=document.getElementById("logoff");
  
  
  
  scnnrbtn.addEventListener("click", function(){
    firebase.auth().onAuthStateChanged(FirebaseUser => {
  
  
      if (FirebaseUser) {
        window.location.href=("securereturn.html")
        console.log(FirebaseUser);
      }else {
        console.log("not logged in");
        window.location.href=("login.html");
      }
  
      var users = firebase.database().child(uid).child("users/");
  
      users.push ({
         info: {
            email: email
  
         }
      });
  
      });
      var uid= firebase.auth().currentUser.uid;
  
  });
  signout.addEventListener("click", function(){
    firebase.auth().signOut();
  });
  
  redeem.addEventListener("click",function(){
    window.location.href=("Redeem.html")
  });
  
  firebase.auth().onAuthStateChanged(FirebaseUser => {
  if (FirebaseUser) {
    console.log(FirebaseUser);
    signin.style.display="none";
  
  }else {
    console.log("not logged in");
    signoutbtn.style.display = "none";
    redeem.style.display="none";
  }
  });
  
  
  //kart
  
  
  
  
  }());
  