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

  // The template host may already call template commands such as update() and play() before the template is ready to
  // receive calls. We ask WebCG to buffer these commands and flush them after we have instantiated the adapter.
  window.webcg.bufferCommands()
  window.AdobeAn.bootstrapCallback(() => {
    /* eslint-disable no-new */
    new Adapter(window.webcg, window.exportRoot, window.createjs)
    // The template is bootstrapped and the adapter is ready to receive and process calls
    window.webcg.flushCommands()
  })
}

export default init
