import {sendToMatrix, doesPlayerWon} from "./game-script.js";

const squares = document.querySelectorAll(".square");
const newGameButton = document.querySelector("#newGame");
let result = document.querySelector("#result");
let actualPlayer = "USA";

function addUSAMarker(){
  let usaFlag = document.createElement("img");
  usaFlag.src = "../icons/usa-flag.png";
  usaFlag.alt = "Jogador representado pela bandeira dos Estados Unidos";
  usaFlag.classList.add("player");
  
  return usaFlag;
}

function addURSSMarker(){
  let urssFlag = document.createElement("img");
  urssFlag.src = "../icons/urss-flag.png";
  urssFlag.alt = "Jogador representado pela bandeira da União Soviética";
  urssFlag.classList.add("player");
  
  return urssFlag;
}

function removeClick(el){
  el.removeEventListener("click", clickEvent, true);
}

function addMarker(element){
  if(actualPlayer === "URSS"){
    element.appendChild(addUSAMarker());
    actualPlayer = "USA";
  }else{
    element.appendChild(addURSSMarker());
    actualPlayer = "URSS";
  }
  removeClick(element);
}

function clickEvent(event){
  addMarker(event.target);
  sendToMatrix([event.target, actualPlayer]);
  if(doesPlayerWon([event.target, actualPlayer])){
   squares.forEach(removeClick); 
  }
}

squares.forEach(el => {
  el.addEventListener("click", clickEvent, true);
});

newGame.addEventListener("click", event => window.location.reload());