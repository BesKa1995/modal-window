function noop() {}
function _createModalFooter(buttons = []) {
  if (buttons.length === 0) {
    return document.createElement('div')
  }
  const wrap = document.createElement('div')
  wrap.classList.add('modal-footer')
  buttons.forEach(btn => {
    const $btn = document.createElement('button')
    $btn.textContent = btn.text
    $btn.classList.add('btn')
    $btn.type = 'button'
    $btn.classList.add(`btn-${btn.type || 'secondary'}`)
    $btn.onclick = btn.handler || noop
    wrap.appendChild($btn)
  })
  return wrap
}

Element.prototype.appendAfter = function(element) {
  element.parentNode.insertBefore(this, element.nextSibling)
}

function _creatModal({ title, closable, content, width, footerButtons }) {
  const DEFAULT_WIDTH = '600px'
  const modal = document.createElement('div')
  modal.classList.add('bmodal')
  modal.insertAdjacentHTML('afterbegin', `
    <div class= "bmodal" >
    <div class="modal-overlay" data-close="true">
      <div class="modal-window" style="width: ${width || DEFAULT_WIDTH}">
        <div class="modal-header">
          <span class="modal-title">${title}</span>
          ${closable ? `<span class="modal-close" data-close="true">&times;</span>` : ''}
        </div 
            </div>
        <div class="modal-body" data-content>
          ${content || ''}
          </div>
    </div>
      </div>
      </div>
    `)
  document.body.appendChild(modal)
  const footer = _createModalFooter(footerButtons)
  footer.appendAfter(modal.querySelector('[data-content]'))
  return modal
}

$.modal = function(options) {
  const ANIMATION_SPEED = 200 //ms
  const $modal = _creatModal(options)
  let closing = false
  let destroyed = false
  const modal = {
    open() {
      if ([closing, destroyed].includes(true)) return // early exit
      $modal.classList.add('open')
    },
    close() {
      closing = true

      $modal.classList.remove('open')
      $modal.classList.add('hide')

      setTimeout(() => {
        closing = false
        $modal.classList.remove('hide')
      }, ANIMATION_SPEED)
    },
    destroy() {
    }
  }

  const listener = event => {
    if (event.target.dataset.close) {
      modal.close()
    }
  }

  $modal.addEventListener('click', listener)

  return Object.assign(modal, {
    destroy() {
      $modal.parentNode.removeChild($modal)
      $modal.removeEventListener(listener)
      destroyed = true
    },

    setContent(html = '') {
      $modal.querySelector('[data-content]').innerHTML = html
    }
  })
}


