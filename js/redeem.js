const activateBtn = document.getElementById("activate");
const overlayCoupon = document.getElementById("overlay-coupon");
const closeOverlayCard = document.getElementById("backbtnoverlay");
const reward = document.querySelector(".reward");

AOS.init();

//Firebase
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

function donateCC() {
  inputDonate = parseInt(document.getElementById("donateInput").value);
  var inputDonateInt = parseInt(inputDonate);

  //var inputDonate=parseInt(document.getElementById("donateInput").value);
  var donationFirebase = firebase
    .database()
    .ref("donation/")
    .child("donation CC");
  donationFirebase.transaction(function (donated) {
    inputDonate = inputDonate || 0;
    alert("You have donated " + inputDonate);
    return donated + inputDonateInt;
  });
}

/*Donation activity*/
function takeFromDonation() {
  var inputDonate = document.getElementById("donateInput");
  var inputamount = inputDonate.value;
  var uid = firebase.auth().currentUser.uid;
  var amountcounterFirebase = firebase
    .database()
    .ref()
    .child(uid)
    .child("users")
    .child("amount");
  amountcounterFirebase.transaction(function (amountcounter) {
    if (amountcounter < inputamount) {
      alert("Insufficient account balance");
    } else {
      donateCC();
      return amountcounter - inputamount;
    }
  });
}

donatebtn.addEventListener("click", function () {
  takeFromDonation();
  var donationInput = document.getElementById("donateInput");
  donationInput.value = " ";
});

//this is inside the card
const tasks = [
  {
    image: "Images/bowlSunt&godt.webp",
    title: " 15% off at Sunt & Godt ",
    price: "2 CC",
    description: "15% discount from the menu",
    button: "Claim",
    descriptionB: "*Drinks are not included",
    list: " must be presented when ordering at <a href=https://www.google.com/maps/place/Sunt+og+Godt/@59.9282903,10.7591013,21z/data=!4m5!3m4!1s0x46416e695ad3dcbb:0x97cf2e576199d041!8m2!3d59.9282655!4d10.7592386 target=_blank> Sunt & Godt</a>",
    // <ul>
    //   <li><a href="">OMAR BARBERSHOP</a></li>
    // </ul>"
  },

  {
    image: "Images/jonk.png",
    title: "10% at JØNK",
    price: "2 CC",
    description: "Get 10% off from the menu.",
    button: "Claim",
    descriptionB: "*Drinks are not included",
    list: " must be presented when ordering at <a href=https://www.google.no/maps/place/J%C3%B8nk/@59.9124912,10.7616621,15z/data=!4m2!3m1!1s0x0:0xa8b7a134981b977?sa=X&ved=2ahUKEwiG_qrT0cP3AhWvRfEDHY4MAeIQ_BJ6BAhZEAU/ target=_blank> JØNK Grønland</a> <a href=https://www.google.com/maps/place/J%C3%B8nk+R%C3%B8a/@59.9461926,10.6264232,15z/data=!3m1!4b1!4m5!3m4!1s0x46416dc6386c5a75:0xfb06f01157f2cb57!8m2!3d59.9461937!4d10.643332 target=_blank> JØNK Røa</a>",
  },

  {
    image: "Images/barber.jpg",
    title: "10% Discount for haircut at Aclimax",
    price: "2 CC",
    description: "10% Discount at Aclimax barbershop",
    button: "Claim",
    descriptionB: "",
    list: "<a href=https://www.google.com/maps/place/Aclimax+Barber+Shop/@59.9193934,10.7470514,17z/data=!3m1!4b1!4m5!3m4!1s0x46416fbbebca9fa3:0xb4bda7db2492816d!8m2!3d59.9193934!4d10.7492401 target=_blank>ACLIMAX BARBERSHOP</a>",
    // <ul>
    //   <li><a href="">OMAR BARBERSHOP</a></li>
    // </ul>"
  },
  // {
  //   image: "Images/dwads.webp",
  //   title: "Daniel Wellington",
  //   price: "2 CC",
  //   description: "15% off everything you buy (including sales)",
  //   button: "Claim",
  //   descriptionB: "",
  //   list: "*Code to use at checkout. Take screenshot of the code after activated <a href=https://adtr.co/X9ovTH target=_blank> Daniel Wellington</a>",
  // },
];

firebase.auth().onAuthStateChanged(function (user) {
  console.log(user);
  let uid = firebase.auth().currentUser.uid;
  let newBalance = 0;
  var BalanceDb = firebase
    .database()
    .ref()
    .child(uid)
    .child("users")
    .child("amount");

  BalanceDb.on(
    "value",
    function (snapshot) {
      newBalance = snapshot.val();
      console.log(snapshot.val());
      document.getElementById("amountaccount").innerHTML = newBalance + " CC";
      console.log(newBalance);
      if (snapshot.val()) {
      }
      document.getElementById("redeemload").style.display = "none";
    },
    function (error) {
      console.log("Error: " + error.code);
    }
  );

  // function refreshResults() {
  //   document.getElementById("amountaccount").innerHTML =
  //   newBalance + " CC";
  //   if (newBalance == 70) {
  //     //alert("you have 70")
  //     console.log(newBalance);
  //   } else {
  //     newBalance = 0;
  //   }
  // }
  // User is signed in.
});

//hva er index?
// tasks.map((task, index) => {
//   const data = JSON.stringify(task);
//   reward.innerHTML += `
// <div class="cardshow">
// <img class="imgclass" src="${task.image}" alt="Avatar">
// <h3>${task.title}</h3>
// <h4> ${task.price}</h4>
// <p> ${task.description}</p>
// <button class="btncard" onclick="showDetail('${encodeURIComponent(
//     data
//   )}', null, '${index + 1}')"> ${task.button} </button>
// </div>
// `;
// });

function amountCounterDatabase(cost) {
  const uid = firebase.auth().currentUser.uid;
  const amountRef = firebase
    .database()
    .ref(`${uid}/users/amount`)
    .once("value")
    .then((snap) => {
      const amount = snap.val();
      const costNumber = parseInt(cost.replace(" cc", ""), 10);
      if (amount < costNumber) {
        return false;
      } else {
        return true;
      }
    });
  return amountRef;
}

async function showDetail(task, coupon, index) {
  const isPurchased = coupon !== "" && coupon !== null;
  const data = JSON.parse(decodeURIComponent(task));
  const canPurchase = await amountCounterDatabase(data.price);

  if (canPurchase) {
    overlayCoupon.innerHTML = `
        <div class="cardoverlay">
        <span id="backbtnoverlay" onclick="closeCard()" style="position: relative;left: 40%;">&times;</span> 
        <h4 style="text-align: center"><b>${data.title}</b></h4>
        <img 
          onclick="aprovedeimg()"
          id="aproveImg"
          src="Images/activated.png"
          style="
            width: 90px;
            height: 90px;
            position: absolute;
            top: 8%;
            object-fit: cover;
            object-position: 50% 50%;
            display: ${isPurchased ? `block` : `none`};
          "
        />
        <img
          class="imgclass"
          src=${data.image}
          alt="Avatar"
          style="width: 100%"
        />
        <h2 style="text-align: center">${data.price}</h2>
        <p style="text-align: center">${data.description}</p>
        <p style="text-align: center">${data.descriptionB}</p>
        ${
          !isPurchased
            ? `<p style="text-align: center"> ${data.list} </p>`
            : `<p style={{margin-bottom: -200px}}>COUPON: ${coupon}</p>`
          //onlick is here
        }
        <button class="btn" id="activate" onclick=${
          !isPurchased
            ? `getCoupon('${task}','${index}')`
            : `alert('Already Activated')`
        }>${isPurchased ? `Activated` : `Activate`}</button>
        <div><h4 style="text-align: center" id="timer"></h4></div>
      </div>
        `;
    //firebase
    var storeName = firebase
      .database()
      .ref()
      .child("activatedstores")
      .child(data.title);
    storeName.transaction(function (result) {
      return result + 1;
    });
    overlayCoupon.style.display = "block";
  } else {
    alert("You don’t have enough Cycl coins");
  }
}

function aprovedeimg() {
  const imgAproved = document.getElementById("aproveImg");
  imgAproved.style.display = "block";
}

function closeCard() {
  const imgAproved = document.getElementById("aproveImg");
  overlayCoupon.style.display = "none";
  overlayCoupon.innerHTML = "";
  imgAproved.style.display = "none";
}

function purchaseItem(cost) {
  let uid = firebase.auth().currentUser.uid;
  const amountcounterFirebase = firebase
    .database()
    .ref()
    .child(uid)
    .child("users")
    .child("amount");
  amountcounterFirebase.transaction(function (counterAmount) {
    return counterAmount - cost;
  });
}

async function getCoupon(task, type) {
  const decodeTask = JSON.parse(decodeURIComponent(task));
  const cost = parseInt(decodeTask.price.replace(" cc", ""), 10);
  const data = {
    market: "NO",
    programId: 1657214553,
    channelId: 1703965087,
  };

  //type definerer hvilket kort innholdet skal være i,kort 3 finnes ikke
  if (type === "1") {
    const req = await fetch(
      "https://api.adtraction.com/v2/affiliate/offers/?token=486DD3496AAA36C1B9D6D7F92C66A3073084E57F",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const res = await req.json();
    if (req.status === 200) {
      const date = new Date(res[0].validTo);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      // const string = "Click here to use your coupon code on checkout";
      // const website = string.link("https://adtr.co/X9ovTH");

      showDetail(
        task,
        res[0].offerCoupon + ": VALID TO: " + `${year}/${month}/${day}`
        //+ " " +
        // website
      );
      startTimer(10, "timer", cost);
    } else {
      return alert("Something went wrong, please try again!");
    }
  } else {
    showDetail(task, `successfully charged ${decodeTask.price}`);
    startTimer(10, "timer", cost);
  }
}

function startTimer(duration, id, cost) {
  var timer = duration,
    minutes,
    seconds;
  var timeIntervalRef = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    document.getElementById(id).innerHTML = minutes + ":" + seconds;
    if (--timer < 0) {
      //purchaseItem(cost);
      clearInterval(timeIntervalRef);
      overlayCoupon.style.display = "none";
    }
  }, 1000);
  purchaseItem(cost);
}

//FIREBASEUSER
firebase.auth().onAuthStateChanged(function (user) {
  reward.innerHTML = "Loading...";
  if (user) {
    reward.innerHTML = "";
    console.log("User online");
    tasks.map((task, index) => {
      const data = JSON.stringify(task);
      reward.innerHTML += `
      <div class="cardshow" data-aos="fade-up"
      data-aos-anchor-placement="center-bottom" onclick="showDetail('${encodeURIComponent(
        data
      )}', null, '${index + 1}')"> 
      <img class="imgclass" src="${task.image}" alt="Avatar">
      <h3>${task.title}</h3>
      <h4> ${task.price}</h4>
      <button class="btncard"> ${task.button} </button>
      </div>
      `;
    });

    // User is signed in.
  } else {
    console.log("noUser");
    reward.innerHTML = "You need to be signed in to see the various offers!";
    window.location.href = "login.html";

    // No user is signed in.
  }
});

/*qari everything
fix showdetails
show me how to add second reklame
fix dates/ time format
divide valid*/

//API from adraction
// var request = new XMLHttpRequest();

// request.open('POST', 'https://api.adtraction.com/v2/affiliate/offers/?token=486DD3496AAA36C1B9D6D7F92C66A3073084E57F');

// request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

// request.onreadystatechange = function () {
//   if (this.readyState === 4) {
//     console.log('Status:', this.status);
//     console.log('Headers:', this.getAllResponseHeaders());
//     console.log('Body:', this.responseText);
//   }
// };

// var body = {
//   'market': 'NO',
//   'programId': 1480334788,
//   'channelId': 1703965087
// };

// request.send(JSON.stringify(body));
