const Modifier = () => {
  let isEnabled = sessionStorage.getItem('Ext_act') || true
  sessionStorage.setItem('Ext_act', isEnabled)

  const draw = document.querySelector('.draw')
  if (
    draw != undefined &&
    !draw.className.includes('modified') &&
    sessionStorage.getItem('Ext_act') == 'true'
  ) {
    draw.classList.add('modified')
    const drawing = draw.querySelector('.center .book .core .drawingContainer')
    drawing.childNodes[2].style.transform = 'rotate(180deg)'
  }

  const input = document.createElement('input')
  input.type = 'checkbox'
  input.checked = sessionStorage.getItem('Ext_act')
  input.id = 'Ext_act'
  const label = document.createElement('label')
  label.htmlFor = 'Ext_act'
  label.textContent = 'Activate the reverse gamemode.'
  const globalDiv = document.createElement('div')
  globalDiv.append(input)
  globalDiv.append(label)
  globalDiv.style =
    'position: absolute;top: -20px;background: white;padding: 10px;border-radius: 5px;display: flex;flex-direction: row;justify-content: space-around;width: auto;font-family: Nunito-Black;align-items: center;'
  input.style.marginRight = '5px'
  input.addEventListener('change', () => {
    sessionStorage.setItem('Ext_act', input.checked)
    isEnabled = input.checked
  })

  const lobby = document.querySelector('.lobby')
  if (lobby != undefined && !lobby.className.includes('targetted')) {
    lobby.classList.add('targetted')
    lobby.append(globalDiv)
  }
}

const targetNode = document.querySelector('#content')
const config = { attributes: true, childList: true, subtree: true }
const callback = function (mutationsList) {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      Modifier()
    }
  }
}
const observer = new MutationObserver(callback)
observer.observe(targetNode, config)
