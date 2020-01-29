/* eslint-disable no-undef */
import { modifyHighlightClass } from './functions.js'

// ==============================================================
// SOUND SETUP
// ==============================================================
// Create drum kit
const kit = new Tone.Sampler({
  C2: 'TONE1.wav',
  E2: 'TONE2.wav',
  D2: 'TONE3.wav',
  F2: 'FX2.wav',
  G2: 'CLAP.wav',
  C3: 'CHH.wav',
  D3: 'TOM.wav',
  G3: 'KICK.wav'
}, {
  release: 1,
  baseUrl: '/sounds/'
})

// Connect synth to master gain (speakers)
const gain = new Tone.Gain(0.6)
gain.toMaster()
kit.connect(gain)
// ==============================================================
// SEQUENCER SETUP
// ==============================================================
const rows = document.body.querySelectorAll('div > div')
const sounds = ['C2', 'D2', 'E2', 'F2', 'G2', 'C3', 'D3', 'G3']
let index = 0

const velocity = (Math.random() * 0.5 + 0.5) // randomize velocity of each step
//  MAIN SEQUENCER LOOP
function repeat(time) {
  const step = index % 16
  for (let i = 0; i < rows.length; i++) {
    const sound = sounds[i]
    const row = rows[i]
    const input = row.querySelector(`span:nth-child(${step + 1})`)
    const hasClicked = input.classList.contains('clicked')
    const hasDoubleClicked = input.classList.contains('dbl-clicked')
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
