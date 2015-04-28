if window.location.protocol is 'file:'
  document.addEventListener 'toc', ->
    document.querySelector('body').classList.toggle('review')
    elements = document.querySelectorAll 'h1 ~ p, h1 ~ ul > li, h1 ~ ol > li, h1 ~ table tr, h1, h1 ~ h2, h1 ~ h3, h1 ~ h4, h1 ~ h5, h1 ~ h6'

    for el, i in elements
      if el.nodeName is 'TR'
        td = document.createElement 'td'
        el.insertBefore td, el.firstChild
        el = td

      a = document.createElement 'a'
      a.textContent = "#{++i}"
      a.className = 'element-number'
      a.href = "#" + a.id = "#{i}"
      el.appendChild a
    null
