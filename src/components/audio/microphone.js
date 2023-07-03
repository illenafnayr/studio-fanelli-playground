export class Microphone {
    constructor(fftSize) {
        this.initialized = false;
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            this.audioContext = new AudioContext();
            this.microphone = this.audioContext.createMediaStreamSource(stream);
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = fftSize;
            const bufferLength = this.analyser.frequencyBinCount;
            this.dataArray = new Uint8Array(bufferLength);
            this.microphone.connect(this.analyser);
            this.initialized = true;
        }).catch((err) => {
            alert(err)
        });
    }
    getSamples() {
        this.analyser.getByteTimeDomainData(this.dataArray);
        let normalizedSamples = [...this.dataArray].map(e => e/128 - 1);
        return normalizedSamples;
    }
    getVolume() {
        this.analyser.getByteTimeDomainData(this.dataArray);
        let normalizedSamples = [...this.dataArray].map(e => e/128 - 1);
        let sum = 0;

        for (let i = 0; i < normalizedSamples.length; i++) {
            sum += normalizedSamples[i] * normalizedSamples[i];
        }
        let volume = Math.sqrt(sum / normalizedSamples.length);
        return volume;
    }
}