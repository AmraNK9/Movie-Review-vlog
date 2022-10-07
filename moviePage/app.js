const cardTitle =Array.from(document.querySelectorAll(".card-title"));
const button = document.querySelector("#createPost");
const body = document.querySelector("body")


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
const numberref =ref(db,"post/number");
let value;
const get = (ref)=>{

  onValue(ref,(snap)=>{
    value = snap.val();
    console.log(value);
    return value;
  });
  console.log(value);
  return value;

}
let value2 = get(ref(db,"post/number"));



    let headerText ="Hellow World";
    let Collectiontitle = "Top 3";
    let Text1 = " Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, maiores mollitia molestiae adipisci fugit vero praesentium beatae delectus obcaecati. Voluptatum molestiae et incidunt. A nihil repellat modi repellendus hic vitae?"
    let title = "Her";
    let releaseDate = "2022";
    let quanlityText = "4k";
    let watchHour = "2:20";
    let countStar = "8.9"
    let imageLink = "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg"


    const createColllection = (index)=>{
      
        
          onValue(ref(db,`post/${index}/header`),(snap)=>{

            headerText = snap.val();
        
                  //create card-collection and append to body
            const cardCollectionDiv = document.createElement("div");
            cardCollectionDiv.className+="card text-bg-dark mb-3 card-collection";
            body.append(cardCollectionDiv);

            //create headerDiv and append to card collection div
            const headerDiv = document.createElement("div"); 
            headerDiv.className += "card-header";
            headerDiv.append(headerText);
            cardCollectionDiv.appendChild(headerDiv);

            //create cardBodyDiv
            const cardBodyDiv = document.createElement("div");
            cardBodyDiv.className += "card-body  collection-header";
            cardCollectionDiv.appendChild(cardBodyDiv);
          
            //title 
              let cardTitle;
              onValue(ref(db,`post/${index}/title`),(snap)=>{
              title = snap.val();
           
              cardTitle = document.createElement("h5");
              cardTitle.className += "card-title";
              cardTitle.append(title);
              cardBodyDiv.appendChild(cardTitle);
              cardTitle.addEventListener("click",
              (e)=>{
              let parent =e.target.parentElement;
               
              
              let textOfElement = parent.children[1];
          
              textOfElement.classList.toggle("show")
            });

            onValue(ref(db,`post/${index}/content`),(snap)=>{
              Text1 = snap.val();
              console.log(Text1)
              const cardText = document.createElement("p");
              cardText.className += "card-text card-collection-text";
              
              //create cardBodydiv and append to card collection div
              cardBodyDiv.appendChild(cardText);
              cardText.append(Text1);

              //CREATE Roll Div
              const row = document.createElement("div");
              row.className += " row row-cols-2 row-cols-md-3 g-4";
              cardBodyDiv.appendChild(row);

              //loop Movie in post to pass movie name and img link etc...
              onValue(ref(db,`post/${index}/movieNumber`),(snap)=>{
                let movieNumber = snap.val();
                for(let i=0;i<movieNumber;i++)
                {

                  //create coll div and append to row div
            const col = document.createElement("div");
            col.className += " col";
            row.appendChild(col);
                  
            //create card div and append to col div
            const card = document.createElement("div");
            card.className+= " card";
            col.appendChild(card);
      
            //create img and append to card
            const img = document.createElement("img");
            img.className += " card-img-top";
            onValue(ref(db,`post/${index}/movie${i+1}`),(snap)=>{
              img.dataset["movieLink"] = snap.val();
            })
        
            card.appendChild(img);

            //img eventlistener add
            img.addEventListener("click",(e)=>{
              getlink(e);
            })
  
            //ADD IMG LINK
            onValue(ref(db,`post/${index}/movie${i+1}`),(snap)=>{
              
              let movieheader = snap.val();
              console.log(movieheader);
              onValue(ref(db,`Movie/${movieheader}/image`),(snap)=>{
              let image = snap.val();
              img.setAttribute("src",image);
           
              }
              )
            })
      
      
            //CREATE RATINGBOX AND APPEND TO CARD
            const cardbody = document.createElement("div");
            cardbody.className += " card-body ratingBox";
            card.appendChild(cardbody);
  
            //CREATE MOVIE TITLE AND APPEND TO RATING BOX OR CARDBODY
            const h6 = document.createElement("h6");
            cardbody.appendChild(h6);
            onValue(ref(db,`post/${index}/movie${1+i}`),(snap)=>{
              let movieTitle = snap.val();
              h6.append(movieTitle);
            })
     
  
            //CREATE RELEATEDATE AND APPEND TO MOVIE TITLE
            const span1 = document.createElement("span");
            span1.style.float = "right";
            span1.style.fontSize = "0.7rem";
            h6.appendChild(span1);
  
            //ASSIGN RELEASEDATE VALUE
            onValue(ref(db,`post/${index}/movie${i+1}`),(snap)=>{
              let movieLink = snap.val();
              onValue(ref(db,`Movie/${movieLink}/releaseDate`),(snap1)=>{
                span1.append(snap1.val());
              })
            })
  
      
            //CREATE QUANLITY TEXT AND APPEND TO CARDBODY
            const qText = document.createElement("p");
            qText.className += "qText";
            cardbody.appendChild(qText);
  
          //ASSIGN QUANLLITYTEXT VALUE
          onValue(ref(db,`post/${index}/movie${i+1}`),(snap)=>{
            let movieLink = snap.val();
            onValue(ref(db,`Movie/${movieLink}/resolution`),(snap)=>{
              
              qText.append(snap.val());
            })
          })
        
  
            //create icon box apend to footer box
            const span2 = document.createElement("span");
            span2.style.float = "right";
            qText.appendChild(span2);
  
            //create clockIcon and star Icon for watch hour and rating
            const clockIcon = document.createElement("img");
            clockIcon.className += " icon";
            clockIcon.setAttribute("src","icons/clock.svg");
            const starIcon = document.createElement("img");
            starIcon.className += " icon";
            starIcon.setAttribute("src","icons/star-fill.svg");
  
            //assign value of watch hour and rating
            onValue(ref(db,`post/${index}/movie${i+1}`),(snap)=>{
              let movieLink = snap.val();
              onValue(ref(db,`Movie/${movieLink}/hour`),(snap1)=>{
                span2.appendChild(clockIcon);
                span2.append(snap1.val());
                onValue(ref(db,`Movie/${movieLink}/rating`),(snap2)=>{
                  span2.appendChild(starIcon);
                  span2.append(snap2.val());
                })
              })
            })
            }
              })
             
        })
      })
    })
  }
const loadFunction = ()=>{
  onValue(ref(db,"Movie/Titanic"),(snap)=>{
    console.log(snap.val());
  })
  onValue(ref(db,"post/number"),(snap)=>{
    let number = snap.val();
    for(let i=0;i<number;i++){
      createColllection(i+1);
    }
  })

} 
function getlink(e){
 let movieL = e.target.dataset["movieLink"];
 localStorage.setItem("movieId",movieL);
window.location.assign("contentPage/index.html");
}

loadFunction();
