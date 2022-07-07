function _creatModal({ title, closable, content, width }) {
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
        </div < div class="modal-body">
          ${content || ''}
          <div class="modal-footer">
            <button>Ok</button>
            <button>Cancel</button>
          </div>
        </>
      </div>
    </div>
      </div>
    `)
  document.body.appendChild(modal)
  return modal
}

$.modal = function(options) {
  const ANIMATION_SPEED = 200 //ms
  const $modal = _creatModal(options)
  let closing = false

  const modal = {
    open() {
      if (closing) return // early exit

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

  $modal.addEventListener('click', (event) => {
    if (event.target.dataset.close) {
      modal.close()
    }
  })

  return modal
}


