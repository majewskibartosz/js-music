/* eslint-disable no-undef */
import { toggleButton, singleClick, doubleClick } from './functions.js'
import { repeat } from './sequencer.js'
// ==============================================================
// DOM ELEMENTS
// ==============================================================
const content = document.querySelectorAll('.content, .controls')

// Select all boxes (spans)
const spans = document.querySelectorAll('.box')

// Select button elements
const playBtn = document.getElementsByClassName('switch')[0]
const swingBtn = document.getElementsByClassName('switch')[1]
const clearBtn = document.getElementsByClassName('switch')[2]
const helpBtn = document.getElementsByTagName('i')[1]

// Select range slider (bpm)
const slider = document.querySelector('.slider')
const output = document.querySelector('.bpm-value')

// ==============================================================
// BOTTOM ROW BEAT MARKERS AND PRESET PATTERN
// ==============================================================
// Setup beat markers (BOTTOM ROW)
// On 1, 5, 9, 13 step, mark start of beat with css class
const steps = document.querySelectorAll('div > div:last-child > span')
for (let i = 1; i < steps.length; i++) {
  steps[0].classList.add('beat-mark')
  if (i % 4 === 0) {
    steps[i].classList.add('beat-mark')
  }
}
// Setup preset pattern (BOTTOM ROW)
for (let i = 1; i < steps.length; i++) {
  steps[0].classList.add('clicked')
  if (i % 4 === 0) {
    steps[i].classList.add('clicked')
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
slider.oninput = function() {
  output.innerHTML = this.value
  Tone.Transport.bpm.value = this.value
}

// Setup helper message
const message = document.createElement('p')
message.innerText = `
> Single click create step with full velocity \xa0 (yellow).
> Double click create step with half velocity \xa0 (green).
> Click on created step to erase it.
> To erase green steps, click on it to make it \xa0 yellow, then click again to delete.
> Visual representation of running sequencer \xa0\xa0(orange = swingOff, pink = swingOn).
> Purple underlines determines start of a beat \xa0 (1 - 5 - 9 - 13).  

\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0PRESS ANY KEY TO CONTINUE
`
const container = document.createElement('div')
// Setup help button instructions
helpBtn.addEventListener('click', (e) => {
  e.preventDefault()
  for (const item of content) {
    item.classList.add('blur')
    if (item.classList.contains('blur')) {
      container.classList.add('message-container')
      message.classList.add('message')
      document.body.appendChild(container)
      container.appendChild(message)
      document.addEventListener('keydown', () => {
        item.classList.remove('blur')
        container.classList.add('message-container--delete')
        setTimeout(() => {
          message.remove()
          container.classList.remove('message-container--delete')
        }, 250)
      })
    }
  }
})
