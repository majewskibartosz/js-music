// UPDATE: there is a problem in chrome with starting audio context
//  before a user gesture. This fixes it.
document.documentElement.addEventListener('mousedown', () => {
  if (Tone.context.state !== 'running') Tone.context.resume()
})

// // Ask user to take action if it is on Google Chrome
// window.addEventListener("load", function() {
//   // CHROME
//   if (navigator.userAgent.indexOf("Chrome") != -1 ) {
//     alert("Google Chrome");
//   }
// })


// ==============================================================
// DOM ELEMENTS
// ==============================================================
// TODO change click event to be mousedown event, allow continuos drawing of pattern
// Select all boxes (spans) and toggle css class on click event
const spans = document.querySelectorAll('span')
for (let i = 0; i < spans.length; i++ ) {
  spans[i].addEventListener('click', (e) => {
    e.target.classList.toggle('clicked')
  })
}
// Select button elements
const playBtn = document.getElementsByClassName('switch')[0]
const swingBtn = document.getElementsByClassName('switch')[1]
const clearBtn = document.getElementsByClassName('switch')[2]

// Start of beat - marker
// On 1, 5, 9, 13 step mark start of beat with css class
let markers = document.querySelectorAll('div > div:last-child > span')
for (let i = 1; i< markers.length; i++) {
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
Tone.Transport.scheduleRepeat(repeat, '8n')
Tone.Transport.start()
Tone.Transport.bpm.value = 200

// ==============================================================
// SEQUENCER SETUP
// ==============================================================
function repeat(time) {
  let step = index % 16
  for (let i = 0; i < rows.length; i++) {
    let sound = sounds[i]
    let row  = rows[i]
    let input = row.querySelector(`span:nth-child(${step + 1})`)
    if (input.classList.contains('clicked')) {
      kit.triggerAttack(sound, time)
    }
    Tone.Draw.schedule(() => { // Draw sequencer movement
      modifyHighlightClass(input)
    }, time)
  }
  index++
}

// ==============================================================
// METHODS
// ==============================================================
// TODO refactor button to be more universal where you pass btn as value
// Swing toggle
let hasSwing = false
const toggleSwing = (button) => {
  if (button.value === 'OFF') {
    Tone.Transport.swing = 0.2
    button.value = 'ON'
    button.textContent = 'SWING OFF'
    hasSwing = true

  } else {
    Tone.Transport.swing = 0
    button.value = 'OFF'
    button.textContent = `SWING ON_`
    hasSwing = false
  }
  return hasSwing
}

// Play Pause toggle
const togglePlayPause = (button) => {
  if (button.value === 'ON') {
    Tone.Transport.stop()
    button.value = 'OFF'
    button.textContent = 'PLAY_'
  } else {
    Tone.Transport.start()
    button.value = 'ON'
    button.textContent = 'PAUSE'
  }
}

// Add or remove class - depends on swing status
function modifyHighlightClass (element) {
  this.element = element
  if (!hasSwing) {
    element.classList.add('highlight')
    setTimeout(() => { // Delete highlight class after specified time
      element.classList.remove('highlight')
    }, 120)
  } else { 
    element.classList.add('highlight-swing')
    setTimeout(() => {  // Delete highlight class after specified time
      element.classList.remove('highlight-swing')
    }, 120)
  }
}



// ==============================================================
// EVENT LISTENERS
// ==============================================================

// Setup play/pause button
playBtn.addEventListener('click', () => {
  togglePlayPause(playBtn)
})

// Setup swing button
swingBtn.addEventListener('click', () => {
  toggleSwing(swingBtn)
})

// Setup clear button
clearBtn.addEventListener('click', () => {
  for (let i = 0; i < spans.length; i++ ) {
    spans[i].classList.remove('clicked')
  }
})