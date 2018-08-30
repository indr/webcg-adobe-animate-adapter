import Adapter from '../src/Adapter'

describe('Adapter', () => {
  let webcg, movieClip, labels

  beforeEach(() => {
    webcg = { addEventListener: sinon.spy() }
    movieClip = {}
    labels = []
    movieClip.getLabels = () => labels
    movieClip.gotoAndPlay = sinon.spy()
    movieClip.instance = {}
    movieClip.stop = sinon.spy()
    movieClip.play = sinon.spy()
    movieClip.visible = null
  })

  it('should throw TypeError when webcg is null or not an object', () => {
    expect(() => new Adapter(null, movieClip))
      .to.throw(TypeError, 'webcg must be an object')
    expect(() => new Adapter('', movieClip))
      .to.throw(TypeError, 'webcg must be an object')
  })

  it('should throw TypeError when movieClip is null or not an object', () => {
    expect(() => new Adapter(webcg, null))
      .to.throw(TypeError, 'movieClip must be an object')
    expect(() => new Adapter(webcg, ''))
      .to.throw(TypeError, 'movieClip must be an object')
  })

  it('should be able to instantiate an adapter instance', () => {
    const adapter = new Adapter(webcg, movieClip)
    expect(adapter).to.be.instanceOf(Adapter)
  })

  it('should add webcg event listeners', () => {
    // eslint-disable-next-line no-new
    new Adapter(webcg, movieClip)
    assert(webcg.addEventListener.calledWith('play'))
    assert(webcg.addEventListener.calledWith('stop'))
    assert(webcg.addEventListener.calledWith('next'))
    assert(webcg.addEventListener.calledWith('data'))
  })

  it('should stop immediately', () => {
    // eslint-disable-next-line no-new
    new Adapter(webcg, movieClip)
    expect(movieClip.stop.calledOnce).to.equal(true)
  })

  it('play should set visible true', () => {
    const adapter = new Adapter(webcg, movieClip)
    expect(movieClip.visible).to.not.equal(true)
    adapter.play()
    expect(movieClip.visible).to.equal(true)
  })

  it('play should goto and play intro', () => {
    labels.push({ label: 'intro', position: 1 })
    const adapter = new Adapter(webcg, movieClip)
    adapter.play()
    assert(movieClip.gotoAndPlay.calledWith(1))
  })

  it('play should goto and play frame 0 given no intro label', () => {
    const adapter = new Adapter(webcg, movieClip)
    adapter.play()
    assert(movieClip.gotoAndPlay.calledWith(0))
  })

  it('stop should goto and play outro', () => {
    labels.push({ label: 'outro', position: 2 })
    const adapter = new Adapter(webcg, movieClip)
    adapter.stop()
    assert(movieClip.gotoAndPlay.calledWith(2))
  })

  it('stop should set visibile false given no label outro', () => {
    const adapter = new Adapter(webcg, movieClip)
    adapter.stop()
    expect(movieClip.gotoAndPlay.calledOnce).to.equal(false)
    expect(movieClip.visible).to.equal(false)
  })

  it('next should play movie clip', () => {
    const adapter = new Adapter(webcg, movieClip)
    adapter.next()
    expect(movieClip.play.calledOnce).to.equal(true)
  })

  it('next should set visible true', () => {
    const adapter = new Adapter(webcg, movieClip)
    expect(movieClip.visible).to.not.equal(true)
    adapter.next()
    expect(movieClip.visible).to.equal(true)
  })

  it('data should update movie clip instances', () => {
    movieClip.instance.f0 = { text: 'title' }
    movieClip.instance.f1 = { text: 'subtitle' }
    const adapter = new Adapter(webcg, movieClip)
    const event = new window.CustomEvent('data', { detail: JSON.parse('{"f0":"updated title","f1":"updated subtitle"}') })
    adapter.data(event)
    expect(movieClip.instance.f0.text).to.equal('updated title')
    expect(movieClip.instance.f1.text).to.equal('updated subtitle')
  })

  it('data with invalid data should not change movie clip instances', () => {
    movieClip.instance.f0 = { text: 'title' }
    const adapter = new Adapter(webcg, movieClip)
    const event = new window.CustomEvent('data', { detail: '' })
    adapter.data(event)
    expect(movieClip.instance.f0.text).to.equal('title')
  })
})
