/* In this module, create three classes: Play, Act, and Scene. */
export class Play {
    constructor(play) {
        this.title = play.title; // Assuming there is a title field in play
        this.acts = play.acts.map(act => 
            new Act(act)
        );
    }
    
    // Corrected method definition
    getPlay() {
        return this.title;
    }
    getActs() {
        return this.acts;
    }
}

export class Act {
    constructor(act) {
        this.name = act.name; // Assuming there is a title field in each act
        this.scenes = act.scenes.map(scene => 
            new Scene(scene)
        );
    }
    getAct() {
        return this.name;
    }
    getScenes() {
        return this.scenes;
    }
}

export class Scene {
    constructor(scene) {
        this.name = scene.name; // Assuming there is a title field in each scene
        this.title = scene.title;
        this.direction = scene.stageDirection;
        this.speeches = scene.speeches.map(speech => 
            new Speech(speech) // Changed the recursive call to a new Speech class
        );
    }
    getScene() {
        return this.name;
    }
    getTitle() {
        return this.title
    }
    getDirection() {
        return this.direction
    }
    getSpeeches() {
        return this.name;
    }
}

export class Speech {
    constructor(speech) {
        this.speaker = speech.speaker; // Assuming there is content in each speech
        this.lines = speech.lines;
    }
    getSpeaker() {
        return this.speaker;
    }
    getLines() {
        return this.lines;
    }
}
