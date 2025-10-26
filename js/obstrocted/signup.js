const _0x479399 = _0x11f3;
function _0x2f6d() {
  const _0x50a929 = [
    "user",
    "Your\x20user\x20account\x20is\x20now\x20ready,\x20login\x20with\x20your\x20email\x20and\x20password.",
    "917410krFIeS",
    "cycl-ionic.firebaseapp.com",
    "addEventListener",
    "267039igeUHK",
    "18EqaPbG",
    "message",
    "createUserWithEmailAndPassword",
    "age",
    "2062928vTFAAf",
    "submit",
    "10984424tFfoHw",
    "password",
    "580tqrilD",
    "then",
    "G-BSWJX4TVBF",
    "value",
    "gender",
    "1:310990335294:web:c8cb7e850a93d94854d06f",
    "cycl-ionic.appspot.com",
    "collection",
    "doc",
    "uid",
    "getElementById",
    "310990335294",
    "name",
    "6hocXnQ",
    "cycl-ionic",
    "439731JpTAYb",
    "preventDefault",
    "43750IjJbuJ",
    "2064176AXMDvn",
    "registerForm",
  ];
  _0x2f6d = function () {
    return _0x50a929;
  };
  return _0x2f6d();
}
(function (_0x3f10a3, _0x4df87a) {
  const _0x10df20 = _0x11f3,
    _0x1dacc3 = _0x3f10a3();
  while (!![]) {
    try {
      const _0x2fcf3c =
        -parseInt(_0x10df20(0x1e3)) / 0x1 +
        -parseInt(_0x10df20(0x1ea)) / 0x2 +
        (parseInt(_0x10df20(0x1e1)) / 0x3) *
          (-parseInt(_0x10df20(0x1e6)) / 0x4) +
        (-parseInt(_0x10df20(0x1e5)) / 0x5) *
          (parseInt(_0x10df20(0x1cc)) / 0x6) +
        -parseInt(_0x10df20(0x1d0)) / 0x7 +
        parseInt(_0x10df20(0x1d2)) / 0x8 +
        (parseInt(_0x10df20(0x1cb)) / 0x9) * (parseInt(_0x10df20(0x1d4)) / 0xa);
      if (_0x2fcf3c === _0x4df87a) break;
      else _0x1dacc3["push"](_0x1dacc3["shift"]());
    } catch (_0x4de318) {
      _0x1dacc3["push"](_0x1dacc3["shift"]());
    }
  }
})(_0x2f6d, 0xcdafd);
const firebaseConfig = {
  apiKey: "AIzaSyDpkOhaK9xqJoynNcq22EVSE44y5DebCSI",
  authDomain: _0x479399(0x1eb),
  projectId: _0x479399(0x1e2),
  storageBucket: _0x479399(0x1da),
  messagingSenderId: _0x479399(0x1df),
  appId: _0x479399(0x1d9),
  measurementId: _0x479399(0x1d6),
};
firebase["initializeApp"](firebaseConfig);
function _0x11f3(_0x115212, _0x51da18) {
  const _0x2f6d32 = _0x2f6d();
  return (
    (_0x11f3 = function (_0x11f3ac, _0x37af47) {
      _0x11f3ac = _0x11f3ac - 0x1ca;
      let _0x4e13f1 = _0x2f6d32[_0x11f3ac];
      return _0x4e13f1;
    }),
    _0x11f3(_0x115212, _0x51da18)
  );
}
const db = firebase["firestore"](),
  auth = firebase["auth"]();
document[_0x479399(0x1ca)]("DOMContentLoaded", function () {
  const _0x5866d2 = _0x479399,
    _0x3d7506 = document[_0x5866d2(0x1de)]("email"),
    _0x12ca57 = document[_0x5866d2(0x1de)](_0x5866d2(0x1d3)),
    _0x43b785 = document[_0x5866d2(0x1de)](_0x5866d2(0x1e0)),
    _0x5ba304 = document[_0x5866d2(0x1de)](_0x5866d2(0x1cf)),
    _0x52b65b = document[_0x5866d2(0x1de)](_0x5866d2(0x1d8));
  document["getElementById"](_0x5866d2(0x1e7))[_0x5866d2(0x1ca)](
    _0x5866d2(0x1d1),
    function (_0x586dc5) {
      const _0x148a53 = _0x5866d2;
      _0x586dc5[_0x148a53(0x1e4)]();
      const _0x2a5ce3 = _0x3d7506[_0x148a53(0x1d7)],
        _0x1e53f8 = _0x12ca57[_0x148a53(0x1d7)],
        _0x109e66 = _0x43b785["value"],
        _0x3e1a28 = _0x5ba304[_0x148a53(0x1d7)],
        _0x6d2b72 = _0x52b65b["value"];
      auth[_0x148a53(0x1ce)](_0x2a5ce3, _0x1e53f8)
        [_0x148a53(0x1d5)]((_0x7a0c) => {
          const _0x13b011 = _0x148a53,
            _0x48e75a = _0x7a0c[_0x13b011(0x1e8)];
          return db[_0x13b011(0x1db)]("users")
            [_0x13b011(0x1dc)](_0x48e75a[_0x13b011(0x1dd)])
            ["set"]({
              name: _0x109e66,
              age: _0x3e1a28,
              gender: _0x6d2b72,
              CyclCoins: 0x0,
              email: _0x2a5ce3,
            });
        })
        [_0x148a53(0x1d5)](() => {
          const _0x4c6eb5 = _0x148a53;
          alert(_0x4c6eb5(0x1e9)),
            (_0x3d7506[_0x4c6eb5(0x1d7)] = ""),
            (_0x12ca57[_0x4c6eb5(0x1d7)] = ""),
            (_0x43b785[_0x4c6eb5(0x1d7)] = ""),
            (_0x5ba304[_0x4c6eb5(0x1d7)] = ""),
            (_0x52b65b["value"] = "");
        })
        ["catch"]((_0x3dfb1c) => {
          const _0x340cb3 = _0x148a53;
          alert(_0x3dfb1c[_0x340cb3(0x1cd)]);
        });
    }
  );
});
