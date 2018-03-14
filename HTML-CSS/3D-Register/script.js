function $(selector) {
  if (!selector) return null
  return document.querySelector(selector)
}

function $$(selector) {
  if (!selector) return null
  return document.querySelectorAll(selector)
}

function triggerVisibleModal() {
  if (modal.classList.contains('show')) {
    modal.classList.remove('show')
  } else {
    modal.classList.add('show')
  }
}

function triggerTabActive(e) {
  const tabs =  $$('.tabs > a')
  const contents = $$('.content')
  tabs.forEach((el) => {
    if (el.classList.contains('active')){
      el.classList.remove('active')
    }
  })
  e.classList.add('active')
  if (e.classList.contains('active') && e.classList.contains('tab-login')) {
    modal.classList.remove('modal-register')
    modal.classList.add('modal-login')
  } else {
    modal.classList.remove('modal-login')
    modal.classList.add('modal-register')
  }
}

const userBtn = $('.icon-user')
const modal = $('.modal')
const closeBtn = $('.icon-close')
const tabs =  $('.tabs')

userBtn.addEventListener('click', () => {
 triggerVisibleModal()
})

closeBtn.addEventListener('click', () => {
  triggerVisibleModal()
})

tabs.addEventListener('click', (e) => {
  triggerTabActive(e.target)
})
