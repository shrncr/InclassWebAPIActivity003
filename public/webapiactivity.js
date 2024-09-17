

import {Play, Act, Scene} from "./play-module.js";
document.addEventListener("DOMContentLoaded", function() {
   const url = 'https://www.randyconnolly.com//funwebdev/3rd/api/shakespeare/play.php';
   let plays = document.getElementById("playList");
   let playSect = document.getElementById("playHere");
   let actSection = playSect.querySelector("article");

   plays.addEventListener("change", (e)=>{
      console.log(e);
      fetch(url + `?name=${e.target.value}`)
         .then(res => res.json())
         .then(data =>{
            playSect.querySelector("h2").innerHTML = data.title;

            let acts = data.acts;
            let play = new Play(data.acts);
            console.log(play.acts);
            
            actSection.querySelector("h3").innerHTML = data.acts[1].name;
            
         })
   }
   );
	
	

   /*
     To get a specific play, add play name via query string, 
	   e.g., url = url + '?name=hamlet';
	 
	 https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=hamlet
	 https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=jcaesar
     
   */
	 
   
    /* note: you may get a CORS error if you test this locally (i.e., directly from a
       local file). To work correctly, this needs to be tested on a local web server.  
       Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
       use built-in Live Preview.
    */
});