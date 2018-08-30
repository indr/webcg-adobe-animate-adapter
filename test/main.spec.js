import init from '../src/main.js'

describe('init', () => {
  let window, AdobeAn

  beforeEach(() => {
    window = { location: { search: '' } }
    window.AdobeAn = AdobeAn = {}
    window.webcg = {}
    AdobeAn.bootstrapCallback = sinon.spy()
  })

  it('should register AdobeAn.bootstrapCallback', () => {
    init(window)
    expect(AdobeAn.bootstrapCallback.calledOnce).to.equal(true)
  })
})
