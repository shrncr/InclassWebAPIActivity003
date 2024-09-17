/* In this module, create three classes: Play, Act, and Scene. */
class Play{
constructor(acts){
    this.acts = acts.map(act => 
        new Act(act.scenes)
    );
    }
    
}
class Act{
    constructor(scenes){
        this.scenes = scenes.map(scene => 
            new Scene(scene.speeches)
        );
    }
}
class Scene{
    constructor(speeches){

    }
}