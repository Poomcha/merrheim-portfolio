// --------------
//     UTILS
// --------------
// Variables
const DATA = {
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
  sounds: [
    {
      name: 'mainLoop',
      source: './public/sounds/loop.opus',
      loop: true,
      html5: false,
      autoplay: true,
      mute: true,
    },
    {
      name: 'hover',
      source: './public/sounds/hover.opus',
      loop: false,
      html5: false,
      autoplay: false,
      mute: true,
    },
    {
      name: 'click',
      source: './public/sounds/click.opus',
      loop: false,
      html5: false,
      autoplay: false,
      mute: true,
    },
    {
      name: 'scroll',
      source: './public/sounds/scroll.opus',
      loop: false,
      html5: false,
      autoplay: false,
      mute: true,
    },
    {
      name: 'slide',
      source: './public/sounds/slide.opus',
      loop: false,
      html5: false,
      autoplay: false,
      mute: true,
    },
  ],
  projects: [
    {
      id: 0,
      src: 'https://www.youtube.com/embed/Vd0KYRVpHqc?si=fnLCwk5qYIdEHZcG',
    },
    {
      id: 1,
      src: 'https://www.youtube.com/embed/gynci-i_ldM?si=stAIV31qfR2FmNrl',
    },
    {
      id: 2,
      src: 'https://www.youtube.com/embed/34HQEqTc6kE?si=iIwZi1pzHe_HjnGz',
    },
    {
      id: 3,
      src: 'https://www.youtube.com/embed/I8PyuJda-vw?si=PLh9tzrFSdvGXdjh',
    },
    {
      id: 4,
      src: 'https://www.youtube.com/embed/cnh_969HquU?si=xkswtXnHMlyeHKC6',
    },
    {
      id: 5,
      src: 'https://www.youtube.com/embed/h8gDTPXRP4Y?si=a2PPnOOw3MBOZ_gq',
    },
    {
      id: 6,
      src: 'https://www.youtube.com/embed/BeIX0AXEh7g?si=OBFnjaRE3WiLeQbh',
    },
    {
      id: 7,
      src: 'https://www.youtube.com/embed/MqsepQF3Ohs?si=AV-FWEB3qXz4P6ue',
    },
    {
      id: 8,
      src: 'https://www.youtube.com/embed/IBOny9dn1Qk?si=57fWEATSVyI455dk',
    },
    {
      id: 9,
      src: 'https://www.youtube.com/embed/ZetdIQPV9k4?si=cGe7uGGsEl61M4qy',
    },
  ],
};
// Navigation labels visibility
const showNavLabels = () => {
  const label_accueil = document.querySelector('#label-accueil');
  const label_aproposdemoi = document.querySelector('#label-aproposdemoi');
  const label_projets = document.querySelector('#label-projets');
  if (window.innerWidth > DATA.breakpoints.m) {
    label_accueil.innerHTML = DATA.text.nav.accueil;
    label_aproposdemoi.innerHTML = DATA.text.nav.aproposdemoi;
    label_projets.innerHTML = DATA.text.nav.projets;
    [label_accueil, label_aproposdemoi, label_projets].forEach((label) => {
      label.removeAttribute('data');
    });
  } else {
    [label_accueil, label_aproposdemoi, label_projets].forEach((label) => {
      label.innerHTML = '';
      label.setAttribute('data', 'hide');
    });
  }
};
// Hide navigation hash
const hideNavigationHash = () => {
  const location = window.location;
  if (location.hash) {
    history.pushState('', document.title, window.location.pathname);
  }
};
// Register sounds
const registerSounds = (soundDatas = DATA.sounds) => {
  // Register all sounds from DATA using Howler.
  const sounds = {};
  soundDatas.forEach((sound) => {
    sounds[sound.name] = new Howl({
      src: [sound.source],
      loop: sound.loop,
      html5: sound.html5,
      autoplay: sound.autoplay,
      mute: sound.mute,
    });
  });
  return sounds;
};
// Toggle mute
const toggleMute = () => {
  state.sound.on = !state.sound.on;
};
// Toggle play
const togglePlay = () => {
  state.sound.play = !state.sound.play;
};
// Toggle mute image
const toggleMuteImage = () => {
  const img_toggler = document.querySelector('#sound-toggler');
  if (state.sound.on) {
    img_toggler.setAttribute('src', './public/images/icons/volume-on.svg');
  } else {
    img_toggler.setAttribute('src', './public/images/icons/volume-off.svg');
  }
};
// Toggle play image
const togglePlayImage = () => {
  const img_toggler = document.querySelector('#loop-control');
  if (state.sound.play) {
    img_toggler.setAttribute('src', './public/images/icons/pause.svg');
  } else {
    img_toggler.setAttribute('src', './public/images/icons/play.svg');
  }
};
// Check for state.sound.on
const checkMute = (func) => {
  const P = new Promise((resolve, reject) => {
    if (state.sound.on) {
      resolve(func);
    } else {
      reject();
    }
  });
  P.then((func) => func()).catch(() => {});
};
// Create Iframe
const createIframe = (src) => {
  const iframe = document.createElement('iframe');
  iframe.src = src;
  iframe.title = 'Youtube Video Player';
  iframe.frameBorder = 0;
  iframe.allow =
    'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  iframe.allowFullscreen = true;
  iframe.loading = 'lazy';
  iframe.modestbranding = true;

  return iframe;
};
// Integrate Iframe
const integrateIframes = (parents) => {
  parents.forEach((parent) => {
    const parentId = parent.classList[1].split('-')[2];
    parent.appendChild(
      createIframe(DATA.projects.find((project) => project.id == parentId).src)
    );
    return;
  });
};
// --------------
//     STATE
// --------------
const state = {
  window: {
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

// Loaded
window.addEventListener('DOMContentLoaded', () => {
  showNavLabels();
  toggleMuteImage();
  togglePlayImage();
  window.addEventListener('load', () => {
    const ELEMENTS = {
      content: document.querySelector('.content'),
      scrollables: document.querySelectorAll('.section__content'),
      hoverables: document.querySelectorAll('.external-link'),
      mute: document.querySelector('#mute'),
      play_pause: document.querySelector('#pause'),
      nav_links: document.querySelectorAll('.nav__links__ctn__link'),
      players: document.querySelectorAll('.player'),
      video_wrappers: document.querySelectorAll('.video-wrapper'),
    };
    // Create all Iframes
    integrateIframes(ELEMENTS.video_wrappers);
    // Handle resize
    window.addEventListener('resize', () => {
      // Handle navigation
      showNavLabels();
    });
    // Handle hash hiding
    window.addEventListener('hashchange', hideNavigationHash);
    // Register Sounds
    const sounds = registerSounds();
    // Play Loop
    sounds.mainLoop.play();
    // Handle mute toggle
    if (ELEMENTS.mute) {
      ELEMENTS.mute.addEventListener('click', () => {
        // Make sure autoplay works.
        toggleMute();
        toggleMuteImage();
        if (state.sound.on) {
          Object.entries(sounds).forEach(([k, v]) => sounds[k].mute(false));
        } else {
          Object.entries(sounds).forEach(([k, v]) => sounds[k].mute(true));
        }
      });
    }
    if (ELEMENTS.play_pause) {
      ELEMENTS.play_pause.addEventListener('click', () => {
        togglePlay();
        togglePlayImage();
        if (state.sound.play) {
          sounds.mainLoop.play();
        } else {
          sounds.mainLoop.pause();
        }
      });
    }
    // Handle click sound
    window.addEventListener('click', () => {
      checkMute(() => sounds.click.play());
    });
    // Handle slide sound
    ELEMENTS.nav_links.forEach((link) =>
      link.addEventListener('click', (e) => {
        e.stopPropagation();
        checkMute(() => sounds.slide.play());
      })
    );
    // Handle scroll sound
    let ticking = false;
    ELEMENTS.scrollables.forEach((scrollable) => {
      scrollable.addEventListener('scroll', () => {
        if (!ticking) {
          checkMute(() => sounds.scroll.play());
        }
        ticking = true;
      });
      scrollable.addEventListener('scrollend', () => {
        ticking = false;
      });
    });
    // Handle hover sound
    ELEMENTS.hoverables.forEach((hoverable) => {
      hoverable.addEventListener('mouseover', () => {
        checkMute(() => sounds.hover.play());
      });
    });
    // Handle players.
    // Handle sounds on video playback.
    // const players = document.querySelectorAll('iframe');
    // players.forEach((player) =>
    //   player.contentWindow.addEventListener('click', (e) => console.log(e))
    // );
  });
  // --------------
  //     TESTS
  // --------------
});
