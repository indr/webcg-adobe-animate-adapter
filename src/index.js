import 'webcg-framework'
import { version } from '../package.json'
import init from './main'

/**
 * When required globally
 */
if (typeof window !== 'undefined') {
  console.log('[webcg-adobe-animate-adapter] version ' + version)
  ready(() => {
    init(window)
  })
}

// @see http://youmightnotneedjquery.com/#ready
function ready (fn) {
  if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
}
