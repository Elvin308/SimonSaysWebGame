export class SongLibrary{
    constructor(){
        this.song = {
            blue: "sounds/blue.mp3",
            green: "sounds/green.mp3",
            red: "sounds/red.mp3",
            yellow: "sounds/yellow.mp3",
            wrong: "sounds/wrong.mp3"
        };
    }

    getSong(name){
        return this.song[name];
    }

    getAll(){
        return Object.values(this.song);
    }
}