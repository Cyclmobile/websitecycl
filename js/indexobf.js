const _0x412081 = _0x5146;
function _0x56b6() {
  const _0x2bc387 = [
    "4350504bdzQsc",
    "2xXEdtS",
    "count",
    "446644stlssq",
    "1204CdIYuo",
    "693790JAqYAg",
    "5cXwkoH",
    "Document\x20does\x20not\x20exist.",
    "Error\x20reading\x20document:",
    "error",
    "1:310990335294:web:c8cb7e850a93d94854d06f",
    "cycl-ionic",
    "getElementById",
    "264CcYruj",
    "cycl-ionic.firebaseapp.com",
    "AIzaSyDpkOhaK9xqJoynNcq22EVSE44y5DebCSI",
    "310990335294",
    "4174485fhqVmD",
    "702cOMQzS",
    "textContent",
    "148270QbuYEb",
    "exists",
    "cycl-ionic.appspot.com",
    "18920BmoIcQ",
    "3110514QqBQqC",
  ];
  _0x56b6 = function () {
    return _0x2bc387;
  };
  return _0x56b6();
}
(function (_0x43a3f1, _0x38d947) {
  const _0x4b6821 = _0x5146,
    _0x589222 = _0x43a3f1();
  while (!![]) {
    try {
      const _0x411f00 =
        (-parseInt(_0x4b6821(0xb3)) / 0x1) * (parseInt(_0x4b6821(0xaf)) / 0x2) +
        parseInt(_0x4b6821(0xa6)) / 0x3 +
        -parseInt(_0x4b6821(0xae)) / 0x4 +
        (-parseInt(_0x4b6821(0xb4)) / 0x5) *
          (-parseInt(_0x4b6821(0xad)) / 0x6) +
        (-parseInt(_0x4b6821(0xb2)) / 0x7) *
          (-parseInt(_0x4b6821(0xac)) / 0x8) +
        (parseInt(_0x4b6821(0xa7)) / 0x9) * (parseInt(_0x4b6821(0xa9)) / 0xa) +
        (-parseInt(_0x4b6821(0xb1)) / 0xb) * (parseInt(_0x4b6821(0xbb)) / 0xc);
      if (_0x411f00 === _0x38d947) break;
      else _0x589222["push"](_0x589222["shift"]());
    } catch (_0x241297) {
      _0x589222["push"](_0x589222["shift"]());
    }
  }
})(_0x56b6, 0xc2f20);
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
function _0x5146(_0x2a01a5, _0x26248d) {
  const _0x56b681 = _0x56b6();
  return (
    (_0x5146 = function (_0x5146b8, _0xf265b3) {
      _0x5146b8 = _0x5146b8 - 0xa3;
      let _0x2d7d4a = _0x56b681[_0x5146b8];
      return _0x2d7d4a;
    }),
    _0x5146(_0x2a01a5, _0x26248d)
  );
}
const firebaseConfig = {
    apiKey: _0x412081(0xa4),
    authDomain: _0x412081(0xa3),
    projectId: _0x412081(0xb9),
    storageBucket: _0x412081(0xab),
    messagingSenderId: _0x412081(0xa5),
    appId: _0x412081(0xb8),
    measurementId: "G-BSWJX4TVBF",
  },
  app = initializeApp(firebaseConfig),
  firestore = getFirestore(app),
  totalRecordsCollectionRef = collection(firestore, "totalRecords"),
  documentName = "recycled";
async function fetchAndDisplayRecycledCount() {
  const _0x4fc6f8 = _0x412081,
    _0x426142 = doc(totalRecordsCollectionRef, documentName);
  try {
    const _0x262686 = await getDoc(_0x426142);
    if (_0x262686[_0x4fc6f8(0xaa)]()) {
      const _0x19c697 = _0x262686["data"]();
      if (_0x19c697[_0x4fc6f8(0xb0)] !== undefined) {
        const _0x145bef = document[_0x4fc6f8(0xba)]("recycledCount");
        _0x145bef[_0x4fc6f8(0xa8)] = _0x19c697[_0x4fc6f8(0xb0)];
      } else
        console[_0x4fc6f8(0xb7)](
          "Count\x20field\x20is\x20undefined\x20in\x20the\x20document."
        );
    } else console[_0x4fc6f8(0xb7)](_0x4fc6f8(0xb5));
  } catch (_0x29397c) {
    console[_0x4fc6f8(0xb7)](_0x4fc6f8(0xb6), _0x29397c);
  }
}
fetchAndDisplayRecycledCount();
