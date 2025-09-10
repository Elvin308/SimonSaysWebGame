export class MusicPlayer{
    constructor(){
        this.currentAudio = null;
        this.cache = {};
    }

    preload(audio){
        audio.forEach(src => {
            let sound = new Audio(src);
            sound.preload = 'auto';
            sound.load();
            this.cache[src] = sound;
        });
    }

    play(audio){
        //If there is already an audio playing then pause it
        if(this.currentAudio != null){
            this.currentAudio.pause();
        }

        //Set new audio and play it
        console.log(this.cache[audio]);
        this.currentAudio = (this.cache[audio] != null ? this.cache[audio] : new Audio(audio));
        this.currentAudio.play();
    }

    stop(){
        if(this.currentAudio != null){
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
        }
    }
}