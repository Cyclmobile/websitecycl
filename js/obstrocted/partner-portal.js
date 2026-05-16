const _0x562b0b = _0x2558;
(function (_0x2501ac, _0x59aba9) {
  const _0x132ae7 = _0x2558,
    _0x5bb478 = _0x2501ac();
  while (!![]) {
    try {
      const _0x980593 =
        -parseInt(_0x132ae7(0x62c)) / 0x1 +
        -parseInt(_0x132ae7(0x365)) / 0x2 +
        (parseInt(_0x132ae7(0x3aa)) / 0x3) *
          (parseInt(_0x132ae7(0x5d6)) / 0x4) +
        -parseInt(_0x132ae7(0x338)) / 0x5 +
        -parseInt(_0x132ae7(0x60d)) / 0x6 +
        (-parseInt(_0x132ae7(0x728)) / 0x7) *
          (-parseInt(_0x132ae7(0x355)) / 0x8) +
        (parseInt(_0x132ae7(0x2bf)) / 0x9) * (parseInt(_0x132ae7(0x789)) / 0xa);
      if (_0x980593 === _0x59aba9) break;
      else _0x5bb478["push"](_0x5bb478["shift"]());
    } catch (_0x2dc82b) {
      _0x5bb478["push"](_0x5bb478["shift"]());
    }
  }
})(_0x2b31, 0xc1a3d);
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocFromCache,
  getDocs,
  getFirestore,
  limit as _0x4330f9,
  onSnapshot,
  query,
  limit,
  orderBy,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import {
  getStorage,
  ref as _0x59d1fe,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";
import {
  getFunctions,
  httpsCallable,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-functions.js";
const firebaseConfig = {
    apiKey: "AIzaSyDpkOhaK9xqJoynNcq22EVSE44y5DebCSI",
    authDomain: _0x562b0b(0x2ca),
    projectId: _0x562b0b(0x3b6),
    storageBucket: _0x562b0b(0x6b9),
    messagingSenderId: "310990335294",
    appId: _0x562b0b(0x575),
    measurementId: _0x562b0b(0x479),
  },
  app = initializeApp(firebaseConfig),
  auth = getAuth(app),
  db = getFirestore(app),
  storage = getStorage(app),
  cloudFunctions = getFunctions(app, _0x562b0b(0x32d)),
  collections = {
    partners: _0x562b0b(0x77a),
    stations: _0x562b0b(0x5c7),
    rewards: _0x562b0b(0x660),
    rewardCodes: "reward_codes",
    collectionRequests: _0x562b0b(0x50d),
  },
  countries = [
    ["DK", _0x562b0b(0x550)],
    ["NO", "Norway"],
    ["GB", "United\x20Kingdom"],
    ["DE", _0x562b0b(0x2ae)],
    ["US", _0x562b0b(0x36d)],
    ["NG", _0x562b0b(0x574)],
    ["PT", _0x562b0b(0x6ca)],
    ["IN", _0x562b0b(0x407)],
  ],
  pricing = {
    access: 0x0,
    activation: 0x0,
    validation: 0x0,
    popular_sponsored: 0x0,
    featured_boost: 0x0,
    organic: 0x0,
  },
  BUSINESS_CATEGORIES = [
    {
      id: "restaurant",
      name: "Restaurant",
      subs: [
        "Fast\x20food",
        _0x562b0b(0x681),
        _0x562b0b(0x525),
        "Pizzeria",
        _0x562b0b(0x3cc),
        _0x562b0b(0x766),
        _0x562b0b(0x7b5),
        _0x562b0b(0x69d),
        _0x562b0b(0x51d),
        _0x562b0b(0x63f),
      ],
    },
    {
      id: _0x562b0b(0x2f2),
      name: "Café",
      subs: [
        _0x562b0b(0x691),
        _0x562b0b(0x6f7),
        "Tea\x20house",
        _0x562b0b(0x6f4),
        _0x562b0b(0x6cf),
        _0x562b0b(0x63f),
      ],
    },
    {
      id: "retail",
      name: _0x562b0b(0x7aa),
      subs: [
        "Clothing",
        _0x562b0b(0x437),
        _0x562b0b(0x47d),
        _0x562b0b(0x31f),
        _0x562b0b(0x531),
        _0x562b0b(0x6e3),
        _0x562b0b(0x661),
        "Toy\x20/\x20hobby",
        _0x562b0b(0x394),
        _0x562b0b(0x63f),
      ],
    },
    {
      id: _0x562b0b(0x755),
      name: "Shopping\x20center",
      subs: [
        _0x562b0b(0x26f),
        _0x562b0b(0x562),
        "Department\x20store",
        _0x562b0b(0x3c1),
        _0x562b0b(0x471),
        _0x562b0b(0x63f),
      ],
    },
    {
      id: _0x562b0b(0x34e),
      name: "Grocery",
      subs: [
        _0x562b0b(0x620),
        "Convenience\x20/\x20kiosk",
        "Health\x20food",
        _0x562b0b(0x596),
        _0x562b0b(0x64e),
        _0x562b0b(0x63f),
      ],
    },
    {
      id: _0x562b0b(0x294),
      name: _0x562b0b(0x332),
      subs: [
        _0x562b0b(0x245),
        _0x562b0b(0x3f8),
        "B&B",
        "Resort",
        _0x562b0b(0x25f),
        _0x562b0b(0x63f),
      ],
    },
    {
      id: _0x562b0b(0x791),
      name: "Fitness\x20&\x20wellness",
      subs: [
        "Gym",
        _0x562b0b(0x57d),
        _0x562b0b(0x3a6),
        _0x562b0b(0x5f0),
        _0x562b0b(0x5bf),
        _0x562b0b(0x63f),
      ],
    },
    {
      id: _0x562b0b(0x4fe),
      name: _0x562b0b(0x35b),
      subs: [
        _0x562b0b(0x227),
        _0x562b0b(0x386),
        _0x562b0b(0x3a8),
        "Auto\x20/\x20mechanic",
        _0x562b0b(0x549),
        _0x562b0b(0x235),
        _0x562b0b(0x669),
        _0x562b0b(0x63f),
      ],
    },
    {
      id: _0x562b0b(0x73d),
      name: "Entertainment",
      subs: [
        _0x562b0b(0x3ab),
        _0x562b0b(0x22f),
        _0x562b0b(0x650),
        "Bowling",
        _0x562b0b(0x3cf),
        _0x562b0b(0x3a4),
        _0x562b0b(0x63f),
      ],
    },
    {
      id: _0x562b0b(0x37a),
      name: _0x562b0b(0x699),
      subs: [
        _0x562b0b(0x7ab),
        "University",
        _0x562b0b(0x6d7),
        _0x562b0b(0x378),
        _0x562b0b(0x63f),
      ],
    },
    {
      id: "office",
      name: "Office\x20/\x20workplace",
      subs: [_0x562b0b(0x411), _0x562b0b(0x722), _0x562b0b(0x63f)],
    },
    {
      id: "brand",
      name: _0x562b0b(0x360),
      subs: [
        _0x562b0b(0x30f),
        "Local\x20brand",
        _0x562b0b(0x5e1),
        _0x562b0b(0x56f),
        _0x562b0b(0x63f),
      ],
    },
    { id: _0x562b0b(0x732), name: "Other", subs: [_0x562b0b(0x63f)] },
  ],
  CATEGORY_BY_ID = BUSINESS_CATEGORIES[_0x562b0b(0x2ac)](
    (_0x439698, _0x30ee1f) => {
      return ((_0x439698[_0x30ee1f["id"]] = _0x30ee1f), _0x439698);
    },
    {},
  ),
  STATION_TIERS = [
    {
      id: _0x562b0b(0x61c),
      planId: _0x562b0b(0x571),
      name: "Standard",
      multiplier: 0x1,
      monthlyFee: 0x0,
      productName: _0x562b0b(0x29d),
      blurb: _0x562b0b(0x5cf),
    },
    {
      id: "premium",
      planId: _0x562b0b(0x78f),
      name: _0x562b0b(0x619),
      multiplier: 1.5,
      monthlyFee: 0x63,
      productName: "Cycl\x20Partner\x20Portal\x20–\x20Premium",
      blurb: _0x562b0b(0x4a2),
    },
    {
      id: _0x562b0b(0x640),
      planId: _0x562b0b(0x509),
      name: _0x562b0b(0x6c6),
      multiplier: 0x2,
      monthlyFee: 0xc7,
      productName: _0x562b0b(0x3c5),
      blurb: _0x562b0b(0x2ff),
    },
    {
      id: "ultra",
      planId: _0x562b0b(0x37f),
      name: _0x562b0b(0x5aa),
      multiplier: 0x3,
      monthlyFee: 0x12b,
      productName: _0x562b0b(0x3b2),
      blurb: _0x562b0b(0x24c),
    },
  ],
  TIER_BY_ID = STATION_TIERS[_0x562b0b(0x2ac)]((_0xb5d20, _0x881571) => {
    return ((_0xb5d20[_0x881571["id"]] = _0x881571), _0xb5d20);
  }, {}),
  OPENING_DAY_OPTIONS = [
    { id: _0x562b0b(0x4e6), label: "Monday", short: _0x562b0b(0x265) },
    { id: _0x562b0b(0x6f0), label: _0x562b0b(0x5ca), short: _0x562b0b(0x68a) },
    { id: _0x562b0b(0x738), label: _0x562b0b(0x460), short: _0x562b0b(0x726) },
    { id: _0x562b0b(0x56e), label: _0x562b0b(0x21d), short: _0x562b0b(0x44f) },
    { id: "fri", label: _0x562b0b(0x42d), short: _0x562b0b(0x741) },
    { id: _0x562b0b(0x2d5), label: "Saturday", short: "Sat" },
    { id: _0x562b0b(0x2cf), label: _0x562b0b(0x613), short: "Sun" },
  ],
  OPENING_DAY_KEYS_BY_DATE = [
    _0x562b0b(0x2cf),
    "mon",
    _0x562b0b(0x6f0),
    "wed",
    "thu",
    _0x562b0b(0x2da),
    _0x562b0b(0x2d5),
  ],
  DEFAULT_OPENING_DAY = {
    open: _0x562b0b(0x785),
    close: _0x562b0b(0x588),
    closed: ![],
  },
  BILLING_PLANS = [
    {
      id: _0x562b0b(0x571),
      name: _0x562b0b(0x5c1),
      tierId: _0x562b0b(0x61c),
      price: 0x0,
      rewardLimit: 0x3,
      copy: _0x562b0b(0x72f),
      features: [
        "3\x20active\x20rewards",
        "Marketplace\x20visibility",
        "Basic\x20stats",
        _0x562b0b(0x480),
      ],
    },
    {
      id: _0x562b0b(0x78f),
      name: _0x562b0b(0x32f),
      tierId: _0x562b0b(0x237),
      price: 0x63,
      rewardLimit: 0x5,
      stripeTier: _0x562b0b(0x78f),
      productName: _0x562b0b(0x41a),
      copy: _0x562b0b(0x609),
      features: [
        _0x562b0b(0x40d),
        "Marketplace\x20visibility",
        "Complete\x20stats",
        _0x562b0b(0x480),
      ],
    },
    {
      id: "growth",
      name: "Growth",
      tierId: _0x562b0b(0x640),
      price: 0xc7,
      rewardLimit: 0x7,
      stripeTier: "growth",
      productName: _0x562b0b(0x3c5),
      recommended: !![],
      copy: _0x562b0b(0x441),
      features: [
        _0x562b0b(0x555),
        _0x562b0b(0x3d6),
        _0x562b0b(0x480),
        "Reward\x20promotion\x20credit",
      ],
    },
    {
      id: _0x562b0b(0x37f),
      name: _0x562b0b(0x34a),
      tierId: _0x562b0b(0x75c),
      price: 0x12b,
      rewardLimit: 0xa,
      stripeTier: _0x562b0b(0x37f),
      productName: "Cycl\x20Partner\x20Portal\x20-Pro",
      copy: _0x562b0b(0x2b6),
      features: [
        _0x562b0b(0x3d9),
        _0x562b0b(0x5af),
        _0x562b0b(0x6a6),
        _0x562b0b(0x3d6),
        _0x562b0b(0x6c0),
      ],
    },
  ],
  PLAN_BY_ID = BILLING_PLANS["reduce"]((_0xb4a3cd, _0x228440) => {
    return ((_0xb4a3cd[_0x228440["id"]] = _0x228440), _0xb4a3cd);
  }, {}),
  PLAN_BY_TIER_ID = BILLING_PLANS[_0x562b0b(0x2ac)]((_0x59a1da, _0x4ea668) => {
    return ((_0x59a1da[_0x4ea668["tierId"]] = _0x4ea668), _0x59a1da);
  }, {});
function normalizeTierId(_0x5d7ab2) {
  const _0xc2da48 = _0x562b0b;
  return _0x5d7ab2 === _0xc2da48(0x53e) ? "ultra" : _0x5d7ab2 || "standard";
}
function getStationTier(_0x2ea4a1) {
  const _0x36340f = _0x562b0b,
    _0x10036e = normalizeTierId(
      _0x2ea4a1 &&
        (_0x2ea4a1[_0x36340f(0x520)] ||
          _0x2ea4a1[_0x36340f(0x273)] ||
          _0x2ea4a1[_0x36340f(0x634)]),
    );
  return TIER_BY_ID[_0x10036e] || TIER_BY_ID[_0x36340f(0x61c)];
}
function normalizeOpeningTime(_0x11e8d2, _0x5929ca) {
  const _0x34b98d = String(_0x11e8d2 || "")["trim"]();
  return /^([01]\d|2[0-3]):[0-5]\d$/["test"](_0x34b98d) ? _0x34b98d : _0x5929ca;
}
function normalizeOpeningDay(_0xfd2af9 = {}) {
  const _0x10603b = _0x562b0b,
    _0xb9b112 =
      _0xfd2af9 && typeof _0xfd2af9 === _0x10603b(0x5fd) ? _0xfd2af9 : {},
    _0x450762 =
      _0xb9b112[_0x10603b(0x3f5)] === !![] ||
      _0xb9b112[_0x10603b(0x514)] === !![];
  return {
    open: normalizeOpeningTime(
      _0xb9b112[_0x10603b(0x382)] ||
        _0xb9b112[_0x10603b(0x534)] ||
        _0xb9b112["from"],
      DEFAULT_OPENING_DAY[_0x10603b(0x382)],
    ),
    close: normalizeOpeningTime(
      _0xb9b112[_0x10603b(0x211)] || _0xb9b112["closes"] || _0xb9b112["to"],
      DEFAULT_OPENING_DAY[_0x10603b(0x211)],
    ),
    closed: _0x450762,
  };
}
function getStationOpeningHours(_0x8b1ab7) {
  const _0x49edf7 = _0x562b0b,
    _0x2a1309 = _0x8b1ab7?.[_0x49edf7(0x710)];
  if (
    !_0x2a1309 ||
    typeof _0x2a1309 !== _0x49edf7(0x5fd) ||
    Array["isArray"](_0x2a1309)
  )
    return null;
  return OPENING_DAY_OPTIONS["reduce"]((_0x2a2f32, _0x3a25eb) => {
    return (
      (_0x2a2f32[_0x3a25eb["id"]] = normalizeOpeningDay(
        _0x2a1309[_0x3a25eb["id"]],
      )),
      _0x2a2f32
    );
  }, {});
}
function getOpeningMinutes(_0x1deb6e) {
  const _0x5c8eb8 = _0x562b0b,
    [_0x4f22d8, _0x316407] = normalizeOpeningTime(_0x1deb6e, _0x5c8eb8(0x457))
      [_0x5c8eb8(0x7ae)](":")
      [_0x5c8eb8(0x21b)](Number);
  return _0x4f22d8 * 0x3c + _0x316407;
}
function isOpeningRuleActive(_0x43aa1f, _0x3d106e) {
  const _0x3bd5ca = _0x562b0b;
  if (!_0x43aa1f || _0x43aa1f["closed"]) return ![];
  const _0x3f5d72 = getOpeningMinutes(_0x43aa1f[_0x3bd5ca(0x382)]),
    _0x582537 = getOpeningMinutes(_0x43aa1f["close"]);
  if (_0x3f5d72 === _0x582537) return !![];
  return _0x582537 > _0x3f5d72
    ? _0x3d106e >= _0x3f5d72 && _0x3d106e < _0x582537
    : _0x3d106e >= _0x3f5d72 || _0x3d106e < _0x582537;
}
function isPreviousOpeningRuleActive(_0x5908ab, _0x4af3a4) {
  const _0x286be4 = _0x562b0b;
  if (!_0x5908ab || _0x5908ab[_0x286be4(0x3f5)]) return ![];
  const _0x316562 = getOpeningMinutes(_0x5908ab[_0x286be4(0x382)]),
    _0x51895a = getOpeningMinutes(_0x5908ab[_0x286be4(0x211)]);
  return _0x51895a < _0x316562 && _0x4af3a4 < _0x51895a;
}
function isStationOpenNow(_0x5ea31b, _0xe07903 = new Date()) {
  const _0x3b8950 = _0x562b0b,
    _0x52f953 = getStationOpeningHours(_0x5ea31b);
  if (!_0x52f953) return !![];
  const _0x47087a = OPENING_DAY_KEYS_BY_DATE[_0xe07903[_0x3b8950(0x3ca)]()],
    _0x338224 = OPENING_DAY_KEYS_BY_DATE[(_0xe07903["getDay"]() + 0x6) % 0x7],
    _0x3db2c0 =
      _0xe07903[_0x3b8950(0x404)]() * 0x3c + _0xe07903[_0x3b8950(0x57b)]();
  return (
    isOpeningRuleActive(_0x52f953[_0x47087a], _0x3db2c0) ||
    isPreviousOpeningRuleActive(_0x52f953[_0x338224], _0x3db2c0)
  );
}
function formatStationOpeningLine(_0x123af9, _0x5daad2 = new Date()) {
  const _0x5250af = _0x562b0b,
    _0x107eab = getStationOpeningHours(_0x123af9);
  if (!_0x107eab) return _0x5250af(0x3e2);
  const _0x202d62 = OPENING_DAY_KEYS_BY_DATE[_0x5daad2[_0x5250af(0x3ca)]()],
    _0x3f39d3 = OPENING_DAY_OPTIONS[_0x5250af(0x40f)](
      (_0x87b0a3) => _0x87b0a3["id"] === _0x202d62,
    ),
    _0x3621c5 = _0x107eab[_0x202d62] || normalizeOpeningDay(),
    _0x514dc2 = _0x3f39d3?.[_0x5250af(0x546)] || _0x5250af(0x37c),
    _0x9d27fd = _0x3621c5[_0x5250af(0x3f5)]
      ? _0x5250af(0x716)
      : _0x3621c5[_0x5250af(0x382)] + "-" + _0x3621c5[_0x5250af(0x211)];
  return (
    _0x514dc2 +
    "\x20" +
    _0x9d27fd +
    (isStationOpenNow(_0x123af9, _0x5daad2) ? "" : "\x20·\x20closed\x20now")
  );
}
const MAPBOX_ACCESS_TOKEN = _0x562b0b(0x3fc),
  $ = (_0x5c5202) => document[_0x562b0b(0x745)](_0x5c5202),
  isFileOrigin =
    window[_0x562b0b(0x484)][_0x562b0b(0x39c)] === _0x562b0b(0x6b5),
  localPortalUrl = _0x562b0b(0x5c9);
let currentPartner = null,
  partnerBillingStatus = {
    loaded: ![],
    loading: ![],
    error: "",
    subscription: null,
    cards: [],
    hasCustomer: ![],
  },
  partnerInvoiceHistory = {
    loaded: ![],
    loading: ![],
    error: "",
    invoices: [],
    query: "",
    hasCustomer: ![],
  },
  stationRecords = [],
  rewardRecords = [],
  collectionRequestRecords = [],
  rewardSubscriptions = [];
const boostBaselineBackfillIds = new Set(),
  partnerSupport = {
    threads: [],
    selectedThreadId: null,
    messages: [],
    unsubscribeMessages: null,
  },
  PARTNER_SUPPORT_COLLECTION = _0x562b0b(0x5fc);
let selectedRewardImageFile = null,
  selectedRewardImagePreviewUrl = "",
  rewardLocationSuggestions = [],
  rewardLocationSearchTimer = 0x0,
  rewardLocationAbortController = null,
  signupAddressSuggestionsData = [],
  signupAddressSearchTimer = 0x0,
  signupAddressAbortController = null,
  profileAddressSuggestionsData = [],
  profileAddressSearchTimer = 0x0,
  profileAddressAbortController = null;
function escapeHtml(_0x3cacf8 = "") {
  const _0xac1772 = _0x562b0b;
  return String(_0x3cacf8)[_0xac1772(0x5d5)](
    /[&<>"']/g,
    (_0x3d22ce) =>
      ({
        "&": _0xac1772(0x435),
        "<": "&lt;",
        ">": _0xac1772(0x53b),
        "\x22": "&quot;",
        "\x27": _0xac1772(0x75d),
      })[_0x3d22ce],
  );
}
function money(_0x69e0a6) {
  const _0x5549c9 = _0x562b0b;
  return (
    Number(_0x69e0a6 || 0x0)["toLocaleString"](_0x5549c9(0x28d), {
      maximumFractionDigits: 0x0,
    }) + _0x5549c9(0x251)
  );
}
function formatInvoiceAmount(_0x57b2eb) {
  const _0x25509b = _0x562b0b,
    _0x5958f4 =
      Number(
        _0x57b2eb?.[_0x25509b(0x5a5)] ?? _0x57b2eb?.[_0x25509b(0x2f1)] ?? 0x0,
      ) / 0x64,
    _0x3b15b3 = String(_0x57b2eb?.[_0x25509b(0x31c)] || _0x25509b(0x31e))[
      _0x25509b(0x541)
    ]();
  return (
    _0x3b15b3 +
    "\x20" +
    _0x5958f4[_0x25509b(0x5f8)](_0x25509b(0x28d), {
      minimumFractionDigits: 0x2,
      maximumFractionDigits: 0x2,
    })
  );
}
function formatInvoiceDate(_0x36c2d0) {
  const _0x4359f6 = _0x562b0b;
  if (!_0x36c2d0) return _0x4359f6(0x37b);
  return new Date(_0x36c2d0)[_0x4359f6(0x7ac)](_0x4359f6(0x6fd), {
    day: "numeric",
    month: _0x4359f6(0x546),
    year: "numeric",
  });
}
function getInvoiceStatusTone(_0x4a56e2) {
  const _0x2ba6dd = _0x562b0b,
    _0x511851 = String(_0x4a56e2?.["statusTone"] || "draft")[
      _0x2ba6dd(0x374)
    ]();
  return ["paid", _0x2ba6dd(0x55b), "open", _0x2ba6dd(0x695), _0x2ba6dd(0x65b)][
    _0x2ba6dd(0x46c)
  ](_0x511851)
    ? _0x511851
    : _0x2ba6dd(0x695);
}
function hasSavedBillingCard() {
  const _0x291991 = _0x562b0b;
  return (
    Array["isArray"](partnerBillingStatus["cards"]) &&
    partnerBillingStatus[_0x291991(0x7c2)][_0x291991(0x400)] > 0x0
  );
}
function syncBillingCardButton() {
  const _0xd8f5a9 = _0x562b0b,
    _0x2b090b = $("billingPortalButton");
  if (!_0x2b090b || _0x2b090b[_0xd8f5a9(0x70f)]) return;
  _0x2b090b[_0xd8f5a9(0x23a)] = hasSavedBillingCard()
    ? _0xd8f5a9(0x439)
    : _0xd8f5a9(0x70c);
}
function syncCancelSubscriptionButton() {
  const _0x7e56bc = _0x562b0b,
    _0xa19db1 = $(_0x7e56bc(0x3fb));
  if (!_0xa19db1) return;
  const _0x2257e0 = partnerBillingStatus[_0x7e56bc(0x436)],
    _0x3b97ad = hasLiveStripeSubscription(_0x2257e0),
    _0x48347c = Boolean(_0x2257e0?.[_0x7e56bc(0x62e)]);
  _0xa19db1[_0x7e56bc(0x752)]["display"] = _0x3b97ad
    ? _0x7e56bc(0x283)
    : _0x7e56bc(0x256);
  if (!_0x3b97ad) return;
  _0x48347c
    ? ((_0xa19db1[_0x7e56bc(0x23a)] = _0x7e56bc(0x5d2)),
      (_0xa19db1[_0x7e56bc(0x70f)] = !![]))
    : ((_0xa19db1[_0x7e56bc(0x23a)] = "Cancel\x20subscription"),
      (_0xa19db1[_0x7e56bc(0x70f)] = ![]));
}
function isConnectivityError(_0x23f99b) {
  const _0x324090 = _0x562b0b,
    _0x192752 = String(_0x23f99b?.[_0x324090(0x434)] || "")[_0x324090(0x374)](),
    _0x2d0f35 = String(_0x23f99b?.["message"] || "")[_0x324090(0x374)]();
  return (
    _0x192752["includes"]("unavailable") ||
    _0x192752[_0x324090(0x46c)]("offline") ||
    _0x2d0f35[_0x324090(0x46c)](_0x324090(0x683)) ||
    _0x2d0f35[_0x324090(0x46c)](_0x324090(0x6fe)) ||
    _0x2d0f35[_0x324090(0x46c)](_0x324090(0x34f)) ||
    _0x2d0f35[_0x324090(0x46c)](_0x324090(0x23f))
  );
}
function getReadableFirebaseError(_0x32027b, _0x3fe102 = _0x562b0b(0x61e)) {
  const _0x519fe4 = _0x562b0b;
  if (isConnectivityError(_0x32027b)) return _0x519fe4(0x46f);
  const _0x2dc356 = String(_0x32027b?.[_0x519fe4(0x434)] || "");
  if (_0x2dc356 === _0x519fe4(0x6a3)) return _0x519fe4(0x3a5);
  if (
    _0x2dc356 === "auth/user-not-found" ||
    _0x2dc356 === "auth/wrong-password" ||
    _0x2dc356 === _0x519fe4(0x746)
  )
    return "Email\x20or\x20password\x20is\x20incorrect.";
  return _0x32027b?.["message"] || _0x3fe102;
}
function getReadableCallableError(_0x440aff, _0x39e113 = _0x562b0b(0x61e)) {
  const _0x2ac332 = _0x562b0b,
    _0x4321ae = String(_0x440aff?.[_0x2ac332(0x434)] || "")["toLowerCase"](),
    _0x355694 = String(_0x440aff?.[_0x2ac332(0x52c)] || "")["trim"](),
    _0xaedd2a = _0x355694[_0x2ac332(0x374)]();
  if (
    isConnectivityError(_0x440aff) ||
    _0x4321ae[_0x2ac332(0x46c)]("unavailable") ||
    _0xaedd2a === _0x2ac332(0x782) ||
    _0xaedd2a[_0x2ac332(0x46c)](_0x2ac332(0x6d9)) ||
    _0xaedd2a[_0x2ac332(0x46c)](_0x2ac332(0x78a))
  )
    return _0x2ac332(0x3f1);
  return _0x355694 || _0x39e113;
}
async function getPartnerProfileSnapshot(_0x4e2673) {
  const _0x43e6de = doc(db, collections["partners"], _0x4e2673);
  try {
    return await getDoc(_0x43e6de);
  } catch (_0x378e74) {
    if (!isConnectivityError(_0x378e74)) throw _0x378e74;
    try {
      return await getDocFromCache(_0x43e6de);
    } catch (_0x37d8b4) {
      throw _0x378e74;
    }
  }
}
function getMapboxSupportedCountries() {
  const _0x45679f = _0x562b0b;
  return countries[_0x45679f(0x21b)](([_0x243a06]) =>
    _0x243a06[_0x45679f(0x374)](),
  )[_0x45679f(0x376)](",");
}
function releaseRewardImagePreviewUrl() {
  const _0x9e14c9 = _0x562b0b;
  (selectedRewardImagePreviewUrl &&
    selectedRewardImagePreviewUrl[_0x9e14c9(0x62a)](_0x9e14c9(0x64f)) &&
    URL[_0x9e14c9(0x5ae)](selectedRewardImagePreviewUrl),
    (selectedRewardImagePreviewUrl = ""));
}
function setText(_0x32de63, _0x4aae9a) {
  const _0xa98f1a = _0x562b0b,
    _0x32e257 = $(_0x32de63);
  if (_0x32e257) _0x32e257[_0xa98f1a(0x23a)] = _0x4aae9a;
}
function showMessage(_0x55ba10, _0x2286cc = "info") {
  const _0x20568b = _0x562b0b;
  (($(_0x20568b(0x4ca))[_0x20568b(0x23a)] = _0x55ba10),
    ($("authMessage")[_0x20568b(0x566)] = _0x20568b(0x3bd) + _0x2286cc));
}
function showFileOriginWarning() {
  const _0x5e6708 = _0x562b0b,
    _0x54547f = $(_0x5e6708(0x685));
  if (_0x54547f)
    _0x54547f[_0x5e6708(0x752)]["display"] = isFileOrigin
      ? _0x5e6708(0x38d)
      : _0x5e6708(0x256);
}
function resolveAuthBoot() {
  const _0x5bb8a3 = _0x562b0b;
  document[_0x5bb8a3(0x674)]["classList"]["remove"](_0x5bb8a3(0x6ad));
}
function stopLiveData() {
  const _0x2586ad = _0x562b0b;
  (rewardSubscriptions["forEach"]((_0x40d77c) => {
    if (typeof _0x40d77c === "function") _0x40d77c();
  }),
    (rewardSubscriptions = []),
    partnerSupport["unsubscribeMessages"] &&
      (partnerSupport[_0x2586ad(0x740)](),
      (partnerSupport["unsubscribeMessages"] = null)),
    (partnerSupport[_0x2586ad(0x212)] = []),
    (partnerSupport["messages"] = []),
    (partnerSupport["selectedThreadId"] = null));
}
function isThreadUnreadForPartner(_0x5689d0) {
  const _0x165af6 = _0x562b0b;
  if (!_0x5689d0 || _0x5689d0["lastMessageSender"] !== _0x165af6(0x461))
    return ![];
  const _0x13992e = _0x5689d0[_0x165af6(0x4ac)]?.[_0x165af6(0x478)]?.() || 0x0,
    _0x2dfaeb = _0x5689d0["partnerLastReadAt"]?.[_0x165af6(0x478)]?.() || 0x0;
  return _0x13992e > _0x2dfaeb;
}
function formatSupportTime(_0x577e00) {
  const _0x51fdd7 = _0x562b0b;
  if (!_0x577e00) return "";
  const _0x4f95ab =
      typeof _0x577e00[_0x51fdd7(0x700)] === "function"
        ? _0x577e00[_0x51fdd7(0x700)]()
        : new Date(_0x577e00),
    _0x3a61ea = Date[_0x51fdd7(0x68e)]() - _0x4f95ab[_0x51fdd7(0x2e9)](),
    _0x435e4f = Math["floor"](_0x3a61ea / 0xea60);
  if (_0x435e4f < 0x1) return _0x51fdd7(0x68e);
  if (_0x435e4f < 0x3c) return _0x435e4f + "m\x20ago";
  const _0x4725ee = Math[_0x51fdd7(0x645)](_0x435e4f / 0x3c);
  if (_0x4725ee < 0x18) return _0x4725ee + _0x51fdd7(0x482);
  const _0x179163 = Math[_0x51fdd7(0x645)](_0x4725ee / 0x18);
  if (_0x179163 < 0x7) return _0x179163 + _0x51fdd7(0x206);
  return _0x4f95ab[_0x51fdd7(0x7ac)]();
}
function deriveSupportSubject(_0x356fbf) {
  const _0x2b85e0 = _0x562b0b,
    _0x19d5f6 = String(_0x356fbf || "")
      [_0x2b85e0(0x5d5)](/\s+/g, "\x20")
      [_0x2b85e0(0x583)]();
  if (!_0x19d5f6) return _0x2b85e0(0x654);
  return _0x19d5f6[_0x2b85e0(0x400)] > 0x3c
    ? _0x19d5f6[_0x2b85e0(0x605)](0x0, 0x39) + "…"
    : _0x19d5f6;
}
function renderPartnerSupportMessages() {
  const _0xc6b54d = _0x562b0b,
    _0x46804d = $(_0xc6b54d(0x396));
  if (!_0x46804d) return;
  if (!partnerSupport[_0xc6b54d(0x4d6)]) {
    _0x46804d[_0xc6b54d(0x1f2)] = _0xc6b54d(0x27b);
    return;
  }
  if (!partnerSupport["messages"][_0xc6b54d(0x400)]) {
    _0x46804d[_0xc6b54d(0x1f2)] = _0xc6b54d(0x6f2);
    return;
  }
  ((_0x46804d["innerHTML"] = partnerSupport["messages"]
    [_0xc6b54d(0x21b)]((_0x485540) => {
      const _0x1acdaa = _0xc6b54d,
        _0x3e8f05 = _0x485540[_0x1acdaa(0x4d9)] === _0x1acdaa(0x489),
        _0x5d419b = _0x3e8f05 ? _0x1acdaa(0x33b) : "Cycl\x20Support";
      return (
        _0x1acdaa(0x758) +
        (_0x3e8f05 ? _0x1acdaa(0x7a3) : "support-msg--them") +
        _0x1acdaa(0x7b8) +
        escapeHtml(_0x485540[_0x1acdaa(0x674)] || "") +
        _0x1acdaa(0x3fa) +
        escapeHtml(_0x5d419b) +
        "\x20&middot;\x20" +
        formatSupportTime(_0x485540[_0x1acdaa(0x697)]) +
        _0x1acdaa(0x570)
      );
    })
    [_0xc6b54d(0x376)]("")),
    requestAnimationFrame(() => {
      const _0x50845a = _0xc6b54d;
      _0x46804d["scrollTop"] = _0x46804d[_0x50845a(0x6a1)];
    }));
}
function renderPartnerSupportBadge() {
  const _0x5ab51c = _0x562b0b,
    _0x16d528 = $(_0x5ab51c(0x22e));
  if (!_0x16d528) return;
  const _0x2d1439 = partnerSupport[_0x5ab51c(0x212)][_0x5ab51c(0x274)](
    isThreadUnreadForPartner,
  )["length"];
  _0x2d1439 > 0x0
    ? ((_0x16d528[_0x5ab51c(0x23a)] =
        _0x2d1439 > 0x9 ? "9+" : String(_0x2d1439)),
      (_0x16d528["style"][_0x5ab51c(0x5b9)] = _0x5ab51c(0x283)))
    : (_0x16d528["style"][_0x5ab51c(0x5b9)] = _0x5ab51c(0x256));
}
function syncSelectedSupportThread() {
  const _0x2425d9 = _0x562b0b,
    _0x6c2ab = partnerSupport[_0x2425d9(0x212)][0x0]?.["id"] || null;
  if (_0x6c2ab === partnerSupport["selectedThreadId"]) {
    renderPartnerSupportMessages();
    return;
  }
  ((partnerSupport["selectedThreadId"] = _0x6c2ab),
    subscribeToPartnerSupportMessages(_0x6c2ab));
}
function subscribeToPartnerSupportMessages(_0x5e88dd) {
  const _0x21d50c = _0x562b0b;
  partnerSupport["unsubscribeMessages"] &&
    (partnerSupport[_0x21d50c(0x740)](),
    (partnerSupport["unsubscribeMessages"] = null));
  if (!_0x5e88dd) {
    ((partnerSupport[_0x21d50c(0x66c)] = []), renderPartnerSupportMessages());
    return;
  }
  const _0xc4ae7 = query(
    collection(
      db,
      PARTNER_SUPPORT_COLLECTION + "/" + _0x5e88dd + _0x21d50c(0x5b1),
    ),
    orderBy(_0x21d50c(0x697), _0x21d50c(0x602)),
  );
  partnerSupport[_0x21d50c(0x740)] = onSnapshot(_0xc4ae7, (_0x2c0f95) => {
    const _0x50d82b = _0x21d50c;
    ((partnerSupport[_0x50d82b(0x66c)] = _0x2c0f95[_0x50d82b(0x328)][
      _0x50d82b(0x21b)
    ]((_0x40791b) => ({
      id: _0x40791b["id"],
      ..._0x40791b[_0x50d82b(0x787)](),
    }))),
      renderPartnerSupportMessages());
  });
}
async function markPartnerSupportThreadRead(_0x509372) {
  const _0x943710 = _0x562b0b;
  if (!_0x509372 || !currentPartner) return;
  try {
    await updateDoc(doc(db, PARTNER_SUPPORT_COLLECTION, _0x509372), {
      partnerLastReadAt: serverTimestamp(),
    });
  } catch (_0x21500d) {
    console[_0x943710(0x4fb)](_0x943710(0x512), _0x21500d);
  }
}
async function sendPartnerSupportMessage() {
  const _0x1609ba = _0x562b0b;
  if (!currentPartner) return;
  if (requireHttpOrigin(_0x1609ba(0x2ce))) return;
  const _0x3622a7 = $(_0x1609ba(0x1f9)),
    _0x19a4a3 = (_0x3622a7["value"] || "")[_0x1609ba(0x583)]();
  if (!_0x19a4a3) return;
  const _0x58517e = $(_0x1609ba(0x5ce));
  _0x58517e[_0x1609ba(0x70f)] = !![];
  try {
    let _0x335be9 = partnerSupport[_0x1609ba(0x4d6)];
    if (!_0x335be9) {
      const _0xac4d11 = await addDoc(
        collection(db, PARTNER_SUPPORT_COLLECTION),
        {
          partnerId: currentPartner["id"],
          partnerCompanyName:
            currentPartner[_0x1609ba(0x412)] || _0x1609ba(0x3be),
          subject: deriveSupportSubject(_0x19a4a3),
          lastMessageAt: serverTimestamp(),
          lastMessageBody: _0x19a4a3,
          lastMessageSender: _0x1609ba(0x489),
          partnerLastReadAt: serverTimestamp(),
          adminLastReadAt: null,
          createdAt: serverTimestamp(),
        },
      );
      ((_0x335be9 = _0xac4d11["id"]),
        (partnerSupport[_0x1609ba(0x4d6)] = _0x335be9),
        subscribeToPartnerSupportMessages(_0x335be9));
    } else
      await updateDoc(doc(db, PARTNER_SUPPORT_COLLECTION, _0x335be9), {
        lastMessageAt: serverTimestamp(),
        lastMessageBody: _0x19a4a3,
        lastMessageSender: "partner",
        partnerLastReadAt: serverTimestamp(),
      });
    (await addDoc(
      collection(
        db,
        PARTNER_SUPPORT_COLLECTION + "/" + _0x335be9 + _0x1609ba(0x5b1),
      ),
      {
        body: _0x19a4a3,
        sender: _0x1609ba(0x489),
        senderName: currentPartner[_0x1609ba(0x412)] || _0x1609ba(0x3be),
        createdAt: serverTimestamp(),
      },
    ),
      (_0x3622a7[_0x1609ba(0x270)] = ""),
      (_0x3622a7[_0x1609ba(0x752)][_0x1609ba(0x271)] = _0x1609ba(0x76e)));
  } catch (_0x4cffee) {
    (console[_0x1609ba(0x222)](_0x1609ba(0x4b7), _0x4cffee),
      window[_0x1609ba(0x725)](
        _0x4cffee[_0x1609ba(0x52c)] ||
          "Could\x20not\x20send\x20your\x20message.",
      ));
  } finally {
    _0x58517e[_0x1609ba(0x70f)] = ![];
  }
}
function renderRewardImagePreview(_0x4d4c0d, _0x3f536f = _0x562b0b(0x54a)) {
  const _0x5a970b = _0x562b0b,
    _0x4e3087 = $("rewardImagePreview"),
    _0x8507b1 = $(_0x5a970b(0x66e)),
    _0x1e13db = $("rewardImagePreviewMeta"),
    _0x19a702 = $(_0x5a970b(0x64d));
  if (!_0x4e3087 || !_0x8507b1 || !_0x1e13db || !_0x19a702) return;
  if (!_0x4d4c0d) {
    ((_0x4e3087["style"][_0x5a970b(0x5b9)] = _0x5a970b(0x256)),
      _0x8507b1["removeAttribute"](_0x5a970b(0x6f6)),
      (_0x19a702[_0x5a970b(0x752)][_0x5a970b(0x5b9)] = _0x5a970b(0x256)));
    return;
  }
  ((_0x4e3087["style"][_0x5a970b(0x5b9)] = _0x5a970b(0x623)),
    (_0x8507b1[_0x5a970b(0x6f6)] = _0x4d4c0d),
    (_0x1e13db["textContent"] = _0x3f536f),
    (_0x19a702[_0x5a970b(0x752)]["display"] = _0x5a970b(0x283)));
}
function syncRewardImagePreview() {
  const _0x7649c6 = _0x562b0b;
  if (selectedRewardImagePreviewUrl) {
    renderRewardImagePreview(selectedRewardImagePreviewUrl, _0x7649c6(0x5ef));
    return;
  }
  const _0x194e1b =
    $("rewardImage")?.[_0x7649c6(0x270)]?.[_0x7649c6(0x583)]() || "";
  renderRewardImagePreview(_0x194e1b, _0x7649c6(0x4f6));
}
function clearSelectedRewardImage({ clearUrl: clearUrl = ![] } = {}) {
  const _0x4150c6 = _0x562b0b;
  (releaseRewardImagePreviewUrl(), (selectedRewardImageFile = null));
  if ($(_0x4150c6(0x50b))) $("rewardImageFile")[_0x4150c6(0x270)] = "";
  if (clearUrl && $(_0x4150c6(0x25d)))
    $(_0x4150c6(0x25d))[_0x4150c6(0x270)] = "";
  if ($(_0x4150c6(0x2a6))) $(_0x4150c6(0x2a6))["value"] = "";
  syncRewardImagePreview();
}
function hideRewardLocationSuggestions() {
  const _0x11cfac = _0x562b0b,
    _0x4bd880 = $(_0x11cfac(0x6c7));
  if (!_0x4bd880) return;
  ((rewardLocationSuggestions = []),
    (_0x4bd880[_0x11cfac(0x1f2)] = ""),
    (_0x4bd880[_0x11cfac(0x752)]["display"] = _0x11cfac(0x256)));
}
function hideAddressSuggestions(_0x53a66f) {
  const _0x40a322 = _0x562b0b,
    _0x38f801 = $(_0x53a66f);
  if (!_0x38f801) return;
  ((_0x38f801[_0x40a322(0x1f2)] = ""),
    (_0x38f801[_0x40a322(0x752)][_0x40a322(0x5b9)] = _0x40a322(0x256)));
}
function extractAddressCity(_0x40d274) {
  const _0x49d9e7 = _0x562b0b,
    _0x580d4d = Array["isArray"](_0x40d274?.[_0x49d9e7(0x784)])
      ? _0x40d274[_0x49d9e7(0x784)]
      : [],
    _0x3d63c5 = _0x580d4d[_0x49d9e7(0x40f)]((_0x135f4b) =>
      String(_0x135f4b?.["id"] || "")[_0x49d9e7(0x62a)]("place."),
    );
  if (_0x3d63c5?.["text"]) return _0x3d63c5[_0x49d9e7(0x1f8)];
  const _0x511939 = _0x580d4d[_0x49d9e7(0x40f)]((_0x53ee4a) =>
    String(_0x53ee4a?.["id"] || "")[_0x49d9e7(0x62a)](_0x49d9e7(0x63d)),
  );
  if (_0x511939?.[_0x49d9e7(0x1f8)]) return _0x511939[_0x49d9e7(0x1f8)];
  return _0x40d274?.[_0x49d9e7(0x1f8)] || "";
}
function extractAddressCountryCode(_0x10646a) {
  const _0x5c59b8 = _0x562b0b,
    _0x55ca79 = String(_0x10646a?.["properties"]?.[_0x5c59b8(0x42e)] || "")[
      _0x5c59b8(0x605)
    ](-0x2);
  if (_0x55ca79) return _0x55ca79[_0x5c59b8(0x541)]();
  const _0x36af48 = Array[_0x5c59b8(0x417)](_0x10646a?.[_0x5c59b8(0x784)])
      ? _0x10646a[_0x5c59b8(0x784)]
      : [],
    _0x11d6e0 = _0x36af48[_0x5c59b8(0x40f)]((_0x4eca3e) =>
      String(_0x4eca3e?.["id"] || "")[_0x5c59b8(0x62a)](_0x5c59b8(0x71f)),
    );
  return String(_0x11d6e0?.[_0x5c59b8(0x42e)] || "")
    [_0x5c59b8(0x605)](-0x2)
    [_0x5c59b8(0x541)]();
}
function renderAddressSuggestions(_0x4fbe59, _0x33effb, _0x4c7531) {
  const _0x5d7452 = _0x562b0b,
    _0x25a915 = $(_0x33effb);
  if (!_0x25a915 || !_0x4fbe59[_0x5d7452(0x400)]) {
    hideAddressSuggestions(_0x33effb);
    return;
  }
  ((_0x25a915[_0x5d7452(0x1f2)] = _0x4fbe59[_0x5d7452(0x21b)](
    (_0x333ac9, _0x376516) =>
      _0x5d7452(0x518) +
      _0x376516 +
      _0x5d7452(0x4d7) +
      escapeHtml(_0x333ac9?.["text"] || _0x333ac9?.[_0x5d7452(0x7a4)] || "") +
      _0x5d7452(0x29a) +
      escapeHtml(_0x333ac9["place_name"] || "") +
      "</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</button>\x0a\x20\x20\x20\x20\x20\x20",
  )[_0x5d7452(0x376)]("")),
    (_0x25a915[_0x5d7452(0x752)][_0x5d7452(0x5b9)] = "grid"),
    _0x25a915[_0x5d7452(0x3b9)](".location-suggestion")[_0x5d7452(0x49f)](
      (_0x3b447a) => {
        const _0x18a841 = _0x5d7452;
        _0x3b447a["addEventListener"](_0x18a841(0x3e7), (_0x10c69d) => {
          const _0x2a15e2 = _0x18a841;
          _0x10c69d[_0x2a15e2(0x580)]();
          const _0x1cda51 = parseInt(
            _0x3b447a[_0x2a15e2(0x21a)][_0x2a15e2(0x56c)],
            0xa,
          );
          (_0x4c7531(_0x4fbe59[_0x1cda51]), hideAddressSuggestions(_0x33effb));
        });
      },
    ));
}
async function searchAddressLocations(
  _0x30a7be,
  _0x43ae4f,
  _0x3618e7,
  _0x47a928,
) {
  const _0x5177cb = _0x562b0b,
    _0x5ca670 = String(_0x30a7be || "")[_0x5177cb(0x583)]();
  if (!_0x5ca670 || _0x5ca670[_0x5177cb(0x400)] < 0x2 || !MAPBOX_ACCESS_TOKEN) {
    hideAddressSuggestions(_0x43ae4f);
    return;
  }
  if (_0x47a928["current"]) _0x47a928["current"][_0x5177cb(0x3d7)]();
  _0x47a928[_0x5177cb(0x672)] = new AbortController();
  try {
    const _0x2d7b5b = new URLSearchParams({
        access_token: MAPBOX_ACCESS_TOKEN,
        autocomplete: _0x5177cb(0x2a5),
        limit: "6",
        types: _0x5177cb(0x33f),
        country: getMapboxSupportedCountries(),
      }),
      _0x38c588 = await fetch(
        _0x5177cb(0x4df) +
          encodeURIComponent(_0x5ca670) +
          _0x5177cb(0x57f) +
          _0x2d7b5b,
        { signal: _0x47a928[_0x5177cb(0x672)]["signal"] },
      );
    if (!_0x38c588["ok"]) throw new Error(_0x5177cb(0x72e));
    const _0x1a7d08 = await _0x38c588[_0x5177cb(0x57a)](),
      _0x40b4d8 = Array["isArray"](_0x1a7d08?.["features"])
        ? _0x1a7d08[_0x5177cb(0x78e)]
        : [];
    renderAddressSuggestions(_0x40b4d8, _0x43ae4f, _0x3618e7);
  } catch (_0x275eb5) {
    if (_0x275eb5?.["name"] === _0x5177cb(0x551)) return;
    (console["warn"]("Address\x20search\x20failed.", _0x275eb5),
      hideAddressSuggestions(_0x43ae4f));
  }
}
function applySignupAddressSuggestion(_0x1bea0d) {
  const _0x1ceab5 = _0x562b0b,
    _0x328a80 = $(_0x1ceab5(0x4cb)),
    _0x50b568 = $(_0x1ceab5(0x55a)),
    _0x320c32 = $(_0x1ceab5(0x64c)),
    _0x3e9594 = $(_0x1ceab5(0x60f));
  if (!_0x328a80) return;
  _0x328a80[_0x1ceab5(0x270)] =
    _0x1bea0d?.[_0x1ceab5(0x7a4)] || _0x1bea0d?.[_0x1ceab5(0x1f8)] || "";
  if (_0x50b568)
    _0x50b568[_0x1ceab5(0x270)] = String(
      _0x1bea0d?.[_0x1ceab5(0x60b)]?.[0x1] ?? "",
    );
  if (_0x320c32)
    _0x320c32[_0x1ceab5(0x270)] = String(
      _0x1bea0d?.[_0x1ceab5(0x60b)]?.[0x0] ?? "",
    );
  if (_0x3e9594) _0x3e9594[_0x1ceab5(0x270)] = extractAddressCity(_0x1bea0d);
  hideAddressSuggestions(_0x1ceab5(0x607));
}
function applyProfileAddressSuggestion(_0x330233) {
  const _0x59a6fa = _0x562b0b,
    _0x5198f4 = $(_0x59a6fa(0x505)),
    _0x51fbd1 = $(_0x59a6fa(0x3c2)),
    _0x2c3e45 = $(_0x59a6fa(0x686)),
    _0x4445b9 = $(_0x59a6fa(0x46e));
  if (!_0x5198f4) return;
  _0x5198f4[_0x59a6fa(0x270)] =
    _0x330233?.[_0x59a6fa(0x7a4)] || _0x330233?.[_0x59a6fa(0x1f8)] || "";
  if (_0x51fbd1)
    _0x51fbd1[_0x59a6fa(0x270)] = String(
      _0x330233?.[_0x59a6fa(0x60b)]?.[0x1] ?? "",
    );
  if (_0x2c3e45)
    _0x2c3e45[_0x59a6fa(0x270)] = String(_0x330233?.["center"]?.[0x0] ?? "");
  if (_0x4445b9) _0x4445b9[_0x59a6fa(0x270)] = extractAddressCity(_0x330233);
  hideAddressSuggestions(_0x59a6fa(0x261));
}
function extractRewardLocationName(_0x23587d) {
  const _0x124c92 = _0x562b0b;
  return _0x23587d?.[_0x124c92(0x1f8)] || _0x23587d?.[_0x124c92(0x7a4)] || "";
}
function extractRewardLocationCountryCode(_0x1c3c74) {
  const _0x4ad7b5 = _0x562b0b,
    _0x333113 = String(_0x1c3c74?.[_0x4ad7b5(0x6bd)]?.[_0x4ad7b5(0x42e)] || "")[
      _0x4ad7b5(0x605)
    ](-0x2);
  if (_0x333113) return _0x333113[_0x4ad7b5(0x541)]();
  const _0x83f95d = Array["isArray"](_0x1c3c74?.["context"])
      ? _0x1c3c74[_0x4ad7b5(0x784)]
      : [],
    _0x33ce5c = _0x83f95d[_0x4ad7b5(0x40f)]((_0x21d03c) =>
      String(_0x21d03c?.["id"] || "")[_0x4ad7b5(0x62a)](_0x4ad7b5(0x71f)),
    );
  return String(_0x33ce5c?.[_0x4ad7b5(0x42e)] || "")
    [_0x4ad7b5(0x605)](-0x2)
    [_0x4ad7b5(0x541)]();
}
function applyRewardLocationSuggestion(_0x23c8ae) {
  const _0x2b002e = _0x562b0b,
    _0x57edd6 = $("rewardLocation"),
    _0x1d6c49 = $("rewardLocationLat"),
    _0x23fe5a = $(_0x2b002e(0x4f2)),
    _0x52e55f = $(_0x2b002e(0x586));
  if (!_0x57edd6 || !_0x1d6c49 || !_0x23fe5a || !_0x52e55f) return;
  ((_0x57edd6[_0x2b002e(0x270)] = extractRewardLocationName(_0x23c8ae)),
    (_0x1d6c49[_0x2b002e(0x270)] = String(
      _0x23c8ae?.[_0x2b002e(0x60b)]?.[0x1] ?? "",
    )),
    (_0x23fe5a[_0x2b002e(0x270)] = String(
      _0x23c8ae?.[_0x2b002e(0x60b)]?.[0x0] ?? "",
    )));
  const _0x238d11 = extractRewardLocationCountryCode(_0x23c8ae);
  if (_0x238d11) _0x52e55f[_0x2b002e(0x270)] = _0x238d11;
  hideRewardLocationSuggestions();
}
function renderRewardLocationSuggestions(_0x3e7705) {
  const _0x23be02 = _0x562b0b,
    _0x1368d0 = $("rewardLocationSuggestions");
  if (!_0x1368d0 || !_0x3e7705[_0x23be02(0x400)]) {
    hideRewardLocationSuggestions();
    return;
  }
  ((rewardLocationSuggestions = _0x3e7705),
    (_0x1368d0["innerHTML"] = _0x3e7705[_0x23be02(0x21b)](
      (_0x4e7d26, _0x453e86) =>
        _0x23be02(0x4a9) +
        _0x453e86 +
        "\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<strong>" +
        escapeHtml(extractRewardLocationName(_0x4e7d26)) +
        "</strong>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span>" +
        escapeHtml(_0x4e7d26["place_name"] || "") +
        _0x23be02(0x2a1),
    )["join"]("")),
    (_0x1368d0[_0x23be02(0x752)][_0x23be02(0x5b9)] = _0x23be02(0x5e3)));
}
async function searchRewardLocations(_0x1f99e9) {
  const _0x5f73ab = _0x562b0b,
    _0x439056 = String(_0x1f99e9 || "")[_0x5f73ab(0x583)]();
  if (!_0x439056 || _0x439056[_0x5f73ab(0x400)] < 0x2 || !MAPBOX_ACCESS_TOKEN) {
    hideRewardLocationSuggestions();
    return;
  }
  rewardLocationAbortController &&
    rewardLocationAbortController[_0x5f73ab(0x3d7)]();
  rewardLocationAbortController = new AbortController();
  try {
    const _0x259ce9 = new URLSearchParams({
        access_token: MAPBOX_ACCESS_TOKEN,
        autocomplete: "true",
        limit: "6",
        types: _0x5f73ab(0x589),
        country: getMapboxSupportedCountries(),
      }),
      _0x3eb91e = await fetch(
        _0x5f73ab(0x4df) + encodeURIComponent(_0x439056) + ".json?" + _0x259ce9,
        { signal: rewardLocationAbortController[_0x5f73ab(0x6c3)] },
      );
    if (!_0x3eb91e["ok"]) throw new Error(_0x5f73ab(0x3af));
    const _0x571959 = await _0x3eb91e[_0x5f73ab(0x57a)]();
    renderRewardLocationSuggestions(
      Array[_0x5f73ab(0x417)](_0x571959?.["features"])
        ? _0x571959[_0x5f73ab(0x78e)]
        : [],
    );
  } catch (_0x47c254) {
    if (_0x47c254?.[_0x5f73ab(0x410)] === "AbortError") return;
    (console["warn"](_0x5f73ab(0x3cb), _0x47c254),
      hideRewardLocationSuggestions());
  }
}
function syncRewardAvailabilityFields() {
  const _0x35a010 = _0x562b0b,
    _0x33be64 = $(_0x35a010(0x3a2))?.[_0x35a010(0x270)] || "unlimited",
    _0x19169c = $("rewardAvailabilityCountField"),
    _0x44b584 = $(_0x35a010(0x4b3)),
    _0x1d083e = _0x33be64 === _0x35a010(0x4c5);
  _0x19169c &&
    (_0x19169c[_0x35a010(0x752)][_0x35a010(0x5b9)] = _0x1d083e
      ? _0x35a010(0x5e3)
      : _0x35a010(0x256));
  if (_0x44b584) {
    _0x44b584[_0x35a010(0x70f)] = !_0x1d083e;
    if (!_0x1d083e) _0x44b584["value"] = "";
  }
}
function syncRewardChannelFields() {
  const _0x4bf5d5 = _0x562b0b,
    _0x33df47 = Boolean($(_0x4bf5d5(0x63a))?.[_0x4bf5d5(0x6ba)]),
    _0xfcee7b = $(_0x4bf5d5(0x5d4)),
    _0x2740e9 = $(_0x4bf5d5(0x3e3)),
    _0x1bfa26 = $(_0x4bf5d5(0x638));
  (_0xfcee7b &&
    ((_0xfcee7b["required"] = !_0x33df47),
    (_0xfcee7b[_0x4bf5d5(0x70f)] = _0x33df47),
    (_0xfcee7b[_0x4bf5d5(0x79e)] = _0x33df47
      ? _0x4bf5d5(0x5a4)
      : _0x4bf5d5(0x236))),
    _0x2740e9 &&
      (_0x2740e9[_0x4bf5d5(0x752)][_0x4bf5d5(0x5b9)] = _0x33df47
        ? "none"
        : "grid"),
    _0x1bfa26 &&
      ((_0x1bfa26[_0x4bf5d5(0x70f)] = _0x33df47),
      _0x33df47 && (_0x1bfa26[_0x4bf5d5(0x270)] = "")),
    _0x33df47 &&
      (hideRewardLocationSuggestions(),
      ($(_0x4bf5d5(0x5d4))[_0x4bf5d5(0x270)] = ""),
      ($(_0x4bf5d5(0x35a))[_0x4bf5d5(0x270)] = ""),
      ($(_0x4bf5d5(0x4f2))["value"] = "")));
}
function startLiveData() {
  const _0x404181 = _0x562b0b;
  if (!currentPartner) return;
  stopLiveData();
  const _0x545ac3 = query(
      collection(db, collections[_0x404181(0x4a4)]),
      where(_0x404181(0x6b7), "==", currentPartner["id"]),
    ),
    _0x1f425e = query(
      collection(db, collections[_0x404181(0x44b)]),
      where(_0x404181(0x6b7), "==", currentPartner["id"]),
    );
  (rewardSubscriptions[_0x404181(0x3bc)](
    onSnapshot(_0x545ac3, (_0x1ae5ac) => {
      ((rewardRecords = _0x1ae5ac["docs"]["map"]((_0x2dc8d7) => ({
        id: _0x2dc8d7["id"],
        ..._0x2dc8d7["data"](),
      }))),
        backfillMissingBoostMetricBaselines(),
        renderDashboard());
      if (partnerBillingStatus["loaded"]) enforceRewardLimitForCurrentPlan();
    }),
  ),
    rewardSubscriptions["push"](
      onSnapshot(collection(db, collections["stations"]), (_0x1947de) => {
        const _0x435fc3 = _0x404181;
        ((stationRecords = _0x1947de[_0x435fc3(0x328)]
          [
            _0x435fc3(0x21b)
          ]((_0x4bf120) => ({ id: _0x4bf120["id"], ..._0x4bf120[_0x435fc3(0x787)]() }))
          [_0x435fc3(0x274)](stationBelongsToPartner)),
          renderDashboard());
      }),
    ),
    rewardSubscriptions[_0x404181(0x3bc)](
      onSnapshot(_0x1f425e, (_0x3d4c2c) => {
        const _0x4ba58c = _0x404181;
        ((collectionRequestRecords = _0x3d4c2c[_0x4ba58c(0x328)][
          _0x4ba58c(0x21b)
        ]((_0x3c3268) => ({
          id: _0x3c3268["id"],
          ..._0x3c3268[_0x4ba58c(0x787)](),
        }))),
          renderDashboard());
      }),
    ));
  const _0x3a8d89 = query(
    collection(db, PARTNER_SUPPORT_COLLECTION),
    where(_0x404181(0x6b7), "==", currentPartner["id"]),
  );
  rewardSubscriptions[_0x404181(0x3bc)](
    onSnapshot(_0x3a8d89, (_0x4be7a5) => {
      const _0x4fc072 = _0x404181;
      ((partnerSupport[_0x4fc072(0x212)] = _0x4be7a5[_0x4fc072(0x328)]
        [
          _0x4fc072(0x21b)
        ]((_0x231f6a) => ({ id: _0x231f6a["id"], ..._0x231f6a[_0x4fc072(0x787)]() }))
        [
          _0x4fc072(0x25c)
        ]((_0x1dda16, _0x1cee17) => (_0x1cee17[_0x4fc072(0x4ac)]?.["toMillis"]?.() || 0x0) - (_0x1dda16[_0x4fc072(0x4ac)]?.[_0x4fc072(0x478)]?.() || 0x0))),
        syncSelectedSupportThread(),
        renderPartnerSupportBadge());
    }),
  );
}
function loadImageElement(_0x5ed51f) {
  return new Promise((_0x349179, _0xf243ad) => {
    const _0x40a4ae = _0x2558,
      _0x5b0f76 = URL[_0x40a4ae(0x47a)](_0x5ed51f),
      _0x24f93f = new Image();
    ((_0x24f93f["onload"] = () => {
      const _0x50264d = _0x40a4ae;
      (URL[_0x50264d(0x5ae)](_0x5b0f76), _0x349179(_0x24f93f));
    }),
      (_0x24f93f["onerror"] = () => {
        const _0x893bdb = _0x40a4ae;
        (URL[_0x893bdb(0x5ae)](_0x5b0f76),
          _0xf243ad(new Error(_0x893bdb(0x221))));
      }),
      (_0x24f93f["src"] = _0x5b0f76));
  });
}
async function compressRewardImageFile(_0x503456) {
  const _0x3475e0 = _0x562b0b,
    _0x469793 = await loadImageElement(_0x503456),
    _0x5f134e = 0x640,
    _0x11c5d9 =
      Math[_0x3475e0(0x72c)](
        _0x469793[_0x3475e0(0x7a1)],
        _0x469793[_0x3475e0(0x271)],
      ) || 0x1,
    _0x584551 = Math["min"](0x1, _0x5f134e / _0x11c5d9),
    _0x301a89 = Math[_0x3475e0(0x72c)](
      0x1,
      Math[_0x3475e0(0x369)](_0x469793[_0x3475e0(0x7a1)] * _0x584551),
    ),
    _0x16a3ce = Math[_0x3475e0(0x72c)](
      0x1,
      Math[_0x3475e0(0x369)](_0x469793[_0x3475e0(0x271)] * _0x584551),
    ),
    _0x4526d2 = document[_0x3475e0(0x703)](_0x3475e0(0x2ba));
  ((_0x4526d2[_0x3475e0(0x7a1)] = _0x301a89),
    (_0x4526d2[_0x3475e0(0x271)] = _0x16a3ce));
  const _0x3ff197 = _0x4526d2[_0x3475e0(0x366)]("2d");
  if (!_0x3ff197) throw new Error(_0x3475e0(0x510));
  ((_0x3ff197["fillStyle"] = _0x3475e0(0x5ed)),
    _0x3ff197["fillRect"](0x0, 0x0, _0x301a89, _0x16a3ce),
    _0x3ff197[_0x3475e0(0x2cb)](_0x469793, 0x0, 0x0, _0x301a89, _0x16a3ce));
  const _0x361348 = [0.86, 0.78, 0.7, 0.62];
  for (const _0x476ee6 of _0x361348) {
    const _0x139347 = await new Promise((_0x285dc2, _0x372654) => {
      const _0x3a8a9c = _0x3475e0;
      _0x4526d2[_0x3a8a9c(0x3e5)](
        (_0x4a7090) => {
          const _0x1af66a = _0x3a8a9c;
          if (_0x4a7090) _0x285dc2(_0x4a7090);
          else _0x372654(new Error(_0x1af66a(0x775)));
        },
        "image/jpeg",
        _0x476ee6,
      );
    });
    if (
      _0x139347[_0x3475e0(0x2dd)] <= 0x2bc * 0x400 ||
      _0x476ee6 === _0x361348[_0x361348[_0x3475e0(0x400)] - 0x1]
    )
      return _0x139347;
  }
  throw new Error(_0x3475e0(0x775));
}
async function uploadRewardImageFile(_0x5f1e1c) {
  const _0x1dff74 = _0x562b0b;
  if (!currentPartner) throw new Error(_0x1dff74(0x325));
  const _0x327446 = await compressRewardImageFile(_0x5f1e1c),
    _0x5768e2 =
      String(_0x5f1e1c[_0x1dff74(0x410)] || _0x1dff74(0x350))
        [_0x1dff74(0x5d5)](/\.[^.]+$/, "")
        [_0x1dff74(0x5d5)](/[^a-z0-9-_]+/gi, "-")
        [_0x1dff74(0x5d5)](/-+/g, "-")
        ["toLowerCase"]()
        [_0x1dff74(0x5d5)](/^-|-$/g, "") || _0x1dff74(0x350),
    _0xb8db82 =
      _0x1dff74(0x552) +
      currentPartner["id"] +
      "/" +
      Date[_0x1dff74(0x68e)]() +
      "-" +
      _0x5768e2 +
      _0x1dff74(0x6e7),
    _0x4b7138 = _0x59d1fe(storage, _0xb8db82);
  await uploadBytes(_0x4b7138, _0x327446, {
    contentType: _0x1dff74(0x79f),
    cacheControl: _0x1dff74(0x53d),
  });
  const _0x12c6c2 = await getDownloadURL(_0x4b7138);
  return {
    imageUrl: _0x12c6c2,
    imagePath: _0xb8db82,
    sizeKb: Math[_0x1dff74(0x369)](_0x327446[_0x1dff74(0x2dd)] / 0x400),
  };
}
function requireHttpOrigin(_0x1dcbb8) {
  const _0x1c9dac = _0x562b0b;
  if (!isFileOrigin) return ![];
  const _0x812662 =
      _0x1c9dac(0x4fc) + localPortalUrl + _0x1c9dac(0x765) + _0x1dcbb8 + ".",
    _0x4efb80 = $(_0x1c9dac(0x4ca));
  return (
    _0x4efb80 &&
      ((_0x4efb80["textContent"] = _0x812662),
      (_0x4efb80[_0x1c9dac(0x566)] = _0x1c9dac(0x5f5))),
    showFileOriginWarning(),
    window[_0x1c9dac(0x725)](_0x812662),
    !![]
  );
}
function showAuthTab(_0x12fbd7) {
  const _0x7f6532 = _0x562b0b;
  (document[_0x7f6532(0x3b9)](_0x7f6532(0x6c5))[_0x7f6532(0x49f)](
    (_0x25f813) => {
      const _0x13c6cd = _0x7f6532;
      _0x25f813[_0x13c6cd(0x5a3)][_0x13c6cd(0x668)](
        "active",
        _0x25f813[_0x13c6cd(0x21a)][_0x13c6cd(0x47e)] === _0x12fbd7,
      );
    },
  ),
    ($(_0x7f6532(0x244))[_0x7f6532(0x752)]["display"] =
      _0x12fbd7 === _0x7f6532(0x747) ? _0x7f6532(0x5e3) : _0x7f6532(0x256)),
    ($(_0x7f6532(0x4b6))[_0x7f6532(0x752)][_0x7f6532(0x5b9)] =
      _0x12fbd7 === _0x7f6532(0x413) ? "grid" : _0x7f6532(0x256)),
    ($(_0x7f6532(0x4ca))[_0x7f6532(0x566)] = _0x7f6532(0x52c)));
}
function populateCountries() {
  const _0x39192d = _0x562b0b,
    _0x1a833d = countries[_0x39192d(0x21b)](
      ([_0x192c85, _0x24bc79]) =>
        "<option\x20value=\x22" +
        _0x192c85 +
        "\x22>" +
        _0x24bc79 +
        _0x39192d(0x6d4),
    )["join"]("");
  (($(_0x39192d(0x6bf))["innerHTML"] = _0x1a833d),
    ($(_0x39192d(0x586))[_0x39192d(0x1f2)] = _0x1a833d));
  const _0x1e4c8c = $(_0x39192d(0x363));
  if (_0x1e4c8c) _0x1e4c8c[_0x39192d(0x1f2)] = _0x1a833d;
}
function populateBusinessCategorySelect(_0x26fa6e, _0x3cfa77) {
  const _0x28fb82 = _0x562b0b;
  if (!_0x26fa6e) return;
  _0x26fa6e["innerHTML"] = BUSINESS_CATEGORIES[_0x28fb82(0x21b)](
    (_0xb27caa) =>
      _0x28fb82(0x297) +
      _0xb27caa["id"] +
      "\x22>" +
      escapeHtml(_0xb27caa[_0x28fb82(0x410)]) +
      _0x28fb82(0x6d4),
  )[_0x28fb82(0x376)]("");
  if (_0x3cfa77 && CATEGORY_BY_ID[_0x3cfa77])
    _0x26fa6e[_0x28fb82(0x270)] = _0x3cfa77;
}
function populateBusinessSubcategorySelect(_0x1434c6, _0x241185, _0x3e6a6c) {
  const _0x3e321e = _0x562b0b;
  if (!_0x1434c6) return;
  const _0x459c06 = CATEGORY_BY_ID[_0x241185] || BUSINESS_CATEGORIES[0x0];
  _0x1434c6[_0x3e321e(0x1f2)] = _0x459c06[_0x3e321e(0x228)]
    [
      _0x3e321e(0x21b)
    ]((_0x1f4268) => "<option\x20value=\x22" + escapeHtml(_0x1f4268) + "\x22>" + escapeHtml(_0x1f4268) + _0x3e321e(0x6d4))
    [_0x3e321e(0x376)]("");
  if (_0x3e6a6c && _0x459c06[_0x3e321e(0x228)][_0x3e321e(0x46c)](_0x3e6a6c))
    _0x1434c6[_0x3e321e(0x270)] = _0x3e6a6c;
}
function wireBusinessCategoryCascade(_0x5375d4, _0x41c623) {
  const _0x16cf2e = _0x562b0b,
    _0x5c0338 = $(_0x5375d4),
    _0x596bbb = $(_0x41c623);
  if (!_0x5c0338 || !_0x596bbb) return;
  _0x5c0338[_0x16cf2e(0x23d)](_0x16cf2e(0x73e), () => {
    const _0x2aeff4 = _0x16cf2e;
    populateBusinessSubcategorySelect(_0x596bbb, _0x5c0338[_0x2aeff4(0x270)]);
  });
}
function getCountryName(_0x40623d) {
  const _0x351699 = _0x562b0b;
  return (
    countries[_0x351699(0x40f)](
      (_0x310b2c) => _0x310b2c[0x0] === _0x40623d,
    )?.[0x1] ||
    _0x40623d ||
    ""
  );
}
function hasBoostHistory(_0x314e80) {
  const _0xbcce11 = _0x562b0b;
  return Boolean(
    _0x314e80?.[_0xbcce11(0x22b)] ||
    _0x314e80?.[_0xbcce11(0x219)] ||
    _0x314e80?.[_0xbcce11(0x4ba)] ||
    Number(_0x314e80?.[_0xbcce11(0x6c9)] || 0x0) > 0x0 ||
    _0x314e80?.[_0xbcce11(0x45b)] ||
    _0x314e80?.[_0xbcce11(0x793)],
  );
}
function getEffectivePlacement(_0x40f5a4) {
  const _0x235963 = _0x562b0b,
    _0x513058 = _0x40f5a4[_0x235963(0x43b)] || _0x235963(0x731),
    _0x51ed9b = Number(_0x40f5a4[_0x235963(0x388)] || 0x0);
  if (hasBoostHistory(_0x40f5a4) && _0x51ed9b > Date["now"]())
    return _0x235963(0x5b3);
  if (_0x513058 === _0x235963(0x5b3) || _0x513058 === _0x235963(0x6ed))
    return _0x51ed9b > Date["now"]() ? _0x513058 : _0x235963(0x731);
  return _0x513058;
}
function isSponsoredReward(_0x4e5715) {
  const _0x59147f = _0x562b0b,
    _0x46774c = getEffectivePlacement(_0x4e5715);
  return _0x46774c === _0x59147f(0x6ed) || _0x46774c === _0x59147f(0x5b3);
}
function getRewardPlacementMeta(_0x227996) {
  const _0x5af9a1 = _0x562b0b,
    _0x34704f = getEffectivePlacement(_0x227996),
    _0x39ee22 = {
      organic: {
        id: _0x5af9a1(0x731),
        cls: "organic",
        pillCls: "",
        label: "Organic",
        title: _0x5af9a1(0x24b),
        copy: _0x5af9a1(0x345),
        action: _0x5af9a1(0x554),
        nextPlacement: _0x5af9a1(0x6ed),
      },
      popular_sponsored: {
        id: _0x5af9a1(0x6ed),
        cls: _0x5af9a1(0x7be),
        pillCls: _0x5af9a1(0x5d3),
        label: _0x5af9a1(0x27c),
        title: _0x5af9a1(0x524),
        copy: _0x5af9a1(0x690),
        action: _0x5af9a1(0x27a),
        nextPlacement: _0x5af9a1(0x5b3),
      },
      featured_boost: {
        id: _0x5af9a1(0x5b3),
        cls: _0x5af9a1(0x492),
        pillCls: _0x5af9a1(0x339),
        label: _0x5af9a1(0x32b),
        title: _0x5af9a1(0x591),
        copy: _0x5af9a1(0x708),
        action: "",
        nextPlacement: "",
      },
    };
  return _0x39ee22[_0x34704f] || _0x39ee22[_0x5af9a1(0x731)];
}
function getRewardMetric(_0x363618, _0x5537c2) {
  const _0x30faca = _0x562b0b;
  if (_0x5537c2 === _0x30faca(0x2e7))
    return Number(
      _0x363618["clicks"] ||
        _0x363618[_0x30faca(0x4ea)] ||
        _0x363618["views"] ||
        _0x363618["taps"] ||
        0x0,
    );
  if (_0x5537c2 === _0x30faca(0x611))
    return Number(
      _0x363618[_0x30faca(0x611)] ||
        _0x363618[_0x30faca(0x28f)] ||
        _0x363618[_0x30faca(0x6ce)] ||
        _0x363618[_0x30faca(0x34b)] ||
        0x0,
    );
  if (_0x5537c2 === _0x30faca(0x34b))
    return Number(
      _0x363618[_0x30faca(0x34b)] ||
        _0x363618["validatedCount"] ||
        _0x363618[_0x30faca(0x52a)] ||
        0x0,
    );
  return 0x0;
}
function getBoostMetricBaseline(_0x8e019a, _0xf31941, _0x234d29) {
  const _0x3002ef = _0x562b0b,
    _0x52d2ac = {
      activations: _0x3002ef(0x43f),
      clicks: _0x3002ef(0x51a),
      validations: _0x3002ef(0x5a2),
    },
    _0x1c73d0 = _0x52d2ac[_0xf31941],
    _0x4dbce5 = _0x1c73d0 ? Number(_0x8e019a?.[_0x1c73d0]) : NaN;
  if (Number["isFinite"](_0x4dbce5) && _0x4dbce5 >= 0x0)
    return Math[_0x3002ef(0x406)](_0x234d29, _0x4dbce5);
  return isSponsoredReward(_0x8e019a) ? _0x234d29 : 0x0;
}
function getBoostedRewardMetric(_0x1d2596, _0x5450b3) {
  const _0x421565 = _0x562b0b,
    _0x85635 = getRewardMetric(_0x1d2596, _0x5450b3);
  if (!hasBoostHistory(_0x1d2596)) return 0x0;
  const _0xed6e5a = getBoostMetricBaseline(_0x1d2596, _0x5450b3, _0x85635);
  return Math[_0x421565(0x72c)](0x0, _0x85635 - _0xed6e5a);
}
function backfillMissingBoostMetricBaselines() {
  const _0x46006f = _0x562b0b;
  if (!currentPartner) return;
  rewardRecords[_0x46006f(0x49f)]((_0x4dd40b) => {
    const _0x52465d = _0x46006f;
    if (!_0x4dd40b?.["id"] || boostBaselineBackfillIds["has"](_0x4dd40b["id"]))
      return;
    if (!isSponsoredReward(_0x4dd40b)) return;
    if (!_0x4dd40b[_0x52465d(0x22b)] && !_0x4dd40b[_0x52465d(0x219)]) return;
    const _0x2fd7d4 = Number["isFinite"](Number(_0x4dd40b[_0x52465d(0x43f)]));
    if (_0x2fd7d4) return;
    boostBaselineBackfillIds[_0x52465d(0x767)](_0x4dd40b["id"]);
    const _0x1a7884 = {
      boostActivationBaseline: getRewardMetric(_0x4dd40b, _0x52465d(0x611)),
      boostClickBaseline: getRewardMetric(_0x4dd40b, "clicks"),
      boostValidationBaseline: getRewardMetric(_0x4dd40b, _0x52465d(0x34b)),
      updatedAt: serverTimestamp(),
    };
    (Object["assign"](_0x4dd40b, _0x1a7884),
      updateDoc(doc(db, collections["rewards"], _0x4dd40b["id"]), _0x1a7884)[
        _0x52465d(0x425)
      ]((_0x4b9902) => {
        const _0x37e7b7 = _0x52465d;
        (boostBaselineBackfillIds[_0x37e7b7(0x3cd)](_0x4dd40b["id"]),
          console[_0x37e7b7(0x4fb)](_0x37e7b7(0x239), _0x4b9902));
      }));
  });
}
function getPlacementFee(_0x3bffa7) {
  return pricing[_0x3bffa7["placement"]] || 0x0;
}
function isFreePlan() {
  const _0x39a4b9 = _0x562b0b,
    _0x1f75a5 = getCurrentBillingPlan();
  return !_0x1f75a5 || _0x1f75a5["id"] === _0x39a4b9(0x571);
}
function getCurrentRewardLimit() {
  const _0x47434b = _0x562b0b,
    _0x697bb7 = getCurrentBillingPlan(),
    _0x2dfb3a = Number(_0x697bb7?.[_0x47434b(0x2d6)]);
  return Number["isFinite"](_0x2dfb3a) && _0x2dfb3a > 0x0
    ? _0x2dfb3a
    : PLAN_BY_ID[_0x47434b(0x571)][_0x47434b(0x2d6)];
}
function getActiveRewards() {
  const _0x481b6e = _0x562b0b;
  return rewardRecords[_0x481b6e(0x274)](
    (_0x527950) => (_0x527950["status"] || _0x481b6e(0x3e0)) === "active",
  );
}
async function enforceRewardLimitForCurrentPlan() {
  const _0x8ee97c = _0x562b0b;
  if (!currentPartner) return;
  const _0x451bdd = getCurrentRewardLimit(),
    _0x54064c = getActiveRewards();
  if (_0x54064c["length"] <= _0x451bdd) return;
  const _0x161ac1 = [..._0x54064c]["sort"]((_0x5bc920, _0x2faf5d) => {
      const _0x585e60 = _0x2558,
        _0x37b737 =
          _0x5bc920[_0x585e60(0x5cc)]?.["toMillis"]?.() ??
          _0x5bc920[_0x585e60(0x697)]?.[_0x585e60(0x478)]?.() ??
          0x0,
        _0x437af0 =
          _0x2faf5d["updatedAt"]?.[_0x585e60(0x478)]?.() ??
          _0x2faf5d[_0x585e60(0x697)]?.["toMillis"]?.() ??
          0x0;
      return _0x437af0 - _0x37b737;
    }),
    _0x377aaf = _0x161ac1[_0x8ee97c(0x605)](
      0x0,
      _0x54064c[_0x8ee97c(0x400)] - _0x451bdd,
    );
  try {
    await Promise["all"](
      _0x377aaf[_0x8ee97c(0x21b)]((_0x177acc) =>
        updateDoc(doc(db, collections[_0x8ee97c(0x4a4)], _0x177acc["id"]), {
          status: _0x8ee97c(0x58a),
          autoPausedByPlanLimit: !![],
          updatedAt: serverTimestamp(),
        }),
      ),
    );
  } catch (_0x2d6dab) {
    console[_0x8ee97c(0x4fb)](_0x8ee97c(0x677), _0x2d6dab);
  }
}
function getOutstandingBoostRewards() {
  return rewardRecords["filter"]((_0x2eb0c2) => {
    const _0xce1955 = _0x2558,
      _0x530209 = Number(_0x2eb0c2[_0xce1955(0x6c9)] || 0x0);
    if (_0x530209 <= 0x0) return ![];
    const _0x15d4d2 = Number(_0x2eb0c2[_0xce1955(0x388)] || 0x0),
      _0xb8a914 = _0x15d4d2 > Date[_0xce1955(0x68e)](),
      _0x22f1e8 = _0x2eb0c2[_0xce1955(0x456)] || _0xce1955(0x264),
      _0x137fa3 = _0x2eb0c2[_0xce1955(0x4f5)] === !![],
      _0x128d60 = _0x2eb0c2[_0xce1955(0x5f1)] === _0xce1955(0x713);
    return (
      _0x22f1e8 === _0xce1955(0x264) &&
      !_0x137fa3 &&
      (_0x15d4d2 > 0x0 || _0x128d60)
    );
  });
}
function calculateBilling() {
  const _0x3ae23a = _0x562b0b,
    _0x33933e = rewardRecords[_0x3ae23a(0x274)](
      (_0x24aec7) =>
        (_0x24aec7[_0x3ae23a(0x428)] || _0x3ae23a(0x3e0)) === _0x3ae23a(0x3e0),
    ),
    _0x4ce2cd = _0x33933e[_0x3ae23a(0x2ac)](
      (_0x3dfc31, _0x41a53e) => _0x3dfc31 + getPlacementFee(_0x41a53e),
      0x0,
    ),
    _0xd4d6c5 = new Date(
      new Date()[_0x3ae23a(0x315)](),
      new Date()[_0x3ae23a(0x35f)](),
      0x1,
    )[_0x3ae23a(0x2e9)]();
  let _0x1d02df = 0x0,
    _0x4ecb15 = 0x0,
    _0x2f74ca = 0x0,
    _0x3c0a05 = 0x0,
    _0x2f5c3b = 0x0;
  rewardRecords["forEach"]((_0x494167) => {
    const _0x12a9d4 = _0x3ae23a,
      _0x94bc05 = Number(_0x494167["boostPriceKr"] || 0x0);
    if (_0x94bc05 <= 0x0) return;
    const _0x53ffe5 =
        _0x494167[_0x12a9d4(0x219)]?.["toMillis"]?.() ??
        _0x494167[_0x12a9d4(0x219)]?.[_0x12a9d4(0x515)] * 0x3e8 ??
        0x0,
      _0x59e9f4 = Number(_0x494167[_0x12a9d4(0x388)] || 0x0),
      _0x229b94 = _0x53ffe5 >= _0xd4d6c5,
      _0xc0ad43 = _0x59e9f4 > Date["now"](),
      _0x251062 = _0x494167["boostBilledVia"] || _0x12a9d4(0x264),
      _0x1b7fac = _0x494167[_0x12a9d4(0x4f5)] === !![],
      _0x381f5 = _0x251062 === _0x12a9d4(0x264) && !_0xc0ad43 && !_0x1b7fac;
    if (!_0x229b94 && !_0xc0ad43 && !_0x381f5) return;
    _0x1d02df += _0x94bc05;
    if (_0xc0ad43) _0x2f5c3b += 0x1;
    if (_0x251062 === _0x12a9d4(0x6d5) && !_0x1b7fac) _0x3c0a05 += _0x94bc05;
    else {
      if (_0x251062 === "one_off" && !_0x1b7fac && !_0xc0ad43)
        _0x4ecb15 += _0x94bc05;
      else
        _0x251062 === _0x12a9d4(0x264) &&
          !_0x1b7fac &&
          _0xc0ad43 &&
          (_0x2f74ca += _0x94bc05);
    }
  });
  const _0x494b91 = _0x33933e[_0x3ae23a(0x2ac)](
      (_0x3c860c, _0x38ade3) =>
        _0x3c860c + getRewardMetric(_0x38ade3, "activations"),
      0x0,
    ),
    _0x4c32b5 = _0x33933e[_0x3ae23a(0x2ac)](
      (_0xf05916, _0x31dba6) =>
        _0xf05916 + getRewardMetric(_0x31dba6, _0x3ae23a(0x34b)),
      0x0,
    ),
    _0x37dd01 =
      _0x494b91 * pricing[_0x3ae23a(0x313)] +
      _0x4c32b5 * pricing[_0x3ae23a(0x499)];
  return {
    access: pricing[_0x3ae23a(0x646)],
    placement: _0x4ce2cd,
    boostSpend: _0x1d02df,
    boostSpendDue: _0x4ecb15,
    boostSpendPending: _0x2f74ca,
    boostSpendQueued: _0x3c0a05,
    activeBoostCount: _0x2f5c3b,
    performance: _0x37dd01,
    total: pricing[_0x3ae23a(0x646)] + _0x4ce2cd + _0x1d02df + _0x37dd01,
    activations: _0x494b91,
    validations: _0x4c32b5,
  };
}
function getHighestStationTier() {
  const _0x643d2b = _0x562b0b;
  return stationRecords[_0x643d2b(0x2ac)]((_0x3e0ce3, _0x2efb31) => {
    const _0x4934e5 = _0x643d2b,
      _0x4934be = getStationTier(_0x2efb31);
    return _0x4934be[_0x4934e5(0x491)] > _0x3e0ce3[_0x4934e5(0x491)]
      ? _0x4934be
      : _0x3e0ce3;
  }, TIER_BY_ID[_0x643d2b(0x61c)]);
}
function hasLiveStripeSubscription(_0x43fb15) {
  const _0x4ad0ad = _0x562b0b;
  return [
    _0x4ad0ad(0x3e0),
    _0x4ad0ad(0x217),
    _0x4ad0ad(0x367),
    _0x4ad0ad(0x673),
  ]["includes"](String(_0x43fb15?.[_0x4ad0ad(0x428)] || ""));
}
function getCurrentBillingPlan() {
  const _0x338b53 = _0x562b0b,
    _0x57bb52 = hasLiveStripeSubscription(
      partnerBillingStatus[_0x338b53(0x436)],
    )
      ? String(partnerBillingStatus[_0x338b53(0x436)]["planId"] || "")[
          _0x338b53(0x374)
        ]()
      : "";
  if (PLAN_BY_ID[_0x57bb52]) return PLAN_BY_ID[_0x57bb52];
  const _0x43f38f = String(
    currentPartner?.[_0x338b53(0x49d)] ||
      currentPartner?.["billingPlan"] ||
      currentPartner?.[_0x338b53(0x576)] ||
      "",
  )["toLowerCase"]();
  if (PLAN_BY_ID[_0x43f38f]) return PLAN_BY_ID[_0x43f38f];
  const _0x5ae505 = normalizeTierId(
    currentPartner?.[_0x338b53(0x634)] ||
      currentPartner?.["tier"] ||
      getHighestStationTier()["id"],
  );
  return PLAN_BY_TIER_ID[_0x5ae505] || PLAN_BY_ID[_0x338b53(0x571)];
}
function _0x2558(_0x145499, _0x3d9fb9) {
  _0x145499 = _0x145499 - 0x1f2;
  const _0x2b31ca = _0x2b31();
  let _0x25586e = _0x2b31ca[_0x145499];
  return _0x25586e;
}
function getBillingStatusCopy(_0x3dc70c) {
  const _0x5706f1 = _0x562b0b;
  if (
    !partnerBillingStatus[_0x5706f1(0x48d)] &&
    partnerBillingStatus[_0x5706f1(0x730)]
  )
    return _0x5706f1(0x587);
  if (partnerBillingStatus[_0x5706f1(0x222)])
    return partnerBillingStatus[_0x5706f1(0x222)];
  if (!_0x3dc70c)
    return "No\x20active\x20Stripe\x20subscription\x20yet.\x20Choose\x20a\x20paid\x20plan\x20to\x20add\x20a\x20card\x20and\x20start\x20billing.";
  const _0x191fbe = PLAN_BY_ID[_0x3dc70c["planId"]] || {
      name: _0x3dc70c[_0x5706f1(0x670)] || _0x5706f1(0x6f5),
      price: Math["round"](Number(_0x3dc70c[_0x5706f1(0x532)] || 0x0) / 0x64),
    },
    _0x47140e = String(_0x3dc70c[_0x5706f1(0x428)] || _0x5706f1(0x3e0))[
      "replace"
    ](/_/g, "\x20"),
    _0x4399a0 = _0x3dc70c[_0x5706f1(0x77f)]
      ? new Date(_0x3dc70c[_0x5706f1(0x77f)])[_0x5706f1(0x7ac)](
          _0x5706f1(0x28d),
        )
      : "";
  if (_0x3dc70c[_0x5706f1(0x62e)])
    return (
      _0x191fbe[_0x5706f1(0x410)] +
      _0x5706f1(0x624) +
      (_0x4399a0 || _0x5706f1(0x621)) +
      _0x5706f1(0x349)
    );
  const _0x1c80e8 = _0x4399a0 ? _0x5706f1(0x32c) + _0x4399a0 : "";
  return _0x191fbe[_0x5706f1(0x410)] + _0x5706f1(0x3b5) + _0x47140e + _0x1c80e8;
}
function getInvoiceSearchText(_0x5cce18) {
  const _0x5aff14 = _0x562b0b,
    _0x43cbdc = Array[_0x5aff14(0x417)](_0x5cce18?.[_0x5aff14(0x5b7)])
      ? _0x5cce18["lines"]
          [_0x5aff14(0x21b)]((_0x3dc179) => _0x3dc179[_0x5aff14(0x678)] || "")
          [_0x5aff14(0x376)]("\x20")
      : "";
  return [
    _0x5cce18?.["number"],
    _0x5cce18?.["description"],
    _0x5cce18?.[_0x5aff14(0x30a)],
    _0x5cce18?.[_0x5aff14(0x31c)],
    formatInvoiceAmount(_0x5cce18),
    formatInvoiceDate(_0x5cce18?.[_0x5aff14(0x356)]),
    _0x43cbdc,
  ]
    [_0x5aff14(0x376)]("\x20")
    [_0x5aff14(0x374)]();
}
function renderInvoiceHistory() {
  const _0x4d8cfc = _0x562b0b,
    _0x4ab5c0 = $(_0x4d8cfc(0x792)),
    _0x3df96e = $(_0x4d8cfc(0x5a0)),
    _0x6bcc0f = $(_0x4d8cfc(0x3e6));
  if (!_0x4ab5c0) return;
  const _0x499846 = Array[_0x4d8cfc(0x417)](partnerInvoiceHistory["invoices"])
      ? partnerInvoiceHistory[_0x4d8cfc(0x664)]
      : [],
    _0x53c7ea = String(partnerInvoiceHistory[_0x4d8cfc(0x78d)] || "")
      ["trim"]()
      [_0x4d8cfc(0x374)](),
    _0x58f3b1 = _0x53c7ea
      ? _0x499846[_0x4d8cfc(0x274)]((_0x4ab09f) =>
          getInvoiceSearchText(_0x4ab09f)[_0x4d8cfc(0x46c)](_0x53c7ea),
        )
      : _0x499846;
  _0x3df96e &&
    (_0x3df96e[_0x4d8cfc(0x23a)] = partnerInvoiceHistory[_0x4d8cfc(0x730)]
      ? _0x4d8cfc(0x310)
      : _0x58f3b1[_0x4d8cfc(0x400)] +
        _0x4d8cfc(0x513) +
        (_0x58f3b1[_0x4d8cfc(0x400)] === 0x1 ? "" : "s"));
  _0x6bcc0f &&
    _0x6bcc0f[_0x4d8cfc(0x270)] !== partnerInvoiceHistory[_0x4d8cfc(0x78d)] &&
    (_0x6bcc0f["value"] = partnerInvoiceHistory[_0x4d8cfc(0x78d)]);
  if (
    partnerInvoiceHistory[_0x4d8cfc(0x730)] &&
    !partnerInvoiceHistory[_0x4d8cfc(0x48d)]
  ) {
    _0x4ab5c0[_0x4d8cfc(0x1f2)] =
      "<div\x20class=\x22invoice-history-empty\x22>Loading\x20Stripe\x20invoices…</div>";
    return;
  }
  if (partnerInvoiceHistory[_0x4d8cfc(0x222)]) {
    _0x4ab5c0["innerHTML"] =
      "<div\x20class=\x22invoice-history-empty\x20billing-error\x22>" +
      escapeHtml(partnerInvoiceHistory[_0x4d8cfc(0x222)]) +
      "</div>";
    return;
  }
  if (!partnerInvoiceHistory[_0x4d8cfc(0x290)]) {
    _0x4ab5c0["innerHTML"] =
      "<div\x20class=\x22invoice-history-empty\x22>No\x20Stripe\x20customer\x20yet.\x20Start\x20a\x20plan\x20or\x20add\x20a\x20card\x20to\x20create\x20invoice\x20history.</div>";
    return;
  }
  if (!_0x58f3b1[_0x4d8cfc(0x400)]) {
    _0x4ab5c0[_0x4d8cfc(0x1f2)] =
      _0x4d8cfc(0x426) +
      (_0x53c7ea
        ? "No\x20invoices\x20match\x20that\x20search."
        : "No\x20Stripe\x20invoices\x20yet.") +
      _0x4d8cfc(0x311);
    return;
  }
  _0x4ab5c0["innerHTML"] = _0x58f3b1["map"]((_0x39e3d0) => {
    const _0x43cb5e = _0x4d8cfc,
      _0x563e83 = getInvoiceStatusTone(_0x39e3d0),
      _0x348f39 =
        _0x43cb5e(0x379) +
        escapeHtml(formatInvoiceDate(_0x39e3d0["dateMs"])) +
        _0x43cb5e(0x65f) +
        escapeHtml(formatInvoiceAmount(_0x39e3d0)) +
        _0x43cb5e(0x61b) +
        _0x563e83 +
        "\x22>" +
        escapeHtml(
          _0x39e3d0[_0x43cb5e(0x30a)] ||
            _0x39e3d0[_0x43cb5e(0x428)] ||
            _0x43cb5e(0x1f7),
        ) +
        _0x43cb5e(0x759) +
        escapeHtml(_0x39e3d0["description"] || _0x43cb5e(0x2ad)) +
        "\x22>" +
        escapeHtml(_0x39e3d0[_0x43cb5e(0x678)] || _0x43cb5e(0x2ad)) +
        "</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22invoice-open-link\x22>" +
        (_0x39e3d0[_0x43cb5e(0x384)] ? _0x43cb5e(0x335) : "") +
        _0x43cb5e(0x3c0);
    return _0x39e3d0[_0x43cb5e(0x384)]
      ? _0x43cb5e(0x7b3) +
          escapeHtml(_0x39e3d0["hostedInvoiceUrl"]) +
          _0x43cb5e(0x362) +
          _0x348f39 +
          _0x43cb5e(0x4e5)
      : _0x43cb5e(0x459) + _0x348f39 + _0x43cb5e(0x29e);
  })[_0x4d8cfc(0x376)]("");
}
function openInvoiceHistoryModal() {
  const _0x5cea6e = _0x562b0b,
    _0x49416c = $("invoiceHistoryModal");
  if (!_0x49416c) return;
  ((partnerInvoiceHistory = { ...partnerInvoiceHistory, query: "" }),
    _0x49416c[_0x5cea6e(0x5a3)][_0x5cea6e(0x767)]("open"),
    _0x49416c["setAttribute"](_0x5cea6e(0x4ff), "false"),
    document[_0x5cea6e(0x674)]["classList"][_0x5cea6e(0x767)](_0x5cea6e(0x3db)),
    renderInvoiceHistory(),
    window["requestAnimationFrame"](() =>
      $(_0x5cea6e(0x3e6))?.[_0x5cea6e(0x453)](),
    ),
    loadPartnerInvoiceHistory({ force: !![] }));
}
function closeInvoiceHistoryModal() {
  const _0x20a117 = _0x562b0b,
    _0x38e54a = $(_0x20a117(0x567));
  if (!_0x38e54a) return;
  (_0x38e54a[_0x20a117(0x5a3)][_0x20a117(0x626)](_0x20a117(0x382)),
    _0x38e54a[_0x20a117(0x295)]("aria-hidden", _0x20a117(0x2a5)),
    document[_0x20a117(0x674)][_0x20a117(0x5a3)][_0x20a117(0x626)](
      "modal-open",
    ));
}
async function loadPartnerInvoiceHistory({ force: force = ![] } = {}) {
  const _0x31fe46 = _0x562b0b;
  if (!currentPartner || partnerInvoiceHistory[_0x31fe46(0x730)]) return;
  if (partnerInvoiceHistory["loaded"] && !force) {
    renderInvoiceHistory();
    return;
  }
  ((partnerInvoiceHistory = {
    ...partnerInvoiceHistory,
    loading: !![],
    error: "",
  }),
    renderInvoiceHistory());
  try {
    const _0x44bfd9 = httpsCallable(
        cloudFunctions,
        "getPartnerPortalInvoiceHistory",
      ),
      _0x5be64d = await _0x44bfd9({ limit: 0x32 });
    partnerInvoiceHistory = {
      loaded: !![],
      loading: ![],
      error: "",
      invoices: Array[_0x31fe46(0x417)](_0x5be64d?.["data"]?.[_0x31fe46(0x664)])
        ? _0x5be64d[_0x31fe46(0x787)]["invoices"]
        : [],
      query: partnerInvoiceHistory["query"],
      hasCustomer: Boolean(_0x5be64d?.[_0x31fe46(0x787)]?.["hasCustomer"]),
    };
  } catch (_0x82283d) {
    partnerInvoiceHistory = {
      ...partnerInvoiceHistory,
      loaded: !![],
      loading: ![],
      error: getReadableCallableError(_0x82283d, _0x31fe46(0x59c)),
    };
  }
  renderInvoiceHistory();
}
function renderBillingAccount() {
  const _0xd1de05 = _0x562b0b,
    _0x129297 = $("billingStatusText"),
    _0x2a284b = $(_0xd1de05(0x73b));
  if (!_0x129297 || !_0x2a284b) return;
  const _0x37cf49 = partnerBillingStatus["subscription"];
  (syncBillingCardButton(),
    syncCancelSubscriptionButton(),
    (_0x129297[_0xd1de05(0x23a)] = getBillingStatusCopy(_0x37cf49)),
    _0x129297[_0xd1de05(0x5a3)]["toggle"](
      _0xd1de05(0x201),
      Boolean(partnerBillingStatus["error"]),
    ));
  if (
    partnerBillingStatus[_0xd1de05(0x730)] &&
    !partnerBillingStatus[_0xd1de05(0x48d)]
  ) {
    _0x2a284b[_0xd1de05(0x1f2)] = _0xd1de05(0x30e);
    return;
  }
  if (partnerBillingStatus["error"]) {
    _0x2a284b[_0xd1de05(0x1f2)] = _0xd1de05(0x3f7);
    return;
  }
  const _0x202219 = partnerBillingStatus[_0xd1de05(0x7c2)] || [];
  if (!_0x202219[_0xd1de05(0x400)]) {
    _0x2a284b["innerHTML"] = _0xd1de05(0x49b);
    return;
  }
  _0x2a284b[_0xd1de05(0x1f2)] = _0x202219[_0xd1de05(0x21b)]((_0x2eb0bd) => {
    const _0x23f3ae = _0xd1de05,
      _0x4f7d7c = String(_0x2eb0bd["brand"] || _0x23f3ae(0x649))[
        _0x23f3ae(0x541)
      ](),
      _0x52b2fb =
        _0x2eb0bd[_0x23f3ae(0x488)] && _0x2eb0bd[_0x23f3ae(0x3f9)]
          ? String(_0x2eb0bd[_0x23f3ae(0x488)])[_0x23f3ae(0x4af)](0x2, "0") +
            "/" +
            String(_0x2eb0bd[_0x23f3ae(0x3f9)])["slice"](-0x2)
          : _0x23f3ae(0x337);
    return (
      _0x23f3ae(0x739) +
      escapeHtml(_0x4f7d7c[_0x23f3ae(0x605)](0x0, 0x4)) +
      "</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<strong>" +
      escapeHtml(_0x4f7d7c) +
      _0x23f3ae(0x243) +
      escapeHtml(_0x2eb0bd[_0x23f3ae(0x715)] || _0x23f3ae(0x50a)) +
      _0x23f3ae(0x469) +
      escapeHtml(_0x52b2fb) +
      _0x23f3ae(0x761) +
      (_0x2eb0bd[_0x23f3ae(0x4d0)]
        ? "<span\x20class=\x22payment-card-default\x22>Default</span>"
        : "") +
      "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</article>\x0a\x20\x20\x20\x20\x20\x20\x20\x20"
    );
  })[_0xd1de05(0x376)]("");
}
function applyBillingStatusToPartner(_0x44aa21) {
  const _0x34d39b = _0x562b0b,
    _0x498b2a = _0x44aa21?.["subscription"];
  if (!_0x498b2a || !hasLiveStripeSubscription(_0x498b2a)) return;
  Object["assign"](currentPartner, {
    subscriptionPlan: _0x498b2a[_0x34d39b(0x62b)],
    subscriptionPlanLabel: _0x498b2a["planLabel"],
    subscriptionTier: _0x498b2a[_0x34d39b(0x455)],
    subscriptionTierLabel: _0x498b2a[_0x34d39b(0x6cd)],
    subscriptionStatus: _0x498b2a["status"],
    stripeSubscriptionId: _0x498b2a["id"],
  });
}
async function refreshPartnerBillingStatus({ silent: silent = ![] } = {}) {
  const _0x1b365d = _0x562b0b;
  if (!currentPartner || partnerBillingStatus["loading"]) return;
  if (requireHttpOrigin("checking\x20billing\x20status")) return;
  partnerBillingStatus = { ...partnerBillingStatus, loading: !![], error: "" };
  if (!silent) renderBillingAccount();
  try {
    const _0x3180ca = httpsCallable(cloudFunctions, _0x1b365d(0x3ac)),
      _0xd1b8c1 = await _0x3180ca({});
    ((partnerBillingStatus = {
      loaded: !![],
      loading: ![],
      error: "",
      subscription: _0xd1b8c1?.[_0x1b365d(0x787)]?.[_0x1b365d(0x436)] || null,
      cards: Array[_0x1b365d(0x417)](_0xd1b8c1?.[_0x1b365d(0x787)]?.["cards"])
        ? _0xd1b8c1["data"][_0x1b365d(0x7c2)]
        : [],
      hasCustomer: Boolean(_0xd1b8c1?.["data"]?.["hasCustomer"]),
    }),
      applyBillingStatusToPartner(partnerBillingStatus),
      renderBillingPlans(),
      renderBillingAccount(),
      await enforceRewardLimitForCurrentPlan());
  } catch (_0x5aa6de) {
    ((partnerBillingStatus = {
      ...partnerBillingStatus,
      loaded: !![],
      loading: ![],
      error: getReadableCallableError(
        _0x5aa6de,
        "Could\x20not\x20read\x20Stripe\x20billing\x20status.",
      ),
    }),
      renderBillingPlans(),
      renderBillingAccount());
  }
}
function renderBillingBoostPanel(_0xded8f3, _0x59744a) {
  const _0x164c66 = _0x562b0b,
    _0x185ce2 = $(_0x164c66(0x41c));
  if (!_0x185ce2) return;
  const _0x395221 = _0xded8f3[_0x164c66(0x6e4)] || 0x0,
    _0x4aa70f = _0xded8f3[_0x164c66(0x3ea)] || 0x0,
    _0x40c546 = _0xded8f3[_0x164c66(0x622)] || 0x0,
    _0x9445a6 = _0xded8f3[_0x164c66(0x477)] || 0x0,
    _0x4ca160 = _0xded8f3[_0x164c66(0x610)] || 0x0,
    _0xc1936e =
      _0x59744a?.["id"] === _0x164c66(0x571)
        ? _0x395221 + _0x4aa70f
        : _0x395221;
  (_0x185ce2["classList"][_0x164c66(0x668)](_0x164c66(0x334), _0xc1936e > 0x0),
    _0x185ce2[_0x164c66(0x5a3)][_0x164c66(0x668)](
      _0x164c66(0x36b),
      _0x395221 === 0x0 && _0x40c546 > 0x0,
    ),
    setText(_0x164c66(0x2ee), _0x4ca160),
    setText("billingBoostMonth", money(_0x9445a6)),
    setText(_0x164c66(0x5d7), money(_0xc1936e)));
  const _0x145f5c = $(_0x164c66(0x298));
  if (_0x145f5c)
    _0x145f5c[_0x164c66(0x5a3)][_0x164c66(0x668)](
      _0x164c66(0x73c),
      _0xc1936e > 0x0,
    );
  const _0x348f55 =
    _0x395221 > 0x0
      ? _0x164c66(0x20d) + money(_0x395221) + _0x164c66(0x490)
      : _0x4aa70f > 0x0 && _0x59744a?.["id"] === "free"
        ? money(_0x4aa70f) + _0x164c66(0x601)
        : _0x40c546 > 0x0 && _0x59744a?.["id"] !== _0x164c66(0x571)
          ? money(_0x40c546) +
            "\x20of\x20boosts\x20queued\x20for\x20your\x20next\x20" +
            _0x59744a[_0x164c66(0x410)] +
            _0x164c66(0x467)
          : _0x9445a6 > 0x0
            ? money(_0x9445a6) + _0x164c66(0x442)
            : _0x59744a?.["id"] === _0x164c66(0x571)
              ? "Free\x20plan:\x20each\x20boost\x20is\x20paid\x20one-off\x20after\x20it\x20expires."
              : _0x164c66(0x55c) +
                _0x59744a[_0x164c66(0x410)] +
                _0x164c66(0x70e);
  setText(_0x164c66(0x275), _0x348f55);
  const _0xdbf165 = $("payOutstandingBoostsButton");
  if (_0xdbf165)
    _0xdbf165[_0x164c66(0x752)]["display"] =
      _0xc1936e > 0x0 ? _0x164c66(0x283) : _0x164c66(0x256);
}
function renderBillingPlans(_0x2f2f4b = calculateBilling()) {
  const _0x48f97b = _0x562b0b,
    _0x2df555 = $(_0x48f97b(0x323));
  if (!_0x2df555) return;
  const _0x1cddd0 = getCurrentBillingPlan(),
    _0x3f393b =
      TIER_BY_ID[_0x1cddd0[_0x48f97b(0x2f3)]] || getHighestStationTier();
  (setText("currentPlanName", _0x1cddd0[_0x48f97b(0x410)]),
    setText(_0x48f97b(0x521), money(_0x1cddd0[_0x48f97b(0x508)])),
    setText(_0x48f97b(0x6e8), _0x1cddd0["copy"]),
    setText(
      _0x48f97b(0x452),
      _0x3f393b["name"] + "\x20·\x20" + _0x3f393b[_0x48f97b(0x77c)] + "x",
    ));
  const _0x395e36 =
    _0x1cddd0[_0x48f97b(0x508)] + (_0x2f2f4b[_0x48f97b(0x477)] || 0x0);
  (setText(_0x48f97b(0x4c1), money(_0x395e36)),
    setText(
      "billTotalCopy",
      _0x1cddd0["id"] === _0x48f97b(0x571)
        ? _0x48f97b(0x2a2) +
            money(_0x2f2f4b["boostSpend"] || 0x0) +
            "\x20boost\x20spend."
        : money(_0x1cddd0["price"]) +
            _0x48f97b(0x402) +
            money(_0x2f2f4b[_0x48f97b(0x477)] || 0x0) +
            _0x48f97b(0x486),
    ),
    renderBillingBoostPanel(_0x2f2f4b, _0x1cddd0),
    (_0x2df555[_0x48f97b(0x1f2)] = BILLING_PLANS[_0x48f97b(0x21b)](
      (_0x42b9f6) => {
        const _0x58388e = _0x48f97b,
          _0x476238 = _0x42b9f6["id"] === _0x1cddd0["id"],
          _0x1182c4 = _0x476238
            ? _0x58388e(0x33e)
            : _0x42b9f6[_0x58388e(0x508)] === 0x0
              ? "Included"
              : _0x58388e(0x6db) + _0x42b9f6["name"],
          _0x517dd1 = _0x42b9f6[_0x58388e(0x78e)]
            [
              "map"
            ]((_0x11124e) => _0x58388e(0x4a3) + escapeHtml(_0x11124e) + _0x58388e(0x3c8))
            [_0x58388e(0x376)]("");
        return (
          _0x58388e(0x2ed) +
          (_0x476238 ? "\x20is-current" : "") +
          (_0x42b9f6[_0x58388e(0x22a)] ? _0x58388e(0x780) : "") +
          "\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22plan-card-head\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<h4>" +
          escapeHtml(_0x42b9f6[_0x58388e(0x410)]) +
          _0x58388e(0x698) +
          (_0x476238
            ? "<span\x20class=\x22plan-pill\x22>Current</span>"
            : _0x42b9f6[_0x58388e(0x22a)]
              ? _0x58388e(0x6b3)
              : "") +
          _0x58388e(0x41e) +
          _0x42b9f6[_0x58388e(0x508)] +
          _0x58388e(0x6a0) +
          escapeHtml(_0x42b9f6[_0x58388e(0x735)]) +
          _0x58388e(0x4c7) +
          _0x517dd1 +
          _0x58388e(0x346) +
          (_0x476238 || _0x42b9f6[_0x58388e(0x508)] === 0x0
            ? _0x58388e(0x6cb)
            : "") +
          _0x58388e(0x3fe) +
          _0x42b9f6["id"] +
          "\x22\x20" +
          (_0x476238 || _0x42b9f6["price"] === 0x0 ? _0x58388e(0x70f) : "") +
          ">" +
          _0x1182c4 +
          "</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</article>\x0a\x20\x20\x20\x20\x20\x20\x20\x20"
        );
      },
    )["join"]("")),
    renderBillingAccount());
}
function stationBelongsToPartner(_0x507888) {
  const _0x47ce6f = _0x562b0b,
    _0x440cc6 = currentPartner?.["id"],
    _0x6b04c6 = String(currentPartner?.[_0x47ce6f(0x412)] || "")[
      _0x47ce6f(0x374)
    ](),
    _0x3a62c1 = Array[_0x47ce6f(0x417)](_0x507888[_0x47ce6f(0x544)])
      ? _0x507888[_0x47ce6f(0x544)]["map"](String)
      : [],
    _0x4a3db5 = [
      _0x507888[_0x47ce6f(0x412)],
      _0x507888[_0x47ce6f(0x5cb)],
      _0x507888[_0x47ce6f(0x579)],
      _0x507888[_0x47ce6f(0x266)],
      _0x507888["operatedFor"],
    ][_0x47ce6f(0x21b)]((_0x2ab9c7) =>
      String(_0x2ab9c7 || "")[_0x47ce6f(0x374)](),
    );
  return (
    [
      _0x507888[_0x47ce6f(0x6b7)],
      _0x507888[_0x47ce6f(0x616)],
      _0x507888[_0x47ce6f(0x3dd)],
      _0x507888[_0x47ce6f(0x757)],
      _0x507888["locationPartnerId"],
    ][_0x47ce6f(0x63c)](
      (_0x46af12) => _0x46af12 && String(_0x46af12) === _0x440cc6,
    ) ||
    _0x3a62c1[_0x47ce6f(0x46c)](_0x440cc6) ||
    (_0x6b04c6 && _0x4a3db5[_0x47ce6f(0x46c)](_0x6b04c6))
  );
}
function getPartnerOnboardingStorageKey() {
  const _0x429ad4 = _0x562b0b;
  return currentPartner
    ? _0x429ad4(0x680) + currentPartner["id"]
    : "cyclPartnerOnboardingDismissed";
}
function showPartnerOnboardingPrompt() {
  const _0x144434 = _0x562b0b,
    _0x4a0495 = $("partnerOnboardingFloat");
  if (!_0x4a0495 || !currentPartner) return;
  const _0x356ca9 =
    localStorage[_0x144434(0x3a9)](getPartnerOnboardingStorageKey()) ===
    _0x144434(0x2a5);
  _0x4a0495[_0x144434(0x752)]["display"] = _0x356ca9
    ? "none"
    : _0x144434(0x38d);
}
function dismissPartnerOnboardingPrompt() {
  const _0xa62df4 = _0x562b0b;
  currentPartner &&
    localStorage[_0xa62df4(0x5be)](
      getPartnerOnboardingStorageKey(),
      _0xa62df4(0x2a5),
    );
  const _0x5f0925 = $(_0xa62df4(0x2ef));
  if (_0x5f0925)
    _0x5f0925[_0xa62df4(0x752)][_0xa62df4(0x5b9)] = _0xa62df4(0x256);
}
const PARTNER_TOURS = {
  home: {
    type: _0x562b0b(0x762),
    scopeSelector: _0x562b0b(0x5cd),
    steps: [
      {
        selector: ".kpi-strip--bench",
        title: "Live\x20performance",
        body: _0x562b0b(0x2f8),
      },
      {
        selector: ".impact-grid",
        title: "Environmental\x20impact",
        body: _0x562b0b(0x69f),
      },
      {
        selector: _0x562b0b(0x414),
        title: _0x562b0b(0x721),
        body: _0x562b0b(0x416),
      },
    ],
  },
  rewards: {
    type: _0x562b0b(0x762),
    scopeSelector: "#section-rewards",
    steps: [
      {
        selector: _0x562b0b(0x2f6),
        title: _0x562b0b(0x319),
        body: _0x562b0b(0x795),
      },
      {
        selector: _0x562b0b(0x53f),
        title: "Your\x20rewards",
        body: "Each\x20card\x20has\x20Edit,\x20Pause/Activate,\x20and\x20Archive\x20actions.\x20Boost\x20a\x20reward\x20to\x20push\x20it\x20to\x20Sponsored\x20Popular.",
      },
    ],
  },
  stations: {
    type: "coachmark",
    scopeSelector: "#stationList\x20.station-card",
    emptyFallback: { title: _0x562b0b(0x377), body: _0x562b0b(0x45d) },
    steps: [
      {
        selector: _0x562b0b(0x3df),
        title: _0x562b0b(0x4c8),
        body: _0x562b0b(0x2bd),
      },
      {
        selector: _0x562b0b(0x6a7),
        title: _0x562b0b(0x59f),
        body: _0x562b0b(0x797),
      },
      {
        selector: "[data-station-action=\x27collect\x27]",
        title: _0x562b0b(0x41f),
        body: _0x562b0b(0x381),
      },
      {
        selector: "[data-station-action=\x27empty\x27]",
        title: _0x562b0b(0x557),
        body: "Mark\x20the\x20bag\x20as\x20emptied\x20after\x20collection.\x20Resets\x20the\x20bag\x20count\x20to\x200\x20and\x20clears\x20any\x20open\x20collection\x20request.",
      },
    ],
  },
  analytics: {
    type: "coachmark",
    scopeSelector: _0x562b0b(0x351),
    steps: [
      {
        selector: _0x562b0b(0x2c9),
        title: _0x562b0b(0x32a),
        body: "Where\x20your\x20audience\x20comes\x20from.\x20Pin\x20size\x20=\x20volume,\x20red\x20=\x20accelerating.\x20Toggle\x20the\x20radius\x20to\x20see\x20how\x20far\x20your\x20real\x20audience\x20travels.",
      },
      {
        selector: ".peer-board-card",
        title: _0x562b0b(0x604),
        body: _0x562b0b(0x474),
      },
      {
        selector: _0x562b0b(0x62d),
        title: "Performance\x20heat\x20map",
        body: _0x562b0b(0x5d1),
      },
      {
        selector: _0x562b0b(0x714),
        title: "Customer\x20loyalty",
        body: "Cohort\x20breakdown\x20of\x20one-time\x20vs.\x20returning\x20customers.\x20A\x20growing\x205+\x20visit\x20cohort\x20means\x20strong\x20habitual\x20loyalty.",
      },
    ],
  },
};
let currentTourKey = null;
const TOURS_TEST_MODE =
  new URLSearchParams(location[_0x562b0b(0x556)])[_0x562b0b(0x305)](
    _0x562b0b(0x3d0),
  ) === _0x562b0b(0x39b);
function partnerTourStorageKey(_0x298b52) {
  const _0x27b2d5 = _0x562b0b,
    _0x436de1 = currentPartner ? currentPartner["id"] : _0x27b2d5(0x3e4);
  return _0x27b2d5(0x2cc) + _0x298b52 + ":" + _0x436de1;
}
function partnerTourSkipAllKey() {
  const _0x11fda7 = _0x562b0b,
    _0x3122eb = currentPartner ? currentPartner["id"] : _0x11fda7(0x3e4);
  return _0x11fda7(0x2e5) + _0x3122eb;
}
function showPartnerTour(_0x34e0ed) {
  const _0x4e2951 = _0x562b0b;
  if (!currentPartner) return;
  const _0xc5984c = PARTNER_TOURS[_0x34e0ed];
  if (!_0xc5984c) return;
  if (!TOURS_TEST_MODE) {
    if (localStorage["getItem"](partnerTourSkipAllKey()) === _0x4e2951(0x2a5))
      return;
    if (
      localStorage[_0x4e2951(0x3a9)](partnerTourStorageKey(_0x34e0ed)) ===
      _0x4e2951(0x2a5)
    )
      return;
  }
  currentTourKey = _0x34e0ed;
  const _0x5e4ec0 = _0xc5984c[_0x4e2951(0x537)]
    ? document[_0x4e2951(0x4db)](_0xc5984c[_0x4e2951(0x537)])
    : document;
  if (!_0x5e4ec0 && _0xc5984c["emptyFallback"]) {
    startCoachmarks(
      [{ ..._0xc5984c[_0x4e2951(0x40b)], selector: null }],
      document,
    );
    return;
  }
  if (!_0x5e4ec0) return;
  startCoachmarks(_0xc5984c[_0x4e2951(0x51f)] || [], _0x5e4ec0);
}
function dismissPartnerTour({ skipAll: skipAll = ![] } = {}) {
  const _0x346573 = _0x562b0b;
  (hideCoachmark(),
    currentPartner &&
      !TOURS_TEST_MODE &&
      (currentTourKey &&
        localStorage["setItem"](
          partnerTourStorageKey(currentTourKey),
          _0x346573(0x2a5),
        ),
      skipAll &&
        localStorage[_0x346573(0x5be)](
          partnerTourSkipAllKey(),
          _0x346573(0x2a5),
        )),
    (currentTourKey = null));
}
let coachState = { steps: [], index: 0x0, scope: null, target: null };
function startCoachmarks(_0x3a45ea, _0x4ed3c9) {
  const _0x54851a = _0x562b0b;
  ((coachState = {
    steps: _0x3a45ea,
    index: 0x0,
    scope: _0x4ed3c9,
    target: null,
  }),
    $(_0x54851a(0x2e0))[_0x54851a(0x5a3)][_0x54851a(0x767)](_0x54851a(0x427)),
    $(_0x54851a(0x5b6))[_0x54851a(0x5a3)]["add"]("show"),
    window[_0x54851a(0x23d)]("resize", repositionCoachCard),
    window[_0x54851a(0x23d)](_0x54851a(0x2f4), repositionCoachCard, !![]),
    renderCoachStep());
}
function isElementVisible(_0x438fbc) {
  return !!(_0x438fbc && _0x438fbc["offsetParent"] !== null);
}
function renderCoachStep() {
  const _0x3a6f19 = _0x562b0b;
  clearCoachSpotlight();
  const _0x92a88f = coachState[_0x3a6f19(0x51f)][coachState[_0x3a6f19(0x1fe)]];
  if (!_0x92a88f) {
    hideCoachmark();
    return;
  }
  let _0xf06de6 = null;
  if (_0x92a88f[_0x3a6f19(0x736)]) {
    _0xf06de6 = coachState["scope"][_0x3a6f19(0x4db)](
      _0x92a88f[_0x3a6f19(0x736)],
    );
    if (!_0xf06de6 || !isElementVisible(_0xf06de6)) {
      ((coachState[_0x3a6f19(0x1fe)] += 0x1), renderCoachStep());
      return;
    }
  }
  ((coachState["target"] = _0xf06de6),
    _0xf06de6 &&
      (_0xf06de6[_0x3a6f19(0x5a3)][_0x3a6f19(0x767)]("tour-spotlight"),
      _0xf06de6[_0x3a6f19(0x5eb)]({
        behavior: _0x3a6f19(0x2df),
        block: _0x3a6f19(0x60b),
        inline: _0x3a6f19(0x60b),
      })),
    ($("coachProgress")[_0x3a6f19(0x23a)] =
      coachState[_0x3a6f19(0x51f)][_0x3a6f19(0x400)] > 0x1
        ? _0x3a6f19(0x353) +
          (coachState[_0x3a6f19(0x1fe)] + 0x1) +
          _0x3a6f19(0x75b) +
          coachState[_0x3a6f19(0x51f)][_0x3a6f19(0x400)]
        : ""),
    ($(_0x3a6f19(0x401))[_0x3a6f19(0x23a)] = _0x92a88f["title"]),
    ($(_0x3a6f19(0x35e))[_0x3a6f19(0x1f2)] = _0x92a88f[_0x3a6f19(0x674)]),
    ($(_0x3a6f19(0x59d))[_0x3a6f19(0x23a)] =
      coachState["index"] === coachState[_0x3a6f19(0x51f)]["length"] - 0x1
        ? _0x3a6f19(0x47f)
        : _0x3a6f19(0x565)),
    requestAnimationFrame(repositionCoachCard));
}
function repositionCoachCard() {
  const _0x4c0683 = _0x562b0b,
    _0x410b20 = coachState[_0x4c0683(0x2cd)],
    _0x14097f = $("coachCard");
  if (
    !_0x14097f ||
    !_0x14097f[_0x4c0683(0x5a3)][_0x4c0683(0x798)](_0x4c0683(0x427))
  )
    return;
  const _0x5382d3 = _0x14097f[_0x4c0683(0x6ff)](),
    _0x46d789 = 0xe;
  if (!_0x410b20) {
    const _0x2323fd = Math[_0x4c0683(0x72c)](
        _0x46d789,
        (window[_0x4c0683(0x255)] - _0x5382d3[_0x4c0683(0x271)]) / 0x2,
      ),
      _0x1a9749 = Math[_0x4c0683(0x72c)](
        _0x46d789,
        (window[_0x4c0683(0x287)] - _0x5382d3[_0x4c0683(0x7a1)]) / 0x2,
      );
    ((_0x14097f[_0x4c0683(0x752)][_0x4c0683(0x5df)] = _0x2323fd + "px"),
      (_0x14097f[_0x4c0683(0x752)][_0x4c0683(0x2fa)] = _0x1a9749 + "px"));
    return;
  }
  const _0x502f35 = _0x410b20["getBoundingClientRect"]();
  let _0x546dbf = _0x502f35["bottom"] + _0x46d789;
  _0x546dbf + _0x5382d3[_0x4c0683(0x271)] + _0x46d789 > window["innerHeight"] &&
    (_0x546dbf = Math[_0x4c0683(0x72c)](
      _0x46d789,
      _0x502f35["top"] - _0x5382d3["height"] - _0x46d789,
    ));
  let _0x319f97 =
    _0x502f35["left"] +
    _0x502f35[_0x4c0683(0x7a1)] / 0x2 -
    _0x5382d3[_0x4c0683(0x7a1)] / 0x2;
  ((_0x319f97 = Math[_0x4c0683(0x72c)](
    _0x46d789,
    Math[_0x4c0683(0x406)](
      _0x319f97,
      window[_0x4c0683(0x287)] - _0x5382d3["width"] - _0x46d789,
    ),
  )),
    (_0x14097f[_0x4c0683(0x752)]["top"] = _0x546dbf + "px"),
    (_0x14097f[_0x4c0683(0x752)][_0x4c0683(0x2fa)] = _0x319f97 + "px"));
}
function advanceCoachStep() {
  const _0x58d867 = _0x562b0b;
  coachState["index"] += 0x1;
  if (
    coachState[_0x58d867(0x1fe)] >=
    coachState[_0x58d867(0x51f)][_0x58d867(0x400)]
  ) {
    hideCoachmark();
    currentPartner &&
      !TOURS_TEST_MODE &&
      currentTourKey &&
      localStorage["setItem"](
        partnerTourStorageKey(currentTourKey),
        _0x58d867(0x2a5),
      );
    currentTourKey = null;
    return;
  }
  renderCoachStep();
}
function hideCoachmark() {
  const _0x7428 = _0x562b0b;
  (clearCoachSpotlight(),
    $(_0x7428(0x2e0))[_0x7428(0x5a3)]["remove"]("show"),
    $(_0x7428(0x5b6))["classList"]["remove"](_0x7428(0x427)),
    (coachState = { steps: [], index: 0x0, scope: null, target: null }),
    window["removeEventListener"]("resize", repositionCoachCard),
    window["removeEventListener"](_0x7428(0x2f4), repositionCoachCard, !![]));
}
function clearCoachSpotlight() {
  const _0x31d63d = _0x562b0b;
  document[_0x31d63d(0x3b9)](_0x31d63d(0x1fa))[_0x31d63d(0x49f)]((_0x395a78) =>
    _0x395a78[_0x31d63d(0x5a3)][_0x31d63d(0x626)](_0x31d63d(0x539)),
  );
}
((window[_0x562b0b(0x2b0)] = function () {
  const _0x1b96c5 = _0x562b0b,
    _0x6a9193 = currentPartner ? currentPartner["id"] : _0x1b96c5(0x3e4);
  (Object["keys"](PARTNER_TOURS)[_0x1b96c5(0x49f)]((_0x7c0771) => {
    const _0x1f29f2 = _0x1b96c5;
    localStorage[_0x1f29f2(0x3d5)](
      _0x1f29f2(0x2cc) + _0x7c0771 + ":" + _0x6a9193,
    );
  }),
    localStorage[_0x1b96c5(0x3d5)](_0x1b96c5(0x2e5) + _0x6a9193),
    console[_0x1b96c5(0x481)](_0x1b96c5(0x545), _0x6a9193));
}),
  (window[_0x562b0b(0x7ad)] = function (_0x56d872) {
    const _0x29eb4f = _0x562b0b;
    (console[_0x29eb4f(0x481)](
      _0x29eb4f(0x629),
      _0x56d872,
      "currentPartner:",
      currentPartner?.["id"],
    ),
      showPartnerTour(_0x56d872));
  }));
async function loadPartner(_0x15bbbf) {
  const _0x3e9ca7 = _0x562b0b;
  try {
    const _0x5b5d79 = await getPartnerProfileSnapshot(
      _0x15bbbf[_0x3e9ca7(0x4ef)],
    );
    if (!_0x5b5d79[_0x3e9ca7(0x448)]()) {
      (await signOut(auth), showMessage(_0x3e9ca7(0x2c6), "error"));
      return;
    }
    currentPartner = {
      id: _0x15bbbf[_0x3e9ca7(0x4ef)],
      ..._0x5b5d79[_0x3e9ca7(0x787)](),
    };
  } catch (_0x5ed5fe) {
    (stopLiveData(),
      (currentPartner = null),
      ($("authLayout")[_0x3e9ca7(0x752)][_0x3e9ca7(0x5b9)] = _0x3e9ca7(0x5e3)),
      ($(_0x3e9ca7(0x230))[_0x3e9ca7(0x752)]["display"] = _0x3e9ca7(0x256)),
      ($(_0x3e9ca7(0x3c4))[_0x3e9ca7(0x752)][_0x3e9ca7(0x5b9)] =
        _0x3e9ca7(0x256)),
      ($(_0x3e9ca7(0x2f7))[_0x3e9ca7(0x752)][_0x3e9ca7(0x5b9)] =
        _0x3e9ca7(0x373)),
      showMessage(
        getReadableFirebaseError(_0x5ed5fe, _0x3e9ca7(0x527)),
        _0x3e9ca7(0x222),
      ),
      resolveAuthBoot());
    return;
  }
  (($(_0x3e9ca7(0x4ca))["className"] = _0x3e9ca7(0x52c)),
    ($(_0x3e9ca7(0x409))[_0x3e9ca7(0x752)][_0x3e9ca7(0x5b9)] =
      _0x3e9ca7(0x256)),
    ($(_0x3e9ca7(0x3c4))[_0x3e9ca7(0x752)][_0x3e9ca7(0x5b9)] = "none"),
    ($(_0x3e9ca7(0x230))[_0x3e9ca7(0x752)][_0x3e9ca7(0x5b9)] =
      _0x3e9ca7(0x5e3)),
    ($(_0x3e9ca7(0x2f7))[_0x3e9ca7(0x752)][_0x3e9ca7(0x5b9)] =
      _0x3e9ca7(0x373)),
    setText(
      _0x3e9ca7(0x5cb),
      currentPartner["companyName"] || _0x3e9ca7(0x3be),
    ),
    setText(
      "topbarPartnerName",
      currentPartner[_0x3e9ca7(0x412)] || _0x3e9ca7(0x3be),
    ));
  const _0x1e5074 =
      currentPartner["businessSubcategory"] ||
      currentPartner[_0x3e9ca7(0x468)] ||
      _0x3e9ca7(0x7ba),
    _0x5a4814 =
      currentPartner[_0x3e9ca7(0x506)] ||
      CATEGORY_BY_ID[currentPartner["businessCategory"]]?.[_0x3e9ca7(0x410)] ||
      "",
    _0x239ab2 =
      _0x5a4814 && _0x1e5074 && _0x5a4814 !== _0x1e5074
        ? _0x5a4814 + _0x3e9ca7(0x2fc) + _0x1e5074
        : _0x1e5074 || _0x5a4814 || _0x3e9ca7(0x7ba);
  (setText(
    _0x3e9ca7(0x27e),
    getCountryName(currentPartner[_0x3e9ca7(0x599)]) +
      _0x3e9ca7(0x2fc) +
      _0x239ab2,
  ),
    renderProfileForm(),
    startLiveData(),
    refreshPartnerBillingStatus({ silent: !![] }),
    showPartnerOnboardingPrompt());
  const _0x3c2270 = document["querySelector"](_0x3e9ca7(0x3e1))?.["id"]?.[
    _0x3e9ca7(0x5d5)
  ](/^section-/, "");
  (_0x3c2270 && PARTNER_TOURS[_0x3c2270] && showPartnerTour(_0x3c2270),
    resolveAuthBoot());
}
function renderProfileForm() {
  const _0x655ca1 = _0x562b0b;
  if (!currentPartner) return;
  const _0xdbbc8f = (_0x4fd1bf, _0x55f518) => {
    const _0x26c90c = $(_0x4fd1bf);
    if (_0x26c90c) _0x26c90c["value"] = _0x55f518 ?? "";
  };
  (_0xdbbc8f(_0x655ca1(0x307), currentPartner[_0x655ca1(0x412)]),
    _0xdbbc8f("profileEmail", currentPartner[_0x655ca1(0x22d)]),
    _0xdbbc8f(_0x655ca1(0x540), currentPartner[_0x655ca1(0x254)]),
    _0xdbbc8f("profileLastName", currentPartner[_0x655ca1(0x2d2)]),
    _0xdbbc8f(_0x655ca1(0x4d2), currentPartner[_0x655ca1(0x517)]),
    _0xdbbc8f("profileWebsite", currentPartner[_0x655ca1(0x6ac)]),
    _0xdbbc8f(_0x655ca1(0x46e), currentPartner["city"]),
    _0xdbbc8f(_0x655ca1(0x505), currentPartner[_0x655ca1(0x291)]),
    _0xdbbc8f(_0x655ca1(0x3c2), currentPartner[_0x655ca1(0x69b)] ?? ""),
    _0xdbbc8f("profileAddressLng", currentPartner[_0x655ca1(0x760)] ?? ""),
    _0xdbbc8f(_0x655ca1(0x454), currentPartner[_0x655ca1(0x2e3)]));
  const _0x2c2e16 = $(_0x655ca1(0x363));
  if (_0x2c2e16)
    _0x2c2e16[_0x655ca1(0x270)] = currentPartner["countryCode"] || "DK";
  const _0x1e39db =
    currentPartner["businessCategory"] ||
    BUSINESS_CATEGORIES[_0x655ca1(0x40f)](
      (_0x21165a) =>
        _0x21165a[_0x655ca1(0x410)] === currentPartner[_0x655ca1(0x468)],
    )?.["id"] ||
    _0x655ca1(0x732);
  (populateBusinessCategorySelect($(_0x655ca1(0x4c0)), _0x1e39db),
    populateBusinessSubcategorySelect(
      $(_0x655ca1(0x3f0)),
      _0x1e39db,
      currentPartner[_0x655ca1(0x2fb)] || currentPartner[_0x655ca1(0x468)],
    ));
  const _0x360f9b = $("profileMetaPill");
  if (_0x360f9b)
    _0x360f9b["textContent"] = (currentPartner[_0x655ca1(0x428)] ||
      _0x655ca1(0x3e0))[_0x655ca1(0x541)]();
}
async function refreshData() {
  const _0x568b9e = _0x562b0b;
  if (!currentPartner) return;
  const _0x4c5560 = query(
      collection(db, collections["rewards"]),
      where(_0x568b9e(0x6b7), "==", currentPartner["id"]),
    ),
    _0x3a6820 = query(
      collection(db, collections[_0x568b9e(0x44b)]),
      where("partnerId", "==", currentPartner["id"]),
    ),
    [_0x6644b1, _0x23f63f, _0x53ca39] = await Promise[_0x568b9e(0x47b)]([
      getDocs(_0x4c5560),
      getDocs(collection(db, collections[_0x568b9e(0x5c7)])),
      getDocs(_0x3a6820),
    ]);
  ((rewardRecords = _0x6644b1[_0x568b9e(0x328)][_0x568b9e(0x21b)](
    (_0xe06856) => ({ id: _0xe06856["id"], ..._0xe06856["data"]() }),
  )),
    (stationRecords = _0x23f63f[_0x568b9e(0x328)]
      [
        "map"
      ]((_0x47e462) => ({ id: _0x47e462["id"], ..._0x47e462[_0x568b9e(0x787)]() }))
      [_0x568b9e(0x274)](stationBelongsToPartner)),
    (collectionRequestRecords = _0x53ca39[_0x568b9e(0x328)][_0x568b9e(0x21b)](
      (_0x4e476c) => ({
        id: _0x4e476c["id"],
        ..._0x4e476c[_0x568b9e(0x787)](),
      }),
    )),
    renderDashboard());
  if (analyticsHasRendered) renderAnalytics();
}
function renderDashboard() {
  const _0x1dfce5 = _0x562b0b,
    _0x15ae70 = rewardRecords[_0x1dfce5(0x274)](
      (_0x1088a4) =>
        (_0x1088a4[_0x1dfce5(0x428)] || _0x1dfce5(0x3e0)) === _0x1dfce5(0x3e0),
    ),
    _0x1f21a9 = _0x15ae70[_0x1dfce5(0x274)](isSponsoredReward),
    _0x3924f7 = rewardRecords[_0x1dfce5(0x2ac)](
      (_0x507b7b, _0x1ee001) =>
        _0x507b7b + getRewardMetric(_0x1ee001, _0x1dfce5(0x2e7)),
      0x0,
    ),
    _0x194bff = rewardRecords[_0x1dfce5(0x2ac)](
      (_0x540c2c, _0x193ae7) =>
        _0x540c2c + getRewardMetric(_0x193ae7, _0x1dfce5(0x611)),
      0x0,
    ),
    _0x259c4a = rewardRecords["reduce"](
      (_0xcbd964, _0x2ca505) =>
        _0xcbd964 + getRewardMetric(_0x2ca505, _0x1dfce5(0x34b)),
      0x0,
    ),
    _0x35a885 = _0x3924f7
      ? Math[_0x1dfce5(0x369)]((_0x194bff / _0x3924f7) * 0x64)
      : 0x0,
    _0x3cf5d1 = stationRecords[_0x1dfce5(0x274)](
      (_0x16ed7a) =>
        Number(_0x16ed7a[_0x1dfce5(0x630)] || 0x0) > 0x0 &&
        Number(_0x16ed7a[_0x1dfce5(0x561)] || 0x0) >=
          Number(_0x16ed7a[_0x1dfce5(0x630)] || 0x0),
    )[_0x1dfce5(0x400)],
    _0x38fba1 = stationRecords[_0x1dfce5(0x2ac)](
      (_0x4d1414, _0x360cef) =>
        _0x4d1414 + Number(_0x360cef["capacity"] || 0x0),
      0x0,
    ),
    _0x3edf63 = stationRecords[_0x1dfce5(0x2ac)](
      (_0x1bab75, _0x33ae28) =>
        _0x1bab75 + Number(_0x33ae28[_0x1dfce5(0x561)] || 0x0),
      0x0,
    ),
    _0x468e55 = _0x38fba1
      ? Math[_0x1dfce5(0x369)]((_0x3edf63 / _0x38fba1) * 0x64)
      : 0x0,
    _0x4d0bdc = rewardRecords[_0x1dfce5(0x274)](
      (_0x588181) =>
        _0x588181[_0x1dfce5(0x420)] === _0x1dfce5(0x24a) ||
        _0x588181[_0x1dfce5(0x368)] ||
        _0x588181[_0x1dfce5(0x434)],
    )[_0x1dfce5(0x400)],
    _0x41fe7b = calculateBilling();
  (document[_0x1dfce5(0x4db)](_0x1dfce5(0x25e))?.[_0x1dfce5(0x295)](
    _0x1dfce5(0x2d9),
    rewardRecords[_0x1dfce5(0x400)] + stationRecords[_0x1dfce5(0x400)],
  ),
    document[_0x1dfce5(0x4db)](_0x1dfce5(0x44d))?.[_0x1dfce5(0x295)](
      "data-count",
      rewardRecords[_0x1dfce5(0x400)],
    ),
    document[_0x1dfce5(0x4db)](_0x1dfce5(0x737))?.[_0x1dfce5(0x295)](
      "data-count",
      stationRecords[_0x1dfce5(0x400)],
    ),
    setText("homeLiveRewards", _0x15ae70[_0x1dfce5(0x400)]),
    setText("homeActivations", _0x194bff));
  const _0x5bbed6 = $(_0x1dfce5(0x34c));
  if (_0x5bbed6) {
    const _0x5ad6df = _0x15ae70[_0x1dfce5(0x274)](isBoostActive),
      _0x49512a = _0x15ae70["length"] - _0x5ad6df[_0x1dfce5(0x400)];
    ((_0x5bbed6[_0x1dfce5(0x6bc)] = _0x15ae70[_0x1dfce5(0x400)] === 0x0),
      setText(_0x1dfce5(0x56a), _0x49512a),
      setText(_0x1dfce5(0x3d2), _0x5ad6df["length"]));
  }
  (setText(_0x1dfce5(0x210), stationRecords[_0x1dfce5(0x400)]),
    setText(_0x1dfce5(0x689), stationRecords[_0x1dfce5(0x400)]),
    setText(
      _0x1dfce5(0x3de),
      money(
        getCurrentBillingPlan()[_0x1dfce5(0x508)] +
          (_0x41fe7b["boostSpend"] || 0x0),
      ),
    ),
    setText(_0x1dfce5(0x5bd), _0x3924f7),
    setText(_0x1dfce5(0x316), _0x259c4a),
    setText("homeConversion", _0x35a885 + "%"),
    setText(_0x1dfce5(0x590), _0x3cf5d1),
    setText(_0x1dfce5(0x77e), _0x468e55 + "%"),
    setText(_0x1dfce5(0x778), collectionRequestRecords[_0x1dfce5(0x400)]));
  const _0x36e5e8 = stationRecords[_0x1dfce5(0x2ac)](
    (_0x2392ca, _0x51311a) =>
      _0x2392ca + Number(_0x51311a[_0x1dfce5(0x561)] || 0x0),
    0x0,
  );
  setText(_0x1dfce5(0x223), _0x36e5e8);
  const _0x581307 = (_0x130e48, _0x506caf, _0x18a09d) => {
    const _0x50073f = _0x1dfce5,
      _0x330255 = $(_0x130e48);
    if (!_0x330255) return;
    (_0x330255[_0x50073f(0x5a3)][_0x50073f(0x668)](
      _0x50073f(0x472),
      !!_0x506caf,
    ),
      _0x330255[_0x50073f(0x5a3)][_0x50073f(0x668)]("is-neg", !!_0x18a09d));
  };
  (_0x581307(_0x1dfce5(0x30c), _0x3924f7 > 0x0, ![]),
    _0x581307("homeKpiValidations", _0x259c4a > 0x0, ![]),
    _0x581307(
      _0x1dfce5(0x5b5),
      _0x35a885 >= 0x1e,
      _0x35a885 > 0x0 && _0x35a885 < 0xa,
    ),
    _0x581307(_0x1dfce5(0x3b4), _0x36e5e8 > 0x0, ![]),
    _0x581307(_0x1dfce5(0x30b), _0x1f21a9[_0x1dfce5(0x400)] > 0x0, ![]),
    (async () => {
      const _0xc6c62c = _0x1dfce5;
      try {
        let _0x10e9f8 = 0x0;
        const _0x39b2ff = new Date(),
          _0x3c2130 =
            _0x39b2ff[_0xc6c62c(0x4a1)]() +
            "-" +
            String(_0x39b2ff[_0xc6c62c(0x279)]() + 0x1)["padStart"](0x2, "0");
        await Promise[_0xc6c62c(0x47b)](
          stationRecords["map"](async (_0x435197) => {
            const _0x59b1cf = _0xc6c62c;
            try {
              const _0x2d0ce9 = doc(
                  db,
                  _0x59b1cf(0x5c7),
                  _0x435197["id"],
                  _0x59b1cf(0x5dc),
                  _0x3c2130,
                ),
                _0xc6ef0b = await getDoc(_0x2d0ce9);
              _0xc6ef0b[_0x59b1cf(0x448)]() &&
                (_0x10e9f8 += Number(
                  _0xc6ef0b[_0x59b1cf(0x787)]()[_0x59b1cf(0x4da)] || 0x0,
                ));
            } catch (_0x45672c) {
              console[_0x59b1cf(0x222)](_0x59b1cf(0x3c6), _0x45672c);
            }
          }),
        );
        const _0x1aa0b1 = (_0x10e9f8 * 0.082)[_0xc6c62c(0x51e)](0x1),
          _0x45847b = (_0x10e9f8 * 0.5)[_0xc6c62c(0x51e)](0x0),
          _0x3e4996 = (_0x10e9f8 * 0.15)[_0xc6c62c(0x51e)](0x1),
          _0x90d2c8 = (_0x10e9f8 * 0.025)[_0xc6c62c(0x51e)](0x2),
          _0x5df997 = _0x90d2c8 + _0xc6c62c(0x421),
          _0x524669 = _0x1aa0b1 + _0xc6c62c(0x421),
          _0x1b8f5f = _0x45847b + "<small>L</small>",
          _0x5c5451 = _0x3e4996 + "<small>kWh</small>";
        if ($(_0xc6c62c(0x6e9))) $("homePlastic")[_0xc6c62c(0x1f2)] = _0x5df997;
        if ($(_0xc6c62c(0x729))) $("homeCo2")[_0xc6c62c(0x1f2)] = _0x524669;
        if ($(_0xc6c62c(0x476))) $("homeWater")[_0xc6c62c(0x1f2)] = _0x1b8f5f;
        if ($(_0xc6c62c(0x6f3)))
          $(_0xc6c62c(0x6f3))[_0xc6c62c(0x1f2)] = _0x5c5451;
        if ($(_0xc6c62c(0x76f))) $(_0xc6c62c(0x76f))["innerHTML"] = _0x5df997;
        if ($(_0xc6c62c(0x73a))) $(_0xc6c62c(0x73a))["innerHTML"] = _0x524669;
        if ($("stationWater"))
          $(_0xc6c62c(0x6a9))[_0xc6c62c(0x1f2)] = _0x1b8f5f;
        if ($(_0xc6c62c(0x78c)))
          $(_0xc6c62c(0x78c))[_0xc6c62c(0x1f2)] = _0x5c5451;
      } catch (_0x2053b5) {
        console[_0xc6c62c(0x222)](
          "Error\x20fetching\x20true\x20ESG\x20metrics:",
          _0x2053b5,
        );
      }
    })(),
    setText(_0x1dfce5(0x3ae), _0x1f21a9[_0x1dfce5(0x400)]),
    setText(_0x1dfce5(0x600), rewardRecords[_0x1dfce5(0x400)]),
    setText(_0x1dfce5(0x593), _0x3924f7),
    setText(_0x1dfce5(0x293), _0x194bff),
    setText(_0x1dfce5(0x6be), _0x1f21a9[_0x1dfce5(0x400)]),
    setText("rewardCodeCount", _0x4d0bdc),
    setText(_0x1dfce5(0x76b), _0x15ae70[_0x1dfce5(0x400)]),
    setText(_0x1dfce5(0x2d3), money(_0x41fe7b[_0x1dfce5(0x646)])),
    setText(_0x1dfce5(0x40e), money(_0x41fe7b[_0x1dfce5(0x43b)])),
    setText(_0x1dfce5(0x6c8), money(_0x41fe7b["performance"])),
    setText(_0x1dfce5(0x4c1), money(_0x41fe7b[_0x1dfce5(0x5a5)])),
    renderBillingPlans(_0x41fe7b));
  const _0xb171d4 = _0x194bff
    ? Math[_0x1dfce5(0x369)]((_0x259c4a / _0x194bff) * 0x64)
    : 0x0;
  (setText(_0x1dfce5(0x470), _0x259c4a),
    setText(_0x1dfce5(0x7af), _0xb171d4 + "%"),
    renderTopRewards(),
    renderRewardList(),
    renderStationLists(),
    renderRewardAnalytics({
      liveRewards: _0x15ae70,
      sponsoredRewards: _0x1f21a9,
      clicks: _0x3924f7,
      activations: _0x194bff,
      validations: _0x259c4a,
      conversion: _0x35a885,
      billing: _0x41fe7b,
    }));
}
function renderRewardAnalytics({
  clicks: _0x4e93dd,
  activations: _0x95863d,
  validations: _0x3a672d,
  conversion: _0x33b6a6,
  billing: _0x5b88d0,
}) {
  const _0x1b931d = _0x562b0b,
    _0xbdcd64 = document[_0x1b931d(0x745)]("homeRewardFunnel");
  if (_0xbdcd64) {
    const _0x533bf4 = _0x4e93dd
        ? Math[_0x1b931d(0x369)]((_0x95863d / _0x4e93dd) * 0x64)
        : 0x0,
      _0x1cafd0 = _0x95863d
        ? Math["round"]((_0x3a672d / _0x95863d) * 0x64)
        : 0x0;
    _0xbdcd64[_0x1b931d(0x1f2)] =
      _0x1b931d(0x6d3) +
      _0x4e93dd +
      _0x1b931d(0x289) +
      _0x95863d +
      _0x1b931d(0x5bc) +
      _0x533bf4 +
      "%</strong>\x20of\x20clicks</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22funnel-chevron\x22\x20aria-hidden=\x22true\x22>▸</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22funnel-step\x20step-3\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22funnel-step-label\x22>Validations</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22funnel-step-value\x22>" +
      _0x3a672d +
      _0x1b931d(0x5bc) +
      _0x1cafd0 +
      _0x1b931d(0x4e9);
  }
  let _0x2abb86 = 0x0,
    _0x350433 = 0x0;
  rewardRecords[_0x1b931d(0x49f)]((_0x1fd95a) => {
    const _0x3e9ec6 = _0x1b931d,
      _0x33a1b1 = getRewardMetric(_0x1fd95a, "activations"),
      _0x58c25b = getBoostedRewardMetric(_0x1fd95a, _0x3e9ec6(0x611));
    ((_0x350433 += _0x58c25b),
      (_0x2abb86 += Math[_0x3e9ec6(0x72c)](0x0, _0x33a1b1 - _0x58c25b)));
  });
  const _0x3f0eea = _0x2abb86 + _0x350433,
    _0x1d09f9 = _0x3f0eea
      ? Math["round"]((_0x2abb86 / _0x3f0eea) * 0x64)
      : 0x32,
    _0x4fd201 = _0x3f0eea ? 0x64 - _0x1d09f9 : 0x0,
    _0x490a7f = $(_0x1b931d(0x5a6));
  if (_0x490a7f)
    _0x490a7f[_0x1b931d(0x752)][_0x1b931d(0x58b)](
      _0x1b931d(0x578),
      _0x3f0eea ? _0x1d09f9 : 0x32,
    );
  (setText(_0x1b931d(0x598), _0x3f0eea),
    setText(_0x1b931d(0x4a5), _0x2abb86),
    setText(
      _0x1b931d(0x772),
      _0x3f0eea ? _0x1d09f9 + _0x1b931d(0x59a) : _0x1b931d(0x3bf),
    ),
    setText("legendSponsoredCount", _0x350433),
    setText(
      _0x1b931d(0x4cf),
      _0x3f0eea ? _0x4fd201 + _0x1b931d(0x59a) : _0x1b931d(0x3bf),
    ));
  const _0x26be10 = document["getElementById"](_0x1b931d(0x204));
  if (_0x26be10 && currentPartner) {
    const _0x31a125 = stationRecords
        ? stationRecords["reduce"](
            (_0x6af249, _0x588955) =>
              _0x6af249 + (Number(_0x588955[_0x1b931d(0x50e)]) || 0x0),
            0x0,
          ) || 0x78
        : 0x78,
      _0x100bdb = currentPartner["id"]
        [_0x1b931d(0x7ae)]("")
        [
          _0x1b931d(0x2ac)
        ]((_0x148961, _0x580f5a) => _0x148961 + _0x580f5a[_0x1b931d(0x553)](0x0), 0x0),
      _0x50a435 = (_0x42878a) => {
        const _0x5dd599 = _0x1b931d,
          _0x160efe =
            Math["sin"]((_0x100bdb + _0x42878a) * 127.1 + _0x42878a * 311.7) *
            43758.5453;
        return Math[_0x5dd599(0x390)](
          _0x160efe - Math[_0x5dd599(0x645)](_0x160efe),
        );
      },
      _0x17674c = Math[_0x1b931d(0x72c)](
        Math[_0x1b931d(0x369)](_0x31a125 / 0x8),
        0x1,
      ),
      _0x2d6dfe = Array[_0x1b931d(0x6ae)](
        { length: 0xc },
        (_0x13bf54, _0x2f4fe5) => {
          const _0x3ae84e = _0x1b931d,
            _0x283993 = 0.55 + (_0x2f4fe5 / 0xb) * 0.85;
          return {
            you: Math[_0x3ae84e(0x72c)](
              0x0,
              Math[_0x3ae84e(0x369)](
                _0x17674c *
                  _0x283993 *
                  (0.55 + _0x50a435(_0x2f4fe5 * 0x2) * 0.95),
              ),
            ),
            week: "W" + String(_0x2f4fe5 + 0x1)[_0x3ae84e(0x4af)](0x2, "0"),
          };
        },
      ),
      _0x16bff8 = Math[_0x1b931d(0x72c)](
        0x1,
        ..._0x2d6dfe[_0x1b931d(0x21b)](
          (_0xcc7a6a) => _0xcc7a6a[_0x1b931d(0x528)],
        ),
      ),
      _0x5d2388 = 0x6e;
    _0x26be10[_0x1b931d(0x1f2)] = _0x2d6dfe[_0x1b931d(0x21b)]((_0x12c233) => {
      const _0x38e369 = _0x1b931d,
        _0x5b93a5 = Math["max"](
          0x2,
          Math[_0x38e369(0x369)]((_0x12c233["you"] / _0x16bff8) * _0x5d2388),
        );
      return (
        _0x38e369(0x358) +
        _0x5d2388 +
        "px\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22velocity-fill\x20you\x22\x20style=\x22height:" +
        _0x5b93a5 +
        _0x38e369(0x653) +
        _0x12c233["you"] +
        _0x38e369(0x3da) +
        _0x12c233["week"] +
        "</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20"
      );
    })["join"]("");
  }
  const _0x1e468a = pricing[_0x1b931d(0x313)],
    _0x5b3dfc = _0x95863d
      ? (_0x95863d * pricing[_0x1b931d(0x313)] +
          _0x3a672d * pricing[_0x1b931d(0x499)]) /
        Math["max"](_0x3a672d, 0x1)
      : pricing[_0x1b931d(0x313)] + pricing[_0x1b931d(0x499)];
  (setText("cpaActivation", money(_0x1e468a)),
    setText(_0x1b931d(0x627), money(_0x5b3dfc)),
    setText(_0x1b931d(0x666), money(_0x5b88d0[_0x1b931d(0x477)] || 0x0)));
  const _0x8ba500 = _0x5b88d0[_0x1b931d(0x610)]
    ? _0x5b88d0[_0x1b931d(0x610)] +
      _0x1b931d(0x385) +
      (_0x5b88d0[_0x1b931d(0x610)] === 0x1 ? "" : "s")
    : _0x5b88d0[_0x1b931d(0x477)]
      ? _0x1b931d(0x67b)
      : _0x1b931d(0x61d);
  (setText(_0x1b931d(0x632), _0x8ba500),
    setText("costPerformance", money(_0x5b88d0[_0x1b931d(0x430)])),
    setText("costMonthTotal", money(_0x5b88d0["total"])));
  const _0x38255f = new Date(),
    _0x2a0207 = _0x38255f[_0x1b931d(0x5f8)](_0x1b931d(0x7a5), {
      month: _0x1b931d(0x247),
      year: _0x1b931d(0x438),
    });
  setText(_0x1b931d(0x37d), _0x2a0207);
}
let peerData = { partners: [], rewards: [], stations: [], loadedAt: 0x0 },
  analyticsFilters = { cat: "industry", geo: _0x562b0b(0x4f7) },
  analyticsCatchmentKm = 0x5,
  analyticsLoadingPromise = null,
  analyticsHasRendered = ![];
async function ensurePeerData(_0x254299 = ![]) {
  const _0x86b5d9 = _0x562b0b,
    _0x5dfb94 = 0xea60;
  if (
    !_0x254299 &&
    peerData[_0x86b5d9(0x2d8)] &&
    Date[_0x86b5d9(0x68e)]() - peerData["loadedAt"] < _0x5dfb94
  )
    return peerData;
  if (analyticsLoadingPromise) return analyticsLoadingPromise;
  return (
    (analyticsLoadingPromise = (async () => {
      const _0x1ae415 = _0x86b5d9;
      try {
        const [_0x381d41, _0x210ec2, _0x22d8cd] = await Promise[
          _0x1ae415(0x47b)
        ]([
          getDocs(collection(db, collections[_0x1ae415(0x77a)])),
          getDocs(collection(db, collections[_0x1ae415(0x4a4)])),
          getDocs(collection(db, collections["stations"])),
        ]);
        return (
          (peerData = {
            partners: _0x381d41[_0x1ae415(0x328)][_0x1ae415(0x21b)](
              (_0x4d21f8) => ({
                id: _0x4d21f8["id"],
                ..._0x4d21f8[_0x1ae415(0x787)](),
              }),
            ),
            rewards: _0x210ec2[_0x1ae415(0x328)][_0x1ae415(0x21b)](
              (_0x578c37) => ({ id: _0x578c37["id"], ..._0x578c37["data"]() }),
            ),
            stations: _0x22d8cd[_0x1ae415(0x328)][_0x1ae415(0x21b)](
              (_0x531cdb) => ({ id: _0x531cdb["id"], ..._0x531cdb["data"]() }),
            ),
            loadedAt: Date[_0x1ae415(0x68e)](),
          }),
          peerData
        );
      } catch (_0x31f81b) {
        return (
          console[_0x1ae415(0x222)](
            "Could\x20not\x20load\x20peer\x20data",
            _0x31f81b,
          ),
          peerData
        );
      } finally {
        analyticsLoadingPromise = null;
      }
    })()),
    analyticsLoadingPromise
  );
}
function getStationPartnerIds(_0x55b92e) {
  const _0x42e5f9 = _0x562b0b,
    _0x115c71 = new Set();
  [
    _0x55b92e[_0x42e5f9(0x6b7)],
    _0x55b92e[_0x42e5f9(0x616)],
    _0x55b92e["businessPartnerId"],
    _0x55b92e[_0x42e5f9(0x757)],
    _0x55b92e[_0x42e5f9(0x7b7)],
  ]["forEach"]((_0x10a759) => {
    const _0x34cf79 = _0x42e5f9;
    if (_0x10a759) _0x115c71[_0x34cf79(0x767)](String(_0x10a759));
  });
  if (Array["isArray"](_0x55b92e[_0x42e5f9(0x544)]))
    _0x55b92e[_0x42e5f9(0x544)][_0x42e5f9(0x49f)]((_0x58ca57) =>
      _0x115c71[_0x42e5f9(0x767)](String(_0x58ca57)),
    );
  return _0x115c71;
}
function haversineKm(_0x5b3fba, _0x4bd72b, _0x578be2, _0x21b920) {
  const _0x442b9c = _0x562b0b,
    _0xfdc999 = 0x18e3,
    _0x5f47a8 = (_0x248bdc) => (_0x248bdc * Math["PI"]) / 0xb4,
    _0x255468 = _0x5f47a8(_0x578be2 - _0x5b3fba),
    _0x1bb319 = _0x5f47a8(_0x21b920 - _0x4bd72b),
    _0x5a455b =
      Math["sin"](_0x255468 / 0x2) ** 0x2 +
      Math[_0x442b9c(0x67c)](_0x5f47a8(_0x5b3fba)) *
        Math["cos"](_0x5f47a8(_0x578be2)) *
        Math[_0x442b9c(0x2c1)](_0x1bb319 / 0x2) ** 0x2;
  return (
    _0xfdc999 *
    0x2 *
    Math[_0x442b9c(0x20b)](
      Math[_0x442b9c(0x734)](_0x5a455b),
      Math[_0x442b9c(0x734)](0x1 - _0x5a455b),
    )
  );
}
function getPeerCohort() {
  const _0xb05f32 = _0x562b0b;
  if (!currentPartner) return { partners: [], rewards: [], stations: [] };
  const _0x360e37 =
      currentPartner[_0xb05f32(0x33a)] ||
      BUSINESS_CATEGORIES[_0xb05f32(0x40f)](
        (_0x553848) =>
          _0x553848[_0xb05f32(0x410)] === currentPartner[_0xb05f32(0x468)],
      )?.["id"],
    _0x3657da = currentPartner[_0xb05f32(0x599)],
    _0x21f5fa = Number(currentPartner[_0xb05f32(0x69b)]),
    _0x5f1649 = Number(currentPartner[_0xb05f32(0x760)]),
    _0x1cf75f = isFinite(_0x21f5fa) && isFinite(_0x5f1649);
  let _0x45ac59 = peerData[_0xb05f32(0x77a)][_0xb05f32(0x274)](
    (_0x1277d7) => _0x1277d7["id"] !== currentPartner["id"],
  );
  analyticsFilters["cat"] === "industry" &&
    _0x360e37 &&
    (_0x45ac59 = _0x45ac59[_0xb05f32(0x274)](
      (_0x3ca310) =>
        _0x3ca310[_0xb05f32(0x33a)] === _0x360e37 ||
        BUSINESS_CATEGORIES[_0xb05f32(0x40f)](
          (_0x469f90) =>
            _0x469f90[_0xb05f32(0x410)] === _0x3ca310[_0xb05f32(0x468)],
        )?.["id"] === _0x360e37,
    ));
  analyticsFilters[_0xb05f32(0x58d)] === _0xb05f32(0x4f7) &&
    _0x3657da &&
    (_0x45ac59 = _0x45ac59[_0xb05f32(0x274)](
      (_0x104917) => _0x104917["countryCode"] === _0x3657da,
    ));
  _0x1cf75f &&
    analyticsCatchmentKm > 0x0 &&
    (_0x45ac59 = _0x45ac59[_0xb05f32(0x274)]((_0x49db97) => {
      const _0x33a551 = _0xb05f32,
        _0x2678c7 = Number(_0x49db97[_0x33a551(0x69b)]),
        _0xab53e7 = Number(_0x49db97["lng"]);
      if (!isFinite(_0x2678c7) || !isFinite(_0xab53e7)) return !![];
      return (
        haversineKm(_0x21f5fa, _0x5f1649, _0x2678c7, _0xab53e7) <=
        analyticsCatchmentKm
      );
    }));
  const _0xe5c896 = new Set(
      _0x45ac59[_0xb05f32(0x21b)]((_0x207da1) => _0x207da1["id"]),
    ),
    _0x5a28cd = peerData[_0xb05f32(0x4a4)][_0xb05f32(0x274)]((_0x544195) =>
      _0xe5c896[_0xb05f32(0x2de)](_0x544195[_0xb05f32(0x6b7)]),
    ),
    _0x7327a5 = peerData[_0xb05f32(0x5c7)][_0xb05f32(0x274)]((_0x1dcf34) => {
      const _0x2061d2 = _0xb05f32,
        _0x25f77a = getStationPartnerIds(_0x1dcf34);
      return [..._0x25f77a][_0x2061d2(0x63c)]((_0x18ac94) =>
        _0xe5c896["has"](_0x18ac94),
      );
    });
  return { partners: _0x45ac59, rewards: _0x5a28cd, stations: _0x7327a5 };
}
function computeRewardStats(_0x4b2e11) {
  const _0x260764 = _0x562b0b;
  if (!_0x4b2e11[_0x260764(0x400)])
    return {
      count: 0x0,
      activationsPerReward: 0x0,
      conversion: 0x0,
      validation: 0x0,
      medianCost: 0x0,
      sponsoredShare: 0x0,
      codesShare: 0x0,
    };
  const _0x3f255c = _0x4b2e11[_0x260764(0x2ac)](
      (_0x1be0b9, _0x156ad0) =>
        _0x1be0b9 + getRewardMetric(_0x156ad0, _0x260764(0x2e7)),
      0x0,
    ),
    _0xe6123a = _0x4b2e11[_0x260764(0x2ac)](
      (_0x5a2ae9, _0x19d612) =>
        _0x5a2ae9 + getRewardMetric(_0x19d612, _0x260764(0x611)),
      0x0,
    ),
    _0xb77d6b = _0x4b2e11["reduce"](
      (_0x3a05dc, _0xd33234) =>
        _0x3a05dc + getRewardMetric(_0xd33234, "validations"),
      0x0,
    ),
    _0x2993a7 =
      _0x4b2e11[_0x260764(0x274)](isSponsoredReward)[_0x260764(0x400)],
    _0x1a7c13 = _0x4b2e11[_0x260764(0x274)](
      (_0x2b7eeb) =>
        _0x2b7eeb[_0x260764(0x420)] === _0x260764(0x24a) ||
        _0x2b7eeb["hasCodes"] ||
        _0x2b7eeb[_0x260764(0x434)],
    )[_0x260764(0x400)],
    _0x27d4c2 = _0x4b2e11[_0x260764(0x21b)]((_0x39e749) =>
      Number(_0x39e749[_0x260764(0x2bb)] || 0x0),
    )
      ["filter"]((_0x2aeb0a) => _0x2aeb0a > 0x0)
      [_0x260764(0x25c)]((_0xcfa7c, _0x2b320a) => _0xcfa7c - _0x2b320a),
    _0x55ae51 = _0x27d4c2[_0x260764(0x400)]
      ? _0x27d4c2[Math[_0x260764(0x645)](_0x27d4c2["length"] / 0x2)]
      : 0x0;
  return {
    count: _0x4b2e11[_0x260764(0x400)],
    activationsPerReward: _0xe6123a / _0x4b2e11[_0x260764(0x400)],
    conversion: _0x3f255c ? _0xe6123a / _0x3f255c : 0x0,
    validation: _0xe6123a ? _0xb77d6b / _0xe6123a : 0x0,
    medianCost: _0x55ae51,
    sponsoredShare: _0x2993a7 / _0x4b2e11["length"],
    codesShare: _0x1a7c13 / _0x4b2e11["length"],
  };
}
function computeTierMix(_0x4e8f34) {
  const _0x32b1ea = _0x562b0b,
    _0x3fd057 = { standard: 0x0, premium: 0x0, golden: 0x0, ultra: 0x0 };
  _0x4e8f34[_0x32b1ea(0x49f)]((_0x5a5068) => {
    const _0x1ea4cf = _0x32b1ea,
      _0x31e221 =
        _0x5a5068[_0x1ea4cf(0x520)] &&
        Object[_0x1ea4cf(0x5c2)][_0x1ea4cf(0x361)][_0x1ea4cf(0x33d)](
          _0x3fd057,
          _0x5a5068[_0x1ea4cf(0x520)],
        )
          ? _0x5a5068[_0x1ea4cf(0x520)]
          : "standard";
    _0x3fd057[_0x31e221]++;
  });
  const _0x388b7a = _0x4e8f34[_0x32b1ea(0x400)] || 0x1;
  return {
    counts: _0x3fd057,
    shares: {
      standard: _0x3fd057[_0x32b1ea(0x61c)] / _0x388b7a,
      premium: _0x3fd057[_0x32b1ea(0x237)] / _0x388b7a,
      golden: _0x3fd057["golden"] / _0x388b7a,
      ultra: _0x3fd057[_0x32b1ea(0x75c)] / _0x388b7a,
    },
    upgradedShare:
      (_0x3fd057[_0x32b1ea(0x237)] +
        _0x3fd057[_0x32b1ea(0x640)] +
        _0x3fd057[_0x32b1ea(0x75c)]) /
      _0x388b7a,
    total: _0x4e8f34[_0x32b1ea(0x400)],
  };
}
function computePlacementMix(_0x3b8643) {
  const _0x42afb8 = _0x562b0b,
    _0x366bda = { organic: 0x0, popular_sponsored: 0x0, featured_boost: 0x0 };
  _0x3b8643[_0x42afb8(0x49f)]((_0x313f74) => {
    const _0x223603 = _0x42afb8,
      _0x57cc67 =
        _0x313f74[_0x223603(0x43b)] &&
        Object["prototype"][_0x223603(0x361)]["call"](
          _0x366bda,
          _0x313f74[_0x223603(0x43b)],
        )
          ? _0x313f74[_0x223603(0x43b)]
          : _0x223603(0x731);
    _0x366bda[_0x57cc67]++;
  });
  const _0x8d8429 = _0x3b8643[_0x42afb8(0x400)] || 0x1;
  return {
    counts: _0x366bda,
    shares: {
      organic: _0x366bda["organic"] / _0x8d8429,
      popular_sponsored: _0x366bda["popular_sponsored"] / _0x8d8429,
      featured_boost: _0x366bda["featured_boost"] / _0x8d8429,
    },
    sponsoredShare:
      (_0x366bda[_0x42afb8(0x6ed)] + _0x366bda["featured_boost"]) / _0x8d8429,
    total: _0x3b8643[_0x42afb8(0x400)],
  };
}
const THEME_STOPWORDS = new Set([
  "the",
  _0x562b0b(0x20a),
  _0x562b0b(0x54b),
  "with",
  _0x562b0b(0x3f6),
  _0x562b0b(0x528),
  "from",
  _0x562b0b(0x303),
  _0x562b0b(0x68f),
  _0x562b0b(0x6d2),
  _0x562b0b(0x47b),
  _0x562b0b(0x4f0),
  _0x562b0b(0x249),
  "get",
  _0x562b0b(0x693),
  _0x562b0b(0x4b0),
  _0x562b0b(0x2a4),
  _0x562b0b(0x321),
  _0x562b0b(0x68e),
  _0x562b0b(0x603),
  _0x562b0b(0x786),
  _0x562b0b(0x2de),
  "are",
  _0x562b0b(0x71d),
  _0x562b0b(0x5f4),
  _0x562b0b(0x717),
  _0x562b0b(0x2e2),
  _0x562b0b(0x2e2),
  "free",
  _0x562b0b(0x77b),
  _0x562b0b(0x3ce),
  _0x562b0b(0x51b),
  _0x562b0b(0x4d3),
  _0x562b0b(0x60e),
  _0x562b0b(0x724),
  _0x562b0b(0x6a2),
  _0x562b0b(0x258),
]);
function computeRewardThemes(_0x5343b4) {
  const _0x301225 = _0x562b0b,
    _0x1fa471 = new Map();
  return (
    _0x5343b4["forEach"]((_0x1eda9f) => {
      const _0x2c759b = _0x2558,
        _0x1f0c04 =
          getRewardMetric(_0x1eda9f, _0x2c759b(0x611)) +
          0.4 * getRewardMetric(_0x1eda9f, "clicks");
      if (_0x1f0c04 <= 0x0) return;
      const _0x28ed40 =
        String(_0x1eda9f[_0x2c759b(0x6bb)] || "")
          ["toLowerCase"]()
          ["match"](/[a-zA-ZÀ-ÿ]{3,}/g) || [];
      _0x28ed40[_0x2c759b(0x49f)]((_0x7814fc) => {
        const _0x82a005 = _0x2c759b;
        if (THEME_STOPWORDS[_0x82a005(0x2de)](_0x7814fc)) return;
        _0x1fa471[_0x82a005(0x4fd)](
          _0x7814fc,
          (_0x1fa471[_0x82a005(0x305)](_0x7814fc) || 0x0) + _0x1f0c04,
        );
      });
    }),
    [..._0x1fa471[_0x301225(0x79a)]()]
      [
        _0x301225(0x25c)
      ]((_0x1330d5, _0x51920e) => _0x51920e[0x1] - _0x1330d5[0x1])
      [_0x301225(0x605)](0x0, 0x8)
  );
}
let captureData = { own: [], peerSample: [], loadedAt: 0x0 },
  captureLoadingPromise = null;
const CAPTURE_TTL_MS = 0xea60,
  CAPTURE_WINDOW_DAYS = 0x5a;
async function loadCapturesForStations(_0x402820) {
  const _0x3e22ec = _0x562b0b;
  if (!_0x402820["length"]) return [];
  const _0x330821 = [];
  for (
    let _0x11f5ce = 0x0;
    _0x11f5ce < _0x402820[_0x3e22ec(0x400)];
    _0x11f5ce += 0xa
  )
    _0x330821[_0x3e22ec(0x3bc)](
      _0x402820[_0x3e22ec(0x605)](_0x11f5ce, _0x11f5ce + 0xa),
    );
  const _0x1bf75a = [];
  return (
    await Promise["all"](
      _0x330821[_0x3e22ec(0x21b)](async (_0x27ac50) => {
        const _0x2dfd32 = _0x3e22ec;
        try {
          const _0x26cb99 = query(
              collection(db, "recycle_captures"),
              where(_0x2dfd32(0x768), "in", _0x27ac50),
              orderBy(_0x2dfd32(0x644), "desc"),
              limit(0x7d0),
            ),
            _0x1268e4 = await getDocs(_0x26cb99);
          _0x1268e4[_0x2dfd32(0x328)][_0x2dfd32(0x49f)]((_0x2010a8) =>
            _0x1bf75a[_0x2dfd32(0x3bc)]({
              id: _0x2010a8["id"],
              ..._0x2010a8[_0x2dfd32(0x787)](),
            }),
          );
        } catch (_0x182a59) {
          try {
            const _0xb06cb8 = query(
                collection(db, _0x2dfd32(0x5f7)),
                where("stationNumber", "in", _0x27ac50),
              ),
              _0x267ba7 = await getDocs(_0xb06cb8);
            _0x267ba7[_0x2dfd32(0x328)]["forEach"]((_0x26acec) =>
              _0x1bf75a["push"]({
                id: _0x26acec["id"],
                ..._0x26acec[_0x2dfd32(0x787)](),
              }),
            );
          } catch (_0x4381c0) {
            console[_0x2dfd32(0x4fb)](_0x2dfd32(0x788), _0x4381c0);
          }
        }
      }),
    ),
    _0x1bf75a
  );
}
async function ensureCaptureData(_0xea41c8 = ![]) {
  const _0x46a00b = _0x562b0b;
  if (
    !_0xea41c8 &&
    captureData[_0x46a00b(0x2d8)] &&
    Date[_0x46a00b(0x68e)]() - captureData["loadedAt"] < CAPTURE_TTL_MS
  )
    return captureData;
  if (captureLoadingPromise) return captureLoadingPromise;
  return (
    (captureLoadingPromise = (async () => {
      const _0x243aaa = _0x46a00b;
      try {
        const _0x190174 = stationRecords[_0x243aaa(0x21b)](
            (_0x4379d4) => _0x4379d4["id"],
          ),
          _0x338c50 = peerData[_0x243aaa(0x77a)][_0x243aaa(0x400)]
            ? getPeerCohort()
            : { partners: [], stations: [], rewards: [] },
          _0x38ceb5 = new Map();
        _0x338c50["rewards"][_0x243aaa(0x49f)]((_0x2e0941) =>
          _0x38ceb5[_0x243aaa(0x4fd)](
            _0x2e0941["partnerId"],
            (_0x38ceb5["get"](_0x2e0941[_0x243aaa(0x6b7)]) || 0x0) + 0x1,
          ),
        );
        const _0x54b379 = new Set(
            [..._0x38ceb5[_0x243aaa(0x79a)]()]
              [_0x243aaa(0x25c)](
                (_0x5a7130, _0x8ad451) => _0x8ad451[0x1] - _0x5a7130[0x1],
              )
              [_0x243aaa(0x605)](0x0, 0x6)
              [_0x243aaa(0x21b)](([_0x57ee72]) => _0x57ee72),
          ),
          _0x23c57a = _0x338c50["stations"]
            [_0x243aaa(0x274)]((_0x4466d6) =>
              [...getStationPartnerIds(_0x4466d6)][_0x243aaa(0x63c)](
                (_0x147583) => _0x54b379[_0x243aaa(0x2de)](_0x147583),
              ),
            )
            [_0x243aaa(0x605)](0x0, 0x1e)
            [_0x243aaa(0x21b)]((_0x2191d2) => _0x2191d2["id"]),
          [_0x487e55, _0x19add8] = await Promise[_0x243aaa(0x47b)]([
            loadCapturesForStations(_0x190174),
            loadCapturesForStations(_0x23c57a),
          ]);
        return (
          (captureData = {
            own: _0x487e55,
            peerSample: _0x19add8,
            loadedAt: Date[_0x243aaa(0x68e)](),
          }),
          captureData
        );
      } finally {
        captureLoadingPromise = null;
      }
    })()),
    captureLoadingPromise
  );
}
function withinCaptureWindow(_0x190aa4) {
  const _0x37770e = _0x562b0b,
    _0x4f997b =
      _0x190aa4[_0x37770e(0x644)]?.["toMillis"]?.() ??
      _0x190aa4["timestamp"]?.[_0x37770e(0x515)] * 0x3e8 ??
      0x0;
  if (!_0x4f997b) return !![];
  return (
    Date[_0x37770e(0x68e)]() - _0x4f997b <=
    CAPTURE_WINDOW_DAYS * 0x18 * 0x3c * 0x3c * 0x3e8
  );
}
function computeRepeatStats(_0x5bcd7a, _0x480504) {
  const _0x1b79e0 = _0x562b0b,
    _0x432397 = new Set(_0x480504[_0x1b79e0(0x21b)](String)),
    _0x344d7f = _0x5bcd7a[_0x1b79e0(0x274)](
      (_0x4c0978) =>
        _0x4c0978[_0x1b79e0(0x6a4)] &&
        _0x4c0978["stepName"] === "recycled" &&
        _0x432397[_0x1b79e0(0x2de)](String(_0x4c0978[_0x1b79e0(0x768)])) &&
        withinCaptureWindow(_0x4c0978),
    ),
    _0x899b95 = new Map();
  _0x344d7f[_0x1b79e0(0x49f)]((_0x446ab8) => {
    const _0x152422 = _0x1b79e0;
    _0x899b95[_0x152422(0x4fd)](
      _0x446ab8[_0x152422(0x6a4)],
      (_0x899b95["get"](_0x446ab8[_0x152422(0x6a4)]) || 0x0) + 0x1,
    );
  });
  const _0x23f04a = [..._0x899b95[_0x1b79e0(0x3f4)]()],
    _0x343e9a = _0x23f04a[_0x1b79e0(0x400)],
    _0x373b8d = _0x23f04a[_0x1b79e0(0x274)]((_0x1c34e7) => _0x1c34e7 >= 0x2)[
      _0x1b79e0(0x400)
    ],
    _0x190613 = _0x23f04a[_0x1b79e0(0x2ac)](
      (_0x318be3, _0x56673a) => _0x318be3 + _0x56673a,
      0x0,
    ),
    _0x56c52a = {
      one: _0x23f04a[_0x1b79e0(0x274)]((_0x27040a) => _0x27040a === 0x1)[
        "length"
      ],
      twoFour: _0x23f04a[_0x1b79e0(0x274)](
        (_0x235a52) => _0x235a52 >= 0x2 && _0x235a52 <= 0x4,
      )[_0x1b79e0(0x400)],
      fivePlus: _0x23f04a[_0x1b79e0(0x274)]((_0x380e2d) => _0x380e2d >= 0x5)[
        _0x1b79e0(0x400)
      ],
    },
    _0x93bab6 = [..._0x899b95[_0x1b79e0(0x79a)]()]
      ["sort"]((_0x1a4663, _0x2b5102) => _0x2b5102[0x1] - _0x1a4663[0x1])
      [_0x1b79e0(0x605)](0x0, 0x5)
      [_0x1b79e0(0x21b)](([_0x3dc0b4, _0x3af64e]) => ({
        userId: _0x3dc0b4,
        count: _0x3af64e,
      }));
  return {
    distinctUsers: _0x343e9a,
    repeatUsers: _0x373b8d,
    repeatRate: _0x343e9a ? _0x373b8d / _0x343e9a : 0x0,
    avgPerUser: _0x343e9a ? _0x190613 / _0x343e9a : 0x0,
    totalRecycles: _0x190613,
    cohorts: _0x56c52a,
    topUsers: _0x93bab6,
  };
}
function computePeerRepeatRateMedian(_0x5ca990, _0x34aee4) {
  const _0x3dca90 = _0x562b0b,
    _0x15917d = new Map();
  _0x34aee4[_0x3dca90(0x5c7)][_0x3dca90(0x49f)]((_0xf09889) => {
    const _0x374abd = _0x3dca90,
      _0x9461ba = [...getStationPartnerIds(_0xf09889)];
    if (_0x9461ba[_0x374abd(0x400)])
      _0x15917d[_0x374abd(0x4fd)](String(_0xf09889["id"]), _0x9461ba[0x0]);
  });
  const _0x191d50 = new Map();
  _0x5ca990["forEach"]((_0x3065be) => {
    const _0x39d9ec = _0x3dca90;
    if (
      _0x3065be[_0x39d9ec(0x248)] !== _0x39d9ec(0x55d) ||
      !_0x3065be["userId"]
    )
      return;
    if (!withinCaptureWindow(_0x3065be)) return;
    const _0x484169 = _0x15917d[_0x39d9ec(0x305)](
      String(_0x3065be[_0x39d9ec(0x768)]),
    );
    if (!_0x484169) return;
    if (!_0x191d50[_0x39d9ec(0x2de)](_0x484169))
      _0x191d50[_0x39d9ec(0x4fd)](_0x484169, new Map());
    const _0x118826 = _0x191d50[_0x39d9ec(0x305)](_0x484169);
    _0x118826[_0x39d9ec(0x4fd)](
      _0x3065be[_0x39d9ec(0x6a4)],
      (_0x118826[_0x39d9ec(0x305)](_0x3065be[_0x39d9ec(0x6a4)]) || 0x0) + 0x1,
    );
  });
  const _0x272929 = [];
  _0x191d50[_0x3dca90(0x49f)]((_0x588685) => {
    const _0x245ebe = _0x3dca90,
      _0x46d32a = [..._0x588685[_0x245ebe(0x3f4)]()];
    if (_0x46d32a["length"] < 0x3) return;
    const _0x4d9098 = _0x46d32a[_0x245ebe(0x274)](
      (_0x188053) => _0x188053 >= 0x2,
    )["length"];
    _0x272929["push"](_0x4d9098 / _0x46d32a[_0x245ebe(0x400)]);
  });
  if (!_0x272929["length"]) return null;
  return (
    _0x272929[_0x3dca90(0x25c)](
      (_0x14561c, _0x18d61f) => _0x14561c - _0x18d61f,
    ),
    _0x272929[Math[_0x3dca90(0x645)](_0x272929[_0x3dca90(0x400)] / 0x2)]
  );
}
function shortUserId(_0x442c40) {
  const _0x2e5668 = _0x562b0b;
  if (!_0x442c40) return _0x2e5668(0x501);
  const _0x527a9d = String(_0x442c40)
    [_0x2e5668(0x605)](-0x5)
    [_0x2e5668(0x541)]();
  return _0x2e5668(0x2be) + _0x527a9d;
}
function computePeerLeaderboard(_0x59c693) {
  const _0x425e05 = _0x562b0b,
    _0x538f68 = Object[_0x425e05(0x2c4)](
      _0x59c693["partners"][_0x425e05(0x21b)]((_0x1a780e) => [
        _0x1a780e["id"],
        _0x1a780e,
      ]),
    ),
    _0x1ce8c0 = new Map();
  return (
    _0x59c693[_0x425e05(0x4a4)][_0x425e05(0x49f)]((_0x13b289) => {
      const _0x4d831f = _0x425e05,
        _0x2c3acd = _0x13b289[_0x4d831f(0x6b7)];
      if (!_0x538f68[_0x2c3acd]) return;
      const _0xca34d9 = _0x1ce8c0["get"](_0x2c3acd) || {
        partner: _0x538f68[_0x2c3acd],
        validations: 0x0,
        activations: 0x0,
        clicks: 0x0,
        rewardCount: 0x0,
      };
      ((_0xca34d9[_0x4d831f(0x34b)] += getRewardMetric(
        _0x13b289,
        _0x4d831f(0x34b),
      )),
        (_0xca34d9[_0x4d831f(0x611)] += getRewardMetric(
          _0x13b289,
          _0x4d831f(0x611),
        )),
        (_0xca34d9["clicks"] += getRewardMetric(_0x13b289, "clicks")),
        (_0xca34d9["rewardCount"] += 0x1),
        _0x1ce8c0[_0x4d831f(0x4fd)](_0x2c3acd, _0xca34d9));
    }),
    [..._0x1ce8c0[_0x425e05(0x3f4)]()][_0x425e05(0x25c)](
      (_0x1aaf04, _0x3f5ff5) =>
        _0x3f5ff5[_0x425e05(0x34b)] - _0x1aaf04[_0x425e05(0x34b)] ||
        _0x3f5ff5["activations"] - _0x1aaf04["activations"],
    )
  );
}
function anonymousPeerLabel(_0x4abe00) {
  const _0x139afb = _0x562b0b,
    _0x248a5f =
      _0x4abe00[_0x139afb(0x2fb)] ||
      _0x4abe00["businessCategoryName"] ||
      CATEGORY_BY_ID[_0x4abe00[_0x139afb(0x33a)]]?.[_0x139afb(0x410)] ||
      _0x4abe00[_0x139afb(0x468)] ||
      _0x139afb(0x7ba),
    _0x41fc8c = _0x4abe00[_0x139afb(0x28c)] || _0x4abe00["country"] || "—";
  return _0x248a5f + _0x139afb(0x5db) + _0x41fc8c;
}
function buildRecommendations({
  myStats: _0x3fd0ef,
  peerStats: _0x5eb43f,
  peerTier: _0x3031a9,
  peerPlacement: _0x28bad0,
  catchmentSignal: _0x23725f,
}) {
  const _0x12a28e = _0x562b0b,
    _0x542bb4 = [];
  if (_0x5eb43f["count"] === 0x0)
    return (
      _0x542bb4[_0x12a28e(0x3bc)]({
        tone: "tip",
        icon: "i",
        title: _0x12a28e(0x33c),
        copy: _0x12a28e(0x3a1),
      }),
      _0x542bb4
    );
  if (_0x3fd0ef["count"] === 0x0)
    return (
      _0x542bb4[_0x12a28e(0x3bc)]({
        tone: "opportunity",
        icon: "+",
        title: _0x12a28e(0x2aa),
        copy:
          _0x12a28e(0x2c5) +
          _0x5eb43f[_0x12a28e(0x496)] +
          _0x12a28e(0x5ee) +
          (_0x5eb43f[_0x12a28e(0x496)] === 0x1 ? "" : "s") +
          _0x12a28e(0x3a3),
      }),
      _0x542bb4
    );
  _0x3fd0ef["activationsPerReward"] < _0x5eb43f["activationsPerReward"] * 0.7 &&
    _0x542bb4[_0x12a28e(0x3bc)]({
      tone: _0x12a28e(0x5fe),
      icon: "↓",
      title: _0x12a28e(0x5f9),
      copy:
        _0x12a28e(0x4b8) +
        _0x5eb43f[_0x12a28e(0x25b)][_0x12a28e(0x51e)](0x1) +
        _0x12a28e(0x6e2) +
        _0x3fd0ef[_0x12a28e(0x25b)][_0x12a28e(0x51e)](0x1) +
        _0x12a28e(0x5e6),
    });
  _0x28bad0[_0x12a28e(0x3c7)] > 0.25 &&
    _0x3fd0ef["sponsoredShare"] < 0.1 &&
    _0x542bb4[_0x12a28e(0x3bc)]({
      tone: _0x12a28e(0x4c4),
      icon: "★",
      title: _0x12a28e(0x5ff),
      copy:
        Math[_0x12a28e(0x369)](_0x28bad0[_0x12a28e(0x3c7)] * 0x64) +
        _0x12a28e(0x24f),
    });
  _0x3fd0ef[_0x12a28e(0x53a)] < 0.2 &&
    _0x542bb4["push"]({
      tone: _0x12a28e(0x4c4),
      icon: "#",
      title: _0x12a28e(0x422),
      copy: "Right\x20now\x20we\x20count\x20clicks\x20and\x20activations\x20but\x20not\x20actual\x20customer\x20visits.\x20Paste\x20a\x20CSV\x20of\x20codes\x20into\x20a\x20reward\x20to\x20unlock\x20validated\x20billing\x20and\x20peer-leaderboard\x20ranking.",
    });
  const _0x493514 = stationRecords["some"](
    (_0x56df12) =>
      _0x56df12[_0x12a28e(0x520)] &&
      _0x56df12[_0x12a28e(0x520)] !== _0x12a28e(0x61c),
  );
  return (
    !_0x493514 &&
      _0x3031a9[_0x12a28e(0x3ed)] > 0.2 &&
      _0x3031a9[_0x12a28e(0x5a5)] > 0x2 &&
      _0x542bb4["push"]({
        tone: "opportunity",
        icon: "▲",
        title: _0x12a28e(0x36c),
        copy:
          Math[_0x12a28e(0x369)](_0x3031a9[_0x12a28e(0x3ed)] * 0x64) +
          _0x12a28e(0x2f5),
      }),
    _0x3fd0ef[_0x12a28e(0x3ba)] > 0x0 &&
      _0x5eb43f[_0x12a28e(0x3ba)] > 0x0 &&
      _0x3fd0ef[_0x12a28e(0x3ba)] > _0x5eb43f["medianCost"] * 1.5 &&
      _0x542bb4[_0x12a28e(0x3bc)]({
        tone: _0x12a28e(0x4c4),
        icon: "$",
        title: _0x12a28e(0x618),
        copy:
          _0x12a28e(0x76a) +
          _0x5eb43f["medianCost"] +
          _0x12a28e(0x5c8) +
          _0x3fd0ef[_0x12a28e(0x3ba)] +
          _0x12a28e(0x74a),
      }),
    _0x23725f &&
      _0x23725f[_0x12a28e(0x5c3)] > 0x0 &&
      _0x542bb4["push"]({
        tone: _0x23725f[_0x12a28e(0x5de)] > 0x0 ? _0x12a28e(0x68b) : "tip",
        icon: _0x23725f[_0x12a28e(0x5de)] > 0x0 ? "◎" : "↗",
        title: _0x23725f[_0x12a28e(0x465)],
        copy: _0x23725f["actionCopy"],
      }),
    _0x5eb43f[_0x12a28e(0x2fd)] > 0x0 &&
      _0x3fd0ef["conversion"] < _0x5eb43f[_0x12a28e(0x2fd)] * 0.6 &&
      _0x3fd0ef[_0x12a28e(0x496)] > 0x0 &&
      _0x542bb4["push"]({
        tone: "urgent",
        icon: "%",
        title: "Click-to-activation\x20rate\x20is\x20low",
        copy:
          _0x12a28e(0x511) +
          Math["round"](_0x5eb43f[_0x12a28e(0x2fd)] * 0x64) +
          "%\x20of\x20clicks\x20to\x20activations;\x20you\x27re\x20at\x20" +
          Math[_0x12a28e(0x369)](_0x3fd0ef[_0x12a28e(0x2fd)] * 0x64) +
          "%.\x20Tighten\x20the\x20description\x20or\x20check\x20that\x20the\x20offer\x20matches\x20what\x20users\x20see\x20in\x20the\x20marketplace\x20card.",
      }),
    !_0x542bb4[_0x12a28e(0x400)] &&
      _0x542bb4[_0x12a28e(0x3bc)]({
        tone: _0x12a28e(0x48e),
        icon: "✓",
        title: _0x12a28e(0x535),
        copy: "No\x20urgent\x20gaps\x20spotted\x20right\x20now.\x20Keep\x20an\x20eye\x20on\x20your\x20peer\x20leaderboard\x20rank\x20below\x20to\x20make\x20sure\x20you\x20stay\x20in\x20the\x20top\x20half.",
      }),
    _0x542bb4
  );
}
function getCatchmentBandLabel(_0x2791f7) {
  const _0x48c476 = _0x562b0b;
  if (_0x2791f7 <= 0x5) return _0x48c476(0x781);
  if (_0x2791f7 <= 0xf) return _0x48c476(0x6a5);
  return _0x48c476(0x418);
}
function buildCatchmentSignal({ cohort: _0x5921c0, peerStats: _0x24fe71 }) {
  const _0x422c23 = _0x562b0b,
    _0x55c12d =
      analyticsCatchmentKm <= 0x5
        ? 0x4
        : analyticsCatchmentKm <= 0xf
          ? 0x6
          : 0x8,
    _0x4cbe33 = _0x5921c0[_0x422c23(0x77a)]["slice"](0x0, _0x55c12d),
    _0x908622 = _0x24fe71[_0x422c23(0x25b)],
    _0x158957 = _0x4cbe33["filter"]((_0x34a8c3) => {
      const _0xeb9367 = _0x422c23,
        _0x1db3a6 = _0x5921c0[_0xeb9367(0x4a4)][_0xeb9367(0x274)](
          (_0x2180a1) => _0x2180a1[_0xeb9367(0x6b7)] === _0x34a8c3["id"],
        ),
        _0x53b671 = _0x1db3a6[_0xeb9367(0x2ac)](
          (_0x160698, _0x562e20) =>
            _0x160698 + getRewardMetric(_0x562e20, _0xeb9367(0x611)),
          0x0,
        );
      return _0x908622 > 0x0 && _0x53b671 > _0x908622 * 0x2;
    })[_0x422c23(0x400)],
    _0x3038ca = _0x4cbe33["filter"]((_0x1d40fa) => {
      const _0x500d8c = _0x422c23,
        _0x265032 = _0x5921c0["stations"][_0x500d8c(0x274)]((_0x478a39) =>
          getStationPartnerIds(_0x478a39)[_0x500d8c(0x2de)](_0x1d40fa["id"]),
        );
      return _0x265032["some"](
        (_0x4dc9d8) =>
          (_0x4dc9d8[_0x500d8c(0x520)] || _0x500d8c(0x61c)) !==
          _0x500d8c(0x61c),
      );
    })[_0x422c23(0x400)],
    _0x80999 = getCatchmentBandLabel(analyticsCatchmentKm),
    _0x557a55 =
      analyticsCatchmentKm <= 0x5
        ? _0x422c23(0x720)
        : analyticsCatchmentKm <= 0xf
          ? _0x422c23(0x259)
          : _0x422c23(0x617);
  let _0x2c5c2f = _0x422c23(0x52d) + _0x80999 + ".",
    _0x138fbb = _0x422c23(0x3c9);
  if (_0x158957 > 0x0)
    ((_0x2c5c2f =
      _0x158957 +
      _0x422c23(0x5a7) +
      (_0x158957 === 0x1 ? _0x422c23(0x4dc) : "s\x20are") +
      "\x20active\x20within\x20" +
      analyticsCatchmentKm +
      _0x422c23(0x65e)),
      (_0x138fbb = _0x422c23(0x4c6) + _0x557a55 + "."));
  else
    _0x3038ca > 0x0 &&
      ((_0x2c5c2f = _0x422c23(0x5d8) + analyticsCatchmentKm + _0x422c23(0x65e)),
      (_0x138fbb = _0x422c23(0x2b9) + _0x557a55 + "."));
  return {
    band: _0x80999,
    nearbyPeers: _0x4cbe33[_0x422c23(0x400)],
    hotPeers: _0x158957,
    upgradedPeers: _0x3038ca,
    headline: _0x2c5c2f,
    actionCopy: _0x138fbb,
  };
}
function setBenchmarkBar(_0x1df842, _0x20ccff, _0xda95e1) {
  const _0x1b6db6 = _0x562b0b,
    _0x577e57 = $(_0x1df842);
  if (!_0x577e57) return;
  if (_0xda95e1 === 0x0 && _0x20ccff === 0x0) {
    ((_0x577e57["style"][_0x1b6db6(0x7a1)] = "0%"),
      _0x577e57[_0x1b6db6(0x5a3)]["remove"](_0x1b6db6(0x6c1)));
    return;
  }
  if (_0xda95e1 === 0x0) {
    ((_0x577e57["style"][_0x1b6db6(0x7a1)] = "100%"),
      _0x577e57[_0x1b6db6(0x5a3)][_0x1b6db6(0x626)](_0x1b6db6(0x6c1)));
    return;
  }
  const _0x1d38a5 = _0x20ccff / _0xda95e1,
    _0x5f3e7e = Math["min"](
      0x64,
      Math[_0x1b6db6(0x72c)](0x6, _0x1d38a5 * 0x32),
    );
  ((_0x577e57["style"][_0x1b6db6(0x7a1)] = _0x5f3e7e + "%"),
    _0x577e57[_0x1b6db6(0x5a3)][_0x1b6db6(0x668)](
      _0x1b6db6(0x6c1),
      _0x1d38a5 < 0.7,
    ));
}
function renderMixBars(_0x170339, _0x3b5ff3, _0xe20f98) {
  const _0x28ac01 = _0x562b0b,
    _0x5e2a27 = $(_0x170339);
  if (!_0x5e2a27) return;
  _0x5e2a27[_0x28ac01(0x1f2)] = Object["entries"](_0xe20f98)
    [_0x28ac01(0x21b)](([_0x4d4f1d, _0x5a299b]) => {
      const _0x447d9d = _0x28ac01,
        _0x1fe38d = _0x3b5ff3[_0x447d9d(0x4bb)][_0x4d4f1d] || 0x0,
        _0x43baee = _0x3b5ff3["counts"][_0x4d4f1d] || 0x0;
      return (
        _0x447d9d(0x4d4) +
        escapeHtml(_0x5a299b) +
        _0x447d9d(0x36a) +
        _0x4d4f1d +
        _0x447d9d(0x423) +
        Math[_0x447d9d(0x72c)](0x2, Math[_0x447d9d(0x369)](_0x1fe38d * 0x64)) +
        _0x447d9d(0x4b5) +
        Math[_0x447d9d(0x369)](_0x1fe38d * 0x64) +
        "%<small>" +
        _0x43baee +
        "\x20of\x20" +
        _0x3b5ff3[_0x447d9d(0x5a5)] +
        _0x447d9d(0x6b4)
      );
    })
    [_0x28ac01(0x376)]("");
}
async function renderAnalytics({ force: force = ![] } = {}) {
  const _0x3a2360 = _0x562b0b;
  if (!currentPartner) return;
  (setText(_0x3a2360(0x443), _0x3a2360(0x2a7)),
    await ensurePeerData(force),
    (analyticsHasRendered = !![]));
  const _0x2d4b1e = getPeerCohort(),
    _0x4874f8 = computeRewardStats(rewardRecords),
    _0xc56bfc = computeRewardStats(_0x2d4b1e[_0x3a2360(0x4a4)]),
    _0x31336b = computeTierMix(_0x2d4b1e[_0x3a2360(0x5c7)]),
    _0x18f8dd = computePlacementMix(_0x2d4b1e["rewards"]),
    _0x4f2dc5 = computeRewardThemes(_0x2d4b1e[_0x3a2360(0x4a4)]),
    _0x2b45fc = computePeerLeaderboard(_0x2d4b1e),
    _0x50adec = buildCatchmentSignal({
      cohort: _0x2d4b1e,
      peerStats: _0xc56bfc,
    }),
    _0x2ab2a5 = $(_0x3a2360(0x443));
  _0x2ab2a5 &&
    (_0x2ab2a5[_0x3a2360(0x1f2)] =
      _0x2d4b1e[_0x3a2360(0x77a)][_0x3a2360(0x400)] === 0x0
        ? "No\x20peer\x20data\x20in\x20this\x20filter\x20yet\x20—\x20try\x20<em>broader\x20filters</em>"
        : "Comparing\x20to\x20<em>" +
          _0x2d4b1e[_0x3a2360(0x77a)]["length"] +
          "</em>\x20peer" +
          (_0x2d4b1e["partners"][_0x3a2360(0x400)] === 0x1 ? "" : "s") +
          _0x3a2360(0x5da) +
          _0x2d4b1e[_0x3a2360(0x4a4)]["length"] +
          _0x3a2360(0x651) +
          (_0x2d4b1e["rewards"]["length"] === 0x1 ? "" : "s") +
          "\x20·\x20<em>" +
          _0x2d4b1e["stations"][_0x3a2360(0x400)] +
          _0x3a2360(0x5ec) +
          (_0x2d4b1e[_0x3a2360(0x5c7)][_0x3a2360(0x400)] === 0x1 ? "" : "s"));
  const _0x519882 =
      CATEGORY_BY_ID[currentPartner[_0x3a2360(0x33a)]]?.["name"] ||
      currentPartner[_0x3a2360(0x468)] ||
      _0x3a2360(0x7ba),
    _0x12cc28 =
      analyticsFilters[_0x3a2360(0x58d)] === "country"
        ? getCountryName(currentPartner["countryCode"])
        : "Worldwide",
    _0x183398 = $("sceneTitle");
  if (_0x183398)
    _0x183398[_0x3a2360(0x1f2)] =
      _0x3a2360(0x4a8) +
      escapeHtml(_0x519882) +
      _0x3a2360(0x37e) +
      escapeHtml(_0x12cc28) +
      ".";
  (setText(_0x3a2360(0x4ee), currentPartner[_0x3a2360(0x412)] || "—"),
    setText(
      _0x3a2360(0x408),
      getCatchmentBandLabel(analyticsCatchmentKm) + _0x3a2360(0x65a),
    ));
  const _0x3de923 = $("scenePeerSet");
  if (_0x3de923)
    _0x3de923[_0x3a2360(0x1f2)] =
      _0x2d4b1e["partners"][_0x3a2360(0x400)] +
      _0x3a2360(0x658) +
      (_0x2d4b1e[_0x3a2360(0x77a)][_0x3a2360(0x400)] === 0x1 ? "" : "s") +
      _0x3a2360(0x348);
  const _0x17b19a = rewardRecords["reduce"](
      (_0x47fb18, _0x153c0f) =>
        _0x47fb18 + getRewardMetric(_0x153c0f, _0x3a2360(0x34b)),
      0x0,
    ),
    _0x1f280f = rewardRecords[_0x3a2360(0x2ac)](
      (_0x4825ca, _0x5cf4d3) =>
        _0x4825ca + getRewardMetric(_0x5cf4d3, "activations"),
      0x0,
    ),
    _0x5940ef = rewardRecords["reduce"](
      (_0x44aed1, _0x5c7b01) =>
        _0x44aed1 + getRewardMetric(_0x5c7b01, _0x3a2360(0x2e7)),
      0x0,
    ),
    _0x2beb64 =
      stationRecords[_0x3a2360(0x2ac)](
        (_0x9b8741, _0x40f2e5) =>
          _0x9b8741 +
          Math["round"](Number(_0x40f2e5[_0x3a2360(0x561)] || 0x0) * 0x4),
        0x0,
      ) || Math[_0x3a2360(0x72c)](_0x1f280f, 0x0),
    _0x59f91a = _0x2d4b1e[_0x3a2360(0x77a)]
      [_0x3a2360(0x21b)]((_0x198047) => {
        const _0x2adf94 = _0x3a2360,
          _0x418b79 = _0x2d4b1e["stations"]["filter"]((_0x256fd3) =>
            getStationPartnerIds(_0x256fd3)["has"](_0x198047["id"]),
          );
        return _0x418b79[_0x2adf94(0x2ac)](
          (_0x530c98, _0x3ce5be) =>
            _0x530c98 +
            Math[_0x2adf94(0x369)](
              Number(_0x3ce5be[_0x2adf94(0x561)] || 0x0) * 0x4,
            ),
          0x0,
        );
      })
      [_0x3a2360(0x25c)]((_0x36362f, _0x2a1434) => _0x36362f - _0x2a1434),
    _0x161072 = _0x59f91a[_0x3a2360(0x400)]
      ? _0x59f91a[Math["floor"](_0x59f91a["length"] / 0x2)]
      : 0x0;
  function _0x2ad0c7(
    _0x236ceb,
    _0x1af8ea,
    _0xb2e49c,
    _0x1a2d1d,
    _0x3daa96 = !![],
  ) {
    const _0x193b74 = _0x3a2360,
      _0x56ebec = $(_0x236ceb);
    if (!_0x56ebec) return;
    const _0x4de9d0 = _0x56ebec[_0x193b74(0x4db)](_0x193b74(0x72b)),
      _0x437863 = _0x56ebec[_0x193b74(0x4db)](_0x193b74(0x502));
    if (_0x4de9d0) _0x4de9d0[_0x193b74(0x1f2)] = _0x1a2d1d(_0x1af8ea);
    if (_0x437863)
      _0x437863["innerHTML"] =
        _0x193b74(0x6fb) + _0x1a2d1d(_0xb2e49c) + "</em>";
    const _0x5b63c1 = _0xb2e49c === 0x0 && _0x1af8ea === 0x0,
      _0x400abd =
        _0xb2e49c > 0x0 ? _0x1af8ea / _0xb2e49c : _0x1af8ea > 0x0 ? 0x2 : 0x1,
      _0xe21537 =
        !_0x5b63c1 && (_0x3daa96 ? _0x400abd >= 0.9 : _0x400abd <= 1.1),
      _0x5362b6 = !_0x5b63c1 && (_0x3daa96 ? _0x400abd < 0.7 : _0x400abd > 1.3);
    (_0x56ebec["classList"][_0x193b74(0x668)]("is-pos", _0xe21537),
      _0x56ebec[_0x193b74(0x5a3)][_0x193b74(0x668)](
        _0x193b74(0x6af),
        _0x5362b6,
      ),
      _0x56ebec[_0x193b74(0x5a3)][_0x193b74(0x668)](
        _0x193b74(0x679),
        !_0x5b63c1 && !_0xe21537 && !_0x5362b6,
      ));
  }
  (_0x2ad0c7(
    _0x3a2360(0x207),
    _0x4874f8["activationsPerReward"],
    _0xc56bfc[_0x3a2360(0x25b)],
    (_0x172a42) => _0x172a42["toFixed"](0x1),
  ),
    _0x2ad0c7(
      "kpiConversion",
      _0x4874f8[_0x3a2360(0x2fd)] * 0x64,
      _0xc56bfc["conversion"] * 0x64,
      (_0x3e0a30) => Math[_0x3a2360(0x369)](_0x3e0a30) + "%",
    ),
    _0x2ad0c7(
      _0x3a2360(0x750),
      _0x4874f8["validation"] * 0x64,
      _0xc56bfc["validation"] * 0x64,
      (_0x42895c) => Math["round"](_0x42895c) + "%",
    ),
    _0x2ad0c7(
      _0x3a2360(0x4dd),
      _0x4874f8[_0x3a2360(0x3ba)],
      _0xc56bfc[_0x3a2360(0x3ba)],
      (_0x263b31) => _0x263b31 + _0x3a2360(0x64b),
      ![],
    ),
    _0x2ad0c7(_0x3a2360(0x4d5), _0x2beb64, _0x161072, (_0x1bda99) =>
      String(_0x1bda99),
    ));
  const _0x4aa115 = $(_0x3a2360(0x4d5))?.[_0x3a2360(0x4db)](_0x3a2360(0x502));
  if (_0x4aa115)
    _0x4aa115[_0x3a2360(0x1f2)] =
      "peer\x20median\x20<em>" + _0x161072 + _0x3a2360(0x415);
  const _0x36d972 = $(_0x3a2360(0x573));
  if (_0x36d972) {
    const _0x1f159d = _0x2d4b1e[_0x3a2360(0x77a)][_0x3a2360(0x605)](
        0x0,
        analyticsCatchmentKm <= 0x5
          ? 0x4
          : analyticsCatchmentKm <= 0xf
            ? 0x6
            : 0x8,
      ),
      _0x2a6487 = _0xc56bfc[_0x3a2360(0x25b)];
    let _0x1ac90b =
      _0x3a2360(0x507) +
      escapeHtml(currentPartner[_0x3a2360(0x412)] || "You") +
      _0x3a2360(0x4e7);
    const _0x71837c = Math[_0x3a2360(0x406)](0x4, _0x1f159d[_0x3a2360(0x400)]),
      _0x5d837e = [],
      _0x17e7e9 = Number(currentPartner[_0x3a2360(0x69b)]),
      _0x1a1b79 = Number(currentPartner[_0x3a2360(0x760)]),
      _0x120dc2 = isFinite(_0x17e7e9) && isFinite(_0x1a1b79);
    (console[_0x3a2360(0x31b)](
      _0x3a2360(0x79b) +
        analyticsCatchmentKm +
        "\x20km\x20·\x20you=" +
        (currentPartner["companyName"] || currentPartner["id"]) +
        "\x20" +
        ("(" +
          (_0x120dc2
            ? _0x17e7e9[_0x3a2360(0x51e)](0x5) +
              ",\x20" +
              _0x1a1b79[_0x3a2360(0x51e)](0x5)
            : _0x3a2360(0x53c)) +
          _0x3a2360(0x796) +
          _0x1f159d[_0x3a2360(0x400)] +
          _0x3a2360(0x7b1)),
    ),
      _0x1f159d[_0x3a2360(0x49f)]((_0x1ecbd0, _0x5c6778) => {
        const _0x4871bb = _0x3a2360,
          _0x546563 = _0x2d4b1e["rewards"][_0x4871bb(0x274)](
            (_0x10ce38) => _0x10ce38[_0x4871bb(0x6b7)] === _0x1ecbd0["id"],
          ),
          _0xaa386a = _0x546563[_0x4871bb(0x2ac)](
            (_0xf4c7c9, _0x53152b) =>
              _0xf4c7c9 + getRewardMetric(_0x53152b, _0x4871bb(0x611)),
            0x0,
          ),
          _0x516ed3 = _0x2d4b1e[_0x4871bb(0x5c7)][_0x4871bb(0x274)](
            (_0x5adb1e) =>
              getStationPartnerIds(_0x5adb1e)[_0x4871bb(0x2de)](
                _0x1ecbd0["id"],
              ),
          ),
          _0x11cbd5 = _0x516ed3[_0x4871bb(0x400)]
            ? getStationTier(_0x516ed3[0x0])["id"]
            : _0x4871bb(0x61c),
          _0x58138b = _0x2a6487 > 0x0 && _0xaa386a > _0x2a6487 * 0x2,
          _0x9a7ae = _0x11cbd5 !== _0x4871bb(0x61c);
        let _0x449276,
          _0x4a73fb,
          _0x2ee42c = null,
          _0x194e6d = null,
          _0x3e0aac = _0x4871bb(0x2c0);
        const _0x48a441 = Number(currentPartner[_0x4871bb(0x69b)]),
          _0x389c75 = Number(currentPartner[_0x4871bb(0x760)]),
          _0x168ca8 = Number(_0x1ecbd0[_0x4871bb(0x69b)]),
          _0x3b9d04 = Number(_0x1ecbd0[_0x4871bb(0x760)]),
          _0x2fd879 =
            isFinite(_0x48a441) &&
            isFinite(_0x389c75) &&
            isFinite(_0x168ca8) &&
            isFinite(_0x3b9d04);
        if (_0x2fd879) {
          _0x3e0aac = _0x4871bb(0x4b2);
          const _0x2e6d39 = (_0x164ad9) => (_0x164ad9 * Math["PI"]) / 0xb4,
            _0x49e862 = _0x2e6d39(_0x3b9d04 - _0x389c75),
            _0x272539 = _0x2e6d39(_0x48a441),
            _0x3b37d9 = _0x2e6d39(_0x168ca8);
          ((_0x449276 = Math[_0x4871bb(0x20b)](
            Math[_0x4871bb(0x2c1)](_0x49e862) *
              Math[_0x4871bb(0x67c)](_0x3b37d9),
            Math[_0x4871bb(0x67c)](_0x272539) *
              Math[_0x4871bb(0x2c1)](_0x3b37d9) -
              Math[_0x4871bb(0x2c1)](_0x272539) *
                Math[_0x4871bb(0x67c)](_0x3b37d9) *
                Math["cos"](_0x49e862),
          )),
            (_0x194e6d =
              (0x5a - (_0x449276 * 0xb4) / Math["PI"] + 0x168) % 0x168),
            (_0x2ee42c = haversineKm(
              _0x48a441,
              _0x389c75,
              _0x168ca8,
              _0x3b9d04,
            )));
          const _0x422e09 =
            analyticsCatchmentKm <= 0x5
              ? 0x22
              : analyticsCatchmentKm <= 0xf
                ? 0x28
                : 0x2c;
          _0x4a73fb = Math[_0x4871bb(0x72c)](
            0xc,
            Math["min"](
              _0x422e09,
              (_0x2ee42c / Math[_0x4871bb(0x72c)](analyticsCatchmentKm, 0x1)) *
                _0x422e09,
            ),
          );
        } else {
          if (_0x5c6778 < _0x71837c)
            ((_0x449276 =
              (_0x5c6778 / Math["max"](_0x71837c, 0x1)) * 0x2 * Math["PI"] -
              Math["PI"] / 0x2),
              (_0x4a73fb =
                analyticsCatchmentKm <= 0x5
                  ? 0x12
                  : analyticsCatchmentKm <= 0xf
                    ? 0x18
                    : 0x1c));
          else {
            _0x3e0aac = "fallback-outer";
            const _0x4a8e23 = _0x5c6778 - _0x71837c;
            ((_0x449276 =
              (_0x4a8e23 /
                Math[_0x4871bb(0x72c)](
                  _0x1f159d[_0x4871bb(0x400)] - _0x71837c,
                  0x1,
                )) *
                0x2 *
                Math["PI"] +
              Math["PI"] / 0x8),
              (_0x4a73fb =
                analyticsCatchmentKm <= 0x5
                  ? 0x1c
                  : analyticsCatchmentKm <= 0xf
                    ? 0x22
                    : 0x28));
          }
        }
        const _0x24205a = _0x1ecbd0["id"]
            [_0x4871bb(0x7ae)]("")
            [
              _0x4871bb(0x2ac)
            ]((_0x683b70, _0x3e240d) => _0x683b70 + _0x3e240d[_0x4871bb(0x553)](0x0), 0x0),
          _0xef861a = ((_0x24205a % 0xa) - 0x5) * 0.7,
          _0x3fcf05 =
            0x32 + (_0x4a73fb + _0xef861a) * Math[_0x4871bb(0x67c)](_0x449276),
          _0x334441 = 0x32 + (_0x4a73fb + _0xef861a) * Math["sin"](_0x449276),
          _0x58353a = Math[_0x4871bb(0x406)](
            0x5a,
            Math[_0x4871bb(0x72c)](0xa, _0x3fcf05),
          ),
          _0x288f6b = Math["min"](0x5a, Math[_0x4871bb(0x72c)](0xa, _0x334441)),
          _0x3d4241 = _0x58353a !== _0x3fcf05 || _0x288f6b !== _0x334441,
          _0x14891c =
            _0x4871bb(0x3a0) +
            (_0x58138b ? _0x4871bb(0x26e) : "") +
            (_0x9a7ae ? "\x20upgraded" : ""),
          _0x56a692 = _0x9a7ae ? "★" : String(_0x5c6778 + 0x1);
        ((_0x1ac90b +=
          _0x4871bb(0x300) +
          _0x14891c +
          _0x4871bb(0x336) +
          _0x58353a[_0x4871bb(0x51e)](0x1) +
          _0x4871bb(0x330) +
          _0x288f6b["toFixed"](0x1) +
          _0x4871bb(0x66b) +
          escapeHtml(anonymousPeerLabel(_0x1ecbd0)) +
          "\x22>" +
          _0x56a692 +
          _0x4871bb(0x311)),
          _0x5d837e[_0x4871bb(0x3bc)]({
            "#": _0x5c6778 + 0x1,
            peer: anonymousPeerLabel(_0x1ecbd0),
            id: _0x1ecbd0["id"],
            mode: _0x3e0aac,
            "peer.lat": isFinite(_0x168ca8) ? _0x168ca8["toFixed"](0x5) : "—",
            "peer.lng": isFinite(_0x3b9d04) ? _0x3b9d04["toFixed"](0x5) : "—",
            realKm: _0x2ee42c == null ? "—" : _0x2ee42c[_0x4871bb(0x51e)](0x2),
            "bearing°":
              _0x194e6d == null ? "—" : _0x194e6d[_0x4871bb(0x51e)](0x1),
            "dist%": _0x4a73fb["toFixed"](0x1),
            "x%": _0x58353a["toFixed"](0x1),
            "y%": _0x288f6b[_0x4871bb(0x51e)](0x1),
            clamped: _0x3d4241,
            hot: _0x58138b,
            upgraded: _0x9a7ae,
          }));
      }));
    if (_0x5d837e[_0x3a2360(0x400)]) console["table"](_0x5d837e);
    else console[_0x3a2360(0x481)](_0x3a2360(0x34d));
    (console[_0x3a2360(0x280)](), (_0x36d972[_0x3a2360(0x1f2)] = _0x1ac90b));
    if (_0x1f159d[_0x3a2360(0x400)] === 0x0)
      _0x36d972[_0x3a2360(0x1f2)] += _0x3a2360(0x371);
    const _0x26e152 = $(_0x3a2360(0x38c));
    if (_0x26e152)
      _0x26e152[_0x3a2360(0x23a)] =
        "~" + analyticsCatchmentKm + _0x3a2360(0x440);
  }
  setText("catchmentInsightHeadline", _0x50adec[_0x3a2360(0x465)]);
  const _0x5323cb = $(_0x3a2360(0x743));
  _0x5323cb &&
    (_0x5323cb[_0x3a2360(0x23a)] =
      analyticsCatchmentKm <= 0x5
        ? "This\x20view\x20helps\x20you\x20tune\x20offers\x20for\x20people\x20already\x20close\x20enough\x20to\x20choose\x20between\x20you\x20and\x20one\x20nearby\x20competitor."
        : analyticsCatchmentKm <= 0xf
          ? _0x3a2360(0x32e)
          : _0x3a2360(0x763));
  (setText(
    _0x3a2360(0x292),
    "Main\x20demand\x20band:\x20" + _0x50adec[_0x3a2360(0x558)],
  ),
    setText(
      _0x3a2360(0x26b),
      "Nearby\x20peers:\x20" + _0x50adec[_0x3a2360(0x5c3)],
    ),
    setText(_0x3a2360(0x1fd), _0x3a2360(0x54c) + _0x50adec[_0x3a2360(0x4ad)]));
  const _0x3f4173 = buildRecommendations({
      myStats: _0x4874f8,
      peerStats: _0xc56bfc,
      peerTier: _0x31336b,
      peerPlacement: _0x18f8dd,
      catchmentSignal: _0x50adec,
    }),
    _0x55b231 = $(_0x3a2360(0x23e));
  if (_0x55b231)
    _0x55b231[_0x3a2360(0x1f2)] =
      _0x3f4173[_0x3a2360(0x400)] +
      _0x3a2360(0x594) +
      (_0x3f4173[_0x3a2360(0x400)] === 0x1 ? "" : "s") +
      _0x3a2360(0x1f4);
  const _0x2e19f6 = $(_0x3a2360(0x2a0));
  _0x2e19f6 &&
    (_0x2e19f6[_0x3a2360(0x1f2)] = _0x3f4173["map"](
      (_0x2c5c11) =>
        _0x3a2360(0x577) +
        _0x2c5c11[_0x3a2360(0x659)] +
        "\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22rec-priority-bar\x22></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22rec-icon\x22>" +
        escapeHtml(_0x2c5c11[_0x3a2360(0x262)] || "·") +
        _0x3a2360(0x308) +
        escapeHtml(_0x2c5c11[_0x3a2360(0x659)]) +
        _0x3a2360(0x70b) +
        escapeHtml(_0x2c5c11[_0x3a2360(0x6bb)]) +
        "</strong>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span>" +
        escapeHtml(_0x2c5c11["copy"]) +
        _0x3a2360(0x447),
    )["join"](""));
  const _0x53db4f = [
      ..._0x2b45fc,
      {
        partner: currentPartner,
        validations: _0x17b19a,
        activations: _0x1f280f,
        clicks: _0x5940ef,
        rewardCount: rewardRecords["length"],
        isYou: !![],
      },
    ][_0x3a2360(0x25c)](
      (_0x4f108a, _0x183245) =>
        _0x183245[_0x3a2360(0x34b)] - _0x4f108a[_0x3a2360(0x34b)] ||
        _0x183245[_0x3a2360(0x611)] - _0x4f108a[_0x3a2360(0x611)],
    ),
    _0x8b41c4 =
      _0x53db4f[_0x3a2360(0x6b6)]((_0x4de611) => _0x4de611[_0x3a2360(0x51c)]) +
      0x1,
    _0x530529 = _0x53db4f[_0x3a2360(0x605)](0x0, 0xa),
    _0x42f4d6 = $(_0x3a2360(0x49c));
  _0x42f4d6 &&
    (_0x42f4d6["innerHTML"] =
      _0x530529[_0x3a2360(0x21b)]((_0x517403, _0x222aef) => {
        const _0xad0791 = _0x3a2360,
          _0x22c8a2 = _0x517403["isYou"]
            ? currentPartner[_0xad0791(0x412)] || _0xad0791(0x33b)
            : anonymousPeerLabel(_0x517403["partner"]),
          _0x27c505 = _0x517403[_0xad0791(0x51c)]
            ? stationRecords
            : _0x2d4b1e[_0xad0791(0x5c7)][_0xad0791(0x274)]((_0x1e1cec) =>
                getStationPartnerIds(_0x1e1cec)[_0xad0791(0x2de)](
                  _0x517403[_0xad0791(0x489)]["id"],
                ),
              ),
          _0x33fdf8 = _0x27c505[_0xad0791(0x400)]
            ? getStationTier(_0x27c505[0x0])["id"]
            : _0xad0791(0x61c),
          _0x457d64 = _0x27c505[_0xad0791(0x2ac)](
            (_0x52811e, _0x3826fe) =>
              _0x52811e +
              Math["round"](Number(_0x3826fe[_0xad0791(0x561)] || 0x0) * 0x4),
            0x0,
          ),
          _0x55b947 =
            _0x517403[_0xad0791(0x34b)] > 0x5
              ? "up"
              : _0x517403[_0xad0791(0x34b)] > 0x0
                ? "flat"
                : "down",
          _0x4e3e96 =
            _0x55b947 === "up" ? "↑" : _0x55b947 === "down" ? "↓" : "—",
          _0x49c5cc =
            TIER_BY_ID[_0x33fdf8]?.[_0xad0791(0x410)] || _0xad0791(0x5d0),
          _0x51c5f5 = _0x517403[_0xad0791(0x51c)]
            ? rewardRecords
            : _0x2d4b1e["rewards"]["filter"](
                (_0x4be8b9) =>
                  _0x4be8b9["partnerId"] === _0x517403[_0xad0791(0x489)]["id"],
              ),
          _0x59424f = _0x51c5f5["map"]((_0x3d4fa7) =>
            Number(_0x3d4fa7[_0xad0791(0x2bb)] || 0x0),
          )
            ["filter"]((_0x5bda46) => _0x5bda46 > 0x0)
            [_0xad0791(0x25c)]((_0x454baf, _0x1bf7ce) => _0x454baf - _0x1bf7ce),
          _0x427ac5 = _0x59424f["length"]
            ? _0x59424f[Math[_0xad0791(0x645)](_0x59424f["length"] / 0x2)]
            : 0x0;
        return (
          _0xad0791(0x312) +
          (_0x517403["isYou"] ? "\x20class=\x22is-you\x22" : "") +
          _0xad0791(0x3dc) +
          (_0x222aef + 0x1) +
          _0xad0791(0x215) +
          escapeHtml(_0x22c8a2) +
          "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td><span\x20class=\x22lb-tier-pill\x20tier-" +
          _0x33fdf8 +
          "\x22>" +
          escapeHtml(_0x49c5cc) +
          "</span></td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>" +
          _0x517403[_0xad0791(0x611)] +
          "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>" +
          _0x517403[_0xad0791(0x34b)] +
          "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>" +
          _0x427ac5 +
          _0xad0791(0x642) +
          _0x457d64 +
          _0xad0791(0x71e) +
          _0x55b947 +
          "\x22>" +
          _0x4e3e96 +
          _0xad0791(0x6b1)
        );
      })["join"]("") || _0x3a2360(0x48a));
  const _0x1b0fbe = _0x42f4d6?.["closest"](_0x3a2360(0x7b4));
  if (_0x1b0fbe) {
    const _0x247798 = _0x1b0fbe[_0x3a2360(0x4db)](_0x3a2360(0x43c));
    if (_0x247798 && _0x8b41c4 > 0x0)
      _0x247798[_0x3a2360(0x23a)] =
        _0x3a2360(0x44a) +
        _0x8b41c4 +
        _0x3a2360(0x75b) +
        _0x53db4f[_0x3a2360(0x400)];
  }
  const _0x26ff87 = $("alertsList");
  if (_0x26ff87) {
    if (_0x2d4b1e[_0x3a2360(0x77a)]["length"] === 0x0)
      _0x26ff87["innerHTML"] = _0x3a2360(0x667);
    else {
      const _0x50b13e = [],
        _0x52ca06 = _0x1f280f;
      if (_0x2b45fc[_0x3a2360(0x400)] > 0x0) {
        const _0x2555d1 = _0x2b45fc[0x0];
        _0x4874f8[_0x3a2360(0x496)] > 0x0 &&
        _0x2555d1["activations"] > _0x52ca06 * 0x2
          ? _0x50b13e["push"]({
              cls: _0x3a2360(0x22c),
              time: _0x3a2360(0x37c),
              text:
                "<span\x20class=\x22alert-tag\x22>Critical</span><strong>" +
                escapeHtml(anonymousPeerLabel(_0x2555d1[_0x3a2360(0x489)])) +
                _0x3a2360(0x4e4) +
                _0x2555d1["activations"] +
                _0x3a2360(0x299),
            })
          : _0x50b13e[_0x3a2360(0x3bc)]({
              cls: _0x3a2360(0x615),
              time: _0x3a2360(0x48f),
              text:
                _0x3a2360(0x278) +
                _0x2555d1[_0x3a2360(0x611)] +
                _0x3a2360(0x331) +
                _0x2555d1[_0x3a2360(0x600)] +
                _0x3a2360(0x4eb) +
                (_0x2555d1[_0x3a2360(0x600)] === 0x1 ? "" : "s") +
                ".",
            });
      }
      const _0x24360b = _0x2d4b1e[_0x3a2360(0x5c7)]["filter"](
        (_0x188a2a) =>
          _0x188a2a[_0x3a2360(0x520)] && _0x188a2a["tier"] !== _0x3a2360(0x61c),
      )["length"];
      if (
        _0x2d4b1e[_0x3a2360(0x5c7)][_0x3a2360(0x400)] > 0x0 &&
        _0x24360b > 0x0
      ) {
        const _0x1a88dc = Math[_0x3a2360(0x369)](
          (_0x24360b / _0x2d4b1e[_0x3a2360(0x5c7)][_0x3a2360(0x400)]) * 0x64,
        );
        _0x50b13e[_0x3a2360(0x3bc)]({
          cls: "",
          time: "Rolling",
          text:
            "<span\x20class=\x22alert-tag\x22>Tier\x20intel</span><strong>" +
            _0x1a88dc +
            _0x3a2360(0x28a),
        });
      }
      const _0xda0b48 = _0x2d4b1e["rewards"][_0x3a2360(0x400)]
        ? Math[_0x3a2360(0x369)](
            (_0x2d4b1e[_0x3a2360(0x4a4)][_0x3a2360(0x274)](isSponsoredReward)[
              _0x3a2360(0x400)
            ] /
              _0x2d4b1e[_0x3a2360(0x4a4)][_0x3a2360(0x400)]) *
              0x64,
          )
        : 0x0;
      (_0xda0b48 > 0x1e &&
        _0x4874f8[_0x3a2360(0x3c7)] < 0.1 &&
        _0x4874f8[_0x3a2360(0x496)] > 0x0 &&
        _0x50b13e[_0x3a2360(0x3bc)]({
          cls: "",
          time: _0x3a2360(0x5e9),
          text:
            "<span\x20class=\x22alert-tag\x22>Market</span><strong>" +
            _0xda0b48 +
            _0x3a2360(0x631),
        }),
        _0xc56bfc[_0x3a2360(0x2fd)] > 0x0 &&
          _0x4874f8["count"] > 0x0 &&
          _0x4874f8[_0x3a2360(0x2fd)] < _0xc56bfc[_0x3a2360(0x2fd)] * 0.6 &&
          _0x50b13e[_0x3a2360(0x3bc)]({
            cls: _0x3a2360(0x22c),
            time: _0x3a2360(0x688),
            text:
              _0x3a2360(0x529) +
              Math["round"](_0x4874f8[_0x3a2360(0x2fd)] * 0x64) +
              _0x3a2360(0x28e) +
              Math[_0x3a2360(0x369)](_0xc56bfc[_0x3a2360(0x2fd)] * 0x64) +
              _0x3a2360(0x4bf),
          }),
        !_0x50b13e["length"] &&
          _0x50b13e[_0x3a2360(0x3bc)]({
            cls: _0x3a2360(0x615),
            time: "All\x20clear",
            text: "<span\x20class=\x22alert-tag\x22>Status</span>No\x20critical\x20signals\x20detected.\x20<strong>Keep\x20publishing</strong>\x20to\x20maintain\x20visibility.",
          }),
        (_0x26ff87[_0x3a2360(0x1f2)] = _0x50b13e[_0x3a2360(0x21b)](
          (_0x3b9c31) =>
            "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22alert" +
            (_0x3b9c31[_0x3a2360(0x296)]
              ? "\x20" + _0x3b9c31[_0x3a2360(0x296)]
              : "") +
            _0x3a2360(0x4bc) +
            escapeHtml(_0x3b9c31["time"]) +
            "</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22alert-text\x22>" +
            _0x3b9c31["text"] +
            _0x3a2360(0x7bb),
        )[_0x3a2360(0x376)]("")));
    }
  }
  const _0x59d82c = $(_0x3a2360(0x4ab));
  if (_0x59d82c) {
    const _0x59270a =
        _0x5940ef > 0x0 ? Math["round"]((_0x1f280f / _0x5940ef) * 0x64) : 0x0,
      _0x17649d =
        _0x1f280f > 0x0
          ? Math[_0x3a2360(0x369)]((_0x17b19a / _0x1f280f) * 0x64)
          : 0x0,
      _0x2d4000 = rewardRecords[_0x3a2360(0x21b)]((_0x57dc8c) =>
        Number(_0x57dc8c["cost"] || 0x0),
      )
        ["filter"]((_0x120703) => _0x120703 > 0x0)
        [_0x3a2360(0x25c)]((_0x5b24d8, _0x251ba8) => _0x5b24d8 - _0x251ba8),
      _0x2ecf89 = _0x2d4000[_0x3a2360(0x400)]
        ? _0x2d4000[Math[_0x3a2360(0x645)](_0x2d4000["length"] / 0x2)]
        : 0x0,
      _0x7f1bb1 = _0x2b45fc[_0x3a2360(0x605)](0x0, 0x4),
      _0x4a6cd5 = [
        ..._0x7f1bb1[_0x3a2360(0x21b)]((_0x582a82) => {
          const _0x178584 = _0x3a2360,
            _0x46adde =
              _0x582a82[_0x178584(0x2e7)] > 0x0
                ? Math[_0x178584(0x369)](
                    (_0x582a82[_0x178584(0x611)] /
                      _0x582a82[_0x178584(0x2e7)]) *
                      0x64,
                  )
                : 0x0,
            _0x2712a8 =
              _0x582a82[_0x178584(0x611)] > 0x0
                ? Math["round"](
                    (_0x582a82[_0x178584(0x34b)] /
                      _0x582a82[_0x178584(0x611)]) *
                      0x64,
                  )
                : 0x0,
            _0x98c7b6 = _0x2d4b1e[_0x178584(0x4a4)]["filter"](
              (_0x435fe0) =>
                _0x435fe0["partnerId"] === _0x582a82["partner"]["id"],
            ),
            _0x8440fb = _0x98c7b6["map"]((_0x2515dc) =>
              Number(_0x2515dc[_0x178584(0x2bb)] || 0x0),
            )
              ["filter"]((_0x1cf6a4) => _0x1cf6a4 > 0x0)
              [_0x178584(0x25c)]((_0x1b0082, _0xe1edd) => _0x1b0082 - _0xe1edd),
            _0x2c9bfc = _0x8440fb[_0x178584(0x400)]
              ? _0x8440fb[Math["floor"](_0x8440fb[_0x178584(0x400)] / 0x2)]
              : 0x0;
          return {
            label: anonymousPeerLabel(_0x582a82[_0x178584(0x489)]),
            isYou: ![],
            values: [
              _0x582a82[_0x178584(0x611)],
              _0x582a82[_0x178584(0x2e7)],
              _0x46adde,
              _0x2712a8,
              _0x2c9bfc,
            ],
          };
        }),
        {
          label: currentPartner["companyName"] || _0x3a2360(0x33b),
          isYou: !![],
          values: [_0x1f280f, _0x5940ef, _0x59270a, _0x17649d, _0x2ecf89],
        },
      ];
    if (_0x4a6cd5["length"] < 0x2) _0x59d82c["innerHTML"] = _0x3a2360(0x23b);
    else {
      const _0x3954d8 = [
          _0x3a2360(0x267),
          _0x3a2360(0x52b),
          "Conv%",
          _0x3a2360(0x73f),
          "Cost\x20Cycl\x20Coins",
        ],
        _0x587edd = _0x4a6cd5[_0x3a2360(0x21b)]((_0xc34a0) =>
          _0xc34a0[_0x3a2360(0x3f4)][_0x3a2360(0x605)](),
        );
      for (let _0x19f19a = 0x0; _0x19f19a < 0x5; _0x19f19a++) {
        const _0x2dcc99 = _0x4a6cd5[_0x3a2360(0x21b)](
            (_0xfb8ab) => _0xfb8ab["values"][_0x19f19a],
          ),
          _0x397fd7 = Math[_0x3a2360(0x406)](..._0x2dcc99),
          _0x5090d5 = Math["max"](..._0x2dcc99) - _0x397fd7 || 0x1;
        _0x4a6cd5[_0x3a2360(0x49f)]((_0x8729b1, _0x2104a4) => {
          const _0x3f84e1 = _0x3a2360;
          let _0x25c717 = Math[_0x3f84e1(0x369)](
            ((_0x8729b1[_0x3f84e1(0x3f4)][_0x19f19a] - _0x397fd7) / _0x5090d5) *
              0x64,
          );
          if (_0x19f19a === 0x4) _0x25c717 = 0x64 - _0x25c717;
          _0x587edd[_0x2104a4][_0x19f19a] = Math[_0x3f84e1(0x72c)](
            0x0,
            Math[_0x3f84e1(0x406)](0x64, _0x25c717),
          );
        });
      }
      const _0x459e73 = (_0x6c4508, _0x1ce438) => {
        const _0x4f0aa3 = _0x3a2360;
        if (_0x6c4508 >= 0x4b)
          return _0x1ce438 ? _0x4f0aa3(0x702) : _0x4f0aa3(0x40c);
        if (_0x6c4508 >= 0x32) return _0x4f0aa3(0x77d);
        if (_0x6c4508 >= 0x19) return _0x4f0aa3(0x3ef);
        return _0x4f0aa3(0x538);
      };
      let _0x5212d0 = _0x3a2360(0x61f);
      ((_0x5212d0 += _0x3954d8[_0x3a2360(0x21b)](
        (_0x544668) =>
          "<div\x20class=\x22h-col-label\x22>" +
          escapeHtml(_0x544668) +
          "</div>",
      )[_0x3a2360(0x376)]("")),
        _0x4a6cd5[_0x3a2360(0x49f)]((_0x32d915, _0x4e0e05) => {
          const _0x5d8aa5 = _0x3a2360;
          ((_0x5212d0 +=
            _0x5d8aa5(0x74f) +
            (_0x32d915[_0x5d8aa5(0x51c)] ? _0x5d8aa5(0x58f) : "") +
            "\x22>" +
            escapeHtml(_0x32d915[_0x5d8aa5(0x49a)]) +
            "</div>"),
            (_0x5212d0 += _0x32d915[_0x5d8aa5(0x3f4)]
              ["map"]((_0x2f2de0, _0x5a3b12) => {
                const _0x5a797a = _0x5d8aa5,
                  _0x12f80e =
                    _0x5a3b12 === 0x2 || _0x5a3b12 === 0x3
                      ? _0x2f2de0 + "%"
                      : _0x5a3b12 === 0x4
                        ? _0x2f2de0 + "\x20Cycl\x20Coins"
                        : String(_0x2f2de0);
                return (
                  _0x5a797a(0x5c5) +
                  _0x459e73(
                    _0x587edd[_0x4e0e05][_0x5a3b12],
                    _0x32d915["isYou"],
                  ) +
                  "\x22>" +
                  escapeHtml(_0x12f80e) +
                  _0x5a797a(0x311)
                );
              })
              [_0x5d8aa5(0x376)]("")));
        }),
        (_0x59d82c[_0x3a2360(0x1f2)] = _0x5212d0));
    }
  }
  const _0x386274 = (_0x31cc41, _0x29ec2c) => setText(_0x31cc41, _0x29ec2c),
    _0x1b6e95 = (_0xcaa0d2, _0x413ef4) => {
      const _0xc629a7 = _0x3a2360;
      (_0x386274(_0xc629a7(0x2b7), String(_0xcaa0d2["distinctUsers"])),
        _0x386274(
          _0xc629a7(0x7a0),
          Math[_0xc629a7(0x369)](_0xcaa0d2["repeatRate"] * 0x64) + "%",
        ),
        _0x386274(_0xc629a7(0x7b2), _0xcaa0d2["avgPerUser"]["toFixed"](0x1)));
      const _0x3f7870 = $(_0xc629a7(0x6fa)),
        _0x4c9049 = $(_0xc629a7(0x67d)),
        _0x29fff2 = $("cohortSegFivePlus");
      if (_0x3f7870 && _0x4c9049 && _0x29fff2) {
        const _0x17997c = Math[_0xc629a7(0x72c)](
          0x1,
          _0xcaa0d2[_0xc629a7(0x2d4)]["one"] +
            _0xcaa0d2["cohorts"]["twoFour"] +
            _0xcaa0d2["cohorts"][_0xc629a7(0x253)],
        );
        ((_0x3f7870["style"][_0xc629a7(0x304)] = String(
          _0xcaa0d2[_0xc629a7(0x2d4)][_0xc629a7(0x4b0)],
        )),
          (_0x4c9049["style"][_0xc629a7(0x304)] = String(
            _0xcaa0d2[_0xc629a7(0x2d4)][_0xc629a7(0x6d1)],
          )),
          (_0x29fff2[_0xc629a7(0x752)][_0xc629a7(0x304)] = String(
            _0xcaa0d2["cohorts"]["fivePlus"],
          )),
          (_0x3f7870[_0xc629a7(0x23a)] = _0xcaa0d2[_0xc629a7(0x2d4)][
            _0xc629a7(0x4b0)
          ]
            ? Math[_0xc629a7(0x369)](
                (_0xcaa0d2[_0xc629a7(0x2d4)][_0xc629a7(0x4b0)] / _0x17997c) *
                  0x64,
              ) + "%"
            : ""),
          (_0x4c9049[_0xc629a7(0x23a)] = _0xcaa0d2[_0xc629a7(0x2d4)]["twoFour"]
            ? Math[_0xc629a7(0x369)](
                (_0xcaa0d2[_0xc629a7(0x2d4)][_0xc629a7(0x6d1)] / _0x17997c) *
                  0x64,
              ) + "%"
            : ""),
          (_0x29fff2[_0xc629a7(0x23a)] = _0xcaa0d2[_0xc629a7(0x2d4)][
            _0xc629a7(0x253)
          ]
            ? Math["round"](
                (_0xcaa0d2[_0xc629a7(0x2d4)][_0xc629a7(0x253)] / _0x17997c) *
                  0x64,
              ) + "%"
            : ""));
      }
      (setText(_0xc629a7(0x4ae), String(_0xcaa0d2["cohorts"]["one"])),
        setText(
          _0xc629a7(0x45f),
          String(_0xcaa0d2[_0xc629a7(0x2d4)]["twoFour"]),
        ),
        setText(
          _0xc629a7(0x29c),
          String(_0xcaa0d2[_0xc629a7(0x2d4)][_0xc629a7(0x253)]),
        ));
      const _0x5a6240 = $(_0xc629a7(0x2bc));
      if (_0x5a6240) {
        if (_0xcaa0d2[_0xc629a7(0x226)][_0xc629a7(0x400)] === 0x0)
          _0x5a6240[_0xc629a7(0x1f2)] = _0xc629a7(0x584);
        else {
          const _0x4855ba = Math[_0xc629a7(0x72c)](
            0x1,
            ..._0xcaa0d2[_0xc629a7(0x226)][_0xc629a7(0x21b)](
              (_0x4dba8c) => _0x4dba8c["count"],
            ),
          );
          _0x5a6240[_0xc629a7(0x1f2)] = _0xcaa0d2[_0xc629a7(0x226)]
            [
              _0xc629a7(0x21b)
            ]((_0x397b26, _0x2b6d18) => _0xc629a7(0x2b4) + (_0x2b6d18 + 0x1) + _0xc629a7(0x7c1) + escapeHtml(shortUserId(_0x397b26["userId"])) + _0xc629a7(0x682) + _0x397b26[_0xc629a7(0x496)] + _0xc629a7(0x5e4) + (_0x397b26[_0xc629a7(0x496)] === 0x1 ? "" : "s") + "\x20in\x20last\x2090d</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22recycler-bar\x22><span\x20style=\x22width:" + Math[_0xc629a7(0x72c)](0x8, Math[_0xc629a7(0x369)]((_0x397b26[_0xc629a7(0x496)] / _0x4855ba) * 0x64)) + _0xc629a7(0x208) + _0x397b26["count"] + "<small>RECYCLES</small></span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20")
            ["join"]("");
        }
      }
      const _0x1225ec = $("kpiRepeat");
      if (_0x1225ec) {
        const _0x2d90f0 = _0x1225ec["querySelector"](_0xc629a7(0x72b)),
          _0x34a681 = _0x1225ec["querySelector"](_0xc629a7(0x502));
        if (_0x2d90f0)
          _0x2d90f0[_0xc629a7(0x23a)] =
            Math["round"](_0xcaa0d2[_0xc629a7(0x694)] * 0x64) + "%";
        _0x34a681 &&
          (_0x413ef4 === null
            ? (_0x34a681[_0xc629a7(0x1f2)] =
                _0xc629a7(0x6f1) +
                _0xcaa0d2[_0xc629a7(0x380)] +
                _0xc629a7(0x2c2))
            : (_0x34a681[_0xc629a7(0x1f2)] =
                _0xc629a7(0x6fb) +
                Math[_0xc629a7(0x369)](_0x413ef4 * 0x64) +
                _0xc629a7(0x7b0)));
        _0x1225ec[_0xc629a7(0x5a3)]["remove"]("is-pos", _0xc629a7(0x6af));
        if (_0xcaa0d2[_0xc629a7(0x380)] > 0x0) {
          if (_0x413ef4 !== null && _0xcaa0d2[_0xc629a7(0x694)] >= _0x413ef4)
            _0x1225ec["classList"][_0xc629a7(0x767)]("is-pos");
          else {
            if (
              _0x413ef4 !== null &&
              _0xcaa0d2[_0xc629a7(0x694)] < _0x413ef4 * 0.7
            )
              _0x1225ec[_0xc629a7(0x5a3)][_0xc629a7(0x767)]("is-neg");
            else
              _0xcaa0d2[_0xc629a7(0x694)] >= 0.25 &&
                _0x1225ec["classList"]["add"](_0xc629a7(0x472));
          }
        }
      }
    };
  (_0x1b6e95(
    {
      distinctUsers: 0x0,
      repeatUsers: 0x0,
      repeatRate: 0x0,
      avgPerUser: 0x0,
      totalRecycles: 0x0,
      cohorts: { one: 0x0, twoFour: 0x0, fivePlus: 0x0 },
      topUsers: [],
    },
    null,
  ),
    ensureCaptureData(force)
      [_0x3a2360(0x282)]((_0xf72284) => {
        const _0x41e35d = _0x3a2360,
          _0x52f232 = stationRecords[_0x41e35d(0x21b)](
            (_0x3fcdf2) => _0x3fcdf2["id"],
          ),
          _0x1faad3 = _0x2d4b1e["stations"][_0x41e35d(0x21b)](
            (_0x226f0b) => _0x226f0b["id"],
          ),
          _0x259e0c = computeRepeatStats(
            _0xf72284[_0x41e35d(0x1fb)],
            _0x52f232,
          ),
          _0x53f4a6 = computePeerRepeatRateMedian(
            _0xf72284["peerSample"],
            _0x2d4b1e,
          );
        _0x1b6e95(_0x259e0c, _0x53f4a6);
      })
      ["catch"]((_0x35e3d4) => {
        const _0x307a82 = _0x3a2360;
        console[_0x307a82(0x4fb)](
          "Could\x20not\x20load\x20capture\x20data:",
          _0x35e3d4,
        );
      }));
  const _0x550fbe = $(_0x3a2360(0x2b2));
  if (_0x550fbe) {
    const _0x3278fd = currentPartner["id"]
        ["split"]("")
        [
          _0x3a2360(0x2ac)
        ]((_0x20f589, _0x25db12) => _0x20f589 + _0x25db12[_0x3a2360(0x553)](0x0), 0x0),
      _0x5a3b6d = (_0x37887f) => {
        const _0x261fa0 = _0x3a2360,
          _0x2d0eae =
            Math[_0x261fa0(0x2c1)](
              (_0x3278fd + _0x37887f) * 127.1 + _0x37887f * 311.7,
            ) * 43758.5453;
        return Math[_0x261fa0(0x390)](
          _0x2d0eae - Math[_0x261fa0(0x645)](_0x2d0eae),
        );
      },
      _0x1d33e4 = Math["max"](Math[_0x3a2360(0x369)](_0x2beb64 / 0x8), 0x1),
      _0x2f2f87 = Math["max"](Math[_0x3a2360(0x369)](_0x161072 / 0x8), 0x1),
      _0x2b5d7a = Array["from"]({ length: 0xc }, (_0x5d54e9, _0x4b5819) => {
        const _0x1eed8b = _0x3a2360,
          _0xe5fd28 = 0.55 + (_0x4b5819 / 0xb) * 0.85;
        return {
          you: Math[_0x1eed8b(0x72c)](
            0x0,
            Math["round"](
              _0x1d33e4 *
                _0xe5fd28 *
                (0.55 + _0x5a3b6d(_0x4b5819 * 0x2) * 0.95),
            ),
          ),
          peer: Math[_0x1eed8b(0x72c)](
            0x0,
            Math["round"](
              _0x2f2f87 *
                _0xe5fd28 *
                (0.65 + _0x5a3b6d(_0x4b5819 * 0x2 + 0x1) * 0.7),
            ),
          ),
          week: "W" + String(_0x4b5819 + 0x1)[_0x1eed8b(0x4af)](0x2, "0"),
        };
      }),
      _0x50a919 = Math[_0x3a2360(0x72c)](
        0x1,
        ..._0x2b5d7a[_0x3a2360(0x748)]((_0x2c35d9) => [
          _0x2c35d9["you"],
          _0x2c35d9[_0x3a2360(0x54d)],
        ]),
      ),
      _0x4e2e0d = 0x6e;
    _0x550fbe["innerHTML"] = _0x2b5d7a[_0x3a2360(0x21b)]((_0x554df1) => {
      const _0x877d6e = _0x3a2360,
        _0x3a3736 = Math[_0x877d6e(0x72c)](
          0x2,
          Math[_0x877d6e(0x369)](
            (_0x554df1[_0x877d6e(0x528)] / _0x50a919) * _0x4e2e0d,
          ),
        ),
        _0x2b2871 = Math[_0x877d6e(0x72c)](
          0x2,
          Math["round"]((_0x554df1[_0x877d6e(0x54d)] / _0x50a919) * _0x4e2e0d),
        );
      return (
        _0x877d6e(0x322) +
        _0x3a3736 +
        _0x877d6e(0x395) +
        _0x2b2871 +
        _0x877d6e(0x684) +
        _0x554df1["week"] +
        _0x877d6e(0x704)
      );
    })[_0x3a2360(0x376)]("");
  }
  const _0x147b16 = Math["max"](
      0x1,
      ..._0x4f2dc5[_0x3a2360(0x21b)](([, _0x5d5b86]) => _0x5d5b86),
    ),
    _0x30b8c2 = $(_0x3a2360(0x6de));
  (_0x30b8c2 &&
    (_0x30b8c2[_0x3a2360(0x1f2)] =
      _0x4f2dc5[_0x3a2360(0x21b)](
        ([_0x1d0757, _0xaedb2]) =>
          _0x3a2360(0x3b0) +
          escapeHtml(_0x1d0757) +
          _0x3a2360(0x4e8) +
          Math[_0x3a2360(0x369)]((_0xaedb2 / _0x147b16) * 0x64) +
          "%\x22></span></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22theme-score\x22>" +
          Math[_0x3a2360(0x369)](_0xaedb2) +
          _0x3a2360(0x570),
      )[_0x3a2360(0x376)]("") || _0x3a2360(0x5d9)),
    [_0x3a2360(0x4e3), "stationDeepBody"][_0x3a2360(0x49f)]((_0x93ef70) => {
      const _0x21b77b = _0x3a2360,
        _0x71bca3 = $(_0x93ef70);
      if (_0x71bca3)
        _0x71bca3[_0x21b77b(0x1f2)] =
          "<tr><td\x20colspan=\x229\x22><div\x20class=\x22empty-state\x22\x20style=\x22padding:12px\x200\x22>Loading…</div></td></tr>";
    }),
    [
      _0x3a2360(0x6ec),
      _0x3a2360(0x6f9),
      "demoRewardGender",
      "demoStationGender",
    ][_0x3a2360(0x49f)]((_0x340247) => {
      const _0x422b50 = _0x3a2360,
        _0x257097 = $(_0x340247);
      if (_0x257097)
        _0x257097[_0x422b50(0x1f2)] =
          "<div\x20class=\x22empty-state\x22\x20style=\x22font-size:12px;padding:12px\x200\x22>Loading…</div>";
    }),
    loadDemographics(force)[_0x3a2360(0x282)]((_0x4ff9af) =>
      renderDemographics(_0x4ff9af),
    ));
}
let demographicsCache = null;
async function loadDemographics(_0x43871e = ![]) {
  const _0x528d59 = _0x562b0b;
  if (demographicsCache && !_0x43871e) return demographicsCache;
  if (!currentPartner) return null;
  try {
    const _0x358a15 = await getDocs(
        query(
          collection(db, _0x528d59(0x276)),
          where(_0x528d59(0x6b7), "==", currentPartner["id"]),
          _0x4330f9(0x12c),
        ),
      ),
      _0x437859 = _0x358a15[_0x528d59(0x328)][_0x528d59(0x21b)](
        (_0x599885) => ({ id: _0x599885["id"], ..._0x599885["data"]() }),
      ),
      _0x110403 = stationRecords[_0x528d59(0x21b)](
        (_0x941c6c) => _0x941c6c["id"],
      ),
      _0x5f3c51 = [];
    if (_0x110403["length"] > 0x0) {
      const _0x5b78d3 = [];
      for (
        let _0x1918f1 = 0x0;
        _0x1918f1 < _0x110403["length"];
        _0x1918f1 += 0xa
      )
        _0x5b78d3[_0x528d59(0x3bc)](
          _0x110403[_0x528d59(0x605)](_0x1918f1, _0x1918f1 + 0xa),
        );
      await Promise["all"](
        _0x5b78d3[_0x528d59(0x21b)](async (_0x29bcbe) => {
          const _0x2906c1 = _0x528d59,
            _0x375937 = await getDocs(
              query(
                collection(db, _0x2906c1(0x5f7)),
                where(_0x2906c1(0x768), "in", _0x29bcbe),
                _0x4330f9(0xc8),
              ),
            );
          _0x375937["docs"]["forEach"]((_0x3423a8) =>
            _0x5f3c51["push"]({
              id: _0x3423a8["id"],
              ..._0x3423a8[_0x2906c1(0x787)](),
            }),
          );
        }),
      );
    }
    const _0x57da62 = [
        ...new Set(
          _0x437859[_0x528d59(0x21b)](
            (_0x3f3b63) => _0x3f3b63[_0x528d59(0x6a4)],
          )[_0x528d59(0x274)](Boolean),
        ),
      ],
      _0x205cc5 = [
        ...new Set(
          _0x5f3c51["map"]((_0x3cbbd0) => _0x3cbbd0[_0x528d59(0x6a4)])[
            _0x528d59(0x274)
          ](Boolean),
        ),
      ],
      _0x492c5a = [...new Set([..._0x57da62, ..._0x205cc5])]["slice"](
        0x0,
        0x96,
      ),
      _0xbdd848 = {};
    return (
      await Promise[_0x528d59(0x47b)](
        _0x492c5a[_0x528d59(0x21b)](async (_0x4221c4) => {
          const _0x294f8c = _0x528d59;
          try {
            const _0x5c987e = await getDoc(
              doc(db, _0x294f8c(0x40a), _0x4221c4),
            );
            if (_0x5c987e[_0x294f8c(0x448)]())
              _0xbdd848[_0x4221c4] = _0x5c987e["data"]();
          } catch (_0x2c22e5) {}
        }),
      ),
      (demographicsCache = {
        couponLogs: _0x437859,
        captureLogs: _0x5f3c51,
        userProfiles: _0xbdd848,
        rewardUserIds: _0x57da62,
        stationUserIds: _0x205cc5,
      }),
      demographicsCache
    );
  } catch (_0x3a9de0) {
    return (console[_0x528d59(0x222)](_0x528d59(0x5ea), _0x3a9de0), null);
  }
}
function getUserAge(_0xd4019b) {
  const _0x12edd4 = _0x562b0b;
  if (!_0xd4019b) return null;
  if (
    typeof _0xd4019b[_0x12edd4(0x769)] === "number" &&
    _0xd4019b[_0x12edd4(0x769)] > 0x0
  )
    return _0xd4019b[_0x12edd4(0x769)];
  const {
    yearOfBirth: _0x42cd9a,
    monthOfBirth: _0x4d4228,
    dayOfBirth: _0x1e4d4d,
  } = _0xd4019b;
  if (!_0x42cd9a) return null;
  const _0x52e61d = new Date();
  let _0x1d18b9 = _0x52e61d[_0x12edd4(0x315)]() - Number(_0x42cd9a);
  const _0x5978d8 = _0x52e61d["getMonth"]() + 0x1;
  if (
    _0x5978d8 < (_0x4d4228 || 0x1) ||
    (_0x5978d8 === (_0x4d4228 || 0x1) &&
      _0x52e61d[_0x12edd4(0x4d1)]() < (_0x1e4d4d || 0x1))
  )
    _0x1d18b9--;
  return _0x1d18b9 >= 0x0 ? _0x1d18b9 : null;
}
function getAgeBracket(_0x182c27) {
  const _0x348e61 = _0x562b0b;
  if (_0x182c27 === null || _0x182c27 === undefined) return null;
  if (_0x182c27 < 0x12) return _0x348e61(0x446);
  if (_0x182c27 <= 0x18) return _0x348e61(0x4f1);
  if (_0x182c27 <= 0x22) return _0x348e61(0x4a0);
  if (_0x182c27 <= 0x2c) return _0x348e61(0x753);
  if (_0x182c27 <= 0x36) return _0x348e61(0x320);
  return _0x348e61(0x68c);
}
function renderAgeBars(_0x1d54ec, _0x361013) {
  const _0xb486fd = _0x562b0b,
    _0x13c209 = $(_0x1d54ec);
  if (!_0x13c209) return;
  const _0x4b5824 = [
      "<18",
      _0xb486fd(0x4f1),
      "25–34",
      _0xb486fd(0x753),
      _0xb486fd(0x320),
      _0xb486fd(0x68c),
    ],
    _0x4a87b0 = Object[_0xb486fd(0x3f4)](_0x361013)["reduce"](
      (_0x63a27a, _0x127e38) => _0x63a27a + _0x127e38,
      0x0,
    );
  if (_0x4a87b0 === 0x0) {
    _0x13c209[_0xb486fd(0x1f2)] = _0xb486fd(0x500);
    return;
  }
  const _0x26af28 = Math[_0xb486fd(0x72c)](0x1, ...Object["values"](_0x361013));
  _0x13c209["innerHTML"] = _0x4b5824["map"]((_0x3dbcf5) => {
    const _0x319409 = _0xb486fd,
      _0x3e65a6 = _0x361013[_0x3dbcf5] || 0x0,
      _0x4b04c8 = Math[_0x319409(0x72c)](
        _0x3e65a6 > 0x0 ? 0x5 : 0x0,
        Math["round"]((_0x3e65a6 / _0x26af28) * 0x64),
      );
    return (
      _0x319409(0x5e0) +
      escapeHtml(_0x3dbcf5) +
      _0x319409(0x71c) +
      _0x4b04c8 +
      _0x319409(0x42f) +
      _0x3e65a6 +
      _0x319409(0x21e)
    );
  })["join"]("");
}
function renderGenderBars(_0x1953c0, _0x74b663) {
  const _0x5fc2ee = _0x562b0b,
    _0x40e8e8 = $(_0x1953c0);
  if (!_0x40e8e8) return;
  const _0x5cf76b = Object[_0x5fc2ee(0x3f4)](_0x74b663)[_0x5fc2ee(0x2ac)](
    (_0x5aab41, _0x4a994f) => _0x5aab41 + _0x4a994f,
    0x0,
  );
  if (_0x5cf76b === 0x0) {
    _0x40e8e8[_0x5fc2ee(0x1f2)] = _0x5fc2ee(0x707);
    return;
  }
  const _0x2d7b18 = {
    male: _0x5fc2ee(0x2ab),
    female: _0x5fc2ee(0x3b3),
    other: _0x5fc2ee(0x742),
  };
  _0x40e8e8[_0x5fc2ee(0x1f2)] = Object[_0x5fc2ee(0x79a)](_0x74b663)
    [_0x5fc2ee(0x25c)](
      (_0x335332, _0x3f2416) => _0x3f2416[0x1] - _0x335332[0x1],
    )
    [_0x5fc2ee(0x21b)](([_0x19cb92, _0x268ade]) => {
      const _0x3d9d7a = _0x5fc2ee,
        _0x42a1b5 = Math[_0x3d9d7a(0x369)]((_0x268ade / _0x5cf76b) * 0x64),
        _0xd08676 = _0x2d7b18[_0x19cb92] || _0x3d9d7a(0x2fe);
      return (
        "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22demo-gender-row\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22demo-gender-label\x22>" +
        escapeHtml(_0x19cb92) +
        _0x3d9d7a(0x432) +
        _0xd08676 +
        _0x3d9d7a(0x423) +
        Math[_0x3d9d7a(0x72c)](0x5, _0x42a1b5) +
        _0x3d9d7a(0x756) +
        _0x42a1b5 +
        "%</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>"
      );
    })
    [_0x5fc2ee(0x376)]("");
}
function buildAgeGenderMaps(_0x312f0a, _0x52b04b) {
  const _0x48e28e = {},
    _0x49cdcf = {};
  let _0x15a9a0 = 0x0;
  return (
    _0x312f0a["forEach"]((_0x5b7c06) => {
      const _0x2b3d70 = _0x2558,
        _0x3f2b05 = _0x52b04b[_0x5b7c06];
      if (!_0x3f2b05) return;
      _0x15a9a0++;
      const _0x3e66c5 = getAgeBracket(getUserAge(_0x3f2b05));
      if (_0x3e66c5) _0x48e28e[_0x3e66c5] = (_0x48e28e[_0x3e66c5] || 0x0) + 0x1;
      const _0x44e9dc = (_0x3f2b05[_0x2b3d70(0x5c0)] || "")
        [_0x2b3d70(0x374)]()
        ["trim"]();
      if (_0x44e9dc) _0x49cdcf[_0x44e9dc] = (_0x49cdcf[_0x44e9dc] || 0x0) + 0x1;
    }),
    { ageMap: _0x48e28e, genderMap: _0x49cdcf, withProfile: _0x15a9a0 }
  );
}
function renderDemographics(_0x296676) {
  const _0x25d02e = _0x562b0b,
    _0x3b73fe =
      "<div\x20class=\x22empty-state\x22\x20style=\x22font-size:12px;padding:12px\x200\x22>No\x20data\x20yet.</div>";
  if (!_0x296676) {
    [_0x25d02e(0x6ec), _0x25d02e(0x6f9), _0x25d02e(0x6e1), _0x25d02e(0x200)][
      _0x25d02e(0x49f)
    ]((_0x36ea0e) => {
      const _0x208417 = _0x25d02e,
        _0x2c546d = $(_0x36ea0e);
      if (_0x2c546d) _0x2c546d[_0x208417(0x1f2)] = _0x3b73fe;
    });
    return;
  }
  const {
      couponLogs: _0x2b4d33,
      captureLogs: _0x1b98b0,
      userProfiles: _0xc34599,
      rewardUserIds: _0x512480,
      stationUserIds: _0x4b2f9e,
    } = _0x296676,
    _0x2922da = buildAgeGenderMaps(_0x512480, _0xc34599);
  (setText(
    _0x25d02e(0x516),
    _0x2922da[_0x25d02e(0x4ec)] +
      _0x25d02e(0x5bb) +
      (_0x2922da["withProfile"] === 0x1 ? "" : "s"),
  ),
    renderAgeBars("demoRewardAge", _0x2922da[_0x25d02e(0x444)]),
    renderGenderBars(_0x25d02e(0x6e1), _0x2922da[_0x25d02e(0x569)]));
  const _0x4539b5 = buildAgeGenderMaps(_0x4b2f9e, _0xc34599);
  (setText(
    _0x25d02e(0x5f2),
    _0x4539b5[_0x25d02e(0x4ec)] +
      "\x20visitor" +
      (_0x4539b5["withProfile"] === 0x1 ? "" : "s"),
  ),
    renderAgeBars("demoStationAge", _0x4539b5[_0x25d02e(0x444)]),
    renderGenderBars(_0x25d02e(0x200), _0x4539b5[_0x25d02e(0x569)]));
  const _0x54ef3f = $(_0x25d02e(0x4e3));
  if (_0x54ef3f) {
    if (rewardRecords[_0x25d02e(0x400)] === 0x0)
      _0x54ef3f[_0x25d02e(0x1f2)] = _0x25d02e(0x38b);
    else {
      const _0x5f160b = {};
      (_0x2b4d33[_0x25d02e(0x49f)]((_0x3368e4) => {
        const _0x4538a3 = _0x25d02e;
        if (!_0x3368e4[_0x4538a3(0x62f)] || !_0x3368e4["userId"]) return;
        (_0x5f160b[_0x3368e4[_0x4538a3(0x62f)]] =
          _0x5f160b[_0x3368e4[_0x4538a3(0x62f)]] || [])[_0x4538a3(0x3bc)](
          _0x3368e4[_0x4538a3(0x6a4)],
        );
      }),
        (_0x54ef3f[_0x25d02e(0x1f2)] = [...rewardRecords]
          [_0x25d02e(0x25c)](
            (_0x40a6fc, _0x1f7a5c) =>
              getRewardMetric(_0x1f7a5c, _0x25d02e(0x611)) -
              getRewardMetric(_0x40a6fc, _0x25d02e(0x611)),
          )
          [_0x25d02e(0x21b)]((_0x5c293d) => {
            const _0x2b3668 = _0x25d02e,
              _0x274c4f = getRewardMetric(_0x5c293d, _0x2b3668(0x611)),
              _0x2225e9 = getRewardMetric(_0x5c293d, _0x2b3668(0x34b)),
              _0x1dc8b8 = getRewardMetric(_0x5c293d, _0x2b3668(0x2e7)),
              _0x17a545 =
                _0x274c4f > 0x0
                  ? Math["round"]((_0x2225e9 / _0x274c4f) * 0x64)
                  : 0x0,
              _0x1535fd =
                _0x17a545 >= 0x32
                  ? "td-good"
                  : _0x274c4f > 0x0 && _0x17a545 < 0x14
                    ? _0x2b3668(0x6fc)
                    : "",
              _0x4cbb99 = [...new Set(_0x5f160b[_0x5c293d["id"]] || [])],
              { ageMap: _0x4d45bb, genderMap: _0x2041ad } = buildAgeGenderMaps(
                _0x4cbb99,
                _0xc34599,
              ),
              _0x10f17c =
                Object[_0x2b3668(0x79a)](_0x4d45bb)[_0x2b3668(0x25c)](
                  (_0x16c831, _0x3e7bdb) => _0x3e7bdb[0x1] - _0x16c831[0x1],
                )[0x0]?.[0x0] || "—",
              _0x289e32 =
                Object[_0x2b3668(0x79a)](_0x2041ad)["sort"](
                  (_0x2850ab, _0x2c289a) => _0x2c289a[0x1] - _0x2850ab[0x1],
                )[0x0]?.[0x0] || "—";
            return (
              "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20class=\x22td-title\x22\x20title=\x22" +
              escapeHtml(_0x5c293d[_0x2b3668(0x6bb)] || "") +
              "\x22>" +
              escapeHtml(_0x5c293d[_0x2b3668(0x6bb)] || "—") +
              _0x2b3668(0x21f) +
              escapeHtml(
                isSponsoredReward(_0x5c293d) ? "Sponsored" : _0x2b3668(0x70a),
              ) +
              _0x2b3668(0x50c) +
              Number(_0x5c293d["cost"] || 0x0) +
              _0x2b3668(0x2e8) +
              _0x1dc8b8 +
              "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20class=\x22td-num\x22>" +
              _0x274c4f +
              "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20class=\x22td-num\x22>" +
              _0x2225e9 +
              _0x2b3668(0x72d) +
              _0x1535fd +
              "\x22>" +
              _0x17a545 +
              "%</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20class=\x22td-demo\x22>" +
              escapeHtml(_0x10f17c) +
              _0x2b3668(0x36e) +
              escapeHtml(_0x289e32) +
              _0x2b3668(0x7b6)
            );
          })
          [_0x25d02e(0x376)]("")));
    }
  }
  const _0x424438 = $("stationDeepBody");
  if (_0x424438) {
    if (stationRecords["length"] === 0x0)
      _0x424438[_0x25d02e(0x1f2)] =
        "<tr><td\x20colspan=\x227\x22><div\x20class=\x22empty-state\x22>No\x20stations\x20yet.</div></td></tr>";
    else {
      const _0x1064ad = {};
      (_0x1b98b0[_0x25d02e(0x49f)]((_0x3ae453) => {
        const _0x4d8896 = _0x25d02e;
        if (!_0x3ae453[_0x4d8896(0x768)] || !_0x3ae453[_0x4d8896(0x6a4)])
          return;
        (_0x1064ad[_0x3ae453[_0x4d8896(0x768)]] =
          _0x1064ad[_0x3ae453[_0x4d8896(0x768)]] || new Set())["add"](
          _0x3ae453["userId"],
        );
      }),
        (_0x424438[_0x25d02e(0x1f2)] = stationRecords[_0x25d02e(0x21b)](
          (_0x5cfad5) => {
            const _0xdc87ca = _0x25d02e,
              _0x395218 = getStationTier(_0x5cfad5),
              _0xf7258b = Number(_0x5cfad5[_0xdc87ca(0x561)] || 0x0),
              _0x3865aa = Number(
                _0x5cfad5[_0xdc87ca(0x630)] ||
                  _0x5cfad5[_0xdc87ca(0x72a)] ||
                  0x0,
              ),
              _0x5934ed =
                _0x3865aa > 0x0
                  ? Math[_0xdc87ca(0x369)]((_0xf7258b / _0x3865aa) * 0x64)
                  : null,
              _0x21d5c5 =
                _0x5934ed === null
                  ? ""
                  : _0x5934ed >= 0x5a
                    ? _0xdc87ca(0x48b)
                    : _0x5934ed >= 0x46
                      ? _0xdc87ca(0x6fc)
                      : _0xdc87ca(0x324),
              _0x4924be = _0x1064ad[_0x5cfad5["id"]] || new Set(),
              { ageMap: _0x5c0dd9, genderMap: _0x15a102 } = buildAgeGenderMaps(
                [..._0x4924be],
                _0xc34599,
              ),
              _0x13bd94 =
                Object[_0xdc87ca(0x79a)](_0x5c0dd9)["sort"](
                  (_0x3ca4ef, _0x425dda) => _0x425dda[0x1] - _0x3ca4ef[0x1],
                )[0x0]?.[0x0] || "—",
              _0x1fef40 =
                Object["entries"](_0x15a102)[_0xdc87ca(0x25c)](
                  (_0x193915, _0x2d0732) => _0x2d0732[0x1] - _0x193915[0x1],
                )[0x0]?.[0x0] || "—",
              _0x1b5306 =
                TIER_BY_ID[_0x395218["id"]]?.[_0xdc87ca(0x410)] ||
                _0xdc87ca(0x5d0);
            return (
              _0xdc87ca(0x2f0) +
              escapeHtml(_0x5cfad5["address"] || _0x5cfad5["id"] || "") +
              "\x22>" +
              escapeHtml(
                _0x5cfad5[_0xdc87ca(0x291)] ||
                  _0x5cfad5["id"] ||
                  _0xdc87ca(0x392),
              ) +
              _0xdc87ca(0x597) +
              _0x395218["id"] +
              "\x22>" +
              escapeHtml(_0x1b5306) +
              _0xdc87ca(0x3c3) +
              (_0x3865aa > 0x0
                ? _0xf7258b + _0xdc87ca(0x2ea) + _0x3865aa
                : _0xf7258b) +
              _0xdc87ca(0x224) +
              _0x21d5c5 +
              "\x22>" +
              (_0x5934ed !== null ? _0x5934ed + "%" : "—") +
              _0xdc87ca(0x39a) +
              _0x4924be[_0xdc87ca(0x2dd)] +
              _0xdc87ca(0x27d) +
              escapeHtml(_0x13bd94) +
              _0xdc87ca(0x364) +
              escapeHtml(_0x1fef40) +
              _0xdc87ca(0x55f)
            );
          },
        )[_0x25d02e(0x376)]("")));
    }
  }
}
function renderTopRewards() {
  const _0x166ee9 = _0x562b0b,
    _0x317fe5 = [...rewardRecords]
      [
        "sort"
      ]((_0x4e8301, _0x8427a8) => getRewardMetric(_0x8427a8, "activations") + getRewardMetric(_0x8427a8, _0x166ee9(0x34b)) - (getRewardMetric(_0x4e8301, "activations") + getRewardMetric(_0x4e8301, _0x166ee9(0x34b))))
      [_0x166ee9(0x605)](0x0, 0x5),
    _0x842ad6 = Math[_0x166ee9(0x72c)](
      0x1,
      ..._0x317fe5["map"](
        (_0x425967) =>
          getRewardMetric(_0x425967, _0x166ee9(0x611)) +
          getRewardMetric(_0x425967, _0x166ee9(0x34b)),
      ),
    );
  $(_0x166ee9(0x744))[_0x166ee9(0x1f2)] =
    _0x317fe5[_0x166ee9(0x21b)]((_0x1c7375) => {
      const _0x336195 = _0x166ee9,
        _0x754692 =
          getRewardMetric(_0x1c7375, "activations") +
          getRewardMetric(_0x1c7375, "validations"),
        _0x3c72be = Math["max"](
          0x6,
          Math[_0x336195(0x369)]((_0x754692 / _0x842ad6) * 0x64),
        );
      return (
        _0x336195(0x2e4) +
        escapeHtml(_0x1c7375[_0x336195(0x6bb)] || _0x336195(0x43d)) +
        _0x336195(0x6df) +
        _0x754692 +
        _0x336195(0x4a6) +
        _0x3c72be +
        "%\x22></div></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22code\x22>" +
        (isSponsoredReward(_0x1c7375) ? _0x336195(0x27c) : _0x336195(0x70a)) +
        _0x336195(0x570)
      );
    })["join"]("") || _0x166ee9(0x493);
}
let rewardStatusFilter = _0x562b0b(0x3e0);
function getRewardStatus(_0x38fab3) {
  const _0x1410c7 = _0x562b0b,
    _0x8f2ba1 = String(_0x38fab3[_0x1410c7(0x428)] || _0x1410c7(0x3e0));
  if (
    _0x8f2ba1 === "active" ||
    _0x8f2ba1 === _0x1410c7(0x58a) ||
    _0x8f2ba1 === _0x1410c7(0x5f6)
  )
    return _0x8f2ba1;
  return "active";
}
function renderRewardStatusTabs() {
  const _0x2e0da0 = _0x562b0b,
    _0x5678c1 = $(_0x2e0da0(0x3bb));
  if (!_0x5678c1) return;
  const _0x4cacab = {
    all: rewardRecords[_0x2e0da0(0x400)],
    active: 0x0,
    paused: 0x0,
    archived: 0x0,
  };
  (rewardRecords[_0x2e0da0(0x49f)]((_0x22f034) => {
    _0x4cacab[getRewardStatus(_0x22f034)] += 0x1;
  }),
    _0x5678c1[_0x2e0da0(0x3b9)](_0x2e0da0(0x46d))["forEach"]((_0x64062d) => {
      const _0x65fe64 = _0x2e0da0;
      _0x64062d["textContent"] =
        _0x4cacab[_0x64062d[_0x65fe64(0x21a)][_0x65fe64(0x56d)]] ?? 0x0;
    }),
    _0x5678c1["querySelectorAll"]("[data-reward-filter]")[_0x2e0da0(0x49f)](
      (_0x124879) => {
        const _0x1d48c3 = _0x2e0da0;
        _0x124879["classList"][_0x1d48c3(0x668)](
          _0x1d48c3(0x246),
          _0x124879[_0x1d48c3(0x21a)][_0x1d48c3(0x665)] === rewardStatusFilter,
        );
      },
    ));
}
function renderRewardList() {
  const _0x3cc8b2 = _0x562b0b;
  renderRewardStatusTabs();
  const _0x4ff51d =
    rewardStatusFilter === _0x3cc8b2(0x47b)
      ? rewardRecords
      : rewardRecords[_0x3cc8b2(0x274)](
          (_0x567f75) => getRewardStatus(_0x567f75) === rewardStatusFilter,
        );
  if (!_0x4ff51d["length"]) {
    const _0x48e464 =
      rewardRecords[_0x3cc8b2(0x400)] === 0x0
        ? _0x3cc8b2(0x241)
        : "No\x20" + rewardStatusFilter + _0x3cc8b2(0x2b8);
    $(_0x3cc8b2(0x592))[_0x3cc8b2(0x1f2)] =
      "<div\x20class=\x22empty-state\x22>" + _0x48e464 + _0x3cc8b2(0x311);
    return;
  }
  $(_0x3cc8b2(0x592))[_0x3cc8b2(0x1f2)] = _0x4ff51d[_0x3cc8b2(0x21b)](
    (_0x11053e) => {
      const _0x256b15 = _0x3cc8b2,
        _0x48915a = getRewardPlacementMeta(_0x11053e),
        _0x59613e = getRewardStatus(_0x11053e),
        _0x1dc231 = getRewardMetric(_0x11053e, _0x256b15(0x2e7)),
        _0x425bc6 = getRewardMetric(_0x11053e, "activations"),
        _0x2df917 = getRewardMetric(_0x11053e, "validations"),
        _0x3709f6 = _0x1dc231
          ? Math["round"]((_0x425bc6 / _0x1dc231) * 0x64)
          : 0x0,
        _0x38b156 = isBoostActive(_0x11053e),
        _0x30ab6d = _0x11053e[_0x256b15(0x242)]
          ? "<img\x20src=\x22" +
            escapeHtml(_0x11053e[_0x256b15(0x242)]) +
            _0x256b15(0x6b8) +
            escapeHtml(_0x11053e[_0x256b15(0x6bb)] || _0x256b15(0x43d)) +
            _0x256b15(0x250)
          : _0x256b15(0x5b8),
        _0x4c8598 = _0x38b156
          ? _0x256b15(0x25a) +
            Number(_0x11053e[_0x256b15(0x5e5)] || 0x0) +
            _0x256b15(0x614) +
            escapeHtml(formatBoostRemaining(_0x11053e)) +
            _0x256b15(0x564)
          : "<strong>" +
            escapeHtml(_0x48915a["title"]) +
            _0x256b15(0x6df) +
            escapeHtml(_0x48915a[_0x256b15(0x735)]) +
            _0x256b15(0x564),
        _0x54187f =
          _0x59613e === _0x256b15(0x3e0)
            ? _0x256b15(0x2a3)
            : _0x59613e === "paused"
              ? _0x256b15(0x71b)
              : "Archived",
        _0x4fe8b8 =
          _0x59613e === _0x256b15(0x5f6)
            ? _0x256b15(0x3a7) +
              _0x11053e["id"] +
              _0x256b15(0x723) +
              _0x11053e["id"] +
              _0x256b15(0x26a)
            : _0x256b15(0x3a7) +
              _0x11053e["id"] +
              _0x256b15(0x701) +
              _0x11053e["id"] +
              "\x22>" +
              (_0x59613e === "active" ? "Pause" : _0x256b15(0x240)) +
              _0x256b15(0x633) +
              _0x11053e["id"] +
              _0x256b15(0x67f);
      return (
        _0x256b15(0x3b1) +
        _0x48915a[_0x256b15(0x296)] +
        _0x256b15(0x46b) +
        _0x59613e +
        _0x256b15(0x2d0) +
        _0x30ab6d +
        _0x256b15(0x76c) +
        escapeHtml(_0x11053e[_0x256b15(0x6bb)] || "Reward") +
        _0x256b15(0x41b) +
        _0x59613e +
        "\x22>" +
        _0x54187f +
        _0x256b15(0x20e) +
        escapeHtml(
          _0x11053e[_0x256b15(0x285)]
            ? _0x256b15(0x692)
            : _0x11053e[_0x256b15(0x484)] || _0x256b15(0x542),
        ) +
        _0x256b15(0x20e) +
        escapeHtml(
          _0x11053e[_0x256b15(0x4f7)] || currentPartner[_0x256b15(0x599)],
        ) +
        _0x256b15(0x20e) +
        Number(_0x11053e["cost"] || 0x0) +
        _0x256b15(0x71a) +
        _0x48915a["pillCls"] +
        "\x22>" +
        escapeHtml(_0x48915a[_0x256b15(0x49a)]) +
        _0x256b15(0x3d4) +
        _0x1dc231 +
        _0x256b15(0x281) +
        _0x425bc6 +
        _0x256b15(0x6b2) +
        _0x2df917 +
        "</b><span>Validations</span></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22reward-metric\x22><b>" +
        _0x3709f6 +
        _0x256b15(0x24e) +
        _0x4fe8b8 +
        _0x256b15(0x314) +
        (_0x59613e === _0x256b15(0x5f6)
          ? ""
          : _0x256b15(0x533) +
            _0x4c8598 +
            _0x256b15(0x68d) +
            _0x11053e["id"] +
            "\x22\x20" +
            (_0x38b156 || _0x59613e === "paused" ? "disabled" : "") +
            ">" +
            (_0x38b156 ? _0x256b15(0x214) : _0x256b15(0x451)) +
            _0x256b15(0x5a8)) +
        _0x256b15(0x69a)
      );
    },
  )[_0x3cc8b2(0x376)]("");
}
const BOOST_OPTIONS = [
  {
    id: "3d",
    days: 0x3,
    priceKr: 0x95,
    label: "3-day\x20boost",
    subtitle: _0x562b0b(0x4be),
  },
  {
    id: "5d",
    days: 0x5,
    priceKr: 0xe5,
    label: _0x562b0b(0x3d8),
    subtitle: _0x562b0b(0x503),
  },
  {
    id: _0x562b0b(0x24d),
    days: 0xa,
    priceKr: 0x18f,
    label: _0x562b0b(0x5dd),
    subtitle:
      "~40\x20kr\x20/\x20day\x20·\x20best\x20value\x20for\x20steady\x20traffic.",
  },
  {
    id: _0x562b0b(0x6b0),
    days: 0x0,
    priceKr: 0x0,
    label: "Custom",
    subtitle: _0x562b0b(0x357),
  },
];
function customBoostPerDayKr(_0x4c0260) {
  if (_0x4c0260 >= 0x14) return 0x27;
  if (_0x4c0260 >= 0xa) return 0x2c;
  if (_0x4c0260 >= 0x5) return 0x31;
  return 0x37;
}
function customBoostPriceKr(_0x35ab0b) {
  const _0x221109 = _0x562b0b,
    _0x221eb5 = Math[_0x221109(0x72c)](
      0x1,
      Math[_0x221109(0x369)](_0x35ab0b || 0x1),
    );
  return _0x221eb5 * customBoostPerDayKr(_0x221eb5);
}
let currentBoostReward = null,
  selectedBoostOptionId = null,
  selectedBoostCustomDays = 0x7;
function isBoostActive(_0xcdda15) {
  const _0x5e3763 = _0x562b0b,
    _0x14fe26 =
      _0xcdda15?.["boostExpiresAt"]?.[_0x5e3763(0x478)]?.() ??
      _0xcdda15?.[_0x5e3763(0x388)] ??
      0x0;
  return _0x14fe26 > Date[_0x5e3763(0x68e)]();
}
function formatBoostRemaining(_0x44bc28) {
  const _0x6e54a = _0x562b0b,
    _0xa77609 =
      _0x44bc28?.[_0x6e54a(0x57c)]?.[_0x6e54a(0x478)]?.() ??
      _0x44bc28?.[_0x6e54a(0x388)] ??
      0x0;
  if (!_0xa77609) return _0x6e54a(0x39f);
  const _0x25964b = _0xa77609 - Date[_0x6e54a(0x68e)]();
  if (_0x25964b <= 0x0) return "Boost\x20ended.";
  const _0x4d2c43 = Math["max"](
    0x1,
    Math[_0x6e54a(0x6c2)](_0x25964b / 0x5265c00),
  );
  return (
    _0x4d2c43 +
    _0x6e54a(0x4f8) +
    (_0x4d2c43 === 0x1 ? "" : "s") +
    "\x20remaining."
  );
}
function getSelectedBoost() {
  const _0x84fd67 = _0x562b0b,
    _0x33d5a9 = BOOST_OPTIONS["find"](
      (_0x5e94af) => _0x5e94af["id"] === selectedBoostOptionId,
    );
  if (!_0x33d5a9) return null;
  if (_0x33d5a9["id"] === _0x84fd67(0x6b0)) {
    const _0x348852 = Math[_0x84fd67(0x72c)](
      0x1,
      Math[_0x84fd67(0x369)](selectedBoostCustomDays || 0x1),
    );
    return {
      id: _0x84fd67(0x6b0),
      days: _0x348852,
      priceKr: customBoostPriceKr(_0x348852),
      label: _0x348852 + _0x84fd67(0x4f3),
    };
  }
  return { ..._0x33d5a9 };
}
function renderBoostGrid() {
  const _0x5670bb = _0x562b0b,
    _0x437811 = $(_0x5670bb(0x54f));
  if (!_0x437811) return;
  _0x437811["innerHTML"] = BOOST_OPTIONS[_0x5670bb(0x21b)]((_0x4b0b31) => {
    const _0x225132 = _0x5670bb,
      _0x40d161 = _0x4b0b31["id"] === selectedBoostOptionId,
      _0x5011ab =
        _0x4b0b31["id"] === _0x225132(0x6b0)
          ? _0x225132(0x74e) +
            selectedBoostCustomDays +
            _0x225132(0x458) +
            customBoostPriceKr(selectedBoostCustomDays) +
            _0x225132(0x269)
          : "<strong>" +
            _0x4b0b31[_0x225132(0x7a2)] +
            _0x225132(0x3e9) +
            _0x4b0b31[_0x225132(0x3ec)] +
            _0x225132(0x652);
    return (
      _0x225132(0x522) +
      (_0x40d161 ? _0x225132(0x268) : "") +
      "\x22\x20data-boost-id=\x22" +
      _0x4b0b31["id"] +
      _0x225132(0x79c) +
      escapeHtml(_0x4b0b31[_0x225132(0x49a)]) +
      _0x225132(0x26c) +
      escapeHtml(_0x4b0b31[_0x225132(0x359)]) +
      _0x225132(0x387) +
      _0x5011ab +
      "</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20"
    );
  })[_0x5670bb(0x376)]("");
  const _0x198600 = $(_0x5670bb(0x63e));
  (_0x198600 &&
    (_0x198600["addEventListener"](_0x5670bb(0x2dc), (_0x3f6744) =>
      _0x3f6744["stopPropagation"](),
    ),
    _0x198600[_0x5670bb(0x23d)](_0x5670bb(0x453), () => {
      const _0x4eb2a3 = _0x5670bb;
      selectedBoostOptionId !== _0x4eb2a3(0x6b0) &&
        ((selectedBoostOptionId = _0x4eb2a3(0x6b0)),
        _0x437811[_0x4eb2a3(0x3b9)](".boost-card")[_0x4eb2a3(0x49f)](
          (_0x46844d) =>
            _0x46844d[_0x4eb2a3(0x5a3)][_0x4eb2a3(0x668)](
              _0x4eb2a3(0x69c),
              _0x46844d[_0x4eb2a3(0x21a)][_0x4eb2a3(0x46a)] ===
                _0x4eb2a3(0x6b0),
            ),
        ));
    }),
    _0x198600[_0x5670bb(0x23d)](_0x5670bb(0x75f), (_0x36f828) => {
      const _0x1bbbbb = _0x5670bb;
      _0x36f828["stopPropagation"]();
      const _0x571450 = Math[_0x1bbbbb(0x72c)](
        0x1,
        Math["min"](0x16d, Number(_0x36f828[_0x1bbbbb(0x2cd)]["value"]) || 0x1),
      );
      selectedBoostCustomDays = _0x571450;
      const _0x3f3df4 = $(_0x1bbbbb(0x5c6));
      if (_0x3f3df4)
        _0x3f3df4[_0x1bbbbb(0x23a)] =
          customBoostPriceKr(_0x571450) + _0x1bbbbb(0x251);
      updateBoostConfirm();
    })),
    updateBoostConfirm());
}
function updateBoostConfirm() {
  const _0x4c8e27 = _0x562b0b,
    _0x341986 = $(_0x4c8e27(0x5fb));
  if (!_0x341986) return;
  const _0x5af0c7 = getSelectedBoost();
  _0x341986[_0x4c8e27(0x70f)] = !_0x5af0c7;
  if (!_0x5af0c7) {
    _0x341986[_0x4c8e27(0x23a)] = _0x4c8e27(0x202);
    return;
  }
  if (
    isFreePlan() &&
    partnerBillingStatus["loaded"] &&
    !(partnerBillingStatus["cards"] || [])[_0x4c8e27(0x400)]
  ) {
    _0x341986[_0x4c8e27(0x23a)] =
      _0x4c8e27(0x203) + _0x5af0c7["priceKr"] + _0x4c8e27(0x251);
    return;
  }
  if (isFreePlan() && getOutstandingBoostRewards()["length"]) {
    _0x341986[_0x4c8e27(0x23a)] = "Pay\x20outstanding\x20first";
    return;
  }
  _0x341986[_0x4c8e27(0x23a)] =
    _0x4c8e27(0x48c) + _0x5af0c7["priceKr"] + _0x4c8e27(0x251);
}
function openBoostModal(_0x516700) {
  const _0x1250a3 = _0x562b0b,
    _0x35b22f = rewardRecords[_0x1250a3(0x40f)](
      (_0x1364f5) => _0x1364f5["id"] === _0x516700,
    );
  if (!_0x35b22f) return;
  if (isBoostActive(_0x35b22f)) {
    window["alert"](_0x1250a3(0x719));
    return;
  }
  ((currentBoostReward = _0x35b22f),
    (selectedBoostOptionId = null),
    (selectedBoostCustomDays = 0x7));
  const _0x1f0e61 = $(_0x1250a3(0x238));
  _0x1f0e61 &&
    (_0x1f0e61["textContent"] =
      "Pick\x20how\x20long\x20you\x20want\x20" +
      (_0x35b22f[_0x1250a3(0x6bb)] || "this\x20reward") +
      _0x1250a3(0x655));
  renderBoostGrid();
  const _0x31628e = $(_0x1250a3(0x333));
  if (!_0x31628e) return;
  (_0x31628e["classList"]["add"](_0x1250a3(0x382)),
    _0x31628e[_0x1250a3(0x295)](_0x1250a3(0x4ff), _0x1250a3(0x711)),
    document["body"]["classList"][_0x1250a3(0x767)](_0x1250a3(0x3db)));
}
function closeBoostModal() {
  const _0x51fa0e = _0x562b0b,
    _0x5de937 = $(_0x51fa0e(0x333));
  if (!_0x5de937) return;
  (_0x5de937["classList"][_0x51fa0e(0x626)](_0x51fa0e(0x382)),
    _0x5de937[_0x51fa0e(0x295)](_0x51fa0e(0x4ff), _0x51fa0e(0x2a5)),
    document[_0x51fa0e(0x674)][_0x51fa0e(0x5a3)][_0x51fa0e(0x626)](
      _0x51fa0e(0x3db),
    ),
    (currentBoostReward = null),
    (selectedBoostOptionId = null));
}
async function activateBoost() {
  const _0x5b7a1e = _0x562b0b;
  if (!currentBoostReward) return;
  if (requireHttpOrigin(_0x5b7a1e(0x1f5))) return;
  if (isBoostActive(currentBoostReward)) {
    (window[_0x5b7a1e(0x725)](_0x5b7a1e(0x719)), closeBoostModal());
    return;
  }
  const _0x52bb7c = getSelectedBoost();
  if (!_0x52bb7c) return;
  if (isFreePlan()) {
    if (
      partnerBillingStatus[_0x5b7a1e(0x48d)] &&
      !(partnerBillingStatus[_0x5b7a1e(0x7c2)] || [])["length"]
    ) {
      await startPartnerSetupSession($(_0x5b7a1e(0x5fb)));
      return;
    }
    const _0x3cd23e = getOutstandingBoostRewards();
    if (_0x3cd23e[_0x5b7a1e(0x400)] > 0x0) {
      (closeBoostModal(),
        document[_0x5b7a1e(0x4db)](_0x5b7a1e(0x403))?.["click"]());
      return;
    }
  }
  const _0xf2092 = $(_0x5b7a1e(0x5fb)),
    _0x49dca1 = _0xf2092[_0x5b7a1e(0x23a)];
  ((_0xf2092[_0x5b7a1e(0x70f)] = !![]),
    (_0xf2092["textContent"] = _0x5b7a1e(0x6d0)));
  try {
    const _0x18d4a5 = httpsCallable(cloudFunctions, _0x5b7a1e(0x705)),
      _0x2ba9e8 = Date[_0x5b7a1e(0x68e)](),
      _0x34b524 = await _0x18d4a5({
        rewardId: currentBoostReward["id"],
        boostPlan: _0x52bb7c["id"],
        boostDays: _0x52bb7c[_0x5b7a1e(0x3ec)],
        boostStartedAtMs: _0x2ba9e8,
      });
    (Object["assign"](currentBoostReward, {
      placement: "featured_boost",
      sponsored: !![],
      sponsorLabel: _0x5b7a1e(0x27c),
      boostPlan: _0x52bb7c["id"],
      boostDays:
        _0x34b524?.[_0x5b7a1e(0x787)]?.[_0x5b7a1e(0x5e5)] ||
        _0x52bb7c[_0x5b7a1e(0x3ec)],
      boostPriceKr:
        _0x34b524?.["data"]?.[_0x5b7a1e(0x6c9)] || _0x52bb7c[_0x5b7a1e(0x7a2)],
      boostStartedAtMs:
        _0x34b524?.[_0x5b7a1e(0x787)]?.[_0x5b7a1e(0x22b)] || _0x2ba9e8,
      boostExpiresAtMs:
        _0x34b524?.[_0x5b7a1e(0x787)]?.[_0x5b7a1e(0x388)] ||
        _0x2ba9e8 + _0x52bb7c["days"] * 0x5265c00,
      boostActivationBaseline: getRewardMetric(
        currentBoostReward,
        _0x5b7a1e(0x611),
      ),
      boostClickBaseline: getRewardMetric(currentBoostReward, _0x5b7a1e(0x2e7)),
      boostValidationBaseline: getRewardMetric(
        currentBoostReward,
        _0x5b7a1e(0x34b),
      ),
      boostBilledVia:
        _0x34b524?.[_0x5b7a1e(0x787)]?.["billedVia"] ||
        (isFreePlan() ? _0x5b7a1e(0x264) : _0x5b7a1e(0x6d5)),
      boostBillingStatus:
        _0x34b524?.[_0x5b7a1e(0x787)]?.[_0x5b7a1e(0x5f1)] || "",
      boostPaid: ![],
    }),
      renderDashboard(),
      closeBoostModal());
  } catch (_0x4504bc) {
    const _0x4ed009 = _0x4504bc?.[_0x5b7a1e(0x397)]?.["reason"] || "";
    if (
      _0x4ed009 === _0x5b7a1e(0x6ea) ||
      /saved card/i[_0x5b7a1e(0x39b)](_0x4504bc[_0x5b7a1e(0x52c)] || "")
    ) {
      await startPartnerSetupSession(_0xf2092);
      return;
    }
    (_0x4ed009 === _0x5b7a1e(0x5a1) &&
      (closeBoostModal(),
      document[_0x5b7a1e(0x4db)]("[data-section=\x27billing\x27]")?.[
        "click"
      ]()),
      window[_0x5b7a1e(0x725)](
        getReadableCallableError(
          _0x4504bc,
          "Could\x20not\x20activate\x20boost.",
        ),
      ),
      (_0xf2092[_0x5b7a1e(0x70f)] = ![]),
      (_0xf2092["textContent"] = _0x49dca1));
  }
}
async function payOutstandingBoosts() {
  const _0x1fbfae = _0x562b0b;
  if (requireHttpOrigin("paying\x20outstanding\x20boosts")) return;
  const _0xa5690f = getOutstandingBoostRewards();
  if (!_0xa5690f["length"]) {
    (window[_0x1fbfae(0x725)](_0x1fbfae(0x60a)), renderDashboard());
    return;
  }
  const _0x1667a1 = _0xa5690f[_0x1fbfae(0x2ac)](
      (_0x48f79f, _0x14f84f) =>
        _0x48f79f + Number(_0x14f84f[_0x1fbfae(0x6c9)] || 0x0),
      0x0,
    ),
    _0x510bb7 = window[_0x1fbfae(0x3e8)](
      "Pay\x20" +
        _0x1667a1 +
        _0x1fbfae(0x4e2) +
        _0xa5690f[_0x1fbfae(0x400)] +
        _0x1fbfae(0x7a9) +
        (_0xa5690f[_0x1fbfae(0x400)] === 0x1 ? "" : "s") +
        "\x20now?\x20This\x20will\x20use\x20your\x20saved\x20Stripe\x20card.",
    );
  if (!_0x510bb7) return;
  const _0x4790e8 = $("payOutstandingBoostsButton"),
    _0x496aeb = _0x4790e8?.[_0x1fbfae(0x23a)];
  _0x4790e8 &&
    ((_0x4790e8["disabled"] = !![]),
    (_0x4790e8[_0x1fbfae(0x23a)] = _0x1fbfae(0x20c)));
  try {
    const _0x483961 = httpsCallable(
        cloudFunctions,
        "payOutstandingPartnerBoosts",
      ),
      _0x3f35bd = await _0x483961({
        rewardIds: _0xa5690f[_0x1fbfae(0x21b)]((_0x56816e) => _0x56816e["id"]),
      }),
      _0x4b553c = Number(
        _0x3f35bd?.[_0x1fbfae(0x787)]?.[_0x1fbfae(0x450)] || 0x0,
      ),
      _0x3e93f7 = Number(
        _0x3f35bd?.[_0x1fbfae(0x787)]?.["remainingCount"] || 0x0,
      ),
      _0x1962fa = _0x3f35bd?.["data"]?.[_0x1fbfae(0x384)];
    if (_0x1962fa) {
      window[_0x1fbfae(0x484)][_0x1fbfae(0x5f3)] = _0x1962fa;
      return;
    }
    if (_0x3e93f7 > 0x0) {
      (window[_0x1fbfae(0x725)](
        _0x3f35bd?.[_0x1fbfae(0x787)]?.["errorMessage"] || _0x1fbfae(0x66d),
      ),
        renderDashboard());
      return;
    }
    if (_0x4b553c < _0xa5690f[_0x1fbfae(0x400)]) {
      (window[_0x1fbfae(0x725)](_0x1fbfae(0x58c)),
        await refreshPartnerBillingStatus({ silent: !![] }),
        renderDashboard());
      return;
    }
    (_0xa5690f["forEach"]((_0x1a4c29) => {
      const _0x5b684d = _0x1fbfae;
      ((_0x1a4c29[_0x5b684d(0x4f5)] = !![]),
        (_0x1a4c29[_0x5b684d(0x5f1)] = _0x5b684d(0x284)));
    }),
      renderDashboard());
  } catch (_0xcde737) {
    const _0x3f6780 = _0xcde737?.[_0x1fbfae(0x397)]?.[_0x1fbfae(0x637)] || "";
    if (
      _0x3f6780 === "missing_saved_card" ||
      /saved card/i[_0x1fbfae(0x39b)](_0xcde737["message"] || "")
    ) {
      await startPartnerSetupSession(_0x4790e8);
      return;
    }
    window[_0x1fbfae(0x725)](
      getReadableCallableError(_0xcde737, _0x1fbfae(0x754)),
    );
  } finally {
    _0x4790e8 &&
      ((_0x4790e8[_0x1fbfae(0x70f)] = ![]),
      (_0x4790e8["textContent"] = _0x496aeb || _0x1fbfae(0x7b9)));
  }
}
let isAnimatingStationEmpty = ![];
function renderStationLists() {
  const _0x5d95d3 = _0x562b0b;
  if (isAnimatingStationEmpty) return;
  const _0x4a3182 =
    stationRecords["map"]((_0x235695) => {
      const _0x550ba8 = _0x2558,
        _0x186350 = Number(_0x235695[_0x550ba8(0x630)] || 0x0),
        _0x5f577f = Number(_0x235695[_0x550ba8(0x561)] || 0x0),
        _0x174075 = _0x186350
          ? Math["round"]((_0x5f577f / _0x186350) * 0x64)
          : 0x0,
        _0x46f776 = Math[_0x550ba8(0x72c)](
          0x4,
          Math[_0x550ba8(0x406)](_0x174075, 0x64),
        ),
        _0x3d887d = _0x186350 && _0x5f577f >= _0x186350 * 0.85,
        _0x54900f = getStationTier(_0x235695),
        _0x2f6582 = formatStationOpeningLine(_0x235695),
        _0x4d1175 = isStationOpenNow(_0x235695),
        _0x269159 = !_0x4d1175
          ? _0x550ba8(0x716)
          : _0x3d887d
            ? "Collection\x20soon"
            : "OK";
      return (
        _0x550ba8(0x42c) +
        escapeHtml(
          _0x235695[_0x550ba8(0x43e)] || _0x235695["title"] || _0x550ba8(0x1f6),
        ) +
        "</strong>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22tier-badge\x20tier-" +
        _0x54900f["id"] +
        "\x22>" +
        escapeHtml(_0x54900f[_0x550ba8(0x410)]) +
        _0x550ba8(0x2fc) +
        _0x54900f["multiplier"] +
        _0x550ba8(0x383) +
        escapeHtml(
          _0x235695[_0x550ba8(0x291)] ||
            _0x235695[_0x550ba8(0x484)] ||
            "Assigned\x20location",
        ) +
        _0x550ba8(0x342) +
        _0x5f577f +
        "/" +
        (_0x186350 || "--") +
        "\x20capacity</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22station-card-hours" +
        (_0x4d1175 ? "" : _0x550ba8(0x764)) +
        "\x22>" +
        escapeHtml(_0x2f6582) +
        "</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22station-card-fill\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22station-card-fill-track\x22><div\x20class=\x22station-card-fill-bar\x22\x20style=\x22--fill:" +
        _0x46f776 +
        _0x550ba8(0x49e) +
        _0x174075 +
        _0x550ba8(0x671) +
        _0x269159 +
        _0x550ba8(0x277) +
        _0x235695["id"] +
        _0x550ba8(0x4de) +
        _0x235695["id"] +
        _0x550ba8(0x44e) +
        _0x235695["id"] +
        _0x550ba8(0x38a) +
        _0x235695["id"] +
        "\x22><svg\x20viewBox=\x220\x200\x2024\x2024\x22\x20fill=\x22none\x22\x20stroke=\x22currentColor\x22\x20stroke-linecap=\x22round\x22\x20stroke-linejoin=\x22round\x22><polyline\x20points=\x223\x206\x205\x206\x2021\x206\x22/><path\x20d=\x22M19\x206v14a2\x202\x200\x200\x201-2\x202H7a2\x202\x200\x200\x201-2-2V6m3\x200V4a2\x202\x200\x200\x201\x202-2h4a2\x202\x200\x200\x201\x202\x202v2\x22/><line\x20x1=\x2210\x22\x20y1=\x2211\x22\x20x2=\x2210\x22\x20y2=\x2217\x22/><line\x20x1=\x2214\x22\x20y1=\x2211\x22\x20x2=\x2214\x22\x20y2=\x2217\x22/></svg>Empty\x20station</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</article>\x0a\x20\x20\x20\x20\x20\x20\x20\x20"
      );
    })[_0x5d95d3(0x376)]("") || _0x5d95d3(0x475);
  (($("stationList")["innerHTML"] = _0x4a3182),
    ($(_0x5d95d3(0x559))[_0x5d95d3(0x1f2)] =
      stationRecords[_0x5d95d3(0x605)](0x0, 0x3)
        [_0x5d95d3(0x21b)]((_0x2944a8) => {
          const _0x2d8424 = _0x5d95d3,
            _0x37f0ce = Number(_0x2944a8[_0x2d8424(0x630)] || 0x0),
            _0x469c6f = Number(_0x2944a8[_0x2d8424(0x561)] || 0x0),
            _0x597feb = _0x37f0ce
              ? Math["round"]((_0x469c6f / _0x37f0ce) * 0x64)
              : 0x0,
            _0x1db047 = getStationTier(_0x2944a8),
            _0xcee449 = formatStationOpeningLine(_0x2944a8);
          return (
            "<div\x20class=\x22row\x22><div\x20class=\x22station-card-info\x22><div\x20class=\x22station-card-title\x22><strong>" +
            escapeHtml(
              _0x2944a8[_0x2d8424(0x43e)] ||
                _0x2944a8[_0x2d8424(0x6bb)] ||
                _0x2d8424(0x1f6),
            ) +
            _0x2d8424(0x4c2) +
            _0x1db047["id"] +
            "\x22>" +
            escapeHtml(_0x1db047["name"]) +
            _0x2d8424(0x2fc) +
            _0x1db047[_0x2d8424(0x77c)] +
            "x</span></div><span>" +
            _0x469c6f +
            "/" +
            (_0x37f0ce || "--") +
            _0x2d8424(0x2fc) +
            _0x597feb +
            "%\x20full\x20·\x20" +
            escapeHtml(_0xcee449) +
            "</span></div><span\x20class=\x22code\x22>" +
            escapeHtml(_0x2944a8[_0x2d8424(0x428)] || _0x2d8424(0x3e0)) +
            _0x2d8424(0x218)
          );
        })
        [_0x5d95d3(0x376)]("") ||
      "<div\x20class=\x22empty-state\x22>No\x20assigned\x20stations.</div>"));
}
function resetRewardForm() {
  const _0x5e4848 = _0x562b0b;
  (clearSelectedRewardImage(),
    hideRewardLocationSuggestions(),
    $(_0x5e4848(0x6f8))[_0x5e4848(0x483)](),
    ($(_0x5e4848(0x5b4))[_0x5e4848(0x270)] = ""),
    ($(_0x5e4848(0x2a6))["value"] = ""),
    ($(_0x5e4848(0x35a))[_0x5e4848(0x270)] = ""),
    ($(_0x5e4848(0x4f2))[_0x5e4848(0x270)] = ""),
    ($("rewardPhysicalAddress")[_0x5e4848(0x270)] = ""),
    ($("rewardSubtitle")[_0x5e4848(0x270)] =
      currentPartner?.["companyName"] || ""),
    ($(_0x5e4848(0x5d4))["value"] = currentPartner?.["city"] || ""),
    ($(_0x5e4848(0x586))[_0x5e4848(0x270)] =
      currentPartner?.[_0x5e4848(0x599)] || "DK"),
    ($(_0x5e4848(0x61a))[_0x5e4848(0x270)] = "25"),
    ($(_0x5e4848(0x733))["value"] = _0x5e4848(0x731)),
    ($(_0x5e4848(0x63a))[_0x5e4848(0x6ba)] = ![]),
    ($(_0x5e4848(0x3a2))["value"] = "unlimited"),
    ($(_0x5e4848(0x582))[_0x5e4848(0x1f2)] = _0x5e4848(0x213)),
    ($("rewardSubmitButton")["textContent"] = _0x5e4848(0x3d3)),
    setRewardCodesMessage(""),
    $(_0x5e4848(0x643))[_0x5e4848(0x3fd)]("aria-invalid"),
    syncRewardChannelFields(),
    syncRewardAvailabilityFields(),
    syncRewardImagePreview());
}
function openRewardModal() {
  const _0x2d6740 = _0x562b0b,
    _0x470c4e = $(_0x2d6740(0x70d));
  if (!_0x470c4e) return;
  (_0x470c4e[_0x2d6740(0x5a3)][_0x2d6740(0x767)](_0x2d6740(0x382)),
    _0x470c4e["setAttribute"](_0x2d6740(0x4ff), _0x2d6740(0x711)),
    document["body"][_0x2d6740(0x5a3)]["add"]("modal-open"),
    window[_0x2d6740(0x1fc)](() => {
      const _0x5c820a = _0x2d6740,
        _0x480376 = $(_0x5c820a(0x31a));
      if (_0x480376) _0x480376[_0x5c820a(0x453)]();
    }));
}
function closeRewardModal() {
  const _0x27da21 = _0x562b0b,
    _0x4da86d = $(_0x27da21(0x70d));
  if (!_0x4da86d) return;
  (_0x4da86d[_0x27da21(0x5a3)]["remove"]("open"),
    _0x4da86d["setAttribute"](_0x27da21(0x4ff), _0x27da21(0x2a5)),
    document[_0x27da21(0x674)][_0x27da21(0x5a3)][_0x27da21(0x626)](
      _0x27da21(0x3db),
    ));
}
let currentTierEditStation = null,
  selectedTierId = null,
  currentStationEditStation = null;
function renderTierGrid() {
  const _0x479c0b = _0x562b0b;
  if (!currentTierEditStation) return;
  const _0x419ddd = getStationTier(currentTierEditStation)["id"],
    _0x30a6f5 = $(_0x479c0b(0x464));
  if (!_0x30a6f5) return;
  _0x30a6f5[_0x479c0b(0x1f2)] = STATION_TIERS[_0x479c0b(0x21b)]((_0x16ebef) => {
    const _0x4f7ab4 = _0x479c0b,
      _0x5595a9 = _0x16ebef["id"] === _0x419ddd,
      _0x556ab2 = _0x16ebef["id"] === selectedTierId,
      _0x2419b6 =
        _0x16ebef[_0x4f7ab4(0x491)] === 0x0
          ? _0x4f7ab4(0x799)
          : _0x16ebef[_0x4f7ab4(0x491)] + _0x4f7ab4(0x251);
    return (
      "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20type=\x22button\x22\x20class=\x22tier-card" +
      (_0x5595a9 ? _0x4f7ab4(0x2d1) : "") +
      (_0x556ab2 ? _0x4f7ab4(0x268) : "") +
      "\x22\x20data-tier-id=\x22" +
      _0x16ebef["id"] +
      _0x4f7ab4(0x770) +
      _0x16ebef["id"] +
      "\x22>" +
      escapeHtml(_0x16ebef[_0x4f7ab4(0x410)]) +
      _0x4f7ab4(0x26d) +
      (_0x5595a9 ? _0x4f7ab4(0x55e) : "") +
      _0x4f7ab4(0x234) +
      _0x16ebef[_0x4f7ab4(0x77c)] +
      _0x4f7ab4(0x327) +
      escapeHtml(_0x16ebef[_0x4f7ab4(0x6eb)]) +
      "</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22tier-card-fee\x22><strong>" +
      _0x2419b6 +
      _0x4f7ab4(0x581) +
      (_0x16ebef[_0x4f7ab4(0x491)] === 0x0
        ? _0x4f7ab4(0x372)
        : _0x16ebef[_0x4f7ab4(0x5fa)]) +
      _0x4f7ab4(0x42a)
    );
  })[_0x479c0b(0x376)]("");
  const _0x592311 = $("tierConfirmButton");
  _0x592311 &&
    ((_0x592311[_0x479c0b(0x70f)] =
      !selectedTierId || selectedTierId === _0x419ddd),
    (_0x592311["textContent"] =
      !selectedTierId || selectedTierId === _0x419ddd
        ? "Save\x20tier"
        : _0x479c0b(0x4e0) + TIER_BY_ID[selectedTierId][_0x479c0b(0x410)]));
}
function openTierModal(_0x5c0c94) {
  const _0x56902e = _0x562b0b,
    _0x1396a1 = stationRecords[_0x56902e(0x40f)](
      (_0x14389b) => _0x14389b["id"] === _0x5c0c94,
    );
  if (!_0x1396a1) return;
  ((currentTierEditStation = _0x1396a1),
    (selectedTierId = getStationTier(_0x1396a1)["id"]));
  const _0x38a464 = $(_0x56902e(0x252));
  _0x38a464 &&
    (_0x38a464["textContent"] =
      "Pick\x20a\x20tier\x20for\x20" +
      (_0x1396a1[_0x56902e(0x43e)] ||
        _0x1396a1[_0x56902e(0x6bb)] ||
        _0x56902e(0x5e2)) +
      _0x56902e(0x718));
  renderTierGrid();
  const _0x3d8c08 = $(_0x56902e(0x2b1));
  if (!_0x3d8c08) return;
  (_0x3d8c08[_0x56902e(0x5a3)][_0x56902e(0x767)](_0x56902e(0x382)),
    _0x3d8c08["setAttribute"](_0x56902e(0x4ff), _0x56902e(0x711)),
    document[_0x56902e(0x674)][_0x56902e(0x5a3)]["add"]("modal-open"));
}
function closeTierModal() {
  const _0x337b08 = _0x562b0b,
    _0x48cc20 = $(_0x337b08(0x2b1));
  if (!_0x48cc20) return;
  (_0x48cc20[_0x337b08(0x5a3)][_0x337b08(0x626)](_0x337b08(0x382)),
    _0x48cc20[_0x337b08(0x295)](_0x337b08(0x4ff), "true"),
    document[_0x337b08(0x674)][_0x337b08(0x5a3)][_0x337b08(0x626)](
      "modal-open",
    ),
    (currentTierEditStation = null),
    (selectedTierId = null));
}
function renderStationHoursEditor() {
  const _0x41ccd2 = _0x562b0b,
    _0x59f654 = $(_0x41ccd2(0x329));
  if (!_0x59f654) return;
  _0x59f654[_0x41ccd2(0x1f2)] = OPENING_DAY_OPTIONS[_0x41ccd2(0x21b)](
    (_0x905cd4) =>
      "\x0a\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22station-hours-row\x22\x20data-hours-row=\x22" +
      _0x905cd4["id"] +
      "\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22station-hours-day\x22>" +
      _0x905cd4["short"] +
      _0x41ccd2(0x74c) +
      _0x905cd4["id"] +
      _0x41ccd2(0x5ba) +
      _0x905cd4[_0x41ccd2(0x49a)] +
      "\x20opening\x20time\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<input\x20id=\x22stationHoursClose_" +
      _0x905cd4["id"] +
      _0x41ccd2(0x5ba) +
      _0x905cd4[_0x41ccd2(0x49a)] +
      _0x41ccd2(0x370) +
      _0x905cd4["id"] +
      "\x22\x20type=\x22checkbox\x22\x20data-hours-closed=\x22" +
      _0x905cd4["id"] +
      "\x22>Closed</label>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20",
  )[_0x41ccd2(0x376)]("");
}
function syncStationHoursRow(_0x191e32) {
  const _0x5b445e = _0x562b0b,
    _0x22e452 = document[_0x5b445e(0x4db)](
      _0x5b445e(0x727) + _0x191e32 + "\x22]",
    ),
    _0x5dd5a3 = $(_0x5b445e(0x405) + _0x191e32)?.[_0x5b445e(0x6ba)] || ![],
    _0x4c59c2 = $(_0x5b445e(0x42b) + _0x191e32),
    _0x25acc7 = $(_0x5b445e(0x5ad) + _0x191e32);
  if (_0x22e452)
    _0x22e452[_0x5b445e(0x5a3)][_0x5b445e(0x668)](_0x5b445e(0x429), _0x5dd5a3);
  if (_0x4c59c2) _0x4c59c2[_0x5b445e(0x70f)] = _0x5dd5a3;
  if (_0x25acc7) _0x25acc7[_0x5b445e(0x70f)] = _0x5dd5a3;
}
function setStationEditHours(_0x959e8f) {
  const _0x19359a = _0x562b0b;
  OPENING_DAY_OPTIONS[_0x19359a(0x49f)]((_0x7b05fb) => {
    const _0x15ecc7 = _0x19359a,
      _0x5413cf = normalizeOpeningDay(
        _0x959e8f?.[_0x7b05fb["id"]] || DEFAULT_OPENING_DAY,
      ),
      _0x17f39c = $(_0x15ecc7(0x42b) + _0x7b05fb["id"]),
      _0x5c7be7 = $(_0x15ecc7(0x5ad) + _0x7b05fb["id"]),
      _0x5187d5 = $(_0x15ecc7(0x405) + _0x7b05fb["id"]);
    if (_0x17f39c) _0x17f39c[_0x15ecc7(0x270)] = _0x5413cf["open"];
    if (_0x5c7be7) _0x5c7be7["value"] = _0x5413cf[_0x15ecc7(0x211)];
    if (_0x5187d5) _0x5187d5[_0x15ecc7(0x6ba)] = _0x5413cf[_0x15ecc7(0x3f5)];
    syncStationHoursRow(_0x7b05fb["id"]);
  });
}
function readStationEditOpeningHours() {
  return OPENING_DAY_OPTIONS["reduce"]((_0x22f004, _0x55a548) => {
    const _0x5f1ac6 = _0x2558;
    return (
      (_0x22f004[_0x55a548["id"]] = normalizeOpeningDay({
        open: $(_0x5f1ac6(0x42b) + _0x55a548["id"])?.["value"],
        close: $(_0x5f1ac6(0x5ad) + _0x55a548["id"])?.[_0x5f1ac6(0x270)],
        closed:
          $(_0x5f1ac6(0x405) + _0x55a548["id"])?.[_0x5f1ac6(0x6ba)] || ![],
      })),
      _0x22f004
    );
  }, {});
}
function closeStationEditModal() {
  const _0x1b774e = _0x562b0b,
    _0x22dbc8 = $(_0x1b774e(0x6aa));
  if (!_0x22dbc8) return;
  (_0x22dbc8[_0x1b774e(0x5a3)][_0x1b774e(0x626)](_0x1b774e(0x382)),
    _0x22dbc8[_0x1b774e(0x295)]("aria-hidden", _0x1b774e(0x2a5)),
    document[_0x1b774e(0x674)]["classList"]["remove"]("modal-open"),
    (currentStationEditStation = null));
  const _0x4697bc = $(_0x1b774e(0x641));
  _0x4697bc &&
    ((_0x4697bc[_0x1b774e(0x23a)] = ""),
    (_0x4697bc[_0x1b774e(0x566)] = _0x1b774e(0x52c)));
}
function openStationEditModal(_0x2cd151) {
  const _0x4a8abf = _0x562b0b,
    _0x871af5 = stationRecords[_0x4a8abf(0x40f)](
      (_0x3ef4b8) => _0x3ef4b8["id"] === _0x2cd151,
    );
  if (!_0x871af5) return;
  ((currentStationEditStation = _0x871af5),
    ($("stationEditId")[_0x4a8abf(0x270)] = _0x871af5["id"]),
    ($("stationEditName")["value"] =
      _0x871af5[_0x4a8abf(0x43e)] ||
      _0x871af5[_0x4a8abf(0x6bb)] ||
      "Cycl\x20station"),
    ($("stationEditAddress")[_0x4a8abf(0x270)] =
      _0x871af5[_0x4a8abf(0x291)] || _0x871af5[_0x4a8abf(0x484)] || ""),
    ($("stationEditArea")[_0x4a8abf(0x270)] =
      _0x871af5[_0x4a8abf(0x484)] || _0x871af5[_0x4a8abf(0x28c)] || ""));
  const _0x446c42 = $(_0x4a8abf(0x6d8));
  if (_0x446c42)
    _0x446c42[_0x4a8abf(0x23a)] =
      _0x4a8abf(0x21c) +
      (_0x871af5[_0x4a8abf(0x43e)] ||
        _0x871af5[_0x4a8abf(0x6bb)] ||
        _0x4a8abf(0x5e2)) +
      ".";
  setStationEditHours(getStationOpeningHours(_0x871af5));
  const _0x4aa56d = $(_0x4a8abf(0x6aa));
  if (!_0x4aa56d) return;
  (_0x4aa56d["classList"][_0x4a8abf(0x767)](_0x4a8abf(0x382)),
    _0x4aa56d[_0x4a8abf(0x295)](_0x4a8abf(0x4ff), "false"),
    document[_0x4a8abf(0x674)][_0x4a8abf(0x5a3)]["add"](_0x4a8abf(0x3db)),
    window[_0x4a8abf(0x1fc)](() => $(_0x4a8abf(0x31d))?.[_0x4a8abf(0x453)]()));
}
async function saveStationDetails(_0x1a9857) {
  const _0xdc2a20 = _0x562b0b;
  _0x1a9857[_0xdc2a20(0x580)]();
  if (!currentStationEditStation || !currentPartner) return;
  if (requireHttpOrigin(_0xdc2a20(0x794))) return;
  const _0x5e4018 = $(_0xdc2a20(0x57e)),
    _0x33f1e9 = $(_0xdc2a20(0x641)),
    _0x1c31a4 = _0x5e4018[_0xdc2a20(0x23a)],
    _0x5724c1 = $("stationEditName")["value"][_0xdc2a20(0x583)](),
    _0x5d25a3 = $(_0xdc2a20(0x7a6))["value"]["trim"](),
    _0x556a74 = $(_0xdc2a20(0x663))[_0xdc2a20(0x270)][_0xdc2a20(0x583)]();
  if (!_0x5724c1 || !_0x5d25a3) {
    _0x33f1e9 &&
      ((_0x33f1e9[_0xdc2a20(0x23a)] = _0xdc2a20(0x5c4)),
      (_0x33f1e9[_0xdc2a20(0x566)] = _0xdc2a20(0x5f5)));
    return;
  }
  const _0x37729d = {
    title: _0x5724c1,
    placeName: _0x5724c1,
    address: _0x5d25a3,
    location: _0x556a74,
    openingHours: readStationEditOpeningHours(),
  };
  ((_0x5e4018["disabled"] = !![]),
    (_0x5e4018[_0xdc2a20(0x23a)] = _0xdc2a20(0x29f)));
  try {
    await updateDoc(
      doc(db, collections["stations"], currentStationEditStation["id"]),
      {
        ..._0x37729d,
        openingHoursUpdatedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        updatedByPartnerId: currentPartner["id"],
        updatedByPartnerCompanyName: currentPartner["companyName"] || "",
      },
    );
    const _0x2f2f95 = stationRecords[_0xdc2a20(0x40f)](
      (_0x1f624a) => _0x1f624a["id"] === currentStationEditStation["id"],
    );
    if (_0x2f2f95) Object[_0xdc2a20(0x606)](_0x2f2f95, _0x37729d);
    (renderDashboard(), closeStationEditModal());
  } catch (_0x36b6dd) {
    _0x33f1e9
      ? ((_0x33f1e9[_0xdc2a20(0x23a)] =
          _0x36b6dd[_0xdc2a20(0x52c)] || _0xdc2a20(0x393)),
        (_0x33f1e9[_0xdc2a20(0x566)] = _0xdc2a20(0x5f5)))
      : window[_0xdc2a20(0x725)](
          _0x36b6dd[_0xdc2a20(0x52c)] || _0xdc2a20(0x393),
        );
  } finally {
    ((_0x5e4018[_0xdc2a20(0x70f)] = ![]),
      (_0x5e4018[_0xdc2a20(0x23a)] = _0x1c31a4));
  }
}
async function startPartnerCheckout(
  _0x35989a,
  _0x2f885a = _0x562b0b(0x2f9),
  _0x5e4e6f = null,
) {
  const _0x427e5c = _0x562b0b;
  if (!currentPartner) return;
  if (requireHttpOrigin(_0x427e5c(0x2b5))) return;
  const _0x4fdf84 = PLAN_BY_ID[_0x35989a];
  if (!_0x4fdf84 || !_0x4fdf84[_0x427e5c(0x5e8)]) return;
  const _0x65d291 = _0x5e4e6f?.[_0x427e5c(0x23a)];
  _0x5e4e6f &&
    ((_0x5e4e6f[_0x427e5c(0x70f)] = !![]),
    (_0x5e4e6f[_0x427e5c(0x23a)] = _0x427e5c(0x749)));
  try {
    const _0x217fca = httpsCallable(
        cloudFunctions,
        "createPartnerPortalCheckoutSession",
      ),
      _0x15499a = new URL(window["location"][_0x427e5c(0x5f3)]);
    _0x15499a[_0x427e5c(0x6e0)]["set"](_0x427e5c(0x526), _0x427e5c(0x3b7));
    const _0x5935f5 = new URL(window["location"][_0x427e5c(0x5f3)]);
    _0x5935f5[_0x427e5c(0x6e0)][_0x427e5c(0x4fd)](
      _0x427e5c(0x526),
      "cancelled",
    );
    const _0x4584ac = await _0x217fca({
        tier: _0x4fdf84["stripeTier"],
        stationId: _0x2f885a,
        successUrl: _0x15499a["toString"](),
        cancelUrl: _0x5935f5["toString"](),
      }),
      _0x35374b = _0x4584ac?.[_0x427e5c(0x787)]?.[_0x427e5c(0x54e)];
    if (!_0x35374b) throw new Error(_0x427e5c(0x6e6));
    window[_0x427e5c(0x484)][_0x427e5c(0x5f3)] = _0x35374b;
  } catch (_0x3665bf) {
    (window[_0x427e5c(0x725)](
      getReadableCallableError(_0x3665bf, _0x427e5c(0x30d)),
    ),
      _0x5e4e6f &&
        ((_0x5e4e6f[_0x427e5c(0x70f)] = ![]),
        (_0x5e4e6f[_0x427e5c(0x23a)] = _0x65d291)));
  }
}
async function startPartnerSetupSession(_0x3e85b2 = null) {
  const _0x4015e1 = _0x562b0b;
  if (!currentPartner) return;
  if (requireHttpOrigin(_0x4015e1(0x676))) return;
  const _0x498c8d = _0x3e85b2?.[_0x4015e1(0x23a)];
  _0x3e85b2 &&
    ((_0x3e85b2[_0x4015e1(0x70f)] = !![]),
    (_0x3e85b2["textContent"] = "Opening\x20Stripe..."));
  try {
    const _0x394674 = httpsCallable(cloudFunctions, _0x4015e1(0x66a)),
      _0x488e95 = new URL(window["location"][_0x4015e1(0x5f3)]);
    _0x488e95[_0x4015e1(0x6e0)][_0x4015e1(0x4fd)](
      _0x4015e1(0x526),
      _0x4015e1(0x449),
    );
    const _0x575e07 = new URL(window[_0x4015e1(0x484)][_0x4015e1(0x5f3)]);
    _0x575e07[_0x4015e1(0x6e0)][_0x4015e1(0x4fd)](
      _0x4015e1(0x526),
      "setup_cancelled",
    );
    const _0x3284a1 = await _0x394674({
        successUrl: _0x488e95[_0x4015e1(0x585)](),
        cancelUrl: _0x575e07[_0x4015e1(0x585)](),
      }),
      _0x5d64d1 = _0x3284a1?.[_0x4015e1(0x787)]?.[_0x4015e1(0x54e)];
    if (!_0x5d64d1) throw new Error(_0x4015e1(0x431));
    window["location"][_0x4015e1(0x5f3)] = _0x5d64d1;
  } catch (_0x4e59db) {
    (window[_0x4015e1(0x725)](
      getReadableCallableError(_0x4e59db, _0x4015e1(0x59e)),
    ),
      _0x3e85b2 &&
        ((_0x3e85b2[_0x4015e1(0x70f)] = ![]),
        (_0x3e85b2[_0x4015e1(0x23a)] = _0x498c8d)));
  }
}
async function saveStationTier() {
  const _0x4918e9 = _0x562b0b;
  if (!currentTierEditStation || !selectedTierId) return;
  if (requireHttpOrigin(_0x4918e9(0x318))) return;
  const _0x4abc5c = $(_0x4918e9(0x216)),
    _0x34009c = _0x4abc5c[_0x4918e9(0x23a)],
    _0x51ec71 = TIER_BY_ID[selectedTierId] || TIER_BY_ID[_0x4918e9(0x61c)],
    _0xb4a758 = PLAN_BY_ID[_0x51ec71[_0x4918e9(0x62b)]] || PLAN_BY_ID["free"];
  if (_0x51ec71[_0x4918e9(0x491)] > 0x0) {
    await startPartnerCheckout(
      _0xb4a758["id"],
      currentTierEditStation["id"],
      _0x4abc5c,
    );
    return;
  }
  ((_0x4abc5c[_0x4918e9(0x70f)] = !![]),
    (_0x4abc5c["textContent"] = _0x4918e9(0x29f)));
  try {
    await updateDoc(
      doc(db, collections["stations"], currentTierEditStation["id"]),
      { tier: selectedTierId, tierUpdatedAt: serverTimestamp() },
    );
    const _0x5975c2 = stationRecords[_0x4918e9(0x40f)](
      (_0x4e114e) => _0x4e114e["id"] === currentTierEditStation["id"],
    );
    if (_0x5975c2) _0x5975c2[_0x4918e9(0x520)] = selectedTierId;
    (renderDashboard(), closeTierModal());
  } catch (_0x3b43fd) {
    (window[_0x4918e9(0x725)](_0x3b43fd[_0x4918e9(0x52c)] || _0x4918e9(0x4bd)),
      (_0x4abc5c["disabled"] = ![]),
      (_0x4abc5c["textContent"] = _0x34009c));
  }
}
function cleanCouponCodePart(_0x77d21c) {
  const _0x16767e = _0x562b0b;
  return String(_0x77d21c || "")
    [_0x16767e(0x583)]()
    [_0x16767e(0x5d5)](/^\uFEFF/, "")
    [_0x16767e(0x5d5)](/^"|"$/g, "")
    [_0x16767e(0x5d5)](/""/g, "\x22");
}
const couponCodeHeaders = [
    _0x562b0b(0x434),
    _0x562b0b(0x4c3),
    _0x562b0b(0x352),
    "voucher",
    _0x562b0b(0x3ff),
  ],
  couponExpiryHeaders = [
    "",
    "expiresat",
    _0x562b0b(0x2a9),
    "expirydate",
    _0x562b0b(0x59b),
    _0x562b0b(0x74b),
    _0x562b0b(0x56b),
  ];
function isCouponCodeHeader(_0x4efaee, _0x7c95e5) {
  const _0x1a8c5d = _0x562b0b,
    _0x2fea27 = _0x4efaee[_0x1a8c5d(0x374)]()[_0x1a8c5d(0x5d5)](/[\s_-]+/g, ""),
    _0x4bf566 = _0x7c95e5["toLowerCase"]()["replace"](/[\s_-]+/g, "");
  return (
    couponCodeHeaders[_0x1a8c5d(0x46c)](_0x2fea27) &&
    couponExpiryHeaders[_0x1a8c5d(0x46c)](_0x4bf566)
  );
}
function looksLikeCouponExpiry(_0x31d060) {
  const _0xf12712 = _0x562b0b,
    _0x4929d2 = _0x31d060[_0xf12712(0x374)]()[_0xf12712(0x5d5)](/[\s_-]+/g, "");
  return (
    couponExpiryHeaders[_0xf12712(0x46c)](_0x4929d2) ||
    /^\d{4}-\d{2}-\d{2}$/[_0xf12712(0x39b)](_0x31d060) ||
    /^\d{1,4}[-/.]\d{1,2}[-/.]\d{1,4}$/[_0xf12712(0x39b)](_0x31d060)
  );
}
function isValidCouponExpiry(_0x2e7f0a) {
  const _0x2be9ed = _0x562b0b;
  if (!_0x2e7f0a) return !![];
  if (!/^\d{4}-\d{2}-\d{2}$/[_0x2be9ed(0x39b)](_0x2e7f0a)) return ![];
  const [_0x50dd9a, _0x403df3, _0x1fd452] =
      _0x2e7f0a[_0x2be9ed(0x7ae)]("-")[_0x2be9ed(0x21b)](Number),
    _0x28437b = new Date(
      Date[_0x2be9ed(0x5ac)](_0x50dd9a, _0x403df3 - 0x1, _0x1fd452),
    );
  return (
    _0x28437b["getUTCFullYear"]() === _0x50dd9a &&
    _0x28437b["getUTCMonth"]() === _0x403df3 - 0x1 &&
    _0x28437b[_0x2be9ed(0x595)]() === _0x1fd452
  );
}
function getInvalidCouponExpiry(_0x4801c5) {
  const _0x528a95 = _0x562b0b;
  return _0x4801c5["find"](
    (_0x55ae8d) =>
      _0x55ae8d[_0x528a95(0x29b)] &&
      !isValidCouponExpiry(_0x55ae8d[_0x528a95(0x29b)]),
  );
}
function setRewardCodesMessage(_0x55c274 = "", _0x52ec12 = _0x562b0b(0x50f)) {
  const _0x11c604 = _0x562b0b,
    _0x37b419 = $(_0x11c604(0x232));
  if (!_0x37b419) return;
  ((_0x37b419["textContent"] = _0x55c274),
    (_0x37b419[_0x11c604(0x566)] = _0x55c274
      ? _0x11c604(0x3bd) + _0x52ec12
      : "message"));
}
function parseCodeRow(_0xa1a679) {
  const _0x107798 = _0x562b0b,
    _0x2fa8d3 = _0xa1a679["includes"](",")
      ? ","
      : _0xa1a679["includes"](";")
        ? ";"
        : "";
  if (!_0x2fa8d3)
    return [{ code: cleanCouponCodePart(_0xa1a679), expiresAt: "" }];
  const _0x179834 =
    _0xa1a679[_0x107798(0x7ae)](_0x2fa8d3)[_0x107798(0x21b)](
      cleanCouponCodePart,
    );
  if (
    _0x2fa8d3 === ";" &&
    _0x179834[_0x107798(0x400)] > 0x1 &&
    !looksLikeCouponExpiry(_0x179834[0x1] || "")
  )
    return _0x179834["map"]((_0x4e4a83) => ({
      code: _0x4e4a83,
      expiresAt: "",
    }));
  return [{ code: _0x179834[0x0] || "", expiresAt: _0x179834[0x1] || "" }];
}
function parseCodes(_0x25c6e6) {
  const _0x4a0eea = _0x562b0b;
  return _0x25c6e6[_0x4a0eea(0x7ae)](/\n+/)
    ["map"]((_0x1ed322) => _0x1ed322[_0x4a0eea(0x583)]())
    ["filter"](Boolean)
    ["flatMap"](parseCodeRow)
    ["filter"](
      (_0x430c1d) =>
        _0x430c1d["code"] &&
        !isCouponCodeHeader(
          _0x430c1d[_0x4a0eea(0x434)],
          _0x430c1d[_0x4a0eea(0x29b)],
        ),
    );
}
function importRewardCodeFileText(_0x1ba764) {
  const _0x418435 = _0x562b0b,
    _0x51c650 = String(_0x1ba764 || "")
      [_0x418435(0x5d5)](/\r\n?/g, "\x0a")
      [_0x418435(0x583)]();
  if (!_0x51c650) return ![];
  const _0x21fd6b = $(_0x418435(0x643)),
    _0x3e33ed = _0x21fd6b[_0x418435(0x270)][_0x418435(0x583)]();
  return (
    (_0x21fd6b[_0x418435(0x270)] = _0x3e33ed
      ? _0x3e33ed + "\x0a" + _0x51c650
      : _0x51c650),
    !![]
  );
}
function validateRewardCodesField({ focus: focus = ![] } = {}) {
  const _0xace279 = _0x562b0b,
    _0xbb5aad = $(_0xace279(0x643)),
    _0x973a31 = parseCodes(_0xbb5aad["value"]),
    _0x167ef8 = getInvalidCouponExpiry(_0x973a31);
  if (_0x167ef8) {
    (setRewardCodesMessage(
      "Coupon\x20expiry\x20dates\x20must\x20be\x20written\x20as\x20YYYY-MM-DD,\x20for\x20example\x202026-12-31.\x20Check\x20" +
        _0x167ef8[_0xace279(0x434)] +
        ".",
      _0xace279(0x222),
    ),
      _0xbb5aad[_0xace279(0x295)]("aria-invalid", _0xace279(0x2a5)));
    if (focus) _0xbb5aad["focus"]();
    return { valid: ![], codeLines: _0x973a31 };
  }
  return (
    _0xbb5aad[_0xace279(0x3fd)](_0xace279(0x78b)),
    _0x973a31[_0xace279(0x400)]
      ? setRewardCodesMessage(
          _0x973a31[_0xace279(0x400)] +
            "\x20coupon\x20code" +
            (_0x973a31["length"] === 0x1 ? "" : "s") +
            _0xace279(0x639),
          _0xace279(0x3b7),
        )
      : setRewardCodesMessage(""),
    { valid: !![], codeLines: _0x973a31 }
  );
}
(document[_0x562b0b(0x3b9)](_0x562b0b(0x6c5))[_0x562b0b(0x49f)]((_0x55a732) => {
  const _0x3aa3b2 = _0x562b0b;
  _0x55a732[_0x3aa3b2(0x23d)](_0x3aa3b2(0x2dc), () =>
    showAuthTab(_0x55a732["dataset"]["authTab"]),
  );
}),
  document[_0x562b0b(0x3b9)](_0x562b0b(0x326))[_0x562b0b(0x49f)]((_0x7b3f1) => {
    const _0xae9060 = _0x562b0b;
    _0x7b3f1["addEventListener"](_0xae9060(0x2dc), () => {
      const _0x2c27a1 = _0xae9060,
        _0x54e6d4 = _0x7b3f1[_0x2c27a1(0x21a)]["section"];
      (document[_0x2c27a1(0x3b9)]("[data-section]")[_0x2c27a1(0x49f)](
        (_0x277c22) =>
          _0x277c22[_0x2c27a1(0x5a3)][_0x2c27a1(0x668)](
            _0x2c27a1(0x3e0),
            _0x277c22[_0x2c27a1(0x21a)]["section"] === _0x54e6d4,
          ),
      ),
        document[_0x2c27a1(0x3b9)](_0x2c27a1(0x344))[_0x2c27a1(0x49f)](
          (_0x1ab2ac) =>
            _0x1ab2ac["classList"][_0x2c27a1(0x668)](
              "active",
              _0x1ab2ac["id"] === _0x2c27a1(0x3ee) + _0x54e6d4,
            ),
        ));
      if (_0x54e6d4 === _0x2c27a1(0x495)) renderAnalytics();
      if (_0x54e6d4 === _0x2c27a1(0x526))
        refreshPartnerBillingStatus({ silent: !![] });
      if (
        _0x54e6d4 === _0x2c27a1(0x2c8) &&
        partnerSupport["selectedThreadId"]
      ) {
        const _0x2c565e = partnerSupport["threads"][_0x2c27a1(0x40f)](
          (_0x36fc0c) => _0x36fc0c["id"] === partnerSupport[_0x2c27a1(0x4d6)],
        );
        isThreadUnreadForPartner(_0x2c565e) &&
          markPartnerSupportThreadRead(partnerSupport[_0x2c27a1(0x4d6)]);
      }
      if (PARTNER_TOURS[_0x54e6d4]) showPartnerTour(_0x54e6d4);
      closeMobileSidebar();
    });
  }));
const sidebarEl = document["querySelector"](_0x562b0b(0x1ff)),
  sidebarBackdropEl = $(_0x562b0b(0x260)),
  sidebarToggleEl = $(_0x562b0b(0x4b1));
function openMobileSidebar() {
  const _0x227658 = _0x562b0b;
  if (!sidebarEl) return;
  (sidebarEl[_0x227658(0x5a3)][_0x227658(0x767)](_0x227658(0x790)),
    sidebarBackdropEl[_0x227658(0x5a3)]["add"]("is-open"),
    sidebarToggleEl["classList"][_0x227658(0x767)](_0x227658(0x790)),
    sidebarToggleEl[_0x227658(0x295)](_0x227658(0x288), "true"));
}
function closeMobileSidebar() {
  const _0x37426d = _0x562b0b;
  if (!sidebarEl) return;
  (sidebarEl[_0x37426d(0x5a3)][_0x37426d(0x626)](_0x37426d(0x790)),
    sidebarBackdropEl[_0x37426d(0x5a3)][_0x37426d(0x626)](_0x37426d(0x790)),
    sidebarToggleEl[_0x37426d(0x5a3)]["remove"](_0x37426d(0x790)),
    sidebarToggleEl[_0x37426d(0x295)]("aria-expanded", "false"));
}
function _0x2b31() {
  const _0x5e230 = [
    "<div\x20class=\x22h-corner\x22></div>",
    "Supermarket",
    "period\x20end",
    "boostSpendQueued",
    "flex",
    "\x20subscription\x20·\x20cancels\x20on\x20",
    "Repeat\x20customers",
    "remove",
    "cpaValidated",
    "profileForm",
    "[tours]\x20manually\x20showing",
    "startsWith",
    "planId",
    "1217136uIcmsl",
    ".alerts-card",
    "cancelAtPeriodEnd",
    "rewardId",
    "capacity",
    "%\x20of\x20peer\x20rewards</strong>\x20use\x20sponsored\x20placement\x20—\x20your\x20offers\x20are\x20organic\x20only.",
    "costBoostMeta",
    "</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20class=\x22small-action\x20danger\x22\x20type=\x22button\x22\x20data-reward-action=\x22archive\x22\x20data-id=\x22",
    "subscriptionTier",
    "imagePath",
    ".kpi-info-btn",
    "reason",
    "rewardPhysicalAddress",
    "\x20ready.",
    "rewardIsOnline",
    "signupPhone",
    "some",
    "locality.",
    "boostCustomDays",
    "Other",
    "golden",
    "stationEditMessage",
    "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>",
    "rewardCodes",
    "timestamp",
    "floor",
    "access",
    "Add\x20how\x20many\x20rewards\x20are\x20available\x20or\x20switch\x20availability\x20to\x20unlimited.",
    "stopPropagation",
    "card",
    "Archive\x20",
    "<span\x20class=\x22unit\x22>\x20Cycl\x20Coins</span>",
    "signupAddressLng",
    "clearRewardImageButton",
    "Wholesale",
    "blob:",
    "Nightclub",
    "</em>\x20reward",
    "-day\x20plan</small>",
    "px\x22\x20title=\x22You:\x20",
    "New\x20conversation",
    "\x20promoted\x20in\x20featured\x20marketplace\x20slots.",
    "rewardDescription",
    ".boost-card",
    "\x20peer",
    "tone",
    "\x20primary\x20demand\x20band",
    "void",
    ".\x20The\x20reward\x20will\x20be\x20restored\x20as\x20paused\x20—\x20pause\x20another\x20to\x20activate\x20it.",
    "cyclTrialStart",
    "\x20km.",
    "</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22invoice-amount\x22>",
    "activatedStore",
    "Florist",
    "pendingLogoutButton",
    "stationEditArea",
    "invoices",
    "rewardFilter",
    "costBoostSpend",
    "<div\x20class=\x22empty-state\x22>No\x20peer\x20activity\x20yet\x20in\x20this\x20filter.</div>",
    "toggle",
    "Repair",
    "createPartnerPortalSetupSession",
    "%\x22\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20title=\x22",
    "messages",
    "Stripe\x20could\x20not\x20collect\x20the\x20outstanding\x20boost\x20charge.\x20Try\x20again\x20or\x20update\x20the\x20saved\x20card.",
    "rewardImagePreviewImg",
    "[data-iso]",
    "planLabel",
    "%\x20full</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22station-card-actions\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22code\x22>",
    "current",
    "unpaid",
    "body",
    "kpiPopover",
    "saving\x20a\x20Stripe\x20card",
    "Could\x20not\x20auto-pause\x20rewards\x20beyond\x20plan\x20limit",
    "description",
    "is-warn",
    "signupFirstName",
    "boosts\x20purchased\x20this\x20month",
    "cos",
    "cohortSegTwoFour",
    "Shows\x20where\x20foot\x20traffic\x20originates\x20relative\x20to\x20your\x20venue.\x20Pin\x20size\x20=\x20volume;\x20red\x20pins\x20are\x20accelerating.\x20Use\x20the\x20radius\x20toggle\x20to\x20see\x20how\x20far\x20your\x20real\x20audience\x20travels,\x20and\x20spot\x20nearby\x20peers\x20to\x20benchmark\x20against.",
    "\x22>Archive</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20",
    "cyclPartnerOnboardingDismissed:",
    "Casual\x20dining",
    "</strong>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22recycler-meta\x22>",
    "offline",
    "px\x22></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22velocity-week\x22>",
    "originWarning",
    "profileAddressLng",
    "catFilter",
    "Alert",
    "homeStationsCountInline",
    "Tue",
    "opportunity",
    "55+",
    "</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20class=\x22reward-boost-button\x22\x20type=\x22button\x22\x20data-reward-action=\x22boost\x22\x20data-id=\x22",
    "now",
    "that",
    "This\x20reward\x20is\x20promoted.\x20Feature\x20it\x20when\x20you\x20want\x20the\x20strongest\x20push\x20for\x20a\x20campaign\x20or\x20weekend\x20rush.",
    "Coffee\x20shop",
    "Online",
    "buy",
    "repeatRate",
    "draft",
    "profileSaveButton",
    "createdAt",
    "</h4>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20",
    "Education",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</article>\x0a\x20\x20\x20\x20\x20\x20\x20\x20",
    "lat",
    "is-selected",
    "Burger\x20/\x20sandwich",
    "Per-station\x20breakdown\x20of\x20recycling\x20volume,\x20fill\x20rate,\x20and\x20unique\x20visitors.\x20High\x20fill\x20%\x20with\x20low\x20visitors\x20means\x20heavy\x20reuse\x20by\x20a\x20small\x20group;\x20low\x20fill\x20with\x20high\x20visitors\x20suggests\x20casual\x20one-time\x20recyclers\x20—\x20different\x20targeting\x20tactics\x20apply.",
    "Plastic,\x20CO₂,\x20water,\x20and\x20energy\x20saved\x20—\x20driven\x20by\x20activations\x20from\x20your\x20rewards.",
    "</span><small>kr\x20/\x20month</small></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22plan-copy\x22>",
    "scrollHeight",
    "tag",
    "auth/network-request-failed",
    "userId",
    "3–8\x20km",
    "Priority\x20support",
    "[data-station-action=\x27upgrade\x27]",
    "createPartnerPortalBillingSession",
    "stationWater",
    "stationEditModal",
    "\x0a\x0aYou\x20will\x20be\x20taken\x20to\x20Stripe\x20to\x20confirm\x20the\x20cancellation.\x20After\x20it\x20ends,\x20your\x20reward\x20limit\x20drops\x20to\x20the\x20Free\x20tier\x20(3\x20active\x20rewards)\x20and\x20any\x20extras\x20will\x20be\x20paused\x20automatically.",
    "website",
    "auth-booting",
    "from",
    "is-neg",
    "custom",
    "</span></td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20",
    "</b><span>Activations</span></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22reward-metric\x22><b>",
    "<span\x20class=\x22plan-pill\x22>Recommended</span>",
    "</small></span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20",
    "file:",
    "findIndex",
    "partnerId",
    "\x22\x20alt=\x22",
    "cycl-ionic.appspot.com",
    "checked",
    "title",
    "hidden",
    "properties",
    "rewardSponsoredCount",
    "signupCountry",
    "Expanded\x20promotion\x20credit",
    "below",
    "ceil",
    "signal",
    "Could\x20not\x20request\x20collection.",
    "[data-auth-tab]",
    "Golden",
    "rewardLocationSuggestions",
    "billPerformance",
    "boostPriceKr",
    "Portugal",
    "\x20secondary",
    "setTimeout",
    "stationTierLabel",
    "redemptions",
    "Dessert\x20/\x20ice\x20cream",
    "Activating...",
    "twoFour",
    "any",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22funnel-step\x20step-1\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22funnel-step-label\x22>Clicks</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22funnel-step-value\x22>",
    "</option>",
    "subscription_monthly",
    "\x20as\x20emptied?\x20This\x20resets\x20the\x20bag\x20count\x20to\x200.",
    "Library",
    "stationEditModalSubtitle",
    "failed\x20to\x20fetch",
    "dismissPartnerOnboardingButton",
    "Upgrade\x20to\x20",
    "Resetting\x20in\x20",
    "valid",
    "themeList",
    "</strong><span>",
    "searchParams",
    "demoRewardGender",
    "\x20activations\x20per\x20reward\x20on\x20average;\x20you\x27re\x20at\x20",
    "Home\x20goods",
    "boostSpendDue",
    "Stripe\x20Billing\x20Portal\x20did\x20not\x20return\x20a\x20URL.",
    "Stripe\x20Checkout\x20did\x20not\x20return\x20a\x20URL.",
    ".jpg",
    "currentPlanCopy",
    "homePlastic",
    "missing_saved_card",
    "blurb",
    "demoRewardAge",
    "popular_sponsored",
    "Enter",
    "background",
    "tue",
    "<em>",
    "<div\x20class=\x22muted\x22\x20style=\x22padding:\x208px;\x20text-align:center;\x22>Loading\x20messages…</div>",
    "homeEnergy",
    "Juice\x20/\x20smoothie\x20bar",
    "Paid\x20plan",
    "src",
    "Bakery",
    "rewardForm",
    "demoStationAge",
    "cohortSegOne",
    "peer\x20median\x20<em>",
    "td-warn",
    "en-GB",
    "could\x20not\x20reach\x20cloud\x20firestore\x20backend",
    "getBoundingClientRect",
    "toDate",
    "\x22>Edit</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20class=\x22small-action\x22\x20type=\x22button\x22\x20data-reward-action=\x22toggle\x22\x20data-id=\x22",
    "background:rgba(44,182,114,0.25);color:#07190F",
    "createElement",
    "</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20",
    "activatePartnerRewardBoost",
    "Could\x20not\x20mark\x20station\x20as\x20emptied.",
    "<div\x20class=\x22empty-state\x22\x20style=\x22font-size:12px;padding:12px\x200\x22>No\x20gender\x20data\x20yet.</div>",
    "This\x20reward\x20is\x20already\x20using\x20the\x20strongest\x20marketplace\x20placement.",
    "stationList",
    "Organic",
    "</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<strong>",
    "Add\x20card",
    "rewardModal",
    "\x20plan.",
    "disabled",
    "openingHours",
    "false",
    "How\x20many\x20times\x20your\x20reward\x20was\x20activated\x20per\x20reward\x20item.\x20A\x20high\x20number\x20means\x20your\x20offer\x20is\x20compelling\x20to\x20everyone\x20who\x20discovers\x20it.",
    "payment_failed",
    ".loyalty-card",
    "last4",
    "Closed",
    "our",
    ".\x20Higher\x20tiers\x20reward\x20users\x20with\x20more\x20Cycl\x20Coins\x20per\x20recycled\x20bottle.",
    "This\x20reward\x20already\x20has\x20an\x20active\x20boost.\x20Wait\x20until\x20it\x20ends\x20before\x20boosting\x20it\x20again.",
    "\x20Cycl\x20Coins</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22reward-placement-pill",
    "Paused",
    "</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22demo-bar-track\x22><div\x20class=\x22demo-bar-fill\x22\x20style=\x22width:",
    "but",
    "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td><span\x20class=\x22lb-trend\x20",
    "country.",
    "close\x20to\x20your\x20venue",
    "Top\x20assigned\x20stations",
    "Corporate\x20office",
    "\x22>Edit</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20class=\x22small-action\x22\x20type=\x22button\x22\x20data-reward-action=\x22restore\x22\x20data-id=\x22",
    "alle",
    "alert",
    "Wed",
    "[data-hours-row=\x22",
    "32669jODERH",
    "homeCo2",
    "maxCap",
    ".kpi-value",
    "max",
    "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20class=\x22td-num\x20",
    "Address\x20search\x20failed.",
    "List\x20on\x20the\x20marketplace\x20with\x20up\x20to\x203\x20active\x20rewards.",
    "loading",
    "organic",
    "other",
    "rewardPlacement",
    "sqrt",
    "copy",
    "selector",
    "[data-count-id=\x22navStationCount\x22]",
    "wed",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<article\x20class=\x22payment-card\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22payment-card-main\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22payment-card-brand\x22>",
    "stationCo2",
    "billingCardList",
    "is-due",
    "entertainment",
    "change",
    "Val%",
    "unsubscribeMessages",
    "Fri",
    "g-other",
    "catchmentInsightCopy",
    "topRewardBars",
    "getElementById",
    "auth/invalid-login-credentials",
    "login",
    "flatMap",
    "Opening\x20Stripe...",
    "\x20Cycl\x20Coins.\x20Lowering\x20the\x20bar\x20can\x20pull\x20users\x20from\x20larger\x20competitors.",
    "expirationdate",
    "</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<input\x20id=\x22stationHoursOpen_",
    "Uploading\x20image...",
    "<span\x20class=\x22boost-card-custom\x22><label>Days\x20<input\x20type=\x22number\x22\x20min=\x221\x22\x20max=\x22365\x22\x20id=\x22boostCustomDays\x22\x20value=\x22",
    "<div\x20class=\x22h-row-label",
    "kpiValidation",
    "isFinite",
    "style",
    "35–44",
    "Could\x20not\x20settle\x20boost\x20charges.",
    "shopping",
    "%\x22></div></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22demo-gender-pct\x22>",
    "hostPartnerId",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22support-msg\x20",
    "</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22invoice-description\x22\x20title=\x22",
    "restoring\x20rewards",
    "\x20of\x20",
    "ultra",
    "&#039;",
    "Recycling\x20sessions\x20at\x20your\x20stations\x20week\x20by\x20week\x20vs.\x20the\x20peer\x20median.\x20Rising\x20weeks\x20above\x20the\x20median\x20mean\x20your\x20brand\x20pull\x20is\x20strengthening.\x20Drops\x20below\x20median\x20are\x20an\x20early\x20warning\x20—\x20check\x20reward\x20activity\x20in\x20the\x20same\x20period.",
    "input",
    "lng",
    "</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20",
    "coachmark",
    "Use\x20this\x20broader\x20layer\x20to\x20spot\x20where\x20stronger\x20branding,\x20sponsored\x20visibility,\x20or\x20upgraded\x20stations\x20could\x20win\x20market\x20share.",
    "\x20is-closed",
    "\x20before\x20",
    "Asian",
    "add",
    "stationNumber",
    "age",
    "Peers\x20price\x20rewards\x20around\x20",
    "rewardLiveCount",
    "</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22reward-card-main\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22reward-card-title-row\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<strong>",
    "Profile\x20saved.",
    "auto",
    "stationPlastic",
    "\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22tier-card-head\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22tier-badge\x20tier-",
    "Total\x20in-store\x20validations\x20confirmed\x20by\x20your\x20staff.\x20Each\x20validation\x20equals\x20a\x20real\x20customer\x20visit\x20driven\x20by\x20Cycl.",
    "legendOrganicPct",
    ".\x20Pause\x20another\x20one\x20first,\x20or\x20upgrade\x20your\x20plan.",
    "profileWebsite",
    "Could\x20not\x20compress\x20image.",
    "updating\x20your\x20profile",
    "signupAbout",
    "homeRequests",
    "Could\x20not\x20save\x20reward.",
    "partners",
    "rabat",
    "multiplier",
    "background:rgba(20,18,15,0.04);color:#14120F",
    "homeCapacity",
    "currentPeriodEnd",
    "\x20is-recommended",
    "1–3\x20km",
    "internal",
    "message\x20show\x20success",
    "context",
    "09:00",
    "have",
    "data",
    "recycle_captures\x20query\x20failed:",
    "90LmSmhj",
    "cors",
    "aria-invalid",
    "stationEnergy",
    "query",
    "features",
    "starter",
    "is-open",
    "fitness",
    "invoiceHistoryList",
    "stripeBoostInvoiceItemId",
    "saving\x20station\x20details",
    "Publish\x20a\x20new\x20offer.\x20Set\x20title,\x20image,\x20Cycl\x20Coin\x20cost,\x20redemption\x20locations,\x20and\x20codes.",
    ")\x20·\x20",
    "Change\x20the\x20station\x27s\x20tier.\x20Higher\x20tiers\x20give\x20a\x20stronger\x20multiplier\x20and\x20better\x20placement\x20in\x20the\x20marketplace.",
    "contains",
    "0\x20kr",
    "entries",
    "[Catchment]\x20",
    "\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22tier-card-head\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22tier-badge\x22>",
    "codeLines",
    "placeholder",
    "image/jpeg",
    "loyaltyRepeatRate",
    "width",
    "priceKr",
    "support-msg--me",
    "place_name",
    "en-US",
    "stationEditAddress",
    "Could\x20not\x20read\x20that\x20CSV\x20file.",
    "Performance\x20by\x20metric",
    "\x20unpaid\x20boost",
    "Retail",
    "School",
    "toLocaleDateString",
    "showTour",
    "split",
    "rewardValidationRate",
    "%</em>",
    "\x20peers",
    "loyaltyAvgPerUser",
    "<a\x20class=\x22invoice-row\x22\x20href=\x22",
    ".peer-board-card",
    "Mediterranean",
    "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tr>",
    "locationPartnerId",
    "\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22support-msg-bubble\x22>",
    "Pay\x20outstanding",
    "Business",
    "</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20",
    "is-locked",
    "archiving\x20rewards",
    "sponsored",
    "clearTimeout",
    "kpiPopoverBody",
    "</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22recycler-name\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<strong>",
    "cards",
    "innerHTML",
    "Top\x20reward\x20themes",
    "\x20<span\x20class=\x22card-index\x22>act_layer</span>",
    "activating\x20a\x20boost",
    "Cycl\x20station",
    "Unknown",
    "text",
    "supportChatInput",
    ".tour-spotlight",
    "own",
    "requestAnimationFrame",
    "catchmentInsightAction",
    "index",
    "aside.sidebar",
    "demoStationGender",
    "billing-error",
    "Activate\x20boost",
    "Add\x20card\x20to\x20boost\x20·\x20",
    "homeVelocityChart",
    ".\x20Pause\x20or\x20archive\x20one,\x20or\x20upgrade\x20your\x20plan\x20to\x20add\x20more.",
    "d\x20ago",
    "kpiActivations",
    "%\x22></span></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22recycler-num\x22>",
    "logging\x20in",
    "and",
    "atan2",
    "Processing...",
    "You\x20have\x20",
    "</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span>",
    "billingPortalButton",
    "homeStations",
    "close",
    "threads",
    "Add\x20a\x20<em>reward.</em>",
    "Boost\x20active",
    "</span>\x20",
    "tierConfirmButton",
    "trialing",
    "</span></div>",
    "boostStartedAt",
    "dataset",
    "map",
    "Update\x20details\x20for\x20",
    "Thursday",
    "</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>",
    "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td><span\x20class=\x22dt-badge\x22>",
    "your\x20plan",
    "Could\x20not\x20read\x20the\x20selected\x20image.",
    "error",
    "homeFootTraffic",
    "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20class=\x22td-num\x20",
    "Conversion\x20rate",
    "topUsers",
    "Hair\x20salon",
    "subs",
    "Your\x20reward\x20listings\x20currently\x20live\x20and\x20visible\x20in\x20the\x20Cycl\x20marketplace.",
    "recommended",
    "boostStartedAtMs",
    "is-critical",
    "email",
    "supportNavBadge",
    "Bar\x20/\x20pub",
    "appShell",
    "files",
    "rewardCodesMessage",
    "refreshBillingButton",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22tier-card-mult\x22><em>",
    "Print\x20/\x20copy",
    "Start\x20typing\x20a\x20city",
    "premium",
    "boostModalSubtitle",
    "Could\x20not\x20backfill\x20boost\x20metric\x20baseline:",
    "textContent",
    "<div\x20class=\x22empty-state\x22\x20style=\x22grid-column:1/-1;padding:20px;\x22>Need\x20at\x20least\x20one\x20peer\x20to\x20compare\x20metrics.</div>",
    "rewardSubmitButton",
    "addEventListener",
    "recCount",
    "client\x20is\x20offline",
    "Activate",
    "No\x20rewards\x20yet.\x20Publish\x20your\x20first\x20offer\x20above.",
    "image",
    "\x20••••\x20",
    "loginForm",
    "Hotel",
    "is-active",
    "long",
    "stepName",
    "out",
    "bulk_codes",
    "Boost\x20this\x20reward",
    "Bottles\x20earn\x203x\x20Cycl\x20Coins.\x20Premium\x20glow\x20on\x20the\x20map\x20and\x20the\x20highest\x20top-of-mind\x20effect.",
    "10d",
    "%</b><span>Conversion</span></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22reward-card-actions\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20",
    "%\x20of\x20rewards\x20in\x20this\x20cohort\x20are\x20sponsored.\x20Boosting\x20one\x20reward\x20to\x20Sponsored\x20Popular\x20tends\x20to\x20lift\x20activations\x202–4x\x20for\x20the\x20month.",
    "\x22\x20loading=\x22lazy\x22>",
    "\x20kr",
    "tierModalSubtitle",
    "fivePlus",
    "contactFirstName",
    "innerHeight",
    "none",
    "Saving…",
    "ved",
    "in\x20the\x20broader\x20local\x20area",
    "<strong>Boost\x20active\x20·\x20",
    "activationsPerReward",
    "sort",
    "rewardImage",
    "[data-count-id=\x22navHomeCount\x22]",
    "Vacation\x20rental",
    "sidebarBackdrop",
    "profileAddressSuggestions",
    "icon",
    "blur",
    "one_off",
    "Mon",
    "hostBusinessName",
    "Activations",
    "\x20is-selected",
    "\x20kr</strong></span>",
    "\x22>Restore</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20",
    "catchmentInsightPeers",
    "</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22tier-card-blurb\x22>",
    "</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20",
    "\x20is-hot",
    "Mall",
    "value",
    "height",
    "Customer\x20demographics",
    "rewardTier",
    "filter",
    "billingBoostCopy",
    "ActivatedCouponLog",
    "</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22actions\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20class=\x22small-action\x22\x20type=\x22button\x22\x20data-station-action=\x22edit\x22\x20data-id=\x22",
    "<span\x20class=\x22alert-tag\x22>Benchmark</span>Top\x20peer:\x20<strong>",
    "getUTCMonth",
    "Make\x20featured",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22support-msg\x20support-msg--them\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22support-msg-bubble\x22>Hi\x20👋\x20Send\x20a\x20message\x20and\x20our\x20team\x20will\x20get\x20back\x20to\x20you\x20shortly.</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22support-msg-time\x22>Cycl\x20Support</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>",
    "Sponsored",
    "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20class=\x22td-demo\x22>",
    "partnerMeta",
    "[data-geo-filter]",
    "groupEnd",
    "</b><span>Clicks</span></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22reward-metric\x22><b>",
    "then",
    "inline-flex",
    "paid",
    "isOnline",
    "trialDaysLeft",
    "innerWidth",
    "aria-expanded",
    "</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22funnel-step-meta\x22>impressions</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22funnel-chevron\x22\x20aria-hidden=\x22true\x22>▸</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22funnel-step\x20step-2\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22funnel-step-label\x22>Activations</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22funnel-step-value\x22>",
    "%\x20of\x20peer\x20stations</strong>\x20upgraded\x20to\x20Premium\x20or\x20higher\x20—\x20pulling\x20more\x20foot\x20traffic.",
    "rewardSubtitle",
    "city",
    "da-DK",
    "%</strong>\x20vs\x20",
    "activationCount",
    "hasCustomer",
    "address",
    "catchmentInsightBand",
    "rewardActivations",
    "hospitality",
    "setAttribute",
    "cls",
    "<option\x20value=\x22",
    "billingBoostDueCell",
    "\x20activations\x20—\x20more\x20than\x20double\x20your\x20current\x20pace.",
    "</strong>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span>",
    "expiresAt",
    "cohortCountFivePlus",
    "Partner\x20access",
    "</article>",
    "Saving...",
    "recList",
    "</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</button>\x0a\x20\x20\x20\x20\x20\x20",
    "Includes\x20",
    "Live",
    "two",
    "true",
    "rewardImageStoragePath",
    "Loading\x20peer\x20data…",
    "unlimited",
    "expiry",
    "Publish\x20your\x20first\x20reward\x20to\x20start\x20ranking",
    "g-male",
    "reduce",
    "Stripe\x20invoice",
    "Germany",
    "requested",
    "resetPartnerTours",
    "tierModal",
    "velocityChart",
    "topbarPartnerName",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22recycler-row\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22recycler-rank\x22>",
    "starting\x20Stripe\x20Checkout",
    "Up\x20to\x2010\x20active\x20rewards\x20with\x20the\x20full\x20toolkit\x20for\x20serious\x20growth.",
    "loyaltyDistinctUsers",
    "\x20rewards.",
    "Consider\x20upgrading\x20one\x20nearby\x20station\x20or\x20pairing\x20your\x20offer\x20with\x20a\x20clearer\x20value\x20proposition\x20",
    "canvas",
    "cost",
    "topRecyclersList",
    "Opens\x20the\x20Edit\x20station\x20overlay\x20—\x20update\x20the\x20station\x27s\x20name,\x20address,\x20opening\x20hours,\x20and\x20capacity.",
    "User\x20·\x20",
    "2942658EFTODd",
    "fallback-inner",
    "sin",
    "</em>\x20distinct\x20customers\x20·\x2090d",
    "Trial\x20ended",
    "fromEntries",
    "Peers\x20in\x20your\x20category\x20publish\x20",
    "No\x20partner\x20profile\x20found\x20for\x20this\x20account.",
    "Foot\x20traffic\x20/\x20month",
    "support",
    ".catchment-card",
    "cycl-ionic.firebaseapp.com",
    "drawImage",
    "cyclPartnerTourDismissed:",
    "target",
    "sending\x20a\x20support\x20message",
    "sun",
    "\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22reward-card-thumb\x22>",
    "\x20is-current",
    "contactLastName",
    "billAccess",
    "cohorts",
    "sat",
    "rewardLimit",
    "right",
    "loadedAt",
    "data-count",
    "fri",
    "coordinates",
    "click",
    "size",
    "has",
    "smooth",
    "coachBackdrop",
    "rewardCodesFile",
    "use",
    "about",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22bar-row\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22bar-label\x22><strong>",
    "cyclPartnerTourSkipAll:",
    "\x20days",
    "clicks",
    "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20class=\x22td-num\x22>",
    "getTime",
    "\x20/\x20",
    "is-visible",
    "number",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<article\x20class=\x22plan-card",
    "billingBoostActive",
    "partnerOnboardingFloat",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20class=\x22td-title\x22\x20title=\x22",
    "amountDue",
    "cafe",
    "tierId",
    "scroll",
    "%\x20of\x20peer\x20stations\x20in\x20this\x20cohort\x20are\x20Premium\x20or\x20higher.\x20Higher\x20tiers\x20reward\x20users\x20with\x20more\x20Cycl\x20Coins\x20per\x20bottle,\x20which\x20tends\x20to\x20bring\x20them\x20back\x20to\x20your\x20location.",
    "#openRewardModal",
    "logoutButton",
    "Marketplace\x20clicks,\x20validated\x20visits,\x20conversion,\x20foot-traffic,\x20and\x20sponsored\x20placements\x20across\x20all\x20your\x20rewards.",
    "partner_portal",
    "left",
    "businessSubcategory",
    "\x20·\x20",
    "conversion",
    "g-unknown",
    "Bottles\x20earn\x202x\x20Cycl\x20Coins.\x20Marked\x20with\x20a\x20golden\x20ring\x20on\x20the\x20map.\x20Strong\x20customer\x20pull.",
    "<div\x20class=\x22",
    "offsetHeight",
    "cat",
    "this",
    "flexGrow",
    "get",
    "[data-hours-closed]",
    "profileCompany",
    "</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22rec-copy\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22rec-tag\x22>",
    ".station-card",
    "statusLabel",
    "homeKpiSponsored",
    "homeKpiClicks",
    "Could\x20not\x20start\x20Stripe\x20Checkout.",
    "<div\x20class=\x22empty-state\x22>Checking\x20cards…</div>",
    "National\x20brand",
    "Loading\x20Stripe",
    "</div>",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<tr",
    "activation",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20",
    "getFullYear",
    "homeValidations",
    "The\x20%\x20of\x20activations\x20verified\x20in-store\x20by\x20your\x20staff.\x20High\x20=\x20real\x20footfall.\x20Low\x20may\x20mean\x20no-shows\x20or\x20missed\x20scans\x20—\x20check\x20your\x20team\x27s\x20scanning\x20habit.",
    "upgrading\x20the\x20station",
    "Add\x20a\x20reward",
    "rewardTitle",
    "groupCollapsed",
    "currency",
    "stationEditName",
    "dkk",
    "Sports\x20&\x20outdoors",
    "45–54",
    "new",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22velocity-bar-pair\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22velocity-stack\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22velocity-bar\x20is-you\x22\x20style=\x22height:",
    "billingPlanGrid",
    "td-good",
    "Partner\x20not\x20loaded.",
    "[data-section]",
    "x</em></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22tier-card-blurb\x22>",
    "docs",
    "stationEditHoursGrid",
    "Catchment\x20map",
    "Featured",
    "\x20·\x20renews\x20",
    "us-central1",
    "Use\x20this\x20layer\x20to\x20judge\x20whether\x20your\x20reward\x20should\x20travel\x20across\x20neighbourhoods,\x20not\x20just\x20your\x20immediate\x20block.",
    "Starter",
    "%;top:",
    "\x20activations</strong>\x20across\x20",
    "Hospitality",
    "boostModal",
    "has-due",
    "Open",
    "\x22\x20style=\x22left:",
    "expiry\x20unknown",
    "5269315wlWZhH",
    "\x20is-featured",
    "businessCategory",
    "You",
    "Not\x20enough\x20peer\x20data\x20yet",
    "call",
    "Current",
    "address,place",
    "Age\x20and\x20gender\x20of\x20users\x20who\x20recycled\x20at\x20your\x20assigned\x20stations.\x20Compare\x20with\x20the\x20reward\x20demographics\x20above\x20—\x20a\x20mismatch\x20means\x20you\x20may\x20be\x20missing\x20the\x20station\x20crowd\x20in\x20your\x20reward\x20targeting.",
    "loading\x20invoice\x20history",
    "</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22station-card-capacity\x22>",
    "No\x20coupon\x20codes\x20found\x20in\x20that\x20CSV\x20file.",
    ".section",
    "Sponsor\x20it\x20to\x20move\x20it\x20out\x20of\x20the\x20regular\x20list\x20and\x20into\x20higher-visibility\x20marketplace\x20slots.",
    "</ul>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20class=\x22btn",
    "[data-cat-filter]",
    "\x20&middot;\x20auto",
    "\x20·\x20drops\x20to\x20Free\x20tier\x20after",
    "Pro",
    "validations",
    "homeBoostCta",
    "(no\x20peers\x20in\x20this\x20filter)",
    "grocery",
    "backend\x20didn\x27t\x20respond\x20within\x2010\x20seconds",
    "reward-image",
    "#section-analytics",
    "couponcode",
    "Step\x20",
    "Edit\x20<em>reward.</em>",
    "2248YUoHoe",
    "dateMs",
    "From\x2039\x20kr\x20/\x20day\x20·\x20longer\x20durations\x20get\x20cheaper\x20rates.",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22velocity-bar-pair\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22velocity-stack\x22\x20style=\x22height:",
    "subtitle",
    "rewardLocationLat",
    "Service",
    "signupBusinessCategory",
    "Could\x20not\x20open\x20Stripe\x20Billing\x20Portal.",
    "coachBody",
    "getMonth",
    "Brand",
    "hasOwnProperty",
    "\x22\x20target=\x22_blank\x22\x20rel=\x22noopener\x22>",
    "profileCountry",
    "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20class=\x22td-demo\x22\x20style=\x22text-transform:capitalize\x22>",
    "2041836rJhBVb",
    "getContext",
    "past_due",
    "hasCodes",
    "round",
    "</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22mix-track\x22><div\x20class=\x22mix-fill\x20",
    "queued",
    "Upgrading\x20your\x20station\x20could\x20pull\x20more\x20visits",
    "United\x20States",
    "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20class=\x22td-demo\x22\x20style=\x22text-transform:capitalize\x22>",
    "Validation\x20rate",
    "\x20closing\x20time\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<label\x20class=\x22station-hours-closed\x22><input\x20id=\x22stationHoursClosed_",
    "<div\x20class=\x22catchment-empty\x22>No\x20peers\x20in\x20this\x20filter.</div>",
    "with\x20partner\x20access",
    "inline-block",
    "toLowerCase",
    "iso",
    "join",
    "Stations\x20at\x20your\x20businesses",
    "Bootcamp",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22invoice-date\x22>",
    "education",
    "Date\x20pending",
    "Today",
    "costPeriodLabel",
    "</em><br>against\x20—\x20peers\x20in\x20",
    "pro",
    "distinctUsers",
    "Request\x20a\x20pickup\x20when\x20the\x20bag\x20is\x20full.\x20Cycl\x20staff\x20are\x20notified\x20to\x20come\x20empty\x20the\x20station.",
    "open",
    "x</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22station-card-meta\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22station-card-address\x22>",
    "hostedInvoiceUrl",
    "\x20active\x20boost",
    "Spa",
    "</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22tier-card-fee\x22>",
    "boostExpiresAtMs",
    "emptying\x20a\x20station",
    "\x22><svg\x20viewBox=\x220\x200\x2024\x2024\x22\x20fill=\x22none\x22\x20stroke=\x22currentColor\x22\x20stroke-linecap=\x22round\x22\x20stroke-linejoin=\x22round\x22><path\x20d=\x22M21\x2016V8a2\x202\x200\x200\x200-1-1.73l-7-4a2\x202\x200\x200\x200-2\x200l-7\x204A2\x202\x200\x200\x200\x203\x208v8a2\x202\x200\x200\x200\x201\x201.73l7\x204a2\x202\x200\x200\x200\x202\x200l7-4A2\x202\x200\x200\x200\x2021\x2016z\x22/><polyline\x20points=\x223.27\x206.96\x2012\x2012.01\x2020.73\x206.96\x22/><line\x20x1=\x2212\x22\x20y1=\x2222.08\x22\x20x2=\x2212\x22\x20y2=\x2212\x22/></svg>Collect\x20bottles</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20class=\x22small-action\x22\x20type=\x22button\x22\x20data-station-action=\x22empty\x22\x20data-id=\x22",
    "<tr><td\x20colspan=\x229\x22><div\x20class=\x22empty-state\x22>No\x20rewards\x20yet.</div></td></tr>",
    "catchmentScale",
    "block",
    "marketplace_performance",
    "signupCompany",
    "abs",
    ".tier-card",
    "Station",
    "Could\x20not\x20save\x20station.",
    "Specialty",
    "px\x22></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22velocity-bar\x22\x20style=\x22height:",
    "supportChatBody",
    "details",
    "Could\x20not\x20load\x20the\x20partner\x20portal.",
    "Sponsored\x20rewards",
    "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20class=\x22td-num\x22>",
    "test",
    "protocol",
    "Clicks\x20that\x20turned\x20into\x20activations.\x20The\x20higher\x20this\x20is,\x20the\x20more\x20your\x20reward\x20resonates\x20with\x20people\x20who\x20discover\x20it.",
    "trialBanner",
    "Boost\x20active.",
    "catchment-pin\x20peer",
    "Switch\x20to\x20All\x20categories\x20or\x20Worldwide\x20to\x20see\x20broader\x20benchmarks.\x20As\x20more\x20partners\x20publish\x20rewards,\x20your\x20industry-specific\x20view\x20sharpens.",
    "rewardAvailabilityMode",
    "\x20between\x20them.\x20A\x20coffee,\x20lunch,\x20or\x20student\x20offer\x20is\x20the\x20fastest\x20way\x20to\x20start\x20showing\x20up\x20in\x20the\x20marketplace.",
    "Music\x20venue",
    "Login\x20could\x20not\x20reach\x20Firebase\x20Auth.\x20Check\x20the\x20connection\x20and\x20try\x20again.",
    "Sports\x20club",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20class=\x22small-action\x22\x20type=\x22button\x22\x20data-reward-action=\x22edit\x22\x20data-id=\x22",
    "Pharmacy",
    "getItem",
    "38265HGXtEd",
    "Cinema",
    "getPartnerPortalBillingStatus",
    "Words\x20extracted\x20from\x20high-performing\x20reward\x20titles\x20in\x20your\x20peer\x20set,\x20weighted\x20by\x20activations\x20and\x20clicks.\x20Bigger\x20=\x20more\x20correlated\x20with\x20engagement.\x20Use\x20these\x20as\x20inspiration\x20when\x20writing\x20your\x20next\x20reward\x20title\x20or\x20description.",
    "homeSponsored",
    "Location\x20search\x20failed.",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22theme-row\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<strong>",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<article\x20class=\x22reward-card\x20reward-card--",
    "Cycl\x20Partner\x20Portal\x20-Pro",
    "g-female",
    "homeKpiFootTraffic",
    "\x20subscription\x20·\x20",
    "cycl-ionic",
    "success",
    "Cancel\x20your\x20",
    "querySelectorAll",
    "medianCost",
    "rewardStatusTabs",
    "push",
    "message\x20show\x20",
    "Partner",
    "no\x20data\x20yet",
    "</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20",
    "Plaza",
    "profileAddressLat",
    "</span></td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20class=\x22td-num\x22>",
    "pendingCard",
    "Cycl\x20Partner\x20Portal\x20-Growth",
    "Error\x20reading\x20metrics:",
    "sponsoredShare",
    "</li>",
    "Consider\x20placing\x20rewards\x20closer\x20to\x20that\x20zone\x20and\x20keeping\x20the\x20offer\x20simple\x20so\x20people\x20convert\x20before\x20reaching\x20a\x20competitor.",
    "getDay",
    "Reward\x20location\x20lookup\x20failed.",
    "Sushi",
    "delete",
    "med",
    "Arcade",
    "tours",
    "Welcome\x20aboard.\x20Loading\x20your\x20portal…",
    "homeBoostActiveCount",
    "Publish\x20reward",
    "</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22reward-card-metrics\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22reward-metric\x22><b>",
    "removeItem",
    "Complete\x20stats",
    "abort",
    "5-day\x20boost",
    "Everything\x20in\x20Growth",
    "\x22></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22velocity-label\x22>",
    "modal-open",
    ">\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20class=\x22lb-name\x22><span\x20class=\x22rank-num\x22>",
    "businessPartnerId",
    "homeBilling",
    "[data-station-action=\x27edit\x27]",
    "active",
    ".section.active",
    "Opening\x20hours\x20not\x20set",
    "rewardPhysicalAddressField",
    "anon",
    "toBlob",
    "invoiceHistorySearch",
    "mousedown",
    "confirm",
    "\x20kr</strong><small>",
    "boostSpendPending",
    ".small-action",
    "days",
    "upgradedShare",
    "section-",
    "background:rgba(20,18,15,0.03);color:#8A857A",
    "profileBusinessSubcategory",
    "Cycl\x20billing\x20functions\x20are\x20temporarily\x20unavailable.\x20If\x20you\x20just\x20deployed,\x20wait\x2030\x20seconds\x20and\x20refresh.",
    "rewardAddress",
    "Station\x20deep-dive",
    "values",
    "closed",
    "your",
    "<div\x20class=\x22empty-state\x20billing-error\x22>Could\x20not\x20load\x20saved\x20cards.\x20Refresh\x20billing\x20after\x20the\x20Stripe\x20status\x20issue\x20is\x20fixed.</div>",
    "Hostel",
    "expYear",
    "</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22support-msg-time\x22>",
    "cancelSubscriptionButton",
    "pk.eyJ1IjoiY3ljbG1vYmlsZWFwcCIsImEiOiJja3lxODRlOHQwMGR0MnhzMHd3YXl3OTVxIn0.Gg2Zqy13hJU5iDUuV_F2Zg",
    "removeAttribute",
    "\x22\x20type=\x22button\x22\x20data-plan-id=\x22",
    "vouchercode",
    "length",
    "coachTitle",
    "\x20plan\x20+\x20",
    "[data-section=\x27billing\x27]",
    "getHours",
    "stationHoursClosed_",
    "min",
    "India",
    "sceneCatchment",
    "authLayout",
    "users",
    "emptyFallback",
    "background:rgba(44,182,114,0.12);color:#2CB672",
    "5\x20active\x20rewards",
    "billPlacement",
    "find",
    "name",
    "Coworking",
    "companyName",
    "signup",
    "#homeStationList",
    "</em>\x20weekly\x20recycles",
    "Quick\x20view\x20of\x20your\x20busiest\x20stations\x20with\x20live\x20capacity.\x20Click\x20through\x20to\x20manage\x20them\x20in\x20Stations.",
    "isArray",
    "10–25\x20km",
    "Login\x20failed.",
    "Cycl\x20Partner\x20Portal\x20–\x20Premium",
    "</strong>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22reward-card-meta\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22reward-status-badge\x20is-",
    "billingBoostPanel",
    "closest",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22plan-price\x22><span>",
    "Collect\x20bottles",
    "codeMode",
    "<small>kg</small>",
    "Add\x20coupon\x20codes\x20to\x20track\x20validated\x20visits",
    "\x22\x20style=\x22width:",
    "signupEmail",
    "catch",
    "<div\x20class=\x22invoice-history-empty\x22>",
    "show",
    "status",
    "is-closed",
    "</small></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20",
    "stationHoursOpen_",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<article\x20class=\x22station-card\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22station-card-main\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22station-card-info\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22station-card-title\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<strong>",
    "Friday",
    "short_code",
    "%\x22></div></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22demo-bar-count\x22>",
    "performance",
    "Stripe\x20card\x20setup\x20did\x20not\x20return\x20a\x20URL.",
    "</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22demo-bar-track\x22><div\x20class=\x22demo-gender-fill\x20",
    "business_partner",
    "code",
    "&amp;",
    "subscription",
    "Electronics",
    "numeric",
    "Update\x20card",
    "analyticsRefreshButton",
    "placement",
    ".card-head\x20.mono",
    "Reward",
    "placeName",
    "boostActivationBaseline",
    "\x20km",
    "Up\x20to\x207\x20active\x20rewards\x20with\x20competitive\x20insights\x20to\x20grow\x20faster.",
    "\x20of\x20boosts\x20active\x20this\x20month.",
    "cohortMeta",
    "ageMap",
    "loginEmail",
    "<18",
    "</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</li>\x0a\x20\x20\x20\x20\x20\x20\x20\x20",
    "exists",
    "card_saved",
    "core_metrics\x20·\x20rank\x20",
    "collectionRequests",
    "Activations\x20/\x20reward",
    "[data-count-id=\x22navRewardCount\x22]",
    "\x22><svg\x20viewBox=\x220\x200\x2024\x2024\x22\x20fill=\x22none\x22\x20stroke=\x22currentColor\x22\x20stroke-linecap=\x22round\x22\x20stroke-linejoin=\x22round\x22><polyline\x20points=\x2218\x2015\x2012\x209\x206\x2015\x22/><line\x20x1=\x2212\x22\x20y1=\x229\x22\x20x2=\x2212\x22\x20y2=\x2220\x22/></svg>Upgrade</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20class=\x22small-action\x22\x20type=\x22button\x22\x20data-station-action=\x22collect\x22\x20data-id=\x22",
    "Thu",
    "paidCount",
    "Boost",
    "currentStationTier",
    "focus",
    "profileAbout",
    "stationTier",
    "boostBilledVia",
    "00:00",
    "\x22></label><strong\x20id=\x22boostCustomPrice\x22>",
    "<article\x20class=\x22invoice-row\x22>",
    "edit",
    "stripeBoostInvoiceId",
    "signupPassword",
    "These\x20are\x20the\x20Cycl\x20stations\x20placed\x20at\x20your\x20business\x20locations\x20that\x20drive\x20foot\x20traffic.\x20When\x20stations\x20are\x20assigned,\x20each\x20card\x20will\x20have\x20four\x20actions\x20—\x20<b>Edit</b>\x20opens\x20the\x20Edit\x20station\x20overlay,\x20<b>Upgrade</b>\x20changes\x20the\x20tier,\x20<b>Collect\x20bottles</b>\x20requests\x20a\x20pickup,\x20and\x20<b>Empty\x20station</b>\x20resets\x20the\x20bag\x20count\x20after\x20collection.",
    "Marketplace\x20clicks",
    "cohortCountTwoFour",
    "Wednesday",
    "admin",
    "Could\x20not\x20save\x20profile.",
    ".location-search-shell",
    "tierGrid",
    "headline",
    "\x20Your\x20access\x20stays\x20active\x20until\x20",
    "\x20invoice.",
    "businessType",
    "</strong>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span>Expires\x20",
    "boostId",
    "\x20is-",
    "includes",
    "[data-count-for]",
    "profileCity",
    "Cycl\x20could\x20not\x20reach\x20Firebase\x20right\x20now.\x20Check\x20the\x20connection\x20and\x20try\x20again\x20in\x20a\x20moment.",
    "rewardValidations",
    "Market\x20hall",
    "is-pos",
    "requesting\x20collection",
    "Your\x20business\x20ranked\x20against\x20peers\x20of\x20a\x20similar\x20type\x20and\x20size\x20in\x20your\x20area.\x20Spot\x20who\x27s\x20pulling\x20ahead.",
    "<div\x20class=\x22empty-state\x22>No\x20assigned\x20stations\x20yet.\x20Cycl\x20can\x20assign\x20stations\x20to\x20this\x20partner\x20account.</div>",
    "homeWater",
    "boostSpend",
    "toMillis",
    "G-BSWJX4TVBF",
    "createObjectURL",
    "all",
    "Signup\x20failed.",
    "Bookstore",
    "authTab",
    "Done",
    "Support",
    "log",
    "h\x20ago",
    "reset",
    "location",
    "Escape",
    "\x20boost\x20spend.",
    "Save\x20reward",
    "expMonth",
    "partner",
    "<tr><td\x20colspan=\x227\x22><div\x20class=\x22empty-state\x22>No\x20peer\x20activity\x20in\x20this\x20filter\x20yet.</div></td></tr>",
    "td-bad",
    "Activate\x20boost\x20·\x20",
    "loaded",
    "good",
    "This\x20week",
    "\x20in\x20expired\x20boosts\x20to\x20settle\x20before\x20starting\x20another.\x20Upgrade\x20to\x20a\x20monthly\x20plan\x20to\x20roll\x20boosts\x20into\x20your\x20subscription\x20instead.",
    "monthlyFee",
    "featured",
    "<div\x20class=\x22empty-state\x22>No\x20reward\x20activity\x20yet.</div>",
    "Total\x20Cycl\x20Coins\x20spent\x20on\x20activations\x20this\x20period.\x20You\x20only\x20pay\x20per\x20redemption\x20—\x20no\x20wasted\x20spend\x20on\x20views\x20or\x20clicks\x20that\x20don\x27t\x20convert.",
    "analytics",
    "count",
    "profileSignOutButton",
    "restore",
    "validation",
    "label",
    "<div\x20class=\x22empty-state\x22>No\x20saved\x20card\x20yet.\x20Add\x20one\x20now\x20from\x20Billing\x20before\x20boosting\x20or\x20upgrading.</div>",
    "peerLeaderboardBody",
    "subscriptionPlan",
    "%\x22></div></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22station-card-fill-label\x22>",
    "forEach",
    "25–34",
    "getUTCFullYear",
    "Bottles\x20recycled\x20at\x20this\x20station\x20earn\x201.5x\x20Cycl\x20Coins.\x20Subtle\x20boost,\x20more\x20repeat\x20visitors.",
    "<li>",
    "rewards",
    "legendOrganicCount",
    "</span></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22bar-track\x22><div\x20class=\x22bar-fill\x22\x20style=\x22width:",
    "Catchment\x20isochrone",
    "Your\x20<em>",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20<button\x20class=\x22location-suggestion\x22\x20type=\x22button\x22\x20data-location-index=\x22",
    "[data-section=\x27guide\x27]",
    "performanceHeatmap",
    "lastMessageAt",
    "actionCopy",
    "cohortCountOne",
    "padStart",
    "one",
    "sidebarToggle",
    "real-coords",
    "rewardAvailabilityCount",
    "openRewardModal",
    "%\x22></div></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22mix-num\x22>",
    "signupForm",
    "[support]\x20send\x20failed",
    "Peers\x20earn\x20",
    "Reward\x20cost",
    "boostPlan",
    "shares",
    "\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22alert-time\x22>",
    "Could\x20not\x20update\x20station\x20tier.",
    "~50\x20kr\x20/\x20day\x20·\x20quick\x20weekend\x20push.",
    "%\x20peer\x20median.\x20Review\x20your\x20reward\x20copy.",
    "profileBusinessCategory",
    "billTotal",
    "</strong><span\x20class=\x22tier-badge\x20tier-",
    "coupon",
    "tip",
    "limited",
    "Consider\x20placing\x20rewards\x20closer\x20to\x20the\x20strongest\x20nearby\x20demand\x20pockets,\x20or\x20run\x20one\x20sponsored\x20offer\x20to\x20defend\x20visibility\x20",
    "</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<ul\x20class=\x22plan-features\x22>",
    "Edit",
    "availabilityMode",
    "authMessage",
    "signupAddress",
    "Customer\x20loyalty",
    "coachSkip",
    "rewardUrl",
    "legendSponsoredPct",
    "isDefault",
    "getDate",
    "profilePhone",
    "dit",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22mix-row\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22mix-label\x22>",
    "kpiFootTraffic",
    "selectedThreadId",
    "\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<strong>",
    "\x20plan\x20allows\x20up\x20to\x20",
    "sender",
    "bottlesCollected",
    "querySelector",
    "\x20is",
    "kpiCost",
    "\x22><svg\x20viewBox=\x220\x200\x2024\x2024\x22\x20fill=\x22none\x22\x20stroke=\x22currentColor\x22\x20stroke-linecap=\x22round\x22\x20stroke-linejoin=\x22round\x22><path\x20d=\x22M12\x2020h9\x22/><path\x20d=\x22M16.5\x203.5a2.121\x202.121\x200\x200\x201\x203\x203L7\x2019l-4\x201\x201-4L16.5\x203.5z\x22/></svg>Edit</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20class=\x22small-action\x22\x20type=\x22button\x22\x20data-station-action=\x22upgrade\x22\x20data-id=\x22",
    "https://api.mapbox.com/geocoding/v5/mapbox.places/",
    "Save\x20",
    "opening\x20Stripe\x20Billing\x20Portal",
    "\x20kr\x20for\x20",
    "rewardDeepBody",
    "</strong>\x20leads\x20with\x20",
    "</a>",
    "mon",
    "\x22>C</div>",
    "</strong>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22theme-bar\x22><span\x20style=\x22width:",
    "%</strong>\x20of\x20activations</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20",
    "viewCount",
    "\x20reward",
    "withProfile",
    "linear-gradient(135deg,\x20#8B2020\x200%,\x20#C44A3A\x20100%)",
    "sceneVenue",
    "uid",
    "off",
    "18–24",
    "rewardLocationLng",
    "-day\x20boost",
    "no_code",
    "boostPaid",
    "External\x20image\x20URL\x20preview.",
    "country",
    "\x20day",
    "submit",
    "kpiPopoverTitle",
    "warn",
    "Open\x20this\x20portal\x20through\x20",
    "set",
    "service",
    "aria-hidden",
    "<div\x20class=\x22empty-state\x22\x20style=\x22font-size:12px;padding:12px\x200\x22>No\x20age\x20data\x20yet.</div>",
    "User\x20—",
    ".kpi-delta",
    "~46\x20kr\x20/\x20day\x20·\x20short\x20campaign\x20window.",
    "startTrialBtn",
    "profileAddress",
    "businessCategoryName",
    "<div\x20class=\x22catchment-pin\x20you\x22\x20style=\x22left:50%;top:50%\x22\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20title=\x22",
    "price",
    "growth",
    "----",
    "rewardImageFile",
    "</span></td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20class=\x22td-num\x22>",
    "partner_collection_requests",
    "lifetimeVolume",
    "info",
    "Could\x20not\x20prepare\x20image\x20compression.",
    "Peers\x20convert\x20",
    "[support]\x20could\x20not\x20mark\x20thread\x20read",
    "\x20invoice",
    "isClosed",
    "seconds",
    "demoCoverageRewards",
    "phone",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20<button\x20class=\x22location-suggestion\x22\x20type=\x22button\x22\x20data-addr-index=\x22",
    "physicalAddress",
    "boostClickBaseline",
    "din",
    "isYou",
    "Buffet",
    "toFixed",
    "steps",
    "tier",
    "currentPlanPrice",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20role=\x22button\x22\x20tabindex=\x220\x22\x20class=\x22tier-card\x20boost-card",
    "Your\x20",
    "Sponsored\x20is\x20live",
    "Fine\x20dining",
    "billing",
    "Could\x20not\x20load\x20the\x20partner\x20profile.",
    "you",
    "<span\x20class=\x22alert-tag\x22>Conversion</span>Click-to-activation\x20rate\x20<strong>",
    "redeemedCount",
    "Clicks",
    "message",
    "Most\x20users\x20are\x20likely\x20coming\x20from\x20",
    "Click\x20→\x20activation\x20rate",
    "publishing\x20rewards",
    "key",
    "Beauty",
    "amount",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22reward-boost-panel\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22reward-boost-panel-text\x22>",
    "opens",
    "You\x27re\x20tracking\x20well\x20with\x20peers",
    "loginPassword",
    "scopeSelector",
    "background:rgba(196,74,58,0.08);color:#C44A3A",
    "tour-spotlight",
    "codesShare",
    "&gt;",
    "no\x20coords",
    "public,max-age=31536000",
    "ultra_gold",
    "#rewardList",
    "profileFirstName",
    "toUpperCase",
    "Nationwide",
    "imageUrl",
    "partnerIds",
    "[tours]\x20cleared\x20dismissal\x20flags\x20for\x20partner",
    "short",
    "profileLastName",
    "rewardAction",
    "Laundry",
    "Cycl\x20will\x20keep\x20this\x20image\x20lighter\x20for\x20faster\x20loading.",
    "for",
    "Suggested\x20move:\x20",
    "peer",
    "url",
    "boostGrid",
    "Denmark",
    "AbortError",
    "partner-rewards/",
    "charCodeAt",
    "Sponsor\x20reward",
    "7\x20active\x20rewards",
    "search",
    "Empty\x20station",
    "band",
    "homeStationList",
    "signupAddressLat",
    "failed",
    "Boosts\x20are\x20billed\x20automatically\x20with\x20your\x20",
    "recycled",
    "<span\x20class=\x22tier-card-current-tag\x22>Current</span>",
    "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tr>",
    "invoiceHistoryButton",
    "currentCap",
    "Outlet",
    "openPartnerOnboardingButton",
    "</span>",
    "Next",
    "className",
    "invoiceHistoryModal",
    "isNaN",
    "genderMap",
    "homeBoostOrganicCount",
    "validuntil",
    "addrIndex",
    "countFor",
    "thu",
    "D2C",
    "</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20",
    "free",
    "Validated\x20visits",
    "catchmentPins",
    "Nigeria",
    "1:310990335294:web:c8cb7e850a93d94854d06f",
    "partnerPlan",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<li\x20class=\x22rec-item\x20rec-",
    "--organic",
    "assignedPartnerCompany",
    "json",
    "getMinutes",
    "boostExpiresAt",
    "Yoga\x20/\x20pilates",
    "stationEditSubmitButton",
    ".json?",
    "preventDefault",
    "</strong><small>",
    "rewardFormTitle",
    "trim",
    "<div\x20class=\x22empty-state\x22>No\x20recycle\x20events\x20at\x20your\x20stations\x20in\x20the\x20last\x2090\x20days\x20yet.</div>",
    "toString",
    "rewardCountry",
    "Checking\x20Stripe\x20billing\x20status…",
    "17:00",
    "place,locality,postcode",
    "paused",
    "setProperty",
    "Stripe\x20did\x20not\x20confirm\x20that\x20these\x20boosts\x20were\x20paid.\x20Refresh\x20billing\x20and\x20try\x20again\x20after\x20the\x20latest\x20functions\x20are\x20deployed.",
    "geo",
    ".premium-wrapper",
    "\x20is-you",
    "homeFullStations",
    "Top\x20placement\x20live",
    "rewardList",
    "rewardClicks",
    "\x20action",
    "getUTCDate",
    "Specialty\x20food",
    "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td><span\x20class=\x22dt-badge\x20tier-",
    "donutTotal",
    "countryCode",
    "%\x20of\x20activations",
    "expiration",
    "Could\x20not\x20load\x20Stripe\x20invoice\x20history.",
    "coachNext",
    "Could\x20not\x20start\x20Stripe\x20card\x20setup.",
    "Upgrade",
    "invoiceHistoryCount",
    "outstanding_boosts",
    "boostValidationBaseline",
    "classList",
    "Online\x20reward",
    "total",
    "placementDonut",
    "\x20accelerating\x20peer",
    "</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>",
    "keydown",
    "Ultra\x20Gold",
    "geoFilter",
    "UTC",
    "stationHoursClose_",
    "revokeObjectURL",
    "10\x20active\x20rewards",
    "Foot\x20traffic\x20velocity",
    "/messages",
    "kpi",
    "featured_boost",
    "rewardEditId",
    "homeKpiConversion",
    "coachCard",
    "lines",
    "<span\x20class=\x22reward-card-thumb-placeholder\x22>No\x20image</span>",
    "display",
    "\x22\x20type=\x22time\x22\x20aria-label=\x22",
    "\x20profile",
    "</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22funnel-step-meta\x22><strong>",
    "homeClicks",
    "setItem",
    "Crossfit\x20/\x20box",
    "gender",
    "Free",
    "prototype",
    "nearbyPeers",
    "Station\x20name\x20and\x20address\x20are\x20required.",
    "<div\x20class=\x22h-cell\x22\x20style=\x22",
    "boostCustomPrice",
    "stations",
    "\x20Cycl\x20Coins;\x20yours\x20is\x20",
    "http://localhost:5179/partner-portal.html",
    "Tuesday",
    "partnerCompanyName",
    "updatedAt",
    "#section-home",
    "supportChatSend",
    "Baseline\x20reward.\x20People\x20earn\x20the\x20normal\x20amount\x20of\x20Cycl\x20Coins\x20per\x20recycled\x20bottle.",
    "Standard",
    "Each\x20cell\x20scored\x200–100\x20against\x20peers\x20per\x20metric.\x20Bright\x20=\x20top\x20of\x20group;\x20scan\x20your\x20row\x20to\x20find\x20weak\x20metrics.",
    "Cancellation\x20scheduled",
    "\x20is-sponsored",
    "rewardLocation",
    "replace",
    "340cxjfDk",
    "billingBoostDue",
    "Premium-tier\x20peers\x20are\x20attracting\x20demand\x20within\x20",
    "<div\x20class=\x22empty-state\x22>Need\x20more\x20peer\x20data\x20to\x20spot\x20themes.</div>",
    "\x20·\x20<em>",
    "\x20in\x20",
    "metrics",
    "10-day\x20boost",
    "hotPeers",
    "top",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22demo-bar-row\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22demo-bar-label\x22>",
    "E-commerce",
    "this\x20station",
    "grid",
    "\x20recycle",
    "boostDays",
    ".\x20Try\x20a\x20sharper\x20headline\x20(the\x20offer\x20goes\x20first,\x20your\x20brand\x20second)\x20or\x20a\x20one-week\x20sponsored\x20test.",
    "boost",
    "stripeTier",
    "Signal",
    "loadDemographics:",
    "scrollIntoView",
    "</em>\x20station",
    "#ffffff",
    "\x20active\x20reward",
    "Local\x20upload\x20selected.\x20Cycl\x20will\x20compress\x20this\x20before\x20saving.",
    "Swimming\x20pool",
    "boostBillingStatus",
    "demoCoverageStations",
    "href",
    "not",
    "message\x20show\x20error",
    "archived",
    "recycle_captures",
    "toLocaleString",
    "You\x27re\x20below\x20peer\x20activations\x20per\x20reward",
    "productName",
    "boostConfirmButton",
    "partner_support_threads",
    "object",
    "urgent",
    "Most\x20peers\x20run\x20sponsored\x20placement",
    "rewardCount",
    "\x20of\x20active\x20boosts\x20can\x20be\x20paid\x20now,\x20or\x20will\x20be\x20charged\x20after\x20they\x20end.",
    "asc",
    "into",
    "Peer\x20leaderboard",
    "slice",
    "assign",
    "signupAddressSuggestions",
    "Mark\x20",
    "Up\x20to\x205\x20active\x20rewards\x20and\x20deeper\x20customer\x20data.",
    "There\x20are\x20no\x20unpaid\x20boost\x20charges\x20to\x20pay\x20right\x20now.",
    "center",
    "signupBusinessSubcategory",
    "7519164gFEJZU",
    "kun",
    "signupCity",
    "activeBoostCount",
    "activations",
    "Row-level\x20stats\x20for\x20every\x20reward\x20you\x20have\x20run.\x20Compare\x20validation\x20rate\x20across\x20rewards\x20to\x20find\x20which\x20offers\x20drive\x20real\x20visits\x20vs.\x20just\x20clicks.\x20Cost\x20CC\x20column\x20shows\x20your\x20spend\x20per\x20reward\x20so\x20you\x20can\x20optimise\x20budget\x20allocation.",
    "Sunday",
    "-day\x20plan</strong><span>",
    "is-opportunity",
    "assignedPartnerId",
    "across\x20your\x20wider\x20market",
    "Your\x20reward\x20cost\x20is\x20above\x20the\x20peer\x20median",
    "Premium",
    "rewardCost",
    "</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22invoice-status\x20invoice-status--",
    "standard",
    "no\x20boosts\x20active",
    "Something\x20went\x20wrong.",
  ];
  _0x2b31 = function () {
    return _0x5e230;
  };
  return _0x2b31();
}
sidebarToggleEl &&
  sidebarEl &&
  (sidebarToggleEl[_0x562b0b(0x23d)](_0x562b0b(0x2dc), () => {
    const _0x2e8a5a = _0x562b0b;
    if (sidebarEl[_0x2e8a5a(0x5a3)][_0x2e8a5a(0x798)](_0x2e8a5a(0x790)))
      closeMobileSidebar();
    else openMobileSidebar();
  }),
  sidebarBackdropEl["addEventListener"](_0x562b0b(0x2dc), closeMobileSidebar),
  document[_0x562b0b(0x23d)](_0x562b0b(0x5a9), (_0x53dec0) => {
    const _0x37cbb0 = _0x562b0b;
    if (
      _0x53dec0[_0x37cbb0(0x530)] === _0x37cbb0(0x485) &&
      sidebarEl[_0x37cbb0(0x5a3)][_0x37cbb0(0x798)]("is-open")
    )
      closeMobileSidebar();
  }),
  window[_0x562b0b(0x23d)]("resize", () => {
    const _0x46b256 = _0x562b0b;
    if (window[_0x46b256(0x287)] > 0x384) closeMobileSidebar();
  }));
((function () {
  const _0x15f4bb = _0x562b0b,
    _0x28efcf = _0x15f4bb(0x65d),
    _0x1baa97 = 0x1e,
    _0x1346fe = document[_0x15f4bb(0x745)](_0x15f4bb(0x504)),
    _0xa8fa64 = document[_0x15f4bb(0x745)](_0x15f4bb(0x39e)),
    _0xd62416 = document["getElementById"](_0x15f4bb(0x286));
  if (!_0x1346fe) return;
  function _0x4eb6c0(_0x86e809) {
    const _0x41c430 = _0x15f4bb,
      _0x3959cf = Date[_0x41c430(0x68e)](),
      _0x5c855b = Math[_0x41c430(0x645)]((_0x3959cf - _0x86e809) / 0x5265c00),
      _0x1f6b8d = Math[_0x41c430(0x72c)](0x0, _0x1baa97 - _0x5c855b),
      _0x3701ec = document[_0x41c430(0x4db)](_0x41c430(0x58e));
    if (_0x3701ec)
      _0x3701ec[_0x41c430(0x5a3)][_0x41c430(0x626)](_0x41c430(0x7bc));
    _0xa8fa64 &&
      (_0xa8fa64[_0x41c430(0x5a3)][_0x41c430(0x767)](_0x41c430(0x2eb)),
      _0xd62416 &&
        (_0x1f6b8d > 0x0
          ? (_0xd62416[_0x41c430(0x23a)] =
              _0x1f6b8d +
              (_0x1f6b8d === 0x1 ? _0x41c430(0x4f8) : _0x41c430(0x2e6)) +
              "\x20remaining")
          : ((_0xd62416[_0x41c430(0x23a)] = _0x41c430(0x2c3)),
            (_0xa8fa64[_0x41c430(0x752)][_0x41c430(0x6ef)] =
              _0x41c430(0x4ed)))));
  }
  const _0x297ee8 = localStorage[_0x15f4bb(0x3a9)](_0x28efcf);
  if (_0x297ee8) _0x4eb6c0(parseInt(_0x297ee8, 0xa));
  _0x1346fe[_0x15f4bb(0x23d)](_0x15f4bb(0x2dc), function () {
    const _0x450b8d = _0x15f4bb;
    let _0x44382b = localStorage[_0x450b8d(0x3a9)](_0x28efcf);
    (!_0x44382b &&
      ((_0x44382b = Date[_0x450b8d(0x68e)]()[_0x450b8d(0x585)]()),
      localStorage[_0x450b8d(0x5be)](_0x28efcf, _0x44382b)),
      _0x4eb6c0(parseInt(_0x44382b, 0xa)));
  });
})(),
  (function () {
    const _0x221dc7 = _0x562b0b,
      _0x2bdbb4 = document["getElementById"](_0x221dc7(0x1f9)),
      _0x34e9e7 = document[_0x221dc7(0x745)]("supportChatSend");
    if (!_0x2bdbb4 || !_0x34e9e7) return;
    (_0x34e9e7[_0x221dc7(0x23d)]("click", () => sendPartnerSupportMessage()),
      _0x2bdbb4[_0x221dc7(0x23d)]("keydown", (_0x468ded) => {
        const _0x3304ad = _0x221dc7;
        _0x468ded["key"] === _0x3304ad(0x6ee) &&
          !_0x468ded["shiftKey"] &&
          (_0x468ded[_0x3304ad(0x580)](), sendPartnerSupportMessage());
      }),
      _0x2bdbb4["addEventListener"](_0x221dc7(0x75f), () => {
        const _0x506c82 = _0x221dc7;
        ((_0x2bdbb4[_0x506c82(0x752)][_0x506c82(0x271)] = "auto"),
          (_0x2bdbb4[_0x506c82(0x752)][_0x506c82(0x271)] =
            _0x2bdbb4[_0x506c82(0x6a1)] + "px"));
      }));
  })(),
  document[_0x562b0b(0x3b9)](_0x562b0b(0x347))[_0x562b0b(0x49f)](
    (_0x3fdf19) => {
      const _0x11b337 = _0x562b0b;
      _0x3fdf19[_0x11b337(0x23d)](_0x11b337(0x2dc), () => {
        const _0x55ba66 = _0x11b337,
          _0x5527ad = _0x3fdf19[_0x55ba66(0x21a)][_0x55ba66(0x687)];
        if (_0x5527ad === analyticsFilters[_0x55ba66(0x302)]) return;
        ((analyticsFilters[_0x55ba66(0x302)] = _0x5527ad),
          document[_0x55ba66(0x3b9)](_0x55ba66(0x347))[_0x55ba66(0x49f)](
            (_0x4b5c0a) =>
              _0x4b5c0a[_0x55ba66(0x5a3)][_0x55ba66(0x668)](
                _0x55ba66(0x246),
                _0x4b5c0a[_0x55ba66(0x21a)][_0x55ba66(0x687)] === _0x5527ad,
              ),
          ),
          renderAnalytics());
      });
    },
  ),
  document[_0x562b0b(0x3b9)](_0x562b0b(0x27f))["forEach"]((_0xb803ea) => {
    const _0x4a1309 = _0x562b0b;
    _0xb803ea[_0x4a1309(0x23d)](_0x4a1309(0x2dc), () => {
      const _0xcb1cc7 = _0x4a1309,
        _0x4ef94f = _0xb803ea["dataset"][_0xcb1cc7(0x5ab)];
      if (_0x4ef94f === analyticsFilters[_0xcb1cc7(0x58d)]) return;
      ((analyticsFilters[_0xcb1cc7(0x58d)] = _0x4ef94f),
        document[_0xcb1cc7(0x3b9)](_0xcb1cc7(0x27f))[_0xcb1cc7(0x49f)](
          (_0x1e8eb3) =>
            _0x1e8eb3[_0xcb1cc7(0x5a3)][_0xcb1cc7(0x668)](
              _0xcb1cc7(0x246),
              _0x1e8eb3[_0xcb1cc7(0x21a)][_0xcb1cc7(0x5ab)] === _0x4ef94f,
            ),
        ),
        renderAnalytics());
    });
  }),
  document[_0x562b0b(0x3b9)](_0x562b0b(0x66f))["forEach"]((_0x3bb657) => {
    _0x3bb657["addEventListener"]("click", () => {
      const _0x185cd4 = _0x2558,
        _0x4dc344 = Number(
          _0x3bb657[_0x185cd4(0x21a)][_0x185cd4(0x375)] || 0x5,
        );
      if (_0x4dc344 === analyticsCatchmentKm) return;
      ((analyticsCatchmentKm = _0x4dc344),
        document[_0x185cd4(0x3b9)](_0x185cd4(0x66f))[_0x185cd4(0x49f)](
          (_0x284fef) => {
            const _0xe9e1ce = _0x185cd4;
            _0x284fef[_0xe9e1ce(0x5a3)]["toggle"](
              _0xe9e1ce(0x246),
              Number(_0x284fef[_0xe9e1ce(0x21a)][_0xe9e1ce(0x375)] || 0x5) ===
                _0x4dc344,
            );
          },
        ));
      if (analyticsHasRendered) renderAnalytics();
    });
  }),
  $(_0x562b0b(0x43a))[_0x562b0b(0x23d)](_0x562b0b(0x2dc), () => {
    ((demographicsCache = null), renderAnalytics({ force: !![] }));
  }),
  $(_0x562b0b(0x25d))[_0x562b0b(0x23d)](_0x562b0b(0x75f), () => {
    if (!selectedRewardImageFile) syncRewardImagePreview();
  }),
  $(_0x562b0b(0x5d4))[_0x562b0b(0x23d)](_0x562b0b(0x75f), () => {
    const _0x177373 = _0x562b0b;
    if ($(_0x177373(0x63a))["checked"]) return;
    (($(_0x177373(0x35a))["value"] = ""),
      ($("rewardLocationLng")[_0x177373(0x270)] = ""));
    const _0xe09dd3 = $(_0x177373(0x5d4))[_0x177373(0x270)][_0x177373(0x583)]();
    window["clearTimeout"](rewardLocationSearchTimer);
    if (_0xe09dd3[_0x177373(0x400)] < 0x2) {
      hideRewardLocationSuggestions();
      return;
    }
    rewardLocationSearchTimer = window[_0x177373(0x6cc)](() => {
      searchRewardLocations(_0xe09dd3);
    }, 0xdc);
  }),
  $(_0x562b0b(0x6c7))[_0x562b0b(0x23d)](_0x562b0b(0x2dc), (_0x20e86b) => {
    const _0x429233 = _0x562b0b,
      _0xa28542 = _0x20e86b[_0x429233(0x2cd)];
    if (!(_0xa28542 instanceof Element)) return;
    const _0x57ad45 = _0xa28542[_0x429233(0x41d)]("[data-location-index]");
    if (!_0x57ad45) return;
    const _0x893523 =
      rewardLocationSuggestions[Number(_0x57ad45["dataset"]["locationIndex"])];
    if (!_0x893523) return;
    applyRewardLocationSuggestion(_0x893523);
  }));
const _signupAddrAbort = { current: null };
($(_0x562b0b(0x4cb))["addEventListener"](_0x562b0b(0x75f), () => {
  const _0x4fc244 = _0x562b0b;
  (($("signupAddressLat")[_0x4fc244(0x270)] = ""),
    ($("signupAddressLng")[_0x4fc244(0x270)] = ""));
  const _0x330362 = $(_0x4fc244(0x4cb))["value"][_0x4fc244(0x583)]();
  window[_0x4fc244(0x7bf)](signupAddressSearchTimer);
  if (_0x330362[_0x4fc244(0x400)] < 0x2) {
    hideAddressSuggestions(_0x4fc244(0x607));
    return;
  }
  signupAddressSearchTimer = window[_0x4fc244(0x6cc)](() => {
    const _0x5e8ecf = _0x4fc244;
    searchAddressLocations(
      _0x330362,
      _0x5e8ecf(0x607),
      applySignupAddressSuggestion,
      _signupAddrAbort,
    );
  }, 0xdc);
}),
  $("signupAddress")[_0x562b0b(0x23d)]("blur", () => {
    const _0x76ff4d = _0x562b0b;
    setTimeout(() => hideAddressSuggestions(_0x76ff4d(0x607)), 0xc8);
  }));
const _profileAddrAbort = { current: null };
($(_0x562b0b(0x505))[_0x562b0b(0x23d)]("input", () => {
  const _0x3f4028 = _0x562b0b;
  (($(_0x3f4028(0x3c2))["value"] = ""),
    ($("profileAddressLng")[_0x3f4028(0x270)] = ""));
  const _0x429f18 = $(_0x3f4028(0x505))[_0x3f4028(0x270)]["trim"]();
  window["clearTimeout"](profileAddressSearchTimer);
  if (_0x429f18[_0x3f4028(0x400)] < 0x2) {
    hideAddressSuggestions("profileAddressSuggestions");
    return;
  }
  profileAddressSearchTimer = window[_0x3f4028(0x6cc)](() => {
    const _0x3816b6 = _0x3f4028;
    searchAddressLocations(
      _0x429f18,
      _0x3816b6(0x261),
      applyProfileAddressSuggestion,
      _profileAddrAbort,
    );
  }, 0xdc);
}),
  $("profileAddress")[_0x562b0b(0x23d)](_0x562b0b(0x263), () => {
    setTimeout(() => hideAddressSuggestions("profileAddressSuggestions"), 0xc8);
  }),
  document["addEventListener"](_0x562b0b(0x2dc), (_0x287001) => {
    const _0x16fd68 = _0x562b0b,
      _0x7bdcdf = _0x287001[_0x16fd68(0x2cd)];
    (!(_0x7bdcdf instanceof Element) ||
      !_0x7bdcdf[_0x16fd68(0x41d)](_0x16fd68(0x463))) &&
      (hideRewardLocationSuggestions(),
      hideAddressSuggestions(_0x16fd68(0x607)),
      hideAddressSuggestions(_0x16fd68(0x261)));
  }),
  $(_0x562b0b(0x63a))[_0x562b0b(0x23d)](
    _0x562b0b(0x73e),
    syncRewardChannelFields,
  ),
  $(_0x562b0b(0x3a2))[_0x562b0b(0x23d)]("change", syncRewardAvailabilityFields),
  $("rewardImageFile")[_0x562b0b(0x23d)](_0x562b0b(0x73e), (_0x127272) => {
    const _0x4d1cf4 = _0x562b0b,
      _0x2ed6e5 = _0x127272[_0x4d1cf4(0x2cd)]["files"]?.[0x0];
    releaseRewardImagePreviewUrl();
    if (!_0x2ed6e5) {
      ((selectedRewardImageFile = null), syncRewardImagePreview());
      return;
    }
    ((selectedRewardImageFile = _0x2ed6e5),
      (selectedRewardImagePreviewUrl = URL["createObjectURL"](_0x2ed6e5)),
      renderRewardImagePreview(
        selectedRewardImagePreviewUrl,
        _0x2ed6e5[_0x4d1cf4(0x410)] +
          "\x20selected.\x20Cycl\x20will\x20compress\x20and\x20store\x20this\x20image.",
      ));
  }),
  $(_0x562b0b(0x2e1))[_0x562b0b(0x23d)]("change", async (_0xf03db2) => {
    const _0x304657 = _0x562b0b,
      _0x2dc625 = _0xf03db2[_0x304657(0x2cd)][_0x304657(0x231)]?.[0x0];
    if (!_0x2dc625) return;
    try {
      const _0x9ecbf4 = importRewardCodeFileText(
        await _0x2dc625[_0x304657(0x1f8)](),
      );
      if (!_0x9ecbf4) {
        setRewardCodesMessage(_0x304657(0x343), _0x304657(0x222));
        return;
      }
      validateRewardCodesField();
    } catch (_0x412713) {
      setRewardCodesMessage(
        _0x412713[_0x304657(0x52c)] || _0x304657(0x7a7),
        "error",
      );
    } finally {
      _0xf03db2[_0x304657(0x2cd)][_0x304657(0x270)] = "";
    }
  }),
  $(_0x562b0b(0x643))["addEventListener"](_0x562b0b(0x75f), () =>
    validateRewardCodesField(),
  ),
  $(_0x562b0b(0x64d))[_0x562b0b(0x23d)](_0x562b0b(0x2dc), () =>
    clearSelectedRewardImage({ clearUrl: !![] }),
  ),
  $("loginForm")[_0x562b0b(0x23d)](_0x562b0b(0x4f9), async (_0x44432e) => {
    const _0x58ae7a = _0x562b0b;
    _0x44432e[_0x58ae7a(0x580)]();
    if (requireHttpOrigin(_0x58ae7a(0x209))) return;
    try {
      await signInWithEmailAndPassword(
        auth,
        $(_0x58ae7a(0x445))[_0x58ae7a(0x270)],
        $(_0x58ae7a(0x536))[_0x58ae7a(0x270)],
      );
    } catch (_0x30d7a5) {
      showMessage(
        getReadableFirebaseError(_0x30d7a5, _0x58ae7a(0x419)),
        _0x58ae7a(0x222),
      );
    }
  }),
  $(_0x562b0b(0x4b6))[_0x562b0b(0x23d)](_0x562b0b(0x4f9), async (_0x366ae0) => {
    const _0x37dfe9 = _0x562b0b;
    _0x366ae0[_0x37dfe9(0x580)]();
    if (requireHttpOrigin("creating\x20a\x20partner\x20account")) return;
    try {
      const _0x23cab8 = $(_0x37dfe9(0x6bf))[_0x37dfe9(0x270)],
        _0x3643f2 = $(_0x37dfe9(0x35c))[_0x37dfe9(0x270)],
        _0x5d7b15 = CATEGORY_BY_ID[_0x3643f2] || BUSINESS_CATEGORIES[0x0],
        _0xb82ca3 = $("signupBusinessSubcategory")[_0x37dfe9(0x270)],
        _0x4ce61d = await createUserWithEmailAndPassword(
          auth,
          $("signupEmail")[_0x37dfe9(0x270)],
          $(_0x37dfe9(0x45c))[_0x37dfe9(0x270)],
        );
      (await setDoc(
        doc(
          db,
          collections[_0x37dfe9(0x77a)],
          _0x4ce61d["user"][_0x37dfe9(0x4ef)],
        ),
        {
          companyName: $(_0x37dfe9(0x38f))[_0x37dfe9(0x270)][
            _0x37dfe9(0x583)
          ](),
          contactFirstName: $(_0x37dfe9(0x67a))[_0x37dfe9(0x270)][
            _0x37dfe9(0x583)
          ](),
          contactLastName:
            $("signupLastName")[_0x37dfe9(0x270)][_0x37dfe9(0x583)](),
          email: $(_0x37dfe9(0x424))[_0x37dfe9(0x270)][_0x37dfe9(0x583)](),
          phone: $(_0x37dfe9(0x63b))[_0x37dfe9(0x270)]["trim"](),
          address: $(_0x37dfe9(0x4cb))["value"]["trim"](),
          city: $(_0x37dfe9(0x60f))[_0x37dfe9(0x270)] || "",
          lat: parseFloat($(_0x37dfe9(0x55a))["value"]) || null,
          lng: parseFloat($("signupAddressLng")[_0x37dfe9(0x270)]) || null,
          countryCode: _0x23cab8,
          country: getCountryName(_0x23cab8),
          businessCategory: _0x3643f2,
          businessCategoryName: _0x5d7b15[_0x37dfe9(0x410)],
          businessSubcategory: _0xb82ca3,
          businessType: _0xb82ca3 || _0x5d7b15[_0x37dfe9(0x410)],
          about: $(_0x37dfe9(0x777))[_0x37dfe9(0x270)][_0x37dfe9(0x583)](),
          status: "active",
          accountType: _0x37dfe9(0x433),
          billingModel: _0x37dfe9(0x38e),
          pricing: pricing,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        },
      ),
        showMessage(_0x37dfe9(0x3d1), "success"));
    } catch (_0x2c88e9) {
      showMessage(
        getReadableFirebaseError(_0x2c88e9, _0x37dfe9(0x47c)),
        _0x37dfe9(0x222),
      );
    }
  }),
  $(_0x562b0b(0x6f8))[_0x562b0b(0x23d)](_0x562b0b(0x4f9), async (_0x6b5209) => {
    const _0x4e1229 = _0x562b0b;
    _0x6b5209[_0x4e1229(0x580)]();
    if (requireHttpOrigin(_0x4e1229(0x52f))) return;
    if (!currentPartner) return;
    const _0x176f02 = $(_0x4e1229(0x5b4))["value"],
      _0x343c16 = $(_0x4e1229(0x733))["value"],
      _0x577b7d = $("rewardIsOnline")[_0x4e1229(0x6ba)],
      _0x5dd560 = $(_0x4e1229(0x3a2))["value"],
      _0x947241 = $(_0x4e1229(0x4b3))["value"][_0x4e1229(0x583)](),
      _0x1e5a93 = validateRewardCodesField({ focus: !![] }),
      _0x104677 = _0x1e5a93[_0x4e1229(0x79d)],
      _0x423e66 = _0x343c16 !== _0x4e1229(0x731),
      _0x4af7af = $(_0x4e1229(0x23c)),
      _0x874ccb = _0x4af7af[_0x4e1229(0x23a)];
    try {
      if (!_0x1e5a93[_0x4e1229(0x6dd)]) return;
      if (_0x5dd560 === _0x4e1229(0x4c5) && _0x947241 === "") {
        window[_0x4e1229(0x725)](_0x4e1229(0x647));
        return;
      }
      if (!_0x176f02) {
        const _0x2ae13d = getCurrentRewardLimit();
        if (getActiveRewards()[_0x4e1229(0x400)] >= _0x2ae13d) {
          const _0x42701b = getCurrentBillingPlan();
          window[_0x4e1229(0x725)](
            _0x4e1229(0x523) +
              (_0x42701b?.[_0x4e1229(0x410)] || _0x4e1229(0x672)) +
              _0x4e1229(0x4d8) +
              _0x2ae13d +
              _0x4e1229(0x5ee) +
              (_0x2ae13d === 0x1 ? "" : "s") +
              _0x4e1229(0x205),
          );
          return;
        }
      }
      ((_0x4af7af["disabled"] = !![]),
        (_0x4af7af[_0x4e1229(0x23a)] = selectedRewardImageFile
          ? _0x4e1229(0x74d)
          : _0x874ccb));
      let _0x1765c0 = $(_0x4e1229(0x25d))[_0x4e1229(0x270)][_0x4e1229(0x583)](),
        _0x5c9b80 = $("rewardImageStoragePath")[_0x4e1229(0x270)][
          _0x4e1229(0x583)
        ]();
      const _0xc4684f = $(_0x4e1229(0x3f2))[_0x4e1229(0x270)][
          _0x4e1229(0x583)
        ](),
        _0x46f938 = $(_0x4e1229(0x638))[_0x4e1229(0x270)][_0x4e1229(0x583)](),
        _0x198bbe = $(_0x4e1229(0x35a))[_0x4e1229(0x270)][_0x4e1229(0x583)](),
        _0x3ede94 =
          $("rewardLocationLng")[_0x4e1229(0x270)][_0x4e1229(0x583)](),
        _0x41424a = Number(_0x198bbe),
        _0x36d26b = Number(_0x3ede94),
        _0x2bd2cf = Math[_0x4e1229(0x72c)](
          0x0,
          Math[_0x4e1229(0x369)](Number(_0x947241 || 0x0)),
        ),
        _0x2d1fec =
          _0x198bbe !== "" &&
          _0x3ede94 !== "" &&
          Number[_0x4e1229(0x751)](_0x41424a) &&
          Number[_0x4e1229(0x751)](_0x36d26b);
      if (selectedRewardImageFile) {
        const _0x480ed4 = await uploadRewardImageFile(selectedRewardImageFile);
        ((_0x1765c0 = _0x480ed4[_0x4e1229(0x543)]),
          (_0x5c9b80 = _0x480ed4[_0x4e1229(0x635)]),
          ($(_0x4e1229(0x25d))[_0x4e1229(0x270)] = _0x1765c0),
          ($(_0x4e1229(0x2a6))[_0x4e1229(0x270)] = _0x5c9b80));
      }
      const _0x507440 = {
        partnerId: currentPartner["id"],
        partnerCompanyName: currentPartner[_0x4e1229(0x412)],
        ownerType: _0x4e1229(0x489),
        source: _0x4e1229(0x2f9),
        title: $(_0x4e1229(0x31a))[_0x4e1229(0x270)]["trim"](),
        subtitle: $(_0x4e1229(0x28b))["value"][_0x4e1229(0x583)](),
        about: $(_0x4e1229(0x656))[_0x4e1229(0x270)][_0x4e1229(0x583)](),
        description: $(_0x4e1229(0x656))["value"][_0x4e1229(0x583)](),
        image: _0x1765c0,
        imageStoragePath: _0x5c9b80,
        address: _0xc4684f,
        rewardUrl: _0xc4684f,
        cost: Number($("rewardCost")[_0x4e1229(0x270)]),
        amount: Number($("rewardCost")[_0x4e1229(0x270)]),
        location: _0x577b7d
          ? ""
          : $(_0x4e1229(0x5d4))[_0x4e1229(0x270)][_0x4e1229(0x583)](),
        city: _0x577b7d ? "" : $(_0x4e1229(0x5d4))["value"]["trim"](),
        isOnline: _0x577b7d,
        physicalAddress: _0x577b7d ? "" : _0x46f938,
        country: $(_0x4e1229(0x586))[_0x4e1229(0x270)],
        coordinates: !_0x577b7d && _0x2d1fec ? [_0x41424a, _0x36d26b] : null,
        availabilityMode: _0x5dd560,
        left: _0x5dd560 === _0x4e1229(0x4c5) ? _0x2bd2cf : null,
        placement: _0x343c16,
        sponsored: _0x423e66,
        sponsorLabel: _0x423e66 ? _0x4e1229(0x27c) : "",
        status: "active",
        codeMode: _0x104677[_0x4e1229(0x400)] ? "bulk_codes" : _0x4e1229(0x4f4),
        hasCodes: Boolean(_0x104677[_0x4e1229(0x400)]),
        marketplaceBilling: {
          placementMonthlyDkk: pricing[_0x343c16] || 0x0,
          activationFeeDkk: pricing["activation"],
          validationFeeDkk: pricing[_0x4e1229(0x499)],
        },
        updatedAt: serverTimestamp(),
      };
      let _0x46c2ae = _0x176f02;
      if (_0x176f02)
        await updateDoc(doc(db, collections["rewards"], _0x176f02), _0x507440);
      else {
        const _0x290edf = await addDoc(
          collection(db, collections[_0x4e1229(0x4a4)]),
          {
            ..._0x507440,
            clicks: 0x0,
            activations: 0x0,
            validations: 0x0,
            createdAt: serverTimestamp(),
          },
        );
        _0x46c2ae = _0x290edf["id"];
      }
      (_0x104677[_0x4e1229(0x400)] &&
        (await Promise["all"](
          _0x104677[_0x4e1229(0x21b)]((_0x496619) =>
            addDoc(collection(db, collections[_0x4e1229(0x643)]), {
              rewardId: _0x46c2ae,
              partnerId: currentPartner["id"],
              code: _0x496619["code"],
              expiresAt: _0x496619[_0x4e1229(0x29b)],
              status: "available",
              createdAt: serverTimestamp(),
            }),
          ),
        )),
        resetRewardForm(),
        closeRewardModal());
    } catch (_0x4a91fb) {
      window[_0x4e1229(0x725)](_0x4a91fb[_0x4e1229(0x52c)] || _0x4e1229(0x779));
    } finally {
      ((_0x4af7af[_0x4e1229(0x70f)] = ![]),
        (_0x4af7af[_0x4e1229(0x23a)] = _0x874ccb));
    }
  }),
  $(_0x562b0b(0x4b4))[_0x562b0b(0x23d)](_0x562b0b(0x2dc), () => {
    const _0x6ac38d = _0x562b0b,
      _0x354931 = getCurrentRewardLimit(),
      _0x27b1b0 = getActiveRewards()["length"];
    if (_0x27b1b0 >= _0x354931) {
      const _0x4cb316 = getCurrentBillingPlan();
      window["alert"](
        _0x6ac38d(0x523) +
          (_0x4cb316?.[_0x6ac38d(0x410)] || _0x6ac38d(0x672)) +
          "\x20plan\x20allows\x20up\x20to\x20" +
          _0x354931 +
          _0x6ac38d(0x5ee) +
          (_0x354931 === 0x1 ? "" : "s") +
          _0x6ac38d(0x205),
      );
      return;
    }
    (resetRewardForm(), openRewardModal());
  }),
  renderStationHoursEditor(),
  $(_0x562b0b(0x329))?.[_0x562b0b(0x23d)](_0x562b0b(0x73e), (_0xa58fce) => {
    const _0x50afe8 = _0x562b0b,
      _0x14ae12 = _0xa58fce[_0x50afe8(0x2cd)][_0x50afe8(0x41d)](
        _0x50afe8(0x306),
      );
    if (!_0x14ae12) return;
    syncStationHoursRow(_0x14ae12[_0x50afe8(0x21a)]["hoursClosed"]);
  }),
  $("stationEditForm")?.[_0x562b0b(0x23d)](
    _0x562b0b(0x4f9),
    saveStationDetails,
  ),
  document["addEventListener"](_0x562b0b(0x2dc), (_0x4cc05d) => {
    const _0x29ae00 = _0x562b0b;
    if (!_0x4cc05d[_0x29ae00(0x2cd)]["closest"]("[data-modal-close]")) return;
    ($("rewardModal")["classList"][_0x29ae00(0x798)](_0x29ae00(0x382)) &&
      (resetRewardForm(), closeRewardModal()),
      $(_0x29ae00(0x2b1))[_0x29ae00(0x5a3)][_0x29ae00(0x798)](
        _0x29ae00(0x382),
      ) && closeTierModal(),
      $("boostModal")?.[_0x29ae00(0x5a3)][_0x29ae00(0x798)]("open") &&
        closeBoostModal(),
      $(_0x29ae00(0x6aa))[_0x29ae00(0x5a3)][_0x29ae00(0x798)](
        _0x29ae00(0x382),
      ) && closeStationEditModal(),
      $(_0x29ae00(0x567))?.[_0x29ae00(0x5a3)][_0x29ae00(0x798)]("open") &&
        closeInvoiceHistoryModal());
  }),
  document["addEventListener"](_0x562b0b(0x5a9), (_0x148238) => {
    const _0xe5ee1d = _0x562b0b;
    if (_0x148238[_0xe5ee1d(0x530)] !== _0xe5ee1d(0x485)) return;
    ($(_0xe5ee1d(0x70d))[_0xe5ee1d(0x5a3)][_0xe5ee1d(0x798)]("open") &&
      (resetRewardForm(), closeRewardModal()),
      $(_0xe5ee1d(0x2b1))[_0xe5ee1d(0x5a3)][_0xe5ee1d(0x798)](
        _0xe5ee1d(0x382),
      ) && closeTierModal(),
      $("boostModal")?.["classList"]["contains"](_0xe5ee1d(0x382)) &&
        closeBoostModal(),
      $(_0xe5ee1d(0x6aa))[_0xe5ee1d(0x5a3)][_0xe5ee1d(0x798)](
        _0xe5ee1d(0x382),
      ) && closeStationEditModal(),
      $("invoiceHistoryModal")?.[_0xe5ee1d(0x5a3)][_0xe5ee1d(0x798)](
        _0xe5ee1d(0x382),
      ) && closeInvoiceHistoryModal());
  }),
  $(_0x562b0b(0x592))[_0x562b0b(0x23d)](_0x562b0b(0x2dc), async (_0x4e0387) => {
    const _0x1841ab = _0x562b0b,
      _0x58c287 = _0x4e0387[_0x1841ab(0x2cd)][_0x1841ab(0x41d)](
        "[data-reward-action]",
      );
    if (!_0x58c287) return;
    const _0x40cd57 = rewardRecords[_0x1841ab(0x40f)](
      (_0x58eaac) => _0x58eaac["id"] === _0x58c287["dataset"]["id"],
    );
    if (!_0x40cd57) return;
    if (_0x58c287[_0x1841ab(0x21a)][_0x1841ab(0x548)] === _0x1841ab(0x5e7)) {
      openBoostModal(_0x40cd57["id"]);
      return;
    }
    if (_0x58c287[_0x1841ab(0x21a)]["rewardAction"] === _0x1841ab(0x45a)) {
      (clearSelectedRewardImage(),
        hideRewardLocationSuggestions(),
        setRewardCodesMessage(""),
        ($("rewardEditId")["value"] = _0x40cd57["id"]),
        ($(_0x1841ab(0x31a))[_0x1841ab(0x270)] =
          _0x40cd57[_0x1841ab(0x6bb)] || ""),
        ($(_0x1841ab(0x28b))[_0x1841ab(0x270)] =
          _0x40cd57[_0x1841ab(0x359)] || currentPartner["companyName"] || ""),
        ($(_0x1841ab(0x656))["value"] =
          _0x40cd57[_0x1841ab(0x2e3)] || _0x40cd57[_0x1841ab(0x678)] || ""),
        ($(_0x1841ab(0x63a))[_0x1841ab(0x6ba)] = Boolean(
          _0x40cd57["isOnline"],
        )),
        ($(_0x1841ab(0x5d4))[_0x1841ab(0x270)] =
          _0x40cd57[_0x1841ab(0x484)] || currentPartner["city"] || ""),
        ($(_0x1841ab(0x35a))[_0x1841ab(0x270)] = Array[_0x1841ab(0x417)](
          _0x40cd57[_0x1841ab(0x2db)],
        )
          ? String(_0x40cd57[_0x1841ab(0x2db)][0x0] ?? "")
          : ""),
        ($("rewardLocationLng")["value"] = Array[_0x1841ab(0x417)](
          _0x40cd57[_0x1841ab(0x2db)],
        )
          ? String(_0x40cd57["coordinates"][0x1] ?? "")
          : ""),
        ($(_0x1841ab(0x638))[_0x1841ab(0x270)] =
          _0x40cd57[_0x1841ab(0x519)] || ""),
        ($(_0x1841ab(0x586))[_0x1841ab(0x270)] =
          _0x40cd57["country"] || currentPartner["countryCode"] || "DK"),
        ($(_0x1841ab(0x61a))["value"] = _0x40cd57[_0x1841ab(0x2bb)] || 0x19),
        ($(_0x1841ab(0x733))[_0x1841ab(0x270)] =
          _0x40cd57[_0x1841ab(0x43b)] || _0x1841ab(0x731)),
        ($(_0x1841ab(0x3a2))[_0x1841ab(0x270)] =
          typeof _0x40cd57[_0x1841ab(0x2fa)] === _0x1841ab(0x2ec) &&
          !Number[_0x1841ab(0x568)](_0x40cd57[_0x1841ab(0x2fa)])
            ? _0x1841ab(0x4c5)
            : _0x40cd57[_0x1841ab(0x4c9)] || _0x1841ab(0x2a8)),
        ($(_0x1841ab(0x4b3))[_0x1841ab(0x270)] =
          typeof _0x40cd57[_0x1841ab(0x2fa)] === _0x1841ab(0x2ec) &&
          !Number[_0x1841ab(0x568)](_0x40cd57[_0x1841ab(0x2fa)])
            ? String(_0x40cd57[_0x1841ab(0x2fa)])
            : ""),
        ($(_0x1841ab(0x25d))[_0x1841ab(0x270)] =
          _0x40cd57[_0x1841ab(0x242)] || ""),
        ($(_0x1841ab(0x2a6))[_0x1841ab(0x270)] =
          _0x40cd57["imageStoragePath"] || ""),
        ($(_0x1841ab(0x3f2))["value"] =
          _0x40cd57[_0x1841ab(0x291)] || _0x40cd57[_0x1841ab(0x4ce)] || ""),
        ($("rewardCodes")[_0x1841ab(0x270)] = ""),
        $("rewardCodes")[_0x1841ab(0x3fd)](_0x1841ab(0x78b)),
        ($(_0x1841ab(0x582))["innerHTML"] = _0x1841ab(0x354)),
        ($(_0x1841ab(0x23c))["textContent"] = _0x1841ab(0x487)),
        syncRewardChannelFields(),
        syncRewardAvailabilityFields(),
        syncRewardImagePreview(),
        openRewardModal());
      return;
    }
    if (_0x58c287[_0x1841ab(0x21a)]["rewardAction"] === _0x1841ab(0x668)) {
      if (requireHttpOrigin("changing\x20reward\x20status")) return;
      const _0x1e8d9a =
        (_0x40cd57[_0x1841ab(0x428)] || "active") === _0x1841ab(0x3e0)
          ? _0x1841ab(0x58a)
          : _0x1841ab(0x3e0);
      if (_0x1e8d9a === _0x1841ab(0x3e0)) {
        const _0xed92c8 = getCurrentRewardLimit();
        if (getActiveRewards()["length"] >= _0xed92c8) {
          const _0x4e6c86 = getCurrentBillingPlan();
          window[_0x1841ab(0x725)](
            _0x1841ab(0x523) +
              (_0x4e6c86?.[_0x1841ab(0x410)] || _0x1841ab(0x672)) +
              _0x1841ab(0x4d8) +
              _0xed92c8 +
              _0x1841ab(0x5ee) +
              (_0xed92c8 === 0x1 ? "" : "s") +
              _0x1841ab(0x773),
          );
          return;
        }
      }
      await updateDoc(doc(db, collections[_0x1841ab(0x4a4)], _0x40cd57["id"]), {
        status: _0x1e8d9a,
        updatedAt: serverTimestamp(),
      });
      return;
    }
    if (_0x58c287[_0x1841ab(0x21a)][_0x1841ab(0x548)] === "archive") {
      if (requireHttpOrigin(_0x1841ab(0x7bd))) return;
      const _0x2db2d3 = window[_0x1841ab(0x3e8)](
        _0x1841ab(0x64a) + (_0x40cd57["title"] || "this\x20reward") + "?",
      );
      if (!_0x2db2d3) return;
      await updateDoc(doc(db, collections[_0x1841ab(0x4a4)], _0x40cd57["id"]), {
        status: _0x1841ab(0x5f6),
        updatedAt: serverTimestamp(),
      });
      return;
    }
    if (_0x58c287[_0x1841ab(0x21a)]["rewardAction"] === _0x1841ab(0x498)) {
      if (requireHttpOrigin(_0x1841ab(0x75a))) return;
      const _0x1ae818 = getCurrentRewardLimit();
      if (getActiveRewards()[_0x1841ab(0x400)] >= _0x1ae818) {
        const _0x79b721 = getCurrentBillingPlan();
        (window["alert"](
          _0x1841ab(0x523) +
            (_0x79b721?.["name"] || _0x1841ab(0x672)) +
            _0x1841ab(0x4d8) +
            _0x1ae818 +
            _0x1841ab(0x5ee) +
            (_0x1ae818 === 0x1 ? "" : "s") +
            _0x1841ab(0x65c),
        ),
          await updateDoc(doc(db, collections["rewards"], _0x40cd57["id"]), {
            status: _0x1841ab(0x58a),
            updatedAt: serverTimestamp(),
          }));
        return;
      }
      await updateDoc(doc(db, collections[_0x1841ab(0x4a4)], _0x40cd57["id"]), {
        status: _0x1841ab(0x3e0),
        updatedAt: serverTimestamp(),
      });
    }
  }),
  $(_0x562b0b(0x3bb))?.[_0x562b0b(0x23d)](_0x562b0b(0x2dc), (_0x2cc5fe) => {
    const _0xe814ea = _0x562b0b,
      _0x3d4d11 = _0x2cc5fe[_0xe814ea(0x2cd)]["closest"](
        "[data-reward-filter]",
      );
    if (!_0x3d4d11) return;
    const _0x1704ff = _0x3d4d11[_0xe814ea(0x21a)][_0xe814ea(0x665)];
    if (_0x1704ff === rewardStatusFilter) return;
    ((rewardStatusFilter = _0x1704ff), renderRewardList());
  }),
  $("stationList")[_0x562b0b(0x23d)](_0x562b0b(0x2dc), (_0x3170ce) => {
    const _0x2fff3b = _0x562b0b,
      _0x1e0026 = _0x3170ce[_0x2fff3b(0x2cd)][_0x2fff3b(0x41d)](
        "[data-station-action=\x27edit\x27]",
      );
    if (_0x1e0026) {
      openStationEditModal(_0x1e0026[_0x2fff3b(0x21a)]["id"]);
      return;
    }
    const _0x478329 = _0x3170ce[_0x2fff3b(0x2cd)][_0x2fff3b(0x41d)](
      _0x2fff3b(0x6a7),
    );
    _0x478329 && openTierModal(_0x478329[_0x2fff3b(0x21a)]["id"]);
  }),
  $(_0x562b0b(0x464))[_0x562b0b(0x23d)](_0x562b0b(0x2dc), (_0x68f368) => {
    const _0x51f4b9 = _0x562b0b,
      _0x11067d = _0x68f368["target"]["closest"](_0x51f4b9(0x391));
    if (!_0x11067d) return;
    ((selectedTierId = _0x11067d[_0x51f4b9(0x21a)][_0x51f4b9(0x2f3)]),
      renderTierGrid());
  }),
  $(_0x562b0b(0x216))["addEventListener"](_0x562b0b(0x2dc), saveStationTier),
  $("boostGrid")?.[_0x562b0b(0x23d)]("click", (_0x236bf4) => {
    const _0x35cfec = _0x562b0b;
    if (_0x236bf4["target"][_0x35cfec(0x41d)]("input")) return;
    const _0x53ace8 = _0x236bf4[_0x35cfec(0x2cd)][_0x35cfec(0x41d)](
      _0x35cfec(0x657),
    );
    if (!_0x53ace8) return;
    ((selectedBoostOptionId = _0x53ace8["dataset"]["boostId"]),
      renderBoostGrid());
  }),
  $(_0x562b0b(0x5fb))?.[_0x562b0b(0x23d)](_0x562b0b(0x2dc), activateBoost),
  $("billingPlanGrid")?.[_0x562b0b(0x23d)](_0x562b0b(0x2dc), (_0x460ddd) => {
    const _0x24d170 = _0x562b0b,
      _0x17d6a6 = _0x460ddd[_0x24d170(0x2cd)]["closest"]("[data-plan-id]");
    if (!_0x17d6a6 || _0x17d6a6["disabled"]) return;
    startPartnerCheckout(
      _0x17d6a6["dataset"]["planId"],
      _0x24d170(0x2f9),
      _0x17d6a6,
    );
  }),
  $(_0x562b0b(0x233))?.["addEventListener"]("click", () =>
    refreshPartnerBillingStatus(),
  ),
  document["addEventListener"]("click", (_0x42bb20) => {
    const _0x322fef = _0x562b0b;
    _0x42bb20[_0x322fef(0x2cd)][_0x322fef(0x41d)](
      "#payOutstandingBoostsButton",
    ) && payOutstandingBoosts();
  }),
  $(_0x562b0b(0x20f))?.[_0x562b0b(0x23d)](_0x562b0b(0x2dc), async () => {
    const _0x4f6bc2 = _0x562b0b;
    if (!currentPartner) return;
    const _0x576b3f = $(_0x4f6bc2(0x20f));
    !partnerBillingStatus[_0x4f6bc2(0x48d)] &&
      !partnerBillingStatus[_0x4f6bc2(0x730)] &&
      (await refreshPartnerBillingStatus({ silent: !![] }));
    if (!hasSavedBillingCard()) {
      await startPartnerSetupSession(_0x576b3f);
      return;
    }
    if (requireHttpOrigin(_0x4f6bc2(0x4e1))) return;
    const _0x54f403 = _0x576b3f[_0x4f6bc2(0x23a)];
    ((_0x576b3f[_0x4f6bc2(0x70f)] = !![]),
      (_0x576b3f["textContent"] = _0x4f6bc2(0x749)));
    try {
      const _0x584fd6 = httpsCallable(
          cloudFunctions,
          "createPartnerPortalBillingSession",
        ),
        _0x2b56d0 = await _0x584fd6({
          returnUrl: window[_0x4f6bc2(0x484)][_0x4f6bc2(0x5f3)],
        }),
        _0x38f4ea = _0x2b56d0?.[_0x4f6bc2(0x787)]?.[_0x4f6bc2(0x54e)];
      if (!_0x38f4ea) throw new Error(_0x4f6bc2(0x6e5));
      window[_0x4f6bc2(0x484)][_0x4f6bc2(0x5f3)] = _0x38f4ea;
    } catch (_0x526ba6) {
      (window[_0x4f6bc2(0x725)](
        getReadableCallableError(_0x526ba6, _0x4f6bc2(0x35d)),
      ),
        (_0x576b3f["disabled"] = ![]),
        (_0x576b3f[_0x4f6bc2(0x23a)] = _0x54f403));
    }
  }),
  $(_0x562b0b(0x3fb))?.[_0x562b0b(0x23d)](_0x562b0b(0x2dc), async () => {
    const _0x38a43a = _0x562b0b;
    if (!currentPartner) return;
    const _0x4ada8d = $(_0x38a43a(0x3fb)),
      _0x42bca0 = partnerBillingStatus[_0x38a43a(0x436)];
    if (!hasLiveStripeSubscription(_0x42bca0)) return;
    const _0x1aba09 =
        PLAN_BY_ID[_0x42bca0[_0x38a43a(0x62b)]]?.[_0x38a43a(0x410)] ||
        _0x42bca0["planLabel"] ||
        _0x38a43a(0x220),
      _0x12fd30 = _0x42bca0["currentPeriodEnd"]
        ? _0x38a43a(0x466) +
          new Date(_0x42bca0[_0x38a43a(0x77f)])["toLocaleDateString"](
            _0x38a43a(0x28d),
          ) +
          "."
        : "",
      _0x1551b6 = window[_0x38a43a(0x3e8)](
        _0x38a43a(0x3b8) +
          _0x1aba09 +
          "\x20subscription?" +
          _0x12fd30 +
          _0x38a43a(0x6ab),
      );
    if (!_0x1551b6) return;
    if (requireHttpOrigin("cancelling\x20subscription")) return;
    const _0x1dd931 = _0x4ada8d[_0x38a43a(0x23a)];
    ((_0x4ada8d[_0x38a43a(0x70f)] = !![]),
      (_0x4ada8d[_0x38a43a(0x23a)] = _0x38a43a(0x749)));
    try {
      const _0x48aca5 = httpsCallable(cloudFunctions, _0x38a43a(0x6a8)),
        _0x491754 = await _0x48aca5({
          returnUrl: window[_0x38a43a(0x484)][_0x38a43a(0x5f3)],
        }),
        _0x3e1470 = _0x491754?.[_0x38a43a(0x787)]?.["url"];
      if (!_0x3e1470) throw new Error(_0x38a43a(0x6e5));
      window[_0x38a43a(0x484)][_0x38a43a(0x5f3)] = _0x3e1470;
    } catch (_0x135d18) {
      (window[_0x38a43a(0x725)](
        getReadableCallableError(_0x135d18, _0x38a43a(0x35d)),
      ),
        (_0x4ada8d[_0x38a43a(0x70f)] = ![]),
        (_0x4ada8d[_0x38a43a(0x23a)] = _0x1dd931));
    }
  }),
  $(_0x562b0b(0x709))[_0x562b0b(0x23d)](_0x562b0b(0x2dc), async (_0x170329) => {
    const _0x1df3e8 = _0x562b0b,
      _0x381554 = _0x170329[_0x1df3e8(0x2cd)][_0x1df3e8(0x41d)](
        "[data-station-action=\x27collect\x27]",
      );
    if (!_0x381554 || !currentPartner) return;
    if (requireHttpOrigin(_0x1df3e8(0x473))) return;
    const _0x3f2a51 = stationRecords["find"](
      (_0x46f22d) => _0x46f22d["id"] === _0x381554[_0x1df3e8(0x21a)]["id"],
    );
    if (!_0x3f2a51) return;
    try {
      await addDoc(collection(db, collections[_0x1df3e8(0x44b)]), {
        partnerId: currentPartner["id"],
        partnerCompanyName: currentPartner[_0x1df3e8(0x412)],
        stationId: _0x3f2a51["id"],
        stationTitle:
          _0x3f2a51[_0x1df3e8(0x6bb)] ||
          _0x3f2a51[_0x1df3e8(0x43e)] ||
          _0x3f2a51["id"],
        placeName: _0x3f2a51[_0x1df3e8(0x43e)] || "",
        currentCap: Number(_0x3f2a51["currentCap"] || 0x0),
        capacity: Number(_0x3f2a51[_0x1df3e8(0x630)] || 0x0),
        status: _0x1df3e8(0x2af),
        reason: "partner_changed_full_bag",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      try {
        await updateDoc(doc(db, collections["stations"], _0x3f2a51["id"]), {
          collectionRequested: !![],
          collectionRequestStatus: _0x1df3e8(0x2af),
          collectionRequestedAt: serverTimestamp(),
          collectionRequestedByPartnerId: currentPartner["id"],
        });
      } catch (_0x54f174) {
        console[_0x1df3e8(0x4fb)](
          "Collection\x20request\x20saved,\x20but\x20station\x20status\x20could\x20not\x20be\x20updated.",
          _0x54f174,
        );
      }
    } catch (_0x400dba) {
      window["alert"](_0x400dba["message"] || _0x1df3e8(0x6c4));
    }
  }),
  $(_0x562b0b(0x709))[_0x562b0b(0x23d)](_0x562b0b(0x2dc), async (_0x1c5f7c) => {
    const _0x485bc9 = _0x562b0b,
      _0x327163 = _0x1c5f7c["target"][_0x485bc9(0x41d)](
        "[data-station-action=\x27empty\x27]",
      );
    if (!_0x327163 || !currentPartner) return;
    if (_0x327163[_0x485bc9(0x70f)]) return;
    if (requireHttpOrigin(_0x485bc9(0x389))) return;
    const _0x34ae05 = stationRecords[_0x485bc9(0x40f)](
      (_0x1017bd) => _0x1017bd["id"] === _0x327163[_0x485bc9(0x21a)]["id"],
    );
    if (!_0x34ae05) return;
    const _0x2c01bb =
        _0x34ae05[_0x485bc9(0x43e)] ||
        _0x34ae05[_0x485bc9(0x6bb)] ||
        "this\x20station",
      _0x453ba6 = window[_0x485bc9(0x3e8)](
        _0x485bc9(0x608) + _0x2c01bb + _0x485bc9(0x6d6),
      );
    if (!_0x453ba6) return;
    const _0x5620a6 = _0x327163[_0x485bc9(0x41d)](_0x485bc9(0x309)),
      _0x4d73a2 = _0x5620a6
        ? Array[_0x485bc9(0x6ae)](_0x5620a6[_0x485bc9(0x3b9)](_0x485bc9(0x3eb)))
        : [_0x327163],
      _0x5bda74 = _0x327163["innerHTML"],
      _0x2822e7 = 0x3;
    ((isAnimatingStationEmpty = !![]),
      _0x4d73a2[_0x485bc9(0x49f)]((_0x31f547) => {
        _0x31f547["disabled"] = !![];
      }));
    let _0x3ddad6 = _0x2822e7;
    _0x327163[_0x485bc9(0x23a)] = _0x485bc9(0x6dc) + _0x3ddad6 + "s";
    try {
      (await new Promise((_0x35142e) => {
        const _0x2f4f6e = setInterval(() => {
          const _0x37507c = _0x2558;
          ((_0x3ddad6 -= 0x1),
            _0x3ddad6 <= 0x0
              ? (clearInterval(_0x2f4f6e), _0x35142e())
              : (_0x327163[_0x37507c(0x23a)] =
                  "Resetting\x20in\x20" + _0x3ddad6 + "s"));
        }, 0x3e8);
      }),
        (_0x327163[_0x485bc9(0x23a)] = "Resetting…"),
        await updateDoc(
          doc(db, collections[_0x485bc9(0x5c7)], _0x34ae05["id"]),
          {
            currentCap: 0x0,
            lastEmptiedAt: serverTimestamp(),
            lastEmptiedByPartnerId: currentPartner["id"],
            collectionRequested: ![],
            collectionRequestStatus: "completed",
            collectionRequestCompletedAt: serverTimestamp(),
          },
        ));
    } catch (_0x2235bf) {
      ((_0x327163[_0x485bc9(0x1f2)] = _0x5bda74),
        _0x4d73a2[_0x485bc9(0x49f)]((_0x3f7daf) => {
          const _0x4b2fa6 = _0x485bc9;
          _0x3f7daf[_0x4b2fa6(0x70f)] = ![];
        }),
        window["alert"](_0x2235bf[_0x485bc9(0x52c)] || _0x485bc9(0x706)));
    } finally {
      ((isAnimatingStationEmpty = ![]), renderStationLists());
    }
  }),
  $(_0x562b0b(0x560))?.[_0x562b0b(0x23d)](_0x562b0b(0x2dc), async () => {
    const _0x2c21bd = _0x562b0b;
    if (!currentPartner) return;
    if (requireHttpOrigin(_0x2c21bd(0x341))) return;
    openInvoiceHistoryModal();
  }),
  $(_0x562b0b(0x3e6))?.[_0x562b0b(0x23d)](_0x562b0b(0x75f), (_0x2d01c7) => {
    const _0x20e8b4 = _0x562b0b;
    ((partnerInvoiceHistory = {
      ...partnerInvoiceHistory,
      query: _0x2d01c7[_0x20e8b4(0x2cd)][_0x20e8b4(0x270)] || "",
    }),
      renderInvoiceHistory());
  }),
  $(_0x562b0b(0x2f7))[_0x562b0b(0x23d)]("click", () => signOut(auth)),
  $(_0x562b0b(0x662))[_0x562b0b(0x23d)](_0x562b0b(0x2dc), () => signOut(auth)),
  $(_0x562b0b(0x497))["addEventListener"](_0x562b0b(0x2dc), () =>
    signOut(auth),
  ),
  $(_0x562b0b(0x628))[_0x562b0b(0x23d)]("submit", async (_0x164f49) => {
    const _0x313e26 = _0x562b0b;
    _0x164f49[_0x313e26(0x580)]();
    if (!currentPartner) return;
    if (requireHttpOrigin(_0x313e26(0x776))) return;
    const _0x2f835c = $(_0x313e26(0x696)),
      _0x8dcb4a = _0x2f835c[_0x313e26(0x23a)],
      _0x57a88d = $("profileMessage");
    ((_0x2f835c[_0x313e26(0x70f)] = !![]),
      (_0x2f835c["textContent"] = _0x313e26(0x257)));
    try {
      const _0x56616a = $(_0x313e26(0x363))["value"],
        _0x3c7277 = $(_0x313e26(0x4c0))[_0x313e26(0x270)],
        _0x5b3a0a = CATEGORY_BY_ID[_0x3c7277] || BUSINESS_CATEGORIES[0x0],
        _0x486a2a = $("profileBusinessSubcategory")[_0x313e26(0x270)],
        _0x55b6d2 = {
          companyName: $(_0x313e26(0x307))[_0x313e26(0x270)][
            _0x313e26(0x583)
          ](),
          contactFirstName:
            $("profileFirstName")[_0x313e26(0x270)][_0x313e26(0x583)](),
          contactLastName: $(_0x313e26(0x547))[_0x313e26(0x270)][
            _0x313e26(0x583)
          ](),
          phone: $("profilePhone")["value"][_0x313e26(0x583)](),
          website: $(_0x313e26(0x774))[_0x313e26(0x270)][_0x313e26(0x583)](),
          city:
            $(_0x313e26(0x46e))[_0x313e26(0x270)] ||
            currentPartner[_0x313e26(0x28c)] ||
            "",
          address: $("profileAddress")["value"][_0x313e26(0x583)](),
          lat:
            parseFloat($(_0x313e26(0x3c2))[_0x313e26(0x270)]) ||
            currentPartner[_0x313e26(0x69b)] ||
            null,
          lng:
            parseFloat($("profileAddressLng")["value"]) ||
            currentPartner["lng"] ||
            null,
          countryCode: _0x56616a,
          country: getCountryName(_0x56616a),
          businessCategory: _0x3c7277,
          businessCategoryName: _0x5b3a0a[_0x313e26(0x410)],
          businessSubcategory: _0x486a2a,
          businessType: _0x486a2a || _0x5b3a0a[_0x313e26(0x410)],
          about: $(_0x313e26(0x454))[_0x313e26(0x270)][_0x313e26(0x583)](),
          updatedAt: serverTimestamp(),
        };
      (await updateDoc(
        doc(db, collections[_0x313e26(0x77a)], currentPartner["id"]),
        _0x55b6d2,
      ),
        Object[_0x313e26(0x606)](currentPartner, _0x55b6d2),
        setText(
          _0x313e26(0x5cb),
          currentPartner[_0x313e26(0x412)] || _0x313e26(0x3be),
        ),
        setText(
          "topbarPartnerName",
          currentPartner[_0x313e26(0x412)] || _0x313e26(0x3be),
        ));
      const _0x1fb283 =
        _0x5b3a0a[_0x313e26(0x410)] &&
        _0x486a2a &&
        _0x5b3a0a[_0x313e26(0x410)] !== _0x486a2a
          ? _0x5b3a0a[_0x313e26(0x410)] + _0x313e26(0x2fc) + _0x486a2a
          : _0x486a2a || _0x5b3a0a[_0x313e26(0x410)] || _0x313e26(0x7ba);
      (setText(
        _0x313e26(0x27e),
        getCountryName(_0x56616a) + "\x20·\x20" + _0x1fb283,
      ),
        _0x57a88d &&
          ((_0x57a88d[_0x313e26(0x23a)] = _0x313e26(0x76d)),
          (_0x57a88d["className"] = _0x313e26(0x783)),
          setTimeout(() => {
            const _0x3c8ed0 = _0x313e26;
            _0x57a88d[_0x3c8ed0(0x566)] = _0x3c8ed0(0x52c);
          }, 0x960)));
    } catch (_0x29782f) {
      _0x57a88d &&
        ((_0x57a88d[_0x313e26(0x23a)] =
          _0x29782f[_0x313e26(0x52c)] || _0x313e26(0x462)),
        (_0x57a88d["className"] = _0x313e26(0x5f5)));
    } finally {
      ((_0x2f835c[_0x313e26(0x70f)] = ![]),
        (_0x2f835c[_0x313e26(0x23a)] = _0x8dcb4a));
    }
  }),
  onAuthStateChanged(auth, async (_0x55c34f) => {
    const _0xcc7bd0 = _0x562b0b;
    if (!_0x55c34f) {
      (stopLiveData(),
        (currentPartner = null),
        ($(_0xcc7bd0(0x409))["style"][_0xcc7bd0(0x5b9)] = _0xcc7bd0(0x5e3)),
        ($(_0xcc7bd0(0x3c4))[_0xcc7bd0(0x752)]["display"] = _0xcc7bd0(0x256)),
        ($(_0xcc7bd0(0x230))[_0xcc7bd0(0x752)][_0xcc7bd0(0x5b9)] = "none"),
        ($(_0xcc7bd0(0x2f7))[_0xcc7bd0(0x752)]["display"] = _0xcc7bd0(0x256)),
        ($(_0xcc7bd0(0x2ef))[_0xcc7bd0(0x752)][_0xcc7bd0(0x5b9)] =
          _0xcc7bd0(0x256)),
        hideCoachmark(),
        setText(_0xcc7bd0(0x2b3), _0xcc7bd0(0x3be)),
        resolveAuthBoot());
      return;
    }
    try {
      await loadPartner(_0x55c34f);
    } catch (_0x579e17) {
      (stopLiveData(),
        (currentPartner = null),
        ($(_0xcc7bd0(0x409))[_0xcc7bd0(0x752)][_0xcc7bd0(0x5b9)] =
          _0xcc7bd0(0x5e3)),
        ($(_0xcc7bd0(0x3c4))["style"][_0xcc7bd0(0x5b9)] = _0xcc7bd0(0x256)),
        ($(_0xcc7bd0(0x230))[_0xcc7bd0(0x752)]["display"] = "none"),
        ($(_0xcc7bd0(0x2f7))[_0xcc7bd0(0x752)]["display"] = _0xcc7bd0(0x373)),
        ($("partnerOnboardingFloat")[_0xcc7bd0(0x752)][_0xcc7bd0(0x5b9)] =
          _0xcc7bd0(0x256)),
        hideCoachmark(),
        showMessage(
          getReadableFirebaseError(_0x579e17, _0xcc7bd0(0x398)),
          _0xcc7bd0(0x222),
        ),
        resolveAuthBoot());
    }
  }),
  $(_0x562b0b(0x6da))[_0x562b0b(0x23d)](_0x562b0b(0x2dc), (_0x5a4072) => {
    const _0x24ac9a = _0x562b0b;
    (_0x5a4072[_0x24ac9a(0x648)](), dismissPartnerOnboardingPrompt());
  }),
  $(_0x562b0b(0x563))[_0x562b0b(0x23d)](_0x562b0b(0x2dc), () => {
    const _0x4672ab = _0x562b0b;
    (document["querySelector"](_0x4672ab(0x4aa))?.[_0x4672ab(0x2dc)](),
      ($("partnerOnboardingFloat")[_0x4672ab(0x752)][_0x4672ab(0x5b9)] =
        _0x4672ab(0x256)));
  }),
  $(_0x562b0b(0x59d))[_0x562b0b(0x23d)]("click", advanceCoachStep),
  $(_0x562b0b(0x4cd))[_0x562b0b(0x23d)]("click", () => dismissPartnerTour()),
  $(_0x562b0b(0x2e0))[_0x562b0b(0x23d)](_0x562b0b(0x2dc), () =>
    dismissPartnerTour(),
  ),
  document["addEventListener"](_0x562b0b(0x5a9), (_0x5ccf5a) => {
    const _0x3e1627 = _0x562b0b;
    if (_0x5ccf5a[_0x3e1627(0x530)] === _0x3e1627(0x485) && currentTourKey)
      dismissPartnerTour();
  }),
  populateCountries(),
  populateBusinessCategorySelect($(_0x562b0b(0x35c))),
  populateBusinessSubcategorySelect(
    $(_0x562b0b(0x60c)),
    $("signupBusinessCategory")?.[_0x562b0b(0x270)],
  ),
  populateBusinessCategorySelect($("profileBusinessCategory")),
  populateBusinessSubcategorySelect(
    $(_0x562b0b(0x3f0)),
    $(_0x562b0b(0x4c0))?.[_0x562b0b(0x270)],
  ),
  wireBusinessCategoryCascade(_0x562b0b(0x35c), "signupBusinessSubcategory"),
  wireBusinessCategoryCascade(_0x562b0b(0x4c0), _0x562b0b(0x3f0)),
  showFileOriginWarning(),
  syncRewardChannelFields(),
  syncRewardAvailabilityFields(),
  syncRewardImagePreview(),
  (function () {
    const _0x2d9659 = _0x562b0b,
      _0x46ea52 = {
        activations: { title: _0x2d9659(0x44c), body: _0x2d9659(0x712) },
        conversion: {
          title: _0x2d9659(0x52e),
          body: "The\x20%\x20of\x20users\x20who\x20clicked\x20your\x20reward\x20and\x20then\x20actually\x20activated\x20it.\x20A\x20low\x20rate\x20suggests\x20your\x20reward\x20copy\x20or\x20offer\x20value\x20needs\x20work.",
        },
        validation: { title: _0x2d9659(0x36f), body: _0x2d9659(0x317) },
        cost: { title: _0x2d9659(0x4b9), body: _0x2d9659(0x494) },
        foottraffic: {
          title: "Estimated\x20recycles\x20/\x20week",
          body: "Recycling\x20sessions\x20at\x20your\x20assigned\x20Cycl\x20stations\x20per\x20week.\x20A\x20real-world\x20proxy\x20for\x20foot-traffic\x20volume\x20near\x20your\x20venue.",
        },
        repeat: {
          title: _0x2d9659(0x625),
          body: "%\x20of\x20customers\x20who\x20activated\x20one\x20of\x20your\x20rewards\x20more\x20than\x20once.\x20A\x20high\x20repeat\x20rate\x20signals\x20loyalty\x20—\x20these\x20are\x20your\x20best\x20regulars.",
        },
        "home-clicks": {
          title: _0x2d9659(0x45e),
          body: "Total\x20clicks\x20on\x20your\x20rewards\x20in\x20the\x20Cycl\x20marketplace.\x20Measures\x20awareness\x20and\x20how\x20attractive\x20your\x20reward\x20looks\x20in\x20listings.",
        },
        "home-validations": { title: _0x2d9659(0x572), body: _0x2d9659(0x771) },
        "home-conversion": { title: _0x2d9659(0x225), body: _0x2d9659(0x39d) },
        "home-foottraffic": {
          title: _0x2d9659(0x2c7),
          body: "Estimated\x20recycling\x20sessions\x20per\x20month\x20at\x20your\x20assigned\x20Cycl\x20stations\x20—\x20a\x20volume\x20proxy\x20for\x20nearby\x20foot\x20traffic.",
        },
        "home-sponsored": { title: _0x2d9659(0x399), body: _0x2d9659(0x229) },
        catchment: { title: _0x2d9659(0x4a7), body: _0x2d9659(0x67e) },
        "peer-leaderboard": {
          title: _0x2d9659(0x604),
          body: "Your\x20business\x20ranked\x20against\x20peers\x20of\x20a\x20similar\x20type\x20and\x20size\x20in\x20your\x20area.\x20Use\x20it\x20to\x20benchmark\x20activations,\x20validation\x20rate,\x20and\x20cost\x20efficiency\x20—\x20and\x20spot\x20who\x20is\x20pulling\x20ahead\x20so\x20you\x20can\x20study\x20their\x20tactics.",
        },
        "perf-heatmap": {
          title: _0x2d9659(0x7a8),
          body: "A\x20normalised\x20heat\x20map\x20—\x20each\x20cell\x20is\x20scored\x200–100\x20within\x20your\x20peer\x20set\x20on\x20that\x20column\x20metric.\x20Bright\x20cells\x20=\x20top\x20of\x20the\x20group.\x20Scan\x20your\x20row\x20to\x20find\x20which\x20metrics\x20are\x20weakest\x20and\x20need\x20attention\x20first.",
        },
        loyalty: {
          title: _0x2d9659(0x4cc),
          body: "Based\x20on\x20real\x20recycling\x20sessions\x20at\x20your\x20assigned\x20Cycl\x20stations\x20over\x20the\x20last\x2090\x20days.\x20The\x20cohort\x20bar\x20shows\x20how\x20many\x20visitors\x20came\x20once\x20vs.\x20returned\x202–4\x20times\x20vs.\x205+\x20times.\x20A\x20growing\x205+\x20cohort\x20means\x20strong\x20habitual\x20loyalty.",
        },
        velocity: { title: _0x2d9659(0x5b0), body: _0x2d9659(0x75e) },
        "reward-themes": { title: _0x2d9659(0x1f3), body: _0x2d9659(0x3ad) },
        "reward-deep": { title: "Reward\x20deep-dive", body: _0x2d9659(0x612) },
        "station-deep": { title: _0x2d9659(0x3f3), body: _0x2d9659(0x69e) },
        "demo-customer": {
          title: _0x2d9659(0x272),
          body: "Age\x20and\x20gender\x20profile\x20of\x20the\x20people\x20who\x20activated\x20your\x20rewards,\x20drawn\x20from\x20their\x20Cycl\x20app\x20profiles.\x20Use\x20this\x20to\x20ensure\x20your\x20reward\x20copy\x20and\x20imagery\x20speaks\x20to\x20your\x20actual\x20audience,\x20not\x20a\x20guessed\x20one.",
        },
        "demo-visitor": {
          title: "Visitor\x20demographics",
          body: _0x2d9659(0x340),
        },
      },
      _0x2cd458 = document[_0x2d9659(0x745)](_0x2d9659(0x675)),
      _0x48d6a2 = document[_0x2d9659(0x745)](_0x2d9659(0x4fa)),
      _0x19de84 = document[_0x2d9659(0x745)](_0x2d9659(0x7c0));
    let _0x93bf06 = null;
    function _0x17c426(_0x7877c5) {
      const _0x2eca84 = _0x2d9659,
        _0x15932f = _0x46ea52[_0x7877c5["dataset"][_0x2eca84(0x5b2)]];
      if (!_0x15932f) return;
      if (_0x93bf06 === _0x7877c5) {
        _0x141d82();
        return;
      }
      ((_0x48d6a2["textContent"] = _0x15932f[_0x2eca84(0x6bb)]),
        (_0x19de84[_0x2eca84(0x23a)] = _0x15932f[_0x2eca84(0x674)]),
        _0x2cd458["classList"][_0x2eca84(0x767)](_0x2eca84(0x790)),
        (_0x93bf06 = _0x7877c5),
        _0x5f0218(_0x7877c5));
    }
    function _0x141d82() {
      const _0x550a72 = _0x2d9659;
      (_0x2cd458["classList"][_0x550a72(0x626)](_0x550a72(0x790)),
        (_0x93bf06 = null));
    }
    function _0x5f0218(_0x5cfd26) {
      const _0x244f72 = _0x2d9659,
        _0x42b927 = _0x5cfd26["getBoundingClientRect"](),
        _0x5ecb17 = 0xf0,
        _0x339319 = _0x2cd458[_0x244f72(0x301)] || 0x64;
      let _0x5833d3 = _0x42b927[_0x244f72(0x2d7)] - _0x5ecb17,
        _0x5d2604 = _0x42b927["bottom"] + 0x6;
      if (_0x5833d3 < 0x8) _0x5833d3 = 0x8;
      if (_0x5d2604 + _0x339319 > window[_0x244f72(0x255)] - 0x8)
        _0x5d2604 = _0x42b927[_0x244f72(0x5df)] - _0x339319 - 0x6;
      ((_0x2cd458["style"][_0x244f72(0x2fa)] = _0x5833d3 + "px"),
        (_0x2cd458["style"][_0x244f72(0x5df)] = _0x5d2604 + "px"));
    }
    (document["addEventListener"](_0x2d9659(0x2dc), function (_0x1751b9) {
      const _0x1273b9 = _0x2d9659,
        _0x4adefd = _0x1751b9[_0x1273b9(0x2cd)][_0x1273b9(0x41d)](
          _0x1273b9(0x636),
        );
      if (_0x4adefd) {
        (_0x1751b9[_0x1273b9(0x648)](), _0x17c426(_0x4adefd));
        return;
      }
      if (_0x2cd458[_0x1273b9(0x798)](_0x1751b9[_0x1273b9(0x2cd)])) return;
      _0x141d82();
    }),
      document[_0x2d9659(0x23d)]("keydown", function (_0x593445) {
        const _0x2cb5f2 = _0x2d9659;
        if (_0x593445[_0x2cb5f2(0x530)] === _0x2cb5f2(0x485)) _0x141d82();
      }));
  })());
