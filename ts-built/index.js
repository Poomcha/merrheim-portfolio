import AudioEngine from './scripts/simple-audio-engine/audioengine/audioengine.js';
// --------------
//     UTILS
// --------------
// Variables
const datas = {
    breakpoints: {
        xs: 320,
        s: 480,
        m: 640,
        l: 800,
        xl: 960,
        xxl: 1120,
    },
    text: {
        nav: {
            accueil: 'ACCUEIL',
            aproposdemoi: 'A PROPOS DE MOI',
            projets: 'PROJETS',
            contact: 'CONTACT',
        },
    },
    elements: {
        content: document.querySelector('.content'),
        mute: document.querySelector('#mute'),
        play_pause: document.querySelector('#pause'),
        loader: {
            container: document.querySelector('.loader'),
            logo: document.querySelector('.loader__logo'),
        },
    },
    sounds: [
        {
            name: 'mainLoop',
            source: './public/sounds/loop.opus',
            loop: true,
        },
        {
            name: 'hover',
            source: './public/sounds/hover.opus',
            loop: false,
        },
        {
            name: 'click',
            source: './public/sounds/click.opus',
            loop: false,
        },
        {
            name: 'scroll',
            source: './public/sounds/scroll.opus',
            loop: false,
        },
        {
            name: 'slide',
            source: './public/sounds/slide.opus',
            loop: false,
        },
    ],
};
// Window size tracking
const getWindowDimensions = () => ({
    width: window.innerWidth,
    height: window.innerHeight,
});
// Navigation labels visibility
const showNavLabels = () => {
    const label_accueil = document.querySelector('#label-accueil');
    const label_aproposdemoi = document.querySelector('#label-aproposdemoi');
    const label_projets = document.querySelector('#label-projets');
    const label_contact = document.querySelector('#label-contact');
    if (window.innerWidth > datas.breakpoints.s) {
        label_accueil.innerHTML = datas.text.nav.accueil;
        label_aproposdemoi.innerHTML = datas.text.nav.aproposdemoi;
        label_projets.innerHTML = datas.text.nav.projets;
        label_contact.innerHTML = datas.text.nav.contact;
    }
    else {
        [label_accueil, label_aproposdemoi, label_projets, label_contact].forEach((label) => (label.innerHTML = ''));
    }
};
// Toggle mute
const toggleMute = () => {
    state.sound.on = !state.sound.on;
};
// Toggle play
const togglePLay = () => {
    state.sound.play = !state.sound.play;
};
// Toggle mute image
const toggleMuteImage = () => {
    const img_toggler = document.querySelector('#sound-toggler');
    if (state.sound.on) {
        img_toggler.setAttribute('src', './public/images/icons/volume-on.svg');
    }
    else {
        img_toggler.setAttribute('src', './public/images/icons/volume-off.svg');
    }
};
// Toggle play image
const togglePlayImage = () => {
    const img_toggler = document.querySelector('#loop-control');
    if (state.sound.play) {
        img_toggler.setAttribute('src', './public/images/icons/pause.svg');
    }
    else {
        img_toggler.setAttribute('src', './public/images/icons/play.svg');
    }
};
// --------------
//     STATE
// --------------
const state = {
    window: {
        width: getWindowDimensions().width,
        height: getWindowDimensions().height,
        loading: true,
    },
    sound: {
        on: false,
        play: true,
    },
};
// --------------
//     INIT
// --------------
// Loading
// Create Sound Context
let audioEngine;
const createSoundContext = () => {
    audioEngine = new AudioEngine();
    // Register all sounds from datas.
    datas.sounds.forEach((sound) => audioEngine.registerSound(sound));
};
// Loaded
window.addEventListener('DOMContentLoaded', () => {
    getWindowDimensions();
    showNavLabels();
    toggleMuteImage();
    togglePlayImage();
    window.addEventListener('load', () => {
        // Cancel loader
        // Handle resize
        window.addEventListener('resize', () => {
            state.window.width = getWindowDimensions().width;
            state.window.height = getWindowDimensions().height;
            // Handle navigation
            showNavLabels();
        });
        // Start the musicness
        createSoundContext();
        audioEngine.connectMaster();
        // Handle sound toggle
        if (datas.elements.mute) {
            datas.elements.mute.addEventListener('click', () => {
                // Make sure autoplay works.
                audioEngine.resumeCtx();
                toggleMute();
                toggleMuteImage();
                if (state.sound.on) {
                    audioEngine.playSound('mainLoop');
                }
                else {
                    audioEngine.stopSound('mainLoop');
                }
            });
        }
        if (datas.elements.play_pause) {
            datas.elements.play_pause.addEventListener('click', () => {
                // Make sure autoplay works.
                audioEngine.resumeCtx();
                togglePLay();
                togglePlayImage();
                if (state.sound.on) {
                    if (state.sound.play) {
                        audioEngine.playSound('mainLoop');
                    }
                    else {
                        audioEngine.stopSound('mainLoop');
                    }
                }
            });
        }
        // Handle players.
        // const players = document.querySelectorAll('.player');
        // Handle sounds on video playback.
        // players.forEach((iframe) => {
        //   console.log(iframe);
        //   iframe.addEventListener('click', () => {
        //     if (state.sound.on) {
        //       toggleSound();
        //       toggleSoundImage();
        //       datas.sounds.forEach((sound) => {
        //         audioEngine.stopSound(sound.name);
        //       });
        //     }
        //   });
        // });
    });
    // --------------
    //     TESTS
    // --------------
});
