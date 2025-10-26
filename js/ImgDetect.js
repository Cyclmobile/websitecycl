let video = document.getElementById("webcam-container");
video.setAttribute("autoplay", "");
video.setAttribute("muted", "");
video.setAttribute("playsinline", "");

// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/u2wT0dghK/";

const backbtn = document.getElementById("backbtn");
const completedScreen = document.getElementById("overlaystation");

backbtn.addEventListener("click", function () {
  window.location.href = "home.html";
});

function load() {
  document.getElementById("text2").style.display = "block";
}
function hidetxt() {
  document.getElementById("text1").style.display = "none";
  document.getElementById("text3").style.display = "none";
  document.getElementById("loading").style.display = "none";
}

let returnHomebtn = document.getElementById("homebtn");
backbtn.addEventListener("click", function () {
  window.location.href = "home.html";
});

function CyclPoints() {
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

  var amount = 0;

  firebase.auth().onAuthStateChanged((FirebaseUser) => {
    if (FirebaseUser) {
      var uid = firebase.auth().currentUser.uid;

      setTimeout(() => {
        backbtn.disabled = false;
        backbtn.style.color = "white";
      }, 4000);

      var amountcc = firebase
        .database()
        .ref()
        .child(uid)
        .child("users/")
        .child("amount");
      amountcc.transaction(function (amount) {
        return amount + 2;
      });

      console.log(FirebaseUser);
    } else {
      console.log("not logged in");
    }
  });
}

let model, webcam, labelContainer, maxPredictions;

let isIos = false;
// fix when running demo in ios, video will be frozen;
if (
  window.navigator.userAgent.indexOf("iPhone") > -1 ||
  window.navigator.userAgent.indexOf("iPad") > -1
) {
  isIos = true;
}

// Load the image model and setup the webcam
async function init() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  // load the model and metadata
  // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
  // or files from your local hard drive
  // Note: the pose library adds "tmImage" object to your window (window.tmImage)
  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  // Convenience function to setup a webcam
  const flip = false; // whether to flip the webcam
  const width = 550;
  const height = 550;
  webcam = new tmImage.Webcam(width, height); // width, height, flip
  await webcam.setup({ facingMode: "environment" }); // request access to the webcam

  if (isIos) {
    document.getElementById("webcam-container").appendChild(webcam.webcam); // webcam object needs to be added in any case to make this work on iOS
    // grab video-object in any way you want and set the attributes
    const webCamVideo = document.getElementsByTagName("video")[0];
    webCamVideo.setAttribute("playsinline", true); // written with "setAttribute" bc. iOS buggs otherwise
    webCamVideo.muted = "true";
    webCamVideo.style.width = width + "px";
    webCamVideo.style.height = height + "px";
  } else {
    document.getElementById("webcam-container").appendChild(webcam.canvas);
  }

  try {
    // append elements to the DOM
    // if (isIos) {
    //     document.getElementById("webcam-container").appendChild(webcam.webcam);
    // }
    // else{
    //     document.getElementById("webcam-container").appendChild(webcam.canvas);
    // }
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) {
      // and class labels
      labelContainer.appendChild(document.createElement("div"));
    }
    (await webcam.play()) ? console.log("working") : console.log("not working");
    window.requestAnimationFrame(loop);
  } catch (e) {
    console.log("Catch an error: ", e);
  }
}

//executes the init function
init();

async function loop() {
  webcam.update(); // update the webcam frame
  await predict();
  window.requestAnimationFrame(loop);
}

// run the webcam image through the image model
async function predict() {
  // predict can take in an image, video or canvas html element
  // const prediction;
  // if (isIos) {
  //     prediction = await model.predict(webcam.webcam);
  // } else {
  //     prediction = await model.predict(webcam.canvas);
  // }
  const prediction = await model.predict(webcam.canvas);
  for (let i = 0; i < maxPredictions; i++) {
    const classPrediction =
      prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    labelContainer.childNodes[i].innerHTML = classPrediction;
    console.log(classPrediction);

    const Imagedetect = document.getElementById("label-container");
    document.getElementById("bottleshow").innerHTML = classPrediction;
    hidetxt();
    load();

    const recycled = prediction[1].probability.toFixed(2);
    const Stn = prediction[0].probability.toFixed(2);
    const TooFar = prediction[2].probability.toFixed(2);
    const hold = prediction[3].probability.toFixed(2);
    const bottleOut = prediction[4].probability.toFixed(2);
    const RecycleInfo = document.getElementById("info");
    const DropLight = document.getElementById("DropColor");

    function totalBottlesRecycled() {
      //total recycled
      var totalReecycled = firebase
        .database()
        .ref()
        .child("TotalRecycled")
        .child("TotalBottles");
      totalReecycled.transaction(function (result) {
        return result + 1;
      });
    }

    console.log(
      prediction[1].className + " " + prediction[1].probability.toFixed(2)
    );

    let isRecycled;

    if (recycled >= 0.9) {
      isRecycled = true;
    } else {
      isRecycled = false;
    }

    //RecycleStages
    function Recycle() {
      if (Stn > 0.0) {
        RecycleInfo.innerHTML = "Please hold the bottle top of the hole";
        DropLight.style.borderColor = "red";
        return false; //prevent form submission
      } else if (TooFar > 0.0) {
        RecycleInfo.innerHTML = "Move the camera closer to your hand &#128721";
        DropLight.style.borderColor = "red";
        return false; //prevent form submission
      } else if (bottleOut >= 0.05) {
        RecycleInfo.innerHTML = "Hold the bottle from the side";
        DropLight.style.borderColor = "red";
        return false; //prevent form submission
      } else if (hold >= 1.0) {
          RecycleInfo.innerHTML = "Drop your bottle carefully &#128516; &#9851";
          DropLight.style.borderColor = "green";
          return false; //prevent form submission
      }
      return false; //prevent form submission
    }

    //Switch

    switch (true) {
      case isRecycled === true:
        CyclPoints();
        completedScreen.style.display = "block";
        totalBottlesRecycled();

        returnHomebtn.addEventListener("click", function () {
          window.location.href = "home.html";
        });

        setTimeout(() => {
          returnHomebtn.disabled = false;
          returnHomebtn.style.color = "white";
        }, 4000);
        stream.getTracks().forEach(function (track) {
          if (track.readyState == "live" && track.kind === "video") {
            track.stop();
          }
        });
        return;
        break;
      case isRecycled === false:
        Recycle();
        return;
        break;

      default:
        return;
    }
  }
}
//<br> *Take your hand away after drop
