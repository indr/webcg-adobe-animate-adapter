import init from '../src/main.js'
import createjs from './createjs.js'

describe('init', () => {
  let window, AdobeAn, webcg

  beforeEach(() => {
    window = { location: { search: '' } }
    window.AdobeAn = AdobeAn = {}
    window.exportRoot = new createjs.MovieClip()
    window.createjs = {}
    window.webcg = webcg = { bufferCommands: () => {}, flushCommands: () => {}, addEventListener: () => {} }
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

  it('should buffer and flush commands', () => {
    const mock = sinon.mock(webcg)
    mock.expects('bufferCommands').once()
    mock.expects('flushCommands').once()
    init(window)
    AdobeAn.bootstrapCallback.args[0][0]()
    mock.verify()
  })
})
