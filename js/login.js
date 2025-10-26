(function () {
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
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //get email and pass
  var txtemail = document.getElementById("email");
  var resetbutton = document.getElementById("forgotpass");
  var txtpassword = document.getElementById("passwrd");
  var btnlogin = document.getElementById("login");
  var btnsignup = document.getElementById("signup");
  var btnlLogout = document.getElementById("logout");
  var database = firebase.database();
  const signInWithFb = document.getElementById("signInWithFb");

  function keyDown(e) {
    var e = window.event || e;
    var key = e.keyCode;
    //space pressed
    if (key == 32) {
      //space
      e.preventDefault();
    }
  }

  btnlogin.addEventListener("click", (e) => {
    //get email and passwrd
    if (txtemail.value == "") {
      alert("please write your email adress");
    } else {
      var email = txtemail.value;
      var password = txtpassword.value;
      const auth = firebase.auth();
      //sign in
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(function (firebaseUser) {
          document.getElementById('loginload').style.display="block"
          // Success
        })
        .catch(function (error) {
          document.getElementById("loginmessage").innerHTML =
            "Wrong email or password. Try again";
          // Error Handling
        });
    }
  });

  window.addEventListener("load", function () {
    if (document.body.clientWidth < 500) {
      document.getElementById("appLogoID").style.width = "200px";
    } else {
      document.getElementById("appLogoID").style.width = "160px";
    }
  });

  window.addEventListener("resize", function () {
    if (document.body.clientWidth < 500) {
      document.getElementById("appLogoID").style.width = "100px";
    } else {
      document.getElementById("appLogoID").style.width = "160px";
    }
  });

  document.getElementById('closeLogin').addEventListener('click',function(){
    window.location.href='home.html'
  })

  //login with google

  /*signInWithGoogle.addEventListener("click", function () {
    const auth = firebase.auth();
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithRedirect(googleProvider)
      .then(() => {
        if (FirebaseUser) {
          window.location.href = "home2.html";
          console.log(FirebaseUser);
        } else {
          console.log("not logged in");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
  //login with facebook
  signInWithFb.addEventListener("click", function () {
    const auth = firebase.auth();
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    auth
      .signInWithRedirect(fbProvider)
      .then(() => {
        if (FirebaseUser) {
          window.location.href = "home2.html";
          console.log(FirebaseUser);
        } else {
          console.log("not logged in");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(fbProvider);
  });*/
  
  //realtile listener
  //we can check if we are logged in from here aswell
  //if user is loged in forward to the map.
  firebase.auth().onAuthStateChanged((FirebaseUser) => {
    if (FirebaseUser) {
      window.location.href = "home.html";
      console.log(FirebaseUser);
    } else {
      console.log("not logged in");
    }
  });
})();

// TODO: Verifes email adresses
// TODO: email addresses has to be godkjent
// TODO: Forgot passwrd fixing
// TODO: redeeming
// TODO: connect firebase to the respected stores and partners
// TODO: kilometers
//gps as icon
// TODO: for extra fix the maps
