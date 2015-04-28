if window.location.protocol is 'file:'
  document.addEventListener 'toc', ->
    document.querySelector('body').classList.toggle('review')
    elements = document.querySelectorAll 'h1 ~ p, h1 ~ ul > li, h1 ~ ol > li, h1 ~ table tr, h1, h1 ~ h2, h1 ~ h3, h1 ~ h4, h1 ~ h5, h1 ~ h6'
    element_number = 1

    for el in elements
      if el.nodeName is 'TR'
        td = document.createElement 'td'
        el.insertBefore td, el.firstChild
        el = td

      a = document.createElement 'a'
      a.appendChild document.createTextNode element_number
      a.className = 'element-number'
      a.setAttribute 'id', element_number
      a.setAttribute 'href', '#' + element_number++
      el.appendChild a
