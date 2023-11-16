import Sound from '../sound/sound.js';
class AudioEngine {
    audioContext;
    sounds;
    findSound = (name) => this.sounds.find((sound) => sound.name === name);
    constructor() {
        this.audioContext = new AudioContext();
        this.sounds = [];
    }
    registerSound(soundData) {
        const soundInstance = this.findSound(soundData.name);
        if (soundInstance) {
            console.log(`Sound's name ${soundData.name} already exists, please choose another name.`);
            return;
        }
        const sound = new Sound(soundData.name, soundData.source, soundData.loop, this.audioContext);
        this.sounds.push(sound);
    }
    playSound(name) {
        const sound = this.findSound(name);
        if (sound) {
            sound.play();
        }
        else {
            console.log(`Sound ${name} not found.`);
        }
    }
    stopSound(name) {
        const sound = this.findSound(name);
        if (sound) {
            sound.stop();
        }
        else {
            console.log(`Sound ${name} not found.`);
        }
    }
    pauseSound(name) {
        const sound = this.findSound(name);
        if (sound) {
            sound.pause();
        }
        else {
            console.log(`Sound ${name} not found.`);
        }
    }
    resumeSound(name) {
        const sound = this.findSound(name);
        if (sound) {
            sound.resume();
        }
        else {
            console.log(`Sound ${name} not found.`);
        }
    }
    muteSound(name) {
        const sound = this.findSound(name);
        if (sound) {
            sound.mute();
        }
        else {
            console.log(`Sound ${name} not found.`);
        }
    }
    unmuteSound(name) {
        const sound = this.findSound(name);
        if (sound) {
            sound.unmute();
        }
        else {
            console.log(`Sound ${name} not found.`);
        }
    }
    removeSound(name) {
        const soundIndex = this.sounds.findIndex((sound) => sound.name === name);
        if (soundIndex !== -1) {
            this.sounds.splice(soundIndex, 1);
        }
        else {
            console.log(`Sound ${name} not found.`);
        }
    }
}
export default AudioEngine;
