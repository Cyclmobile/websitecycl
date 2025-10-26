(function(){

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
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //get email and pass
  var name=document.getElementById("txtname");
  var txtemail=document.getElementById("email");
  var phone=document.getElementById("phonenmbr");
  var txtpassword=document.getElementById("passwrd");
  var btnsignup=document.getElementById("rgstr");
  var database = firebase.database();


  //  btnlogin.addEventListener("click", e=>{
  //   //get email and passwrd
  //   if (txtemail.value=="") {
  //     alert("please write your email adress")
  //
  //   }else {
  //
  //     var email=txtemail.value;
  //     var password=txtpassword.value;
  //     const auth= firebase.auth();
  //   //sign in
  //     const promise = auth.signInWithEmailAndPassword(email,password);
  //     promise.catch(e => console.log(e.message));
  //
  //   }
  //
  // });


  //add singup event
  btnsignup.addEventListener("click", e=>{
    //get email and pass
    //TODO CHECK 5 REAL EMAIL
    const membername=name.value;
      const email=txtemail.value;
      const password=txtpassword.value;
      const auth= firebase.auth();
      const errortxt=document.getElementById("errormsg");
      //
      if (membername=="") {
        errortxt.innerHTML="please write your name"
      return}
      else{ 
     


     //sign in
   firebase.auth().createUserWithEmailAndPassword(email , password)
   .then(function(firebaseUser) {
       // Success 

   })
  .catch(function(error) {
    console.log(error);
    errortxt.innerHTML=error;
   
       // Error Handling
  });
}

  });

  


  //realtile listener
  //we can check if we are logged in from here aswell
  //if user is loged in forward to the map.
  firebase.auth().onAuthStateChanged(FirebaseUser => {
    if (FirebaseUser) {

      var firstnlastname=name.value;
      var emailtext=txtemail.value;
      var phonetxt=phone.value;
      let amount=0;

      var uid= firebase.auth().currentUser.uid;

      var amountToFirebase = firebase.database().ref().child(uid).child("users/");
      amountToFirebase.update({amount});


      var users = firebase.database().ref().child(uid).child("users/");

                users.update ({
                   
                      email: emailtext,
                      name: firstnlastname,
                      phone:phonetxt,
                      



                   
                });



      window.location.href=("home.html")


      console.log(FirebaseUser);
    }else {
      console.log("not logged in");
    }
  });

}());
