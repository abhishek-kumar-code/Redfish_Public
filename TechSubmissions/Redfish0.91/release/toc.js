window.onload = function() {
  var tags = document.querySelectorAll('h2 > a, h3 > a, h4 > a, h5 > a, h6 > a')
    , currentLevel = 0
    , toc = []
    , levelMap = ['H2', 'H3', 'H4', 'H5', 'H6']
    , counter = {'H2': 0, 'H3': 0, 'H4': 0, 'H5': 0, 'H6': 0}
    , level;

  [].slice.apply(tags).forEach(function(tag) {
    var tagName = tag.parentElement.tagName
      , level = levelMap.indexOf(tagName)
      , i = 0;

      var num = [];
    if (level > currentLevel) {
      toc.push('<ul>');
    } else if (level < currentLevel) {
      while (level < currentLevel) {
        counter[levelMap[currentLevel]] = 0
        toc.push('</ul>');
        currentLevel--;
      }
    }

    counter[levelMap[level]]++;
    for (var i = 0; levelMap[i - 1] !== tagName; i++) {
      num.push(counter[levelMap[i]] + '.');
    }

    var txt = num.join('') + ' ' + tag.parentElement.innerText;
    toc.push('<li><a href=\"' + tag.getAttribute('href') + '\">' + txt + '</a></li>');
    tag.parentElement.removeChild(tag.parentElement.lastChild)
    tag.parentElement.appendChild(document.createTextNode(txt))
    currentLevel = level;
  })

  var oldToc = document.querySelector('#wrapper h2').previousSibling;
  oldToc.innerHTML = toc.join('');
}
