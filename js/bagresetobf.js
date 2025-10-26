const _0x401423 = _0x501f;
(function (_0x116d9b, _0x47c4be) {
  const _0x24b31e = _0x501f,
    _0x266647 = _0x116d9b();
  while (!![]) {
    try {
      const _0x473fa0 =
        (parseInt(_0x24b31e(0xbb)) / 0x1) * (-parseInt(_0x24b31e(0xbd)) / 0x2) +
        -parseInt(_0x24b31e(0xc4)) / 0x3 +
        -parseInt(_0x24b31e(0xd0)) / 0x4 +
        parseInt(_0x24b31e(0xbf)) / 0x5 +
        (parseInt(_0x24b31e(0xd7)) / 0x6) * (-parseInt(_0x24b31e(0xe2)) / 0x7) +
        (parseInt(_0x24b31e(0xd2)) / 0x8) * (parseInt(_0x24b31e(0xc3)) / 0x9) +
        parseInt(_0x24b31e(0xc9)) / 0xa;
      if (_0x473fa0 === _0x47c4be) break;
      else _0x266647["push"](_0x266647["shift"]());
    } catch (_0x279114) {
      _0x266647["push"](_0x266647["shift"]());
    }
  }
})(_0x4678, 0x1d833);
const firebaseConfig = {
  apiKey: _0x401423(0xc0),
  authDomain: "cycl-77b6c.firebaseapp.com",
  databaseURL: _0x401423(0xdc),
  projectId: _0x401423(0xcb),
  storageBucket: "cycl-77b6c.appspot.com",
  messagingSenderId: _0x401423(0xd1),
  appId: "1:139900263133:web:9c72ae1fd6569fe6a1d934",
  measurementId: "G-VPV104NQQW",
};
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
function _0x4678() {
  const _0x3b90e7 = [
    "getElementById",
    "no\x20such\x20data!",
    "play",
    "appendChild",
    "setAttribute",
    "stop",
    "Document\x20data:\x20",
    "myList",
    "stations/1004",
    "1002",
    "log",
    "14251xsovMm",
    "height",
    "6KaKdGp",
    "1005",
    "20480RTwEJf",
    "AIzaSyDTR4_vw3x8pTxIAiS8Y0-3T4APCwotpyg",
    "stasjon\x203\x20er\x20full",
    "videoHeight",
    "4167NPliEL",
    "662058jtXImZ",
    "environment",
    "video",
    "then",
    "srcObject",
    "6614390vuxrTV",
    "getContext",
    "cycl-77b6c",
    "forEach",
    "getUserMedia",
    "data",
    "playsinline",
    "697228huPBby",
    "139900263133",
    "1784oVdZAC",
    "videoWidth",
    "getTracks",
    "createElement",
    "width",
    "252186oehOCf",
    "includes",
    "createTextNode",
    "hidden",
    "1003",
    "https://cycl-77b6c.firebaseio.com",
    "reload",
    "innerText",
    "qr-result",
    "currentCap",
    "\x20er\x20nå\x20tom",
    "35QEcBUj",
    "decode",
  ];
  _0x4678 = function () {
    return _0x3b90e7;
  };
  return _0x4678();
}
function _0x501f(_0x49d767, _0x46f584) {
  const _0x467896 = _0x4678();
  return (
    (_0x501f = function (_0x501f70, _0x51194a) {
      _0x501f70 = _0x501f70 - 0xb1;
      let _0xd28960 = _0x467896[_0x501f70];
      return _0xd28960;
    }),
    _0x501f(_0x49d767, _0x46f584)
  );
}
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
const app = initializeApp(firebaseConfig),
  analytics = getAnalytics(app);
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
getDoc(doc(db, _0x401423(0xb8)))[_0x401423(0xc7)]((_0x1e54fd) => {
  const _0x56ec8f = _0x401423;
  if (_0x1e54fd["exists"]()) {
    console[_0x56ec8f(0xba)](
      _0x56ec8f(0xb6),
      _0x1e54fd[_0x56ec8f(0xce)]()[_0x56ec8f(0xe0)]
    );
    if (
      _0x1e54fd[_0x56ec8f(0xce)]()[_0x56ec8f(0xe0)] ==
      _0x1e54fd["data"]()["capacity"]
    ) {
      const _0x5d4d08 = document["createElement"]("li"),
        _0x48a461 = document[_0x56ec8f(0xd9)](_0x56ec8f(0xc1));
      _0x5d4d08[_0x56ec8f(0xb3)](_0x48a461),
        document[_0x56ec8f(0xe4)](_0x56ec8f(0xb7))["appendChild"](_0x5d4d08);
    }
  } else console[_0x56ec8f(0xba)](_0x56ec8f(0xb1));
});
const qrcode = window["qrcode"],
  video = document[_0x401423(0xd5)](_0x401423(0xc6)),
  canvasElement = document[_0x401423(0xe4)]("qr-canvas"),
  canvas = canvasElement[_0x401423(0xca)]("2d"),
  qrResult = document["getElementById"](_0x401423(0xdf)),
  outputData = document[_0x401423(0xe4)]("outputData");
let scanning = ![];
var station2 = [_0x401423(0xb9)],
  station3 = [_0x401423(0xdb)],
  station5 = [_0x401423(0xbe)],
  station4 = ["1004"];
(qrcode["callback"] = (_0x24976a) => {
  const _0x42a0ed = _0x401423;
  if (_0x24976a[_0x42a0ed(0xd8)](station4))
    (outputData[_0x42a0ed(0xde)] = _0x24976a),
      (scanning = ![]),
      alert(station4 + _0x42a0ed(0xe1)),
      setTimeout(function () {
        const _0x237213 = _0x42a0ed;
        location[_0x237213(0xdd)]();
      }, 0xbb8),
      updateDoc(doc(db, _0x42a0ed(0xb8)), { currentCap: 0x0 }),
      video[_0x42a0ed(0xc8)][_0x42a0ed(0xd4)]()["forEach"]((_0x1ce148) => {
        const _0x3ed6da = _0x42a0ed;
        _0x1ce148[_0x3ed6da(0xb5)]();
      }),
      (qrResult["hidden"] = ![]),
      (canvasElement[_0x42a0ed(0xda)] = !![]);
  else {
    if (_0x24976a[_0x42a0ed(0xd8)](station2))
      (outputData["innerText"] = _0x24976a),
        (scanning = ![]),
        alert(station2 + _0x42a0ed(0xe1)),
        updateDoc(doc(db, "stations/1002"), { currentCap: 0x0 }),
        video["srcObject"]["getTracks"]()["forEach"]((_0xa8a6be) => {
          const _0x240e16 = _0x42a0ed;
          _0xa8a6be[_0x240e16(0xb5)]();
        }),
        (qrResult[_0x42a0ed(0xda)] = ![]),
        (canvasElement[_0x42a0ed(0xda)] = !![]);
    else
      _0x24976a[_0x42a0ed(0xd8)](station3) &&
        ((outputData[_0x42a0ed(0xde)] = _0x24976a),
        (scanning = ![]),
        alert("check"),
        updateDoc(doc(db, "stations/1003"), { currentCap: 0x0 }),
        video[_0x42a0ed(0xc8)]
          [_0x42a0ed(0xd4)]()
          [_0x42a0ed(0xcc)]((_0x5a3507) => {
            const _0x380df9 = _0x42a0ed;
            _0x5a3507[_0x380df9(0xb5)]();
          }),
        (qrResult["hidden"] = !![]),
        (canvasElement[_0x42a0ed(0xda)] = ![]));
  }
}),
  navigator["mediaDevices"]
    [_0x401423(0xcd)]({ video: { facingMode: _0x401423(0xc5) } })
    [_0x401423(0xc7)](function (_0x578708) {
      const _0x17b097 = _0x401423;
      (scanning = !![]),
        (qrResult[_0x17b097(0xda)] = !![]),
        (canvasElement[_0x17b097(0xda)] = ![]),
        video[_0x17b097(0xb4)](_0x17b097(0xcf), !![]),
        (video[_0x17b097(0xc8)] = _0x578708),
        video[_0x17b097(0xb2)](),
        tick(),
        scan();
    });
function tick() {
  const _0x3c007c = _0x401423;
  (canvasElement[_0x3c007c(0xbc)] = video[_0x3c007c(0xc2)]),
    (canvasElement[_0x3c007c(0xd6)] = video[_0x3c007c(0xd3)]),
    canvas["drawImage"](
      video,
      0x0,
      0x0,
      canvasElement[_0x3c007c(0xd6)],
      canvasElement[_0x3c007c(0xbc)]
    ),
    scanning && requestAnimationFrame(tick);
}
function scan() {
  const _0x412e20 = _0x401423;
  try {
    qrcode[_0x412e20(0xe3)]();
  } catch (_0x42b437) {
    setTimeout(scan, 0x12c);
  }
}
