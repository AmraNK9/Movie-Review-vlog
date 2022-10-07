



// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxxHn6NDNItRduRZMX1QtgliixVs_TexY",
  authDomain: "movie-review-vlog.firebaseapp.com",
  databaseURL: "https://movie-review-vlog-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "movie-review-vlog",
  storageBucket: "movie-review-vlog.appspot.com",
  messagingSenderId: "409451842285",
  appId: "1:409451842285:web:9a24d36801247168f0dae4",
  measurementId: "G-HL0Z3Y1F8K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import { getDatabase, ref, onValue} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";

const db = getDatabase();

//INstall dom
const coppyBtn = document.querySelector("#coppyBtn")
const img = document.querySelector("img");
const p = document.querySelector("#youtubelink")
const topTitle = document.querySelector("#topTitle");
const linkTitles = Array.from(document.querySelectorAll(".linkTitle"));
const ratingBox = document.querySelector("#ratingBox");

const watchHourBox = document.querySelector("#watchHour");
const releaseDateBox = document.querySelector("#releaseDate");
const summaryTitle = document.querySelector("#summaryTitle");
const summaryContent = document.querySelector("#summaryContent");
const movieIframe = document.querySelector("#movieIframe");

const cardTitle =Array.from(document.querySelectorAll(".card-title"));
const button = document.querySelector("#createPost");
const body = document.querySelector("body")

//function install
const CoppyerFunction = ()=>{
  p.select();
  document.execCommand("Copy");
};

//add eventListener for coppy button
coppyBtn.addEventListener("click",()=>{
  CoppyerFunction();
});

//for adding event in download links
linkTitles.forEach(
  (linkTitle)=>{
    linkTitle.addEventListener("click",(e)=>{
      let parent=e.target.parentElement;
      let linkContent=parent.children[1];
      linkContent.classList.toggle("show");
    })
  }
);

//assign photo
let movieId=localStorage.getItem("movieId");
onValue(ref(db,`Movie/${movieId}/image`),(snap)=>{
  let coverPhoto = snap.val();
  img.setAttribute("src",coverPhoto);
});

//assign title
onValue(ref(db,`Movie/${movieId}/title`),(snap)=>{
  let title = snap.val();
  topTitle.innerHTML = title;
  summaryTitle.innerHTML = title;
});

//assign rating
onValue(ref(db,`Movie/${movieId}/rating`),(snap)=>{
  let rating = snap.val();
  ratingBox.innerHTML = rating;
});



//assign watchhour
onValue(ref(db,`Movie/${movieId}/hour`),(snap)=>{
  let hour = snap.val();
  watchHourBox.innerHTML = hour;
});

//assign releaseDate
onValue(ref(db,`Movie/${movieId}/releaseDate`),(snap)=>{
let releaseDate = snap.val();
releaseDateBox.innerHTML = releaseDate;
});

//assign summary
onValue(ref(db,`Movie/${movieId}/summary`),(snap)=>{
  let summary = snap.val();
  summaryContent.innerHTML = summary;
})

//assign movieiframe src
onValue(ref(db,`Movie/${movieId}/youtubeLink`),(snap)=>{
  let movieLink = snap.val();
  
  movieIframe.setAttribute("src",movieLink);

})

//assign downloadLind from youtube
onValue(ref(db,`Movie/${movieId}/downloadLinkY`),(snap)=>{
  let movieLink = snap.val();
  

  p.append(movieLink)
})