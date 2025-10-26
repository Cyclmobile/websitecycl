function _0x277b(_0x179e94, _0x4da094) {
  const _0x39d636 = _0x39d6();
  return (
    (_0x277b = function (_0x277bb6, _0x33b459) {
      _0x277bb6 = _0x277bb6 - 0x120;
      let _0xa30d4f = _0x39d636[_0x277bb6];
      return _0xa30d4f;
    }),
    _0x277b(_0x179e94, _0x4da094)
  );
}
const _0x3a8f5 = _0x277b;
(function (_0x506ae0, _0x2693d3) {
  const _0x7f237c = _0x277b,
    _0x353559 = _0x506ae0();
  while (!![]) {
    try {
      const _0x382650 =
        (parseInt(_0x7f237c(0x133)) / 0x1) *
          (-parseInt(_0x7f237c(0x121)) / 0x2) +
        parseInt(_0x7f237c(0x134)) / 0x3 +
        (parseInt(_0x7f237c(0x132)) / 0x4) *
          (parseInt(_0x7f237c(0x12e)) / 0x5) +
        -parseInt(_0x7f237c(0x12a)) / 0x6 +
        parseInt(_0x7f237c(0x12f)) / 0x7 +
        parseInt(_0x7f237c(0x123)) / 0x8 +
        -parseInt(_0x7f237c(0x126)) / 0x9;
      if (_0x382650 === _0x2693d3) break;
      else _0x353559["push"](_0x353559["shift"]());
    } catch (_0x50aa12) {
      _0x353559["push"](_0x353559["shift"]());
    }
  }
})(_0x39d6, 0xab370);
const firebaseConfig = {
  apiKey: _0x3a8f5(0x124),
  authDomain: "cycl-ionic.firebaseapp.com",
  projectId: _0x3a8f5(0x120),
  storageBucket: _0x3a8f5(0x131),
  messagingSenderId: "310990335294",
  appId: _0x3a8f5(0x12b),
  measurementId: _0x3a8f5(0x125),
};
function _0x39d6() {
  const _0x1c5a55 = [
    "1:310990335294:web:c8cb7e850a93d94854d06f",
    "message",
    "Password\x20reset\x20email\x20sent!\x20Remember\x20to\x20also\x20check\x20Junk\x20Email",
    "7001970PmqyvE",
    "3313828SRBPPO",
    "value",
    "cycl-ionic.appspot.com",
    "4bmXNHC",
    "27605trwKpn",
    "2424066AyfKUO",
    "auth",
    "getElementById",
    "cycl-ionic",
    "72yhBifV",
    "Error:\x20",
    "1264480KzBtDg",
    "AIzaSyDpkOhaK9xqJoynNcq22EVSE44y5DebCSI",
    "G-BSWJX4TVBF",
    "6740496RhxQza",
    "innerText",
    "then",
    "sendPasswordResetEmail",
    "2375160ygqlwQ",
  ];
  _0x39d6 = function () {
    return _0x1c5a55;
  };
  return _0x39d6();
}
firebase["initializeApp"](firebaseConfig);
const auth = firebase[_0x3a8f5(0x135)]();
function resetPassword() {
  const _0x4067b1 = _0x3a8f5,
    _0x3ae1a3 = document[_0x4067b1(0x136)]("emailInput")[_0x4067b1(0x130)];
  firebase[_0x4067b1(0x135)]()
    [_0x4067b1(0x129)](_0x3ae1a3)
    [_0x4067b1(0x128)](() => {
      const _0x1c62b7 = _0x4067b1;
      document[_0x1c62b7(0x136)](_0x1c62b7(0x12c))["innerText"] =
        _0x1c62b7(0x12d);
    })
    ["catch"]((_0x37e2c9) => {
      const _0x1fee45 = _0x4067b1;
      document[_0x1fee45(0x136)]("message")[_0x1fee45(0x127)] =
        _0x1fee45(0x122) + _0x37e2c9[_0x1fee45(0x12c)];
    });
}
