import init from '../src/main.js'

describe('init', () => {
  let window, AdobeAn

  beforeEach(() => {
    window = { location: { search: '' } }
    window.AdobeAn = AdobeAn = {}
    window.createjs = {}
    window.webcg = {}
    AdobeAn.bootstrapCallback = sinon.spy()
  })

  it('should register AdobeAn.bootstrapCallback', () => {
    init(window)
    expect(AdobeAn.bootstrapCallback.calledOnce).to.equal(true)
  })

  it('should not register bootstrapCallback when window.webcg is not defined', () => {
    delete window['AdobeAn']
    init(window)
    expect(AdobeAn.bootstrapCallback.called).to.equal(false)
  })

  it('should not register bootstrapCallback when window.AdobeAn is not defined', () => {
    delete window['AdobeAn']
    init(window)
    expect(AdobeAn.bootstrapCallback.called).to.equal(false)
  })

  it('should not register bootstrapCallback when window.createjs is not defined', () => {
    delete window['createjs']
    init(window)
    expect(AdobeAn.bootstrapCallback.called).to.equal(false)
  })
})
