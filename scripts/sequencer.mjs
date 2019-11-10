import { modifyHighlightClass } from './functions.mjs'

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


// ==============================================================
// SEQUENCER SETUP
// ==============================================================

// Select rows of sequencer
const rows = document.body.querySelectorAll('div > div')
const sounds = ["C2", "D2", "E2", "F2", "G2", "C3", "D3", "G3"];
let index = 0

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

export { repeat }