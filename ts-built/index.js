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
    sound_toggler: document.querySelector('.sound'),
    loader: {
      container: document.querySelector('.loader'),
      logo: document.querySelector('.loader__logo'),
    },
  },
  sounds: [
    {
      name: 'mainLoop',
      source: './public/sounds/AMB_ForestRiver_LP.ogg',
      loop: true,
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
  } else {
    [label_accueil, label_aproposdemoi, label_projets, label_contact].forEach(
      (label) => (label.innerHTML = '')
    );
  }
};
// Toggle sound
const toggleSound = () => {
  state.sound.on = !state.sound.on;
};
// Toggle sound image
const toggleSoundImage = () => {
  const img_toggler = document.querySelector('#sound-toggler');
  if (state.sound.on) {
    img_toggler.setAttribute('src', './public/images/icons/volume-on.svg');
  } else {
    img_toggler.setAttribute('src', './public/images/icons/volume-off.svg');
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
  },
};
// --------------
//     INIT
// --------------
// Loading
// anime({
//   targets: datas.elements.loader.logo,
//   keyframes: [
//     { translateY: (state.window.height + 200) / 2 },
//     {
//       opacity: 0,
//       duration: 2800,
//       easing: 'easeOutExpo',
//     },
//   ],
//   autoplay: true,
// });
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
  toggleSoundImage();
  window.addEventListener('load', () => {
    // Cancel loader
    setTimeout(() => {
      state.window.loading = false;
      // anime({
      //   targets: datas.elements.content,
      //   keyframes: [{ opacity: 1, duration: 1800, easing: 'easeOutExpo' }],
      // });
      if (datas.elements.loader.container) {
        datas.elements.loader.container.style.display = 'none';
      }
    }, 1800);
    // Handle resize
    window.addEventListener('resize', () => {
      state.window.width = getWindowDimensions().width;
      state.window.height = getWindowDimensions().height;
      // Handle navigation
      showNavLabels();
    });
    // Start the musicness
    createSoundContext();
    // Handle sound toggle
    if (datas.elements.sound_toggler) {
      datas.elements.sound_toggler.addEventListener('click', () => {
        toggleSound();
        toggleSoundImage();
        if (state.sound.on) {
          audioEngine.playSound('mainLoop');
          // audioEngine.unmuteSound('mainLoop');
        } else {
          // audioEngine.muteSound('mainLoop');
          audioEngine.stopSound('mainLoop');
        }
      });
    }
  });
  // --------------
  //     TESTS
  // --------------
});
