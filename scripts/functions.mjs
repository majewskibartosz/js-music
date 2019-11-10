// ==============================================================
// METHODS
// ==============================================================
let hasSwing = false
function toggleButton(button) {
  // setup swing button behaviour
  if (button.classList.contains('swing')) {
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
  } else { // setup play/pause button behaviour 
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
}

// TODO not sure about ternary, maybe change to normal if else statement
function modifyClass(el, action, elClass) {
  action  === 'add' ? el.classList.add(elClass)
  : action === 'remove' ? el.classList.remove(elClass)
  : el.classList.toggle(elClass)
}

// Add or remove class - depends on swing status
function modifyHighlightClass(el) {
  if (!hasSwing) {
    modifyClass(el, 'add', 'highlight' )
    setTimeout(() => { // Delete highlight class after specified time
      modifyClass(el, 'remove', 'highlight')
    }, 120)
  } else {
    modifyClass(el, 'add', 'highlight-swing')
    setTimeout(() => {  // Delete highlight-swing class after specified time
      modifyClass(el, 'remove', 'highlight-swing')
    }, 120)
  }
}

// TODO could improve here and fix it into one method
function singleClick(el) {
  el = el.target
  modifyClass(el, 'toggle', 'clicked')
  modifyClass(el, 'remove', 'dbl-clicked')
}

function doubleClick(el) {
  el = el.target
  modifyClass(el, 'toggle', 'dbl-clicked')
  modifyClass(el, 'remove', 'clicked')
}

export { toggleButton, modifyHighlightClass, singleClick, doubleClick }