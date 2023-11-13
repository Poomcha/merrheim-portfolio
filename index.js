// --------------
//     UTILS
// --------------
// Window size tracking
const getWindowDimensions = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});
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
  // Handle resize
  window.addEventListener('resize', () => {
    state.window.width = getWindowDimensions().width;
    state.window.height = getWindowDimensions().height;
  });
});
