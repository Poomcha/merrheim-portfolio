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
    sound_toggler: document.querySelector('.sound'),
  },
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
  },
  sound: {
    on: false,
  },
};
// --------------
//     INIT
// --------------
window.addEventListener('load', () => {
  getWindowDimensions();
  showNavLabels();
  toggleSoundImage();
  // Handle resize
  window.addEventListener('resize', () => {
    state.window.width = getWindowDimensions().width;
    state.window.height = getWindowDimensions().height;
    // Handle navigation
    showNavLabels();
  });
  // Handle sound toggle
  datas.elements.sound_toggler.addEventListener('click', (e) => {
    toggleSound();
    toggleSoundImage();
  });
});
