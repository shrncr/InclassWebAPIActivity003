
import { Play, Act, Scene } from "./play-module.js";

document.addEventListener("DOMContentLoaded", function () {
    const url = 'https://www.randyconnolly.com//funwebdev/3rd/api/shakespeare/play.php';
    
    const playList = document.getElementById("playList");
    const actList = document.getElementById("actList");
    const sceneList = document.getElementById("sceneList");
    const playSect = document.getElementById("playHere");
    const actSection = document.getElementById("actHere");
    const sceneDiv = document.getElementById("sceneHere");

    playList.addEventListener("change", (e) => {
      const selectedPlay = e.target.value;

      // Check if the play data is already in localStorage
      let storedPlay = localStorage.getItem(selectedPlay);
      
      if (storedPlay) {
          // Parse the stored play data
          let play = new Play(JSON.parse(storedPlay));
          let acts = play.getActs();

          // Populate the act list
          populateActList(acts);

          // Default to Act 1 and Scene 1
          populateSceneList(acts[0].scenes);
          loadScene(acts[0].scenes[0]); // Load default Act 1, Scene 1

          playSect.querySelector("h2").innerHTML = play.getPlay();
          actSection.querySelector("h3").innerHTML = acts[0].getAct();
      } else {
          // Fetch the play data from the API if it's not in localStorage
          fetch(url + `?name=${selectedPlay}`)
              .then(res => res.json())
              .then(data => {
                  let play = new Play(data);
                  let acts = play.getActs();

                  // Store the play data in localStorage
                  localStorage.setItem(selectedPlay, JSON.stringify(data));

                  // Populate the act list
                  populateActList(acts);

                  // Default to Act 1 and Scene 1
                  populateSceneList(acts[0].scenes);
                  loadScene(acts[0].scenes[0]); // Load default Act 1, Scene 1

                  playSect.querySelector("h2").innerHTML = play.getPlay();
                  actSection.querySelector("h3").innerHTML = acts[0].getAct();
              });
      }
  });

    // Populate the act list
    function populateActList(acts) {
        actList.innerHTML = '';

        acts.forEach((act, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = act.getAct();
            actList.appendChild(option);
        });

        actList.selectedIndex = 0;
        actList.addEventListener("change", () => {
            const selectedAct = acts[actList.value];
            actSection.querySelector("h3").innerHTML = selectedAct.getAct();
            populateSceneList(selectedAct.scenes);
            loadScene(selectedAct.scenes[0]); // Default to Scene 1 in the selected act
        });
    }

    // Populate the scene list
    function populateSceneList(scenes) {
        sceneList.innerHTML = '';

        scenes.forEach((scene, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = scene.getScene();
            sceneList.appendChild(option);
        });

        sceneList.selectedIndex = 0;
        sceneList.addEventListener("change", () => {
            const selectedScene = scenes[sceneList.value];
            loadScene(selectedScene);
        });
    }

    // Function to load a scene
    function loadScene(scene) {
        // Populate scene name, title, and stage direction
        sceneDiv.querySelector("h4").textContent = scene.getScene();
        sceneDiv.querySelector(".title").textContent = scene.getTitle();
        sceneDiv.querySelector(".direction").textContent = scene.getDirection();

        // Clear existing speeches
        const existingSpeeches = sceneDiv.querySelectorAll(".speech");
        existingSpeeches.forEach(speech => speech.remove());

        // Populate speeches
        scene.speeches.forEach(speech => {
            const speechDiv = document.createElement("div");
            speechDiv.classList.add("speech");

            // Speaker name
            const speakerSpan = document.createElement("span");
            speakerSpan.textContent = speech.getSpeaker();
            speechDiv.appendChild(speakerSpan);

            // Speech lines
            speech.getLines().forEach(line => {
                const lineP = document.createElement("p");
                lineP.textContent = line;
                speechDiv.appendChild(lineP);
            });

            // Append the speech to the scene
            sceneDiv.appendChild(speechDiv);
        });
    }


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