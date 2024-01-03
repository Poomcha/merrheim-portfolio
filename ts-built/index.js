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
        },
    },
    elements: {
        content: document.querySelector('.content'),
        scrollables: document.querySelectorAll('.section__content'),
        mute: document.querySelector('#mute'),
        play_pause: document.querySelector('#pause'),
        loader: {
            container: document.querySelector('.loader'),
            logo: document.querySelector('.loader__logo'),
        },
        nav_links: document.querySelectorAll('.nav__links__ctn__link'),
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
    if (window.innerWidth > datas.breakpoints.s) {
        label_accueil.innerHTML = datas.text.nav.accueil;
        label_aproposdemoi.innerHTML = datas.text.nav.aproposdemoi;
        label_projets.innerHTML = datas.text.nav.projets;
    }
    else {
        [label_accueil, label_aproposdemoi, label_projets].forEach((label) => (label.innerHTML = ''));
    }
};
// Hide navigation hash
const hideNavigationHash = () => {
    const location = window.location;
    if (location.hash) {
        history.pushState('', document.title, window.location.pathname);
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
// Check for state.sound.on
const checkMute = (func) => {
    const P = new Promise((resolve, reject) => {
        if (state.sound.on) {
            resolve(func);
        }
        else {
            reject();
        }
    });
    P.then((func) => func()).catch(() => { });
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
        // Handle hash hiding
        window.addEventListener('hashchange', hideNavigationHash);
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
                if (state.sound.on && state.sound.play) {
                    audioEngine.playSound('mainLoop');
                }
                else {
                    audioEngine.stopSound('mainLoop');
                }
            });
        }
        if (datas.elements.play_pause) {
            datas.elements.play_pause.addEventListener('click', (e) => {
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
        // Handle click sound
        window.addEventListener('click', () => {
            checkMute(() => audioEngine.playSound('click'));
        });
        // Handle slide sound
        const links = document.querySelectorAll('.nav__links__ctn__link');
        links.forEach((link) => link.addEventListener('click', (e) => {
            e.stopPropagation();
            checkMute(() => audioEngine.playSound('slide'));
        }));
        // Handle scroll sound
        let ticking = false;
        datas.elements.scrollables.forEach((scrollable) => {
            scrollable.addEventListener('scroll', () => {
                if (!ticking) {
                    checkMute(() => audioEngine.playSound('scroll'));
                }
                ticking = true;
            });
            scrollable.addEventListener('scrollend', () => {
                ticking = false;
            });
        });
        // Handle hover sound
        const hoverables = document.querySelectorAll('.external-link');
        hoverables.forEach((hoverable) => {
            hoverable.addEventListener('mouseover', () => {
                checkMute(() => audioEngine.playSound('hover'));
            });
        });
        // Handle players.
        const players = document.querySelectorAll('.player');
        // Handle sounds on video playback.
        players.forEach((player) => {
            // player.addEventListener('load', () => {
            // });
        });
    });
    // --------------
    //     TESTS
    // --------------
});
