'use strict'

// UPDATE: there is a problem in chrome with starting audio context
//  before a user gesture. This fixes it.
document.documentElement.addEventListener('mousedown', () => {
  if (Tone.context.state !== 'running') Tone.context.resume()
})


// ==============================================================
// DOM ELEMENTS
// ==============================================================

const spans = document.querySelectorAll('span')
for (let i = 0; i < spans.length; i++ ) {
  spans[i].addEventListener('click', (e) => {
    e.target.classList.toggle('clicked')
  })
}

// ==============================================================
// SYNTH AND SOUND SETUP
// ==============================================================

const synths = [
  new Tone.Synth()
]

synths[0].oscillator.type = 'triangle'

const gain = new Tone.Gain(0.6)
gain.toMaster()

synths.forEach(synth => synth.connect(gain))

const rows = document.body.querySelectorAll('div > div')
const notes = ['G2']
let index = 0

Tone.Transport.scheduleRepeat(repeat, '8n')
Tone.Transport.bpm.value = '125'
Tone.Transport.start()

function highlightRow() {
  let step = index %16
}

function repeat(time) {
  let step = index % 16
  for (let i = 0; i < rows.length; i++) {
    let synth = synths[0]
    let note  = notes[0]
    let row  = rows[i]
    let input = row.querySelector(`span:nth-child(${step + 1})`)
    if (input.classList.contains('clicked')) {
      synth.triggerAttackRelease(note, '8n', time)
    }
    Tone.Draw.schedule(function(){
      input.classList.add('highlight')
      setTimeout(() => {
        input.classList.remove('highlight')
      }, 166)
    }, time)
  }
  index++
}


