class Sound {
    name;
    source;
    loop;
    audioContext;
    masterGain;
    sourceNode = undefined;
    gainNode = undefined;
    constructor(name, source, loop, audioContext, masterGain) {
        this.name = name;
        this.source = source;
        this.loop = loop;
        this.audioContext = audioContext;
        this.masterGain = masterGain;
        this.name = name;
        this.source = source;
        this.loop = loop;
        this.audioContext = audioContext;
        this.masterGain = masterGain;
    }
    async loadSound() {
        const response = await fetch(this.source);
        const audioData = await response.arrayBuffer();
        return this.audioContext.decodeAudioData(audioData);
    }
    play() {
        this.loadSound().then((audioBuffer) => {
            this.sourceNode = this.audioContext.createBufferSource();
            this.sourceNode.buffer = audioBuffer;
            this.sourceNode.loop = this.loop;
            this.sourceNode.connect(this.masterGain);
            this.sourceNode.connect(this.audioContext.destination);
            this.sourceNode.start(0);
        });
    }
    stop() {
        if (this.sourceNode) {
            this.sourceNode.stop(0);
        }
    }
    pause() {
        if (this.sourceNode) {
            if (this.audioContext.currentTime !== 0) {
                this.sourceNode.stop(this.audioContext.currentTime);
            }
            else {
                this.sourceNode.stop();
            }
        }
    }
    resume() {
        if (this.sourceNode) {
            if (this.audioContext.currentTime !== 0) {
                this.sourceNode.start(this.audioContext.currentTime);
            }
            else {
                this.sourceNode.start();
            }
        }
    }
    mute() {
        if (this.sourceNode) {
            if (!this.gainNode) {
                this.gainNode = this.audioContext.createGain();
                this.sourceNode.connect(this.gainNode);
                this.gainNode.connect(this.audioContext.destination);
            }
            this.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        }
    }
    unmute() {
        if (this.gainNode) {
            if (!this.gainNode) {
                this.gainNode = this.audioContext.createGain();
                this.sourceNode.connect(this.gainNode);
                this.gainNode.connect(this.audioContext.destination);
            }
            this.gainNode.gain.setValueAtTime(1, this.audioContext.currentTime);
        }
    }
    setLoop(loop) {
        this.loop = loop;
        if (this.sourceNode) {
            this.sourceNode.loop = loop;
        }
    }
}
export default Sound;
