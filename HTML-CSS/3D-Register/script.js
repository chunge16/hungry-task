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
const loginForm = $('.login')
const registerForm = $('.register')

userBtn.addEventListener('click', () => {
 triggerVisibleModal()
})

closeBtn.addEventListener('click', () => {
  triggerVisibleModal()
})

tabs.addEventListener('click', (e) => {
  triggerTabActive(e.target)
})

loginForm.addEventListener('submit', function (e) {
  e.preventDefault()
  const msg = $('.login .error-msg')
  let username = $('.login .username')
  let password = $('.login .password')
  if (!/^\w{3,8}$/.test(username.value)) {
    return msg.innerText = '用户名需要输入3-8个字符'
  }

  if (!/^\w{6,8}$/.test(password.value)){
    return msg.innerText = '密码需要6-8个字符'
  }
  this.submit()

})

registerForm.addEventListener('submit', function (e) {
  e.preventDefault()
  const msg = $('.register .error-msg')
  let username = $('.register .username')
  let password = $('.register .password')
  let againPassword = $('.register .password2')

  if (!/^\w{3,8}$/.test(username.value)) {
    return msg.innerText = '用户名需要输入3-8个字符'
  }

  if (!/^\w{6,8}$/.test(password.value)){
    return msg.innerText = '密码需要6-8个字符'
  }

  if (password.value !== againPassword.value) {
    return msg.innerText = '前后密码不一致'
  }

  this.submit()
})
