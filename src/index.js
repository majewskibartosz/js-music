/* eslint-disable no-undef */
import * as Tone from 'tone';
import { toggleButton, singleClick, doubleClick } from './functions.js';
import { repeat } from './sequencer.js';
// ==============================================================
// DOM ELEMENTS
// ==============================================================
const content = document.querySelectorAll('.content, .controls');

const spans = document.querySelectorAll('.box');

const [playBtn, swingBtn, clearBtn] = document.querySelectorAll('.switch');
const helpBtn = document.querySelector('i:nth-of-type(2)');

const slider = document.querySelector('.slider');
const output = document.querySelector('.bpm-value');

const steps = document.querySelectorAll('div > div:last-child > span');
steps.forEach((step, i) => {
  if (i % 4 === 0) {
    step.classList.add('beat-mark', 'clicked');
  }
});

Tone.Transport.scheduleRepeat(repeat, '16n');

spans.forEach((span) => {
  span.addEventListener('click', singleClick);
  span.addEventListener('dblclick', doubleClick);
});

playBtn.addEventListener('click', (e) => {
  e.preventDefault();
  toggleButton(playBtn);
});

swingBtn.addEventListener('click', (e) => {
  e.preventDefault();
  toggleButton(swingBtn);
});

clearBtn.addEventListener('click', (e) => {
  e.preventDefault();
  spans.forEach((span) => {
    span.classList.remove('clicked', 'dbl-clicked');
  });
});

output.textContent = slider.value;
slider.oninput = function () {
  output.textContent = this.value;
  Tone.Transport.bpm.value = this.value;
};

// Setup helper message
const message = document.createElement('p');
message.innerText = `
> Single click create step with full velocity \xa0 (yellow).
> Double click create step with half velocity \xa0 (green).
> Click on created step to erase it.
> To erase green steps, click on it to make it \xa0 yellow, then click again to delete.
> Visual representation of running sequencer \xa0\xa0(orange = swingOff, pink = swingOn).
> Purple underlines determines start of a beat \xa0 (1 - 5 - 9 - 13).  

\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0PRESS ANY KEY TO CONTINUE
`;
const container = document.createElement('div');
// Setup help button instructions
helpBtn.addEventListener('click', (e) => {
  e.preventDefault();
  content.forEach((item) => {
    item?.classList?.add('blur');
    if (item?.classList?.contains('blur')) {
      container?.classList?.add('message-container');
      message?.classList?.add('message');
      document.body.appendChild(container);
      container.appendChild(message);
      document.addEventListener('keydown', () => {
        item?.classList?.remove('blur');
        container?.classList?.add('message-container--delete');
        setTimeout(() => {
          message?.remove();
          container?.classList?.remove('message-container--delete');
        }, 250);
      });
    }
  });
});
