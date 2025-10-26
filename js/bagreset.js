// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
  measurementId: "G-VPV104NQQW",
};

// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  deleteField,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

const db = getFirestore();

getDoc(doc(db, "stations/1004")).then((docSnap) => {
  if (docSnap.exists()) {
    console.log("Document data: ", docSnap.data()["currentCap"]);

    if (docSnap.data()["currentCap"] == docSnap.data()["capacity"]) {
      // Create an "li" node:
      const node = document.createElement("li");

      // Create a text node:
      const textnode = document.createTextNode("stasjon 3 er full");

      // Append the text node to the "li" node:
      node.appendChild(textnode);

      // Append the "li" node to the list:
      document.getElementById("myList").appendChild(node);
    }
  } else {
    console.log("no such data!");
  }
});

const qrcode = window.qrcode;

const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

const qrResult = document.getElementById("qr-result");
const outputData = document.getElementById("outputData");

let scanning = false;
var station1 = ["1004"];
var station3 = ["1003"];
var station5 = ["1005"];
var station4 = ["1004"];

qrcode.callback = (res) => {
  if (res.includes(station4)) {
    outputData.innerText = res;
    scanning = false;
    alert(station4 + " er nå tom");
    setTimeout(function () {
      location.reload();
    }, 3000);

    // update
    updateDoc(doc(db, "stations/1004"), {
      currentCap: 0,
    });

    video.srcObject.getTracks().forEach((track) => {
      track.stop();
    });

    qrResult.hidden = false;
    canvasElement.hidden = true;
  } else if (res.includes(station5)) {
    outputData.innerText = res;
    scanning = false;
    alert("check");
    // update
    updateDoc(doc(db, "stations/1005"), {
      currentCap: 0,
    });

    video.srcObject.getTracks().forEach((track) => {
      track.stop();
    });

    qrResult.hidden = false;
    canvasElement.hidden = true;
  } else if (res.includes(station3)) {
    outputData.innerText = res;
    scanning = false;
    alert("check");
    // update
    updateDoc(doc(db, "stations/1003"), {
      currentCap: 0,
    });

    video.srcObject.getTracks().forEach((track) => {
      track.stop();
    });

    qrResult.hidden = true;
    canvasElement.hidden = false;
  }
};

navigator.mediaDevices
  .getUserMedia({ video: { facingMode: "environment" } })
  .then(function (stream) {
    scanning = true;
    qrResult.hidden = true;

    canvasElement.hidden = false;
    video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
    video.srcObject = stream;
    video.play();
    tick();
    scan();
  });

function tick() {
  canvasElement.height = video.videoHeight;
  canvasElement.width = video.videoWidth;
  canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

  scanning && requestAnimationFrame(tick);
}

function scan() {
  try {
    qrcode.decode();
  } catch (e) {
    setTimeout(scan, 300);
  }
}
