// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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


window.addEventListener('load', function () {
  let selectedDeviceId;
  var count=0;
  var database = firebase.database();
  const codeReader = new ZXing.BrowserMultiFormatReader()
  console.log('ZXing code reader initialized')
  codeReader.listVideoInputDevices()

  codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {


    if (result) {
  
      const auth= firebase.auth();
      console.log(result)

      var station=["1002"];
      var station3=["1003"];
      var station4=["1004"];
      var msg=document.getElementById("message");
      for(let i=0; i<station.length; i++){ 

  if (result == station[i]) {
var station_bag = firebase.database().ref().child('place').child("bag")
station_bag.transaction(function(result) {
  alert("beholderen er nå tom");
  location.reload();
   return result = 0;

});

return

} 

if (result == station3[i]) {
  var station_bag = firebase.database().ref().child('place').child("bag3")
  station_bag.transaction(function(result) {
    alert("beholderen er nå tom");
    location.reload();
     return result = 0;
  
  });
  
  return
  
  }

  if (result == station4[i]) {
    var station_bag = firebase.database().ref().child('place').child("bag4")
    station_bag.transaction(function(result) {
      alert("beholderen er nå tom");
      location.reload();
       return result = 0;
    
    });
    
    return
    
    }
}

if (err && !(err instanceof ZXing.NotFoundException)) {
console.error(err)
document.getElementById('rezlt').textContent = err
}

else{
this.alert("Ops en feil har oppståt prøv på nytt")
}

}
let fullBag = false;
let bag1000 = firebase
.database()
.ref()
.child("place")
.child("bag");




// let bag1002  = firebase
// .database()
// .ref()
// .child("place")
// .child("bag2");


let bag1003  = firebase
.database()
.ref()
.child("place")
.child("bag3");


let bag1004  = firebase
.database()
.ref()
.child("place")
.child("bag4");
checkbag();


function checkbag() {

  bag1000.transaction(function (bagcountr) {
  

    if (bagcountr > 75) {

      document.getElementById('stationClas1').className = 'box red'

      // const node = document.createElement("li");
      // const textnode = document.createTextNode("Beholder 1002 er Full'");
      // node.appendChild(textnode);
      // document.getElementById("listOfStn").appendChild(node);
      // return 75; 

    } else {
      return bagcountr;
    }
  });

  // bag1002.transaction(function (bagcountr) {
  

  //   if (bagcountr > 75) {

  //  document.getElementById("bag2").innerHTML='Beholder 1002 er Full';


  //     return;
  //   } else {
  //     return bagcountr;
  //   }
  // });

  bag1003.transaction(function (bagcountr) {

    if (bagcountr > 75) {
      document.getElementById('stationClas2').className = 'box red'


    } else {
      return bagcountr;
    }
  });

  bag1004.transaction(function (bagcountr) {
  

    if (bagcountr > 75) {

      document.getElementById('stationClas3').className = 'box red'

    } else {
      return bagcountr;
    }
  });

  
}

  /* find the fuck out of the auth  firebase.auth().onAuthStateChanged(FirebaseUser => {
      if (FirebaseUser) {
        window.open("index.html");
        console.log(FirebaseUser);
      }else {
        console.log("not logged in");
      }
    });*/


     
  })
  console.log(`Started continous decode from camera with id ${selectedDeviceId}`)



// let bag1003  = firebase
// .database()
// .ref()
// .child("place")
// .child("bag3");
// checkbag();

// function checkbag() {
//   bag1003.transaction(function (bagcountr) {
  

//     if (bagcountr > 75) {

//    document.getElementById("bag3").innerHTML='Beholder 1003 er Full';

//       return;
//     } else {
//       document.getElementById("bag3").innerHTML='Bag not full';
//       return bagcountr;
//     }
//   });
// }




})



// document.getElementById('resetButton').addEventListener('click', () => {
//   codeReader.reset()
//   document.getElementById('result').textContent = '';
//   console.log('Reset.')
// })


