window.onload = ->
  $ = document.querySelectorAll.bind(document)
  tags = ("h#{i}" for i in [2..6]).join(', ')
  tags = $ tags
  currentLevel = 0
  toc = []
  levelMap = ("H#{i}" for i in [2..6])
  counter = (new -> @["H#{i}"] = 0 for i in [2..6]; @)
  ul = oldToc = $('#toc')[0]

  createItem = (href, txt) ->
    li = document.createElement 'li'
    anchor = document.createElement 'a'

    anchor.setAttribute 'href', href
    anchor.textContent = txt

    li.appendChild anchor
    li

  ul.removeChild ul.firstChild while ul.firstChild

  ul.setAttribute 'id', 'toc'
  ul.previousElementSibling.setAttribute 'id', 'toc-header'

  for tag in tags
    {tagName} = tag
    level = levelMap.indexOf tagName.toUpperCase()
    num = []

    if level > currentLevel
      toc.push ul
      ul.appendChild ul = document.createElement('ul')

    while level < currentLevel
      counter[levelMap[currentLevel]] = 0
      ul = toc.pop()
      currentLevel--

    counter[levelMap[level]]++
    for _ in levelMap
      num.push "#{counter[_]}."
      break if _ is tagName

    txt = "#{num.join('')} #{tag.textContent}"
    ul.appendChild createItem('#' + tag.getAttribute('id'), txt)
    tag.removeChild tag.lastChild
    tag.appendChild document.createTextNode(txt)
    currentLevel = level

  scrollToHash()

  # Only highlight blocks that have been tagged with a language
  for block in $('pre code') when /lang-/.test block.getAttribute('class')
    hljs.highlightBlock block

  if window.location.protocol is 'file:'
    document.querySelector('body').classList.toggle('review')
    elements = document.querySelectorAll 'h1 ~ p, h1 ~ ul > li, h1 ~ ol > li, h1 ~ table tr, h1, h1 ~ h2, h1 ~ h3, h1 ~ h4, h1 ~ h5, h1 ~ h6'
    element_number = 1

    scrollTop = document.body.scrollTop or document.documentElement.scrollTop
    scrollLeft = document.body.scrollLeft or document.documentElement.scrollLeft
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
        # el.setAttribute 'data-element-number', element_number++


scrollToHash = ->
  if location.hash and not document.querySelector(':target')
    document.getElementById(location.hash.slice(1))?.scrollIntoView()

window.onhashchange = scrollToHash

