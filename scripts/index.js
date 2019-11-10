import { toggleSwing, togglePlayPause, modifyHighlightClass, singleClick, doubleClick } from './functions.mjs'

// UPDATE: there is a problem in chrome with starting audio context
//  before a user gesture. This fixes it.
// document.documentElement.addEventListener('mousedown', (e) => {
//   e.preventDefault()
//   if (Tone.context.state !== 'running') Tone.context.resume()
// })

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
const slider = document.querySelector(".slider")
const output = document.querySelector(".bpm-value")

// Setup beat markers
// On 1, 5, 9, 13 step mark start of beat with css class
let markers = document.querySelectorAll('div > div:last-child > span')
for (let i = 1; i < markers.length; i++) {
  markers[0].classList.add('beat-mark')
  if (i % 4 === 0) {
    markers[i].classList.add('beat-mark')
  }
}

// ==============================================================
// SOUND SETUP
// ==============================================================
// Create drum kit
const kit = new Tone.Sampler({
  "C2" : "TONE1.wav",
  "D2" : "STICK.wav",
  "E2" : "RIDE.wav",
  "F2" : "FX2.wav",
  "G2" : "FX1.wav",
  "C3" : "CHH2.wav",
  "D3" : "CHH.wav",
  "G3" : "KICK.wav"
},{
    "release" : 1,
    "baseUrl" : "/sounds/"
})

// Connect synth to master gain (speakers)
const gain = new Tone.Gain(0.6)
gain.toMaster()
kit.connect(gain)

// Select rows of sequencer
const rows = document.body.querySelectorAll('div > div')
const sounds = ["C2", "D2", "E2", "F2", "G2", "C3", "D3", "G3"];
let index = 0

// ==============================================================
// SEQUENCER CONTROLS
// ==============================================================
Tone.Transport.scheduleRepeat(repeat, '16n')
Tone.Transport.bpm.value = 120

// ==============================================================
// SEQUENCER SETUP
// ==============================================================
let velocity =  (Math.random() * 0.5 + 0.5) // randomize velocity of each step
function repeat(time) {
  let step = index % 16
  for (let i = 0; i < rows.length; i++) {
    let sound = sounds[i]
    let row  = rows[i]
    let input = row.querySelector(`span:nth-child(${step + 1})`)
    let hasClicked = input.classList.contains('clicked')
    let hasDoubleClicked = input.classList.contains('dbl-clicked')
    if (hasClicked) {
      kit.triggerAttack(sound, time, velocity)
    } else if (hasDoubleClicked) {
      kit.triggerAttack(sound, time, velocity / 2)
    }
    Tone.Draw.schedule(() => { // Draw sequencer movement
      modifyHighlightClass(input)
    }, time)
  }
  index++
}

// ==============================================================
// EVENT LISTENERS
// ==============================================================
//  toggle css class on click event
// TODO change click event to be mousedown event, allow continuos drawing of pattern
for (let span of spans) {
  span.addEventListener('click', singleClick)
  span.addEventListener('dblclick', doubleClick)
}

// Setup play/pause button
playBtn.addEventListener('click', (e) => {
  e.preventDefault()
  togglePlayPause(playBtn)
})

// Setup swing button
swingBtn.addEventListener('click', (e) => {
  e.preventDefault()
  toggleSwing(swingBtn)
})

// Setup clear button
clearBtn.addEventListener('click', (e) => {
  e.preventDefault()
  for (let span of spans) {
    span.classList.remove('clicked', 'dbl-clicked')
  }
})

// Setup BPM slider
output.innerHTML = slider.value

slider.oninput = function() {
  output.innerHTML = this.value
  Tone.Transport.bpm.value = this.value
}