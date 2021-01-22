export function getScrollTop(element) {
  return 'scrollTop' in element ? element.scrollTop : element.pageYOffset
}

export function setScrollTop(element, value) {
  'scrollTop' in element ? (element.scrollTop = value) : element.scrollTo(element.scrollX, value)
}

export function getRootScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
}

export function setRootScrollTop(value) {
  setScrollTop(window, value)
  setScrollTop(document.body, value)
}

export function getElementTop(element) {
  return (
    (element === window ? 0 : (element).getBoundingClientRect().top) +
    getRootScrollTop()
  )
}

export function getVisibleHeight(element) {
  return element === window
    ? element.innerHeight
    : (element).getBoundingClientRect().height
}

export function getVisibleTop(element) {
  return element === window ? 0 : (element).getBoundingClientRect().top
}
