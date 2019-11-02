'use strict'

// UPDATE: there is a problem in chrome with starting audio context
//  before a user gesture. This fixes it.
document.documentElement.addEventListener('mousedown', () => {
  if (Tone.context.state !== 'running') Tone.context.resume()
})


// ==============================================================
// DOM ELEMENTS
// ==============================================================

// Select all boxes (spans) and toggle css class on click event
const spans = document.querySelectorAll('span')
for (let i = 0; i < spans.length; i++ ) {
  spans[i].addEventListener('click', (e) => {
    e.target.classList.toggle('clicked')
  })
}
// select play/pause button
const playBtn = document.getElementsByClassName('switch')[0]
// select swing button
const swingBtn = document.getElementsByClassName('switch')[1]
// select clear button
const clearBtn = document.getElementsByClassName('switch')[2]

// ==============================================================
// SYNTH AND SOUND SETUP
// ==============================================================

// Create drum kit
const kit = new Tone.Sampler({
  "C2"  : "/sounds/TONE1.wav",
  "D2"  : "/sounds/STICK.wav",
  "E2"  : "/sounds/RIDE.wav",
  "F2" : "/sounds/FX2.wav",
  "G2" : "/sounds/FX1.wav",
  "C3" : "/sounds/CHH2.wav",
  "D3"  : "/sounds/CHH.wav",
  "G3"  : "/sounds/KICK.wav"
},{
    "release" : 1,
})
// // Create synth array
// const synths = [
//   new Tone.Synth(),
//   new Tone.Synth(),
//   new Tone.Synth(),
//   new Tone.Synth(),
//   new Tone.Synth(),
//   new Tone.Synth(),
//   new Tone.Synth(),
//   new Tone.Synth()
// ]

// synths[0].oscillator.type = 'triangle'

// Connect synth to master gain (speakers)
const gain = new Tone.Gain(0.6)
gain.toMaster()
kit.connect(gain)
// synths.forEach(synth => synth.connect(gain))

// Select rows of sequencer
const rows = document.body.querySelectorAll('div > div')
// const notes = ['B6', 'E4', 'F#3', 'G4',
//               'A3', 'B4', 'C#4', 'Eb3']
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
    // let synth = synths[i]
    let sound = sounds[i]
    // let note  = notes[i]
    let row  = rows[i]
    let input = row.querySelector(`span:nth-child(${step + 1})`)
    if (input.classList.contains('clicked')) {
      // synth.triggerAttackRelease(note, '8n', time)
      kit.triggerAttack(sound, time)
    }
    // Draw sequencer movement
    Tone.Draw.schedule(function(){
      input.classList.add('highlight')
      // Delete highlight class after specified time
      setTimeout(() => {
        input.classList.remove('highlight')
      }, 166)
    }, time)
  }
  index++
}


// ==============================================================
// EVENT LISTENERS
// ==============================================================

// Setup play/pause button
playBtn.addEventListener('click', () => {
  // Tone.Transport.toggle()
  Tone.Transport.toggle()
})

// Setup swing button
// TODO change to be a toggle switch
swingBtn.addEventListener('click', () => {
  Tone.Transport.swing = 0.4
})

// Setup clear button
clearBtn.addEventListener('click', () => {
  for (let i = 0; i < spans.length; i++ ) {
    spans[i].classList.remove('clicked')
  }
})