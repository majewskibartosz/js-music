// ==============================================================
// METHODS
// ==============================================================
// TODO refactor button to be more universal where you pass btn as value
// Swing toggle
let hasSwing = false
function toggleSwing (button) {
  if (button.value === 'OFF') {
    Tone.Transport.swing = 0.1
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
function togglePlayPause(button) {
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
  if (!hasSwing) {
    element.classList.add('highlight')
    setTimeout(() => { // Delete highlight class after specified time
      element.classList.remove('highlight')
    }, 120)
  } else { 
    element.classList.add('highlight-swing')
    setTimeout(() => {  // Delete highlight-swing class after specified time
      element.classList.remove('highlight-swing')
    }, 120)
  }
}

function singleClick(e) {
  e.preventDefault()
  this.classList.toggle('clicked')
  this.classList.remove('dbl-clicked')
}

function doubleClick(e) {
  e.preventDefault()
  this.classList.toggle('dbl-clicked');
  this.classList.remove('clicked')
}

export { toggleSwing, togglePlayPause, modifyHighlightClass, singleClick, doubleClick }