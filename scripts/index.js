/* eslint-disable no-undef */
import { toggleButton, singleClick, doubleClick } from './functions.js'
import { repeat } from './sequencer.js'
// ==============================================================
// DOM ELEMENTS
// ==============================================================
// Select all boxes (spans)
const spans = document.querySelectorAll('span')

// Select button elements
const playBtn = document.getElementsByClassName('switch')[0]
const swingBtn = document.getElementsByClassName('switch')[1]
const clearBtn = document.getElementsByClassName('switch')[2]

// Select range slider (bpm)
const slider = document.querySelector('.slider')
const output = document.querySelector('.bpm-value')

// Setup beat markers
// On 1, 5, 9, 13 step, mark start of beat with css class
const markers = document.querySelectorAll('div > div:last-child > span')
for (let i = 1; i < markers.length; i++) {
  markers[0].classList.add('beat-mark')
  if (i % 4 === 0) {
    markers[i].classList.add('beat-mark')
  }
}

// ==============================================================
// START SEQUENCER LOOP
// ==============================================================
Tone.Transport.scheduleRepeat(repeat, '16n')

// ==============================================================
// EVENT LISTENERS
// ==============================================================
for (const span of spans) {
  span.addEventListener('click', singleClick)
  span.addEventListener('dblclick', doubleClick)
}

// Setup play/pause button
playBtn.addEventListener('click', (e) => {
  e.preventDefault()
  toggleButton(playBtn)
})

// Setup swing button
swingBtn.addEventListener('click', (e) => {
  e.preventDefault()
  toggleButton(swingBtn)
})

// Setup clear button
clearBtn.addEventListener('click', (e) => {
  e.preventDefault()
  for (const span of spans) {
    span.classList.remove('clicked', 'dbl-clicked')
  }
})

// Setup BPM slider
output.innerHTML = slider.value
slider.oninput = function () {
  output.innerHTML = this.value
  Tone.Transport.bpm.value = this.value
}
