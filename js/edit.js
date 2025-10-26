
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
    
    firebase.initializeApp(firebaseConfig);
  
  
  firebase.auth().onAuthStateChanged(FirebaseUser => {
    if (FirebaseUser) {
  
  
      var uid=firebase.auth().currentUser.uid;
      var database=firebase.database();
      var editmail=document.getElementById("editemail");
      var editname=document.getElementById("editname");

      var namefirebase = database.ref().child(uid).child('users').child("name");
      namefirebase.on('value', function(snapshot) {
        editname.value= snapshot.val();
      });
  
      var emailfirebase = database.ref().child(uid).child('users').child("email");
      emailfirebase.on('value', function(snapshot) {
       editmail.value= snapshot.val();;
      });

      function inputonclick(){

        var updatebtn=document.getElementById("updatebtn");
        var editname=document.getElementById('editname').oninput = () => {
            updatebtn.style.display="block"
          }
         var editmail=document.getElementById('editemail').oninput = () => {
            updatebtn.style.display="block"
          }

      }

      inputonclick();


      function updateprofile(){

        var editmail=document.getElementById("editemail");
        var editname=document.getElementById("editname");
        var updatebtn=document.getElementById("updatebtn");

        var updatename=editname.value;
        var updateemail=editmail.value;

        var users = firebase.database().ref().child(uid).child("users/");
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(editmail.value))
  {
        users.update ({
           
              email: updateemail,
              name: updatename,
           
        });
    }
      }

      updatebtn.addEventListener("click",function(){
            updateprofile();
            window.location.href="home.html";
    })



      console.log(FirebaseUser);
    }else {
      console.log("not logged in");
    }
  });


  
  
  //var emailToFirebase = firebase.database().ref().child(uid).child("users/");
  //emailToFirebase.update({email});

  
  
  }());