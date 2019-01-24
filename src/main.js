import Adapter from './Adapter'

const init = function (window) {
  if (typeof window.webcg !== 'object') {
    console.warn('[webcg-adobe-animate-adapter] expected window.webcg to be an object')
    return
  }
  if (typeof window.AdobeAn !== 'object') {
    console.warn('[webcg-adobe-animate-adapter] expected window.AdobeAn to be an object')
    return
  }
  if (typeof window.createjs !== 'object') {
    console.warn('[webcg-adobe-animate-adapter] expected window.createjs to be an object')
    return
  }
  window.AdobeAn.bootstrapCallback(() => {
    /* eslint-disable no-new */
    new Adapter(window.webcg, window.exportRoot, window.createjs)
  })
}

export default init
