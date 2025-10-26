//Firebase & navigation

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


//check if signed in

var profile = document.getElementById("hideprofile");
//if signed of make redeem forward user to sign in
// var redeem = document.getElementById("redeem");
var signin = document.getElementById("hidesignin");
var signout = document.getElementById("logOut");
var deletBtn=document.getElementById('deleteAcc')
// scnnrbtn.addEventListener("click", function () {
//   firebase.auth().onAuthStateChanged((FirebaseUser) => {
//     if (FirebaseUser) {
//       window.location.href = "scanner.html";
//       console.log(FirebaseUser);
//     } else {
//       console.log("not logged in");
//       window.location.href = "login.html";
//     }

//     var users = firebase.database().child(uid).child("users/");

//     users.push({
//       info: {
//         email: email,
//       },
//     });
//   });
//   var uid = firebase.auth().currentUser.uid;
// });
signout.addEventListener("click", function () {
  firebase.auth().signOut();
  window.location.href="login.html"
});




firebase.auth().onAuthStateChanged((FirebaseUser) => {
  if (FirebaseUser) {

    deletBtn.addEventListener("click", function () {

      var text='Are you sure you want to delete your account?'

        
        if (confirm(text) == true) {
          var user = firebase.auth().currentUser;
        console.log(' deleted')

        user.delete().then(function() {
          // User deleted.
        }, function(error) {
          console.log(error.message)
          alert(error.message + ' please contact us at team@cyclmobileapp.com to delete your account')
          // An error happened.
        });
        return;
        } else {
          console.log('not deleted')
        }

        
        

       
  
});


    console.log(FirebaseUser);
    setTimeout(() => {
        signin.style.display = "none";
    }, 2000);
  } else {
    console.log("not logged in");
    profile.style.display = "none";
    signout.style.display='none';
    deletBtn.style.display='none'
    setTimeout(() => {
        signin.style.display = "block";
    }, 1000);
    
  }
});
