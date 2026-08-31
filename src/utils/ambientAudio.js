/**
 * Web Audio API Ambient Sound Generator
 * Generates rich, relaxing procedural white noise and nature soundscapes:
 * - Rain (Filtered Pink Noise with droplet transients)
 * - Ocean Waves (Modulated Low-Pass Noise)
 * - Campfire (Crackling bursts + warm low rumble)
 * - White / Brown Noise (Deep relaxing focus frequency)
 * - Forest Birds (Procedural frequency chirps)
 * - Meditation Tibetan Singing Bowl (Harmonic sine waves with exponential decay)
 */

class AmbientSoundEngine {
  constructor() {
    this.audioCtx = null;
    this.currentSound = null;
    this.gainNode = null;
    this.activeNodes = [];
    this.volume = 0.5;
    this.isPlaying = false;
    this.soundType = null;
    this.intervalIds = [];
  }

  _initContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.gainNode && this.audioCtx) {
      this.gainNode.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
    }
  }

  stop() {
    this.intervalIds.forEach(id => clearInterval(id));
    this.intervalIds = [];

    this.activeNodes.forEach(node => {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch (e) {}
    });
    this.activeNodes = [];
    this.isPlaying = false;
    this.soundType = null;
  }

  play(type) {
    this._initContext();
    if (!this.audioCtx) return;

    // If already playing this type, toggle off
    if (this.isPlaying && this.soundType === type) {
      this.stop();
      return;
    }

    this.stop();

    const masterGain = this.audioCtx.createGain();
    masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
    masterGain.connect(this.audioCtx.destination);
    this.gainNode = masterGain;

    this.isPlaying = true;
    this.soundType = type;

    switch (type) {
      case 'rain':
        this._generateRain(masterGain);
        break;
      case 'ocean':
        this._generateOcean(masterGain);
        break;
      case 'campfire':
        this._generateCampfire(masterGain);
        break;
      case 'whitenoise':
        this._generateBrownNoise(masterGain);
        break;
      case 'forest':
        this._generateForest(masterGain);
        break;
      case 'bowl':
        this._generateSingingBowl(masterGain);
        break;
      default:
        this._generateBrownNoise(masterGain);
        break;
    }
  }

  _createNoiseBuffer(seconds = 5) {
    const bufferSize = this.audioCtx.sampleRate * seconds;
    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  // Rain: Filtered Pink/Brown Noise + Droplet Crackles
  _generateRain(destination) {
    const noiseBuffer = this._createNoiseBuffer(4);
    const noise = this.audioCtx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, this.audioCtx.currentTime);

    const highPass = this.audioCtx.createBiquadFilter();
    highPass.type = 'highpass';
    highPass.frequency.setValueAtTime(300, this.audioCtx.currentTime);

    const rainGain = this.audioCtx.createGain();
    rainGain.gain.setValueAtTime(0.35, this.audioCtx.currentTime);

    noise.connect(highPass);
    highPass.connect(filter);
    filter.connect(rainGain);
    rainGain.connect(destination);

    noise.start();
    this.activeNodes.push(noise, filter, highPass, rainGain);
  }

  // Ocean Waves: Modulated Lowpass Filtered Noise (Swells)
  _generateOcean(destination) {
    const noiseBuffer = this._createNoiseBuffer(6);
    const noise = this.audioCtx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, this.audioCtx.currentTime);

    // LFO to swell waves every ~6 seconds
    const lfo = this.audioCtx.createOscillator();
    lfo.frequency.setValueAtTime(0.15, this.audioCtx.currentTime); // ~6.6s cycle
    const lfoGain = this.audioCtx.createGain();
    lfoGain.gain.setValueAtTime(350, this.audioCtx.currentTime);

    lfo.connect(filter.frequency);

    const oceanGain = this.audioCtx.createGain();
    oceanGain.gain.setValueAtTime(0.6, this.audioCtx.currentTime);

    noise.connect(filter);
    filter.connect(oceanGain);
    oceanGain.connect(destination);

    noise.start();
    lfo.start();
    this.activeNodes.push(noise, lfo, filter, lfoGain, oceanGain);
  }

  // Campfire: Warm low rumble with random pops/crackles
  _generateCampfire(destination) {
    const noiseBuffer = this._createNoiseBuffer(4);
    const noise = this.audioCtx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(500, this.audioCtx.currentTime);

    const fireGain = this.audioCtx.createGain();
    fireGain.gain.setValueAtTime(0.3, this.audioCtx.currentTime);

    noise.connect(filter);
    filter.connect(fireGain);
    fireGain.connect(destination);
    noise.start();

    // Crackle generator
    const crackleInterval = setInterval(() => {
      if (!this.isPlaying || !this.audioCtx) return;
      if (Math.random() > 0.4) {
        const osc = this.audioCtx.createOscillator();
        const g = this.audioCtx.createGain();
        osc.frequency.setValueAtTime(600 + Math.random() * 1200, this.audioCtx.currentTime);
        g.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.05);

        osc.connect(g);
        g.connect(destination);
        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.05);
      }
    }, 120);

    this.intervalIds.push(crackleInterval);
    this.activeNodes.push(noise, filter, fireGain);
  }

  // Deep Brown/White Noise for Focus
  _generateBrownNoise(destination) {
    const bufferSize = this.audioCtx.sampleRate * 5;
    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5; // boost gain
    }

    const noise = this.audioCtx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const noiseGain = this.audioCtx.createGain();
    noiseGain.gain.setValueAtTime(0.4, this.audioCtx.currentTime);

    noise.connect(noiseGain);
    noiseGain.connect(destination);
    noise.start();

    this.activeNodes.push(noise, noiseGain);
  }

  // Forest & Birds: Gentle breeze + procedural birdsong chirps
  _generateForest(destination) {
    const noiseBuffer = this._createNoiseBuffer(5);
    const noise = this.audioCtx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, this.audioCtx.currentTime);

    const windGain = this.audioCtx.createGain();
    windGain.gain.setValueAtTime(0.2, this.audioCtx.currentTime);

    noise.connect(filter);
    filter.connect(windGain);
    windGain.connect(destination);
    noise.start();

    // Birds chirping randomly
    const birdInterval = setInterval(() => {
      if (!this.isPlaying || !this.audioCtx) return;
      if (Math.random() > 0.5) {
        const osc = this.audioCtx.createOscillator();
        const g = this.audioCtx.createGain();
        const startFreq = 2200 + Math.random() * 800;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(startFreq, this.audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(startFreq + 600, this.audioCtx.currentTime + 0.1);
        osc.frequency.exponentialRampToValueAtTime(startFreq - 200, this.audioCtx.currentTime + 0.25);

        g.gain.setValueAtTime(0.04, this.audioCtx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.25);

        osc.connect(g);
        g.connect(destination);
        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.25);
      }
    }, 1800);

    this.intervalIds.push(birdInterval);
    this.activeNodes.push(noise, filter, windGain);
  }

  // Tibetan Singing Bowl Harmonic Chime
  _generateSingingBowl(destination) {
    const playChime = () => {
      if (!this.isPlaying || !this.audioCtx) return;
      const baseFreq = 261.63; // C4
      const harmonics = [1, 2.76, 5.4, 8.93];
      const gains = [0.15, 0.08, 0.04, 0.02];

      harmonics.forEach((h, i) => {
        const osc = this.audioCtx.createOscillator();
        const g = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseFreq * h, this.audioCtx.currentTime);

        g.gain.setValueAtTime(gains[i] * 0.8, this.audioCtx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 6.0);

        osc.connect(g);
        g.connect(destination);
        osc.start();
        osc.stop(this.audioCtx.currentTime + 6.0);
      });
    };

    playChime();
    const chimeInterval = setInterval(playChime, 7000);
    this.intervalIds.push(chimeInterval);
  }
}

export const ambientAudio = new AmbientSoundEngine();
