/* In this module, create three classes: Play, Act, and Scene. */
export class Play{
constructor(acts){
    this.acts = acts.map(act => 
        new Act(act.scenes)
    );
    }
    
}
export class Act{
    constructor(scenes){
        this.scenes = scenes.map(scene => 
            new Scene(scene.speeches)
        );
    }
}
export class Scene{
    constructor(speeches){
        this.speeches = speeches;
    }
}
