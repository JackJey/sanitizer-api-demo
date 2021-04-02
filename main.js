'use strict';
const $  = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
EventTarget.prototype.on = EventTarget.prototype.addEventListener

document.on('DOMContentLoaded', async (e) => {

  const feature_detection = (window.Sanitizer !== undefined)
  $('#feature-detection').textContent = feature_detection ? "ENABLED" : "DISABLED"

  $('form').on('submit', (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const raw  = formData.get('rawtext')
    const mode = formData.get('mode')

    console.log(mode)

    const option = ((mode) => {
      switch (mode) {
        case 'default':
          return {}
        case 'no-attr':
          return {allowAttributes: []}
        case 'no-elem':
          return {allowElements: []}
      }
    })(mode)

    console.log(raw)
    const sanitizer = new Sanitizer(option)

    const sanitizedString = sanitizer.sanitizeToString(raw)
    console.log(sanitizedString)
    $('#sanitized').value = sanitizedString

    const sanitized = sanitizer.sanitize(raw);
    console.log(sanitized)

    $('#render').innerHTML = ''
    $('#render').appendChild(sanitized)
  })

  $$('.copy').forEach((svg) => {
    svg.on('click', async (e) => {
      const code = e.target.parentElement.querySelector('pre code').textContent
      await navigator.clipboard.writeText(code);
    })
  })
})
