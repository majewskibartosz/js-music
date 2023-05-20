/* eslint-disable no-undef */
// ==============================================================
// METHODS
// ==============================================================
let hasSwing = false;

const toggleButton = (button) => {
  // setup swing button behaviour
  if (button.classList.contains('swing')) {
    if (button.value === 'OFF') {
      Tone.Transport.swing = 0.25;
      button.value = 'ON';
      button.textContent = 'SWING ON\xa0';
      hasSwing = true;
    } else {
      Tone.Transport.swing = 0;
      button.value = 'OFF';
      button.textContent = 'SWING OFF';
      hasSwing = false;
    }
    return hasSwing;
  } else {
    // setup play/pause button behaviour
    const playStopBtn = document.querySelector('button > i');
    if (button.value === 'ON') {
      Tone.Transport.stop();
      button.value = 'OFF';
      playStopBtn.textContent = 'pause';
    } else {
      Tone.Transport.start();
      button.value = 'ON';
      playStopBtn.textContent = 'play_arrow';
    }
  }
};

// Add or remove class - depends on swing status
const modifyHighlightClass = (el) => {
  if (!hasSwing) {
    modifyClass(el, 'add', 'highlight');
    setTimeout(() => {
      modifyClass(el, 'remove', 'highlight');
    }, 120);
  } else {
    modifyClass(el, 'add', 'highlight-swing');
    setTimeout(() => {
      modifyClass(el, 'remove', 'highlight-swing');
    }, 120);
  }
};

const modifyClass = (el, action, elClass) => {
  if (action === 'add') {
    el.classList.add(elClass);
  } else if (action === 'remove') {
    el.classList.remove(elClass);
  } else {
    el.classList.toggle(elClass);
  }
};

const singleClick = (el) => {
  el = el.target;
  modifyClass(el, 'toggle', 'clicked');
  modifyClass(el, 'remove', 'dbl-clicked');
};

const doubleClick = (el) => {
  el = el.target;
  modifyClass(el, 'toggle', 'dbl-clicked');
  modifyClass(el, 'remove', 'clicked');
};

export { toggleButton, modifyHighlightClass, singleClick, doubleClick };
