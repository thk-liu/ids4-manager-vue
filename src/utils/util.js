export function timeFix() {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome() {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent() {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader(callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () { }
  window.addEventListener(
    'scroll',
    event => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate(id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}


export function createNamespace(root, ns) {
  var parts = ns.split('.');
  for (var i = 0; i < parts.length; i++) {
    if (typeof root[parts[i]] == 'undefined') {
      root[parts[i]] = {};
    }

    root = root[parts[i]];
  }

  return root;
}
//构建查询的后缀信息
export function buildQueryString(parameterInfos, includeQuestionMark) {
  if (includeQuestionMark === undefined) {
    includeQuestionMark = true;
  }

  var qs = '';

  function addSeperator() {
    if (!qs.length) {
      if (includeQuestionMark) {
        qs = qs + '?';
      }
    } else {
      qs = qs + '&';
    }
  }

  for (var i = 0; i < parameterInfos.length; ++i) {
    var parameterInfo = parameterInfos[i];
    if (parameterInfo.value === undefined) {
      continue;
    }

    if (parameterInfo.value === null) {
      parameterInfo.value = '';
    }

    addSeperator();

    if (parameterInfo.value.toJSON && typeof parameterInfo.value.toJSON === "function") {
      qs = qs + parameterInfo.name + '=' + encodeURIComponent(parameterInfo.value.toJSON());
    } else if (Array.isArray(parameterInfo.value) && parameterInfo.value.length) {
      for (var j = 0; j < parameterInfo.value.length; j++) {
        if (j > 0) {
          addSeperator();
        }

        qs = qs + parameterInfo.name + '[' + j + ']=' + encodeURIComponent(parameterInfo.value[j]);
      }
    } else {
      qs = qs + parameterInfo.name + '=' + encodeURIComponent(parameterInfo.value);
    }
  }

  return qs;
}