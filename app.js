/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function openMenu() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  //Toggle SearchBar Hiding
  let isHidden = true;
  let SearchBar = document.querySelector(".searchBar");;
function togleSearchBar(){
  
SearchBar.classList.toggle("hidden")

}
//Hidding SearchBar out of it
window.onclick = (e)=>{
 
  if(!e.target.matches(".searchBarbtn")&&!e.target.matches("#searchBar")){
    if(!SearchBar.classList.contains("hidden")){
      SearchBar.classList.add("hidden");
    }
  }
}



