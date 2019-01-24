import Adapter from '../src/Adapter'
import './createjs'

describe('Adapter', () => {
  let createjs, webcg, movieClip, labels

  beforeEach(() => {
    createjs = window.createjs
    webcg = { addEventListener: sinon.spy() }
    movieClip = new createjs.MovieClip()
    labels = []
    movieClip.getLabels = () => labels
    movieClip.gotoAndPlay = sinon.spy()
    movieClip.stop = sinon.spy()
    movieClip.play = sinon.spy()
    movieClip.visible = null
  })

  it('should throw TypeError when webcg is null or not an object', () => {
    expect(() => new Adapter(null, movieClip, createjs))
      .to.throw(TypeError, 'webcg must be an object')
    expect(() => new Adapter('', movieClip, createjs))
      .to.throw(TypeError, 'webcg must be an object')
  })

  it('should throw TypeError when movieClip is null or not an object', () => {
    expect(() => new Adapter(webcg, null))
      .to.throw(TypeError, 'movieClip must be an object')
    expect(() => new Adapter(webcg, ''))
      .to.throw(TypeError, 'movieClip must be an object')
  })

  it('should throw TypeError when createjs is null or not an object', () => {
    expect(() => new Adapter(webcg, movieClip, null))
      .to.throw(TypeError, 'createjs must be an object')
    expect(() => new Adapter(webcg, movieClip, ''))
      .to.throw(TypeError, 'createjs must be an object')
  })

  it('should be able to instantiate an adapter instance', () => {
    const adapter = new Adapter(webcg, movieClip, createjs)
    expect(adapter).to.be.instanceOf(Adapter)
  })

  it('should add webcg event listeners', () => {
    // eslint-disable-next-line no-new
    new Adapter(webcg, movieClip, createjs)
    assert(webcg.addEventListener.calledWith('play'))
    assert(webcg.addEventListener.calledWith('stop'))
    assert(webcg.addEventListener.calledWith('next'))
    assert(webcg.addEventListener.calledWith('data'))
  })

  it('should stop immediately', () => {
    // eslint-disable-next-line no-new
    new Adapter(webcg, movieClip, createjs)
    expect(movieClip.stop.calledOnce).to.equal(true)
  })

  it('play should set visible true', () => {
    const adapter = new Adapter(webcg, movieClip, createjs)
    expect(movieClip.visible).to.not.equal(true)
    adapter.play()
    expect(movieClip.visible).to.equal(true)
  })

  it('play should goto and play intro', () => {
    labels.push({ label: 'intro', position: 1 })
    const adapter = new Adapter(webcg, movieClip, createjs)
    adapter.play()
    assert(movieClip.gotoAndPlay.calledWith(1))
  })

  it('play should goto and play frame 0 given no intro label', () => {
    const adapter = new Adapter(webcg, movieClip, createjs)
    adapter.play()
    assert(movieClip.gotoAndPlay.calledWith(0))
  })

  it('stop should goto and play outro', () => {
    labels.push({ label: 'outro', position: 2 })
    const adapter = new Adapter(webcg, movieClip, createjs)
    adapter.stop()
    assert(movieClip.gotoAndPlay.calledWith(2))
  })

  it('stop should set visibile false given no label outro', () => {
    const adapter = new Adapter(webcg, movieClip, createjs)
    adapter.stop()
    expect(movieClip.gotoAndPlay.calledOnce).to.equal(false)
    expect(movieClip.visible).to.equal(false)
  })

  it('next should play movie clip', () => {
    const adapter = new Adapter(webcg, movieClip, createjs)
    adapter.next()
    expect(movieClip.play.calledOnce).to.equal(true)
  })

  it('next should set visible true', () => {
    const adapter = new Adapter(webcg, movieClip, createjs)
    expect(movieClip.visible).to.not.equal(true)
    adapter.next()
    expect(movieClip.visible).to.equal(true)
  })

  it('data with string data should update createjs Text instances', () => {
    movieClip.f0 = new createjs.Text('f0')
    movieClip.f0.parent = movieClip
    movieClip.instance = new createjs.MovieClip()
    movieClip.instance.parent = movieClip
    movieClip.instance.f0 = new createjs.Text('instance f0')
    movieClip.instance.f0.parent = movieClip.instance
    movieClip.instance.f1 = new createjs.Text('instance f1')
    movieClip.instance.f1.parent = movieClip.instance

    const adapter = new Adapter(webcg, movieClip, createjs)
    const data = JSON.parse('{"f0":"updated f0","f1":1,"instance":"not a Text instance"}')
    adapter.data(data)
    expect(movieClip.f0.text).to.equal('updated f0')
    expect(movieClip.instance.text).to.equal(undefined)
    expect(movieClip.instance.f0.text).to.equal('updated f0')
    expect(movieClip.instance.f1.text).to.equal(1)
  })

  it('data should update createjs MovieClip instances', () => {
    movieClip.f0 = new createjs.Text('f0')
    movieClip.f0.parent = movieClip
    movieClip.instance = new createjs.MovieClip()
    movieClip.instance.parent = movieClip
    movieClip.instance.f0 = new createjs.Text('instance f0')
    movieClip.instance.f0.parent = movieClip.instance
    movieClip.instance.f1 = new createjs.Text('instance f1')
    movieClip.instance.f1.parent = movieClip.instance

    const adapter = new Adapter(webcg, movieClip, createjs)
    const data = JSON.parse('{"f0":"updated f0","f1":{"color":"red","text":1},"instance":{"visible":false,"unknownProp": true}}')
    adapter.data(data)
    expect(movieClip.f0.text).to.equal('updated f0')
    expect(movieClip.instance.text).to.equal(undefined)
    expect(movieClip.instance.visible).to.equal(false)
    expect(movieClip.instance.unknownProp).to.equal(undefined)
    expect(movieClip.instance.f0.text).to.equal('updated f0')
    expect(movieClip.instance.f1.color).to.equal('red')
    expect(movieClip.instance.f1.text).to.equal(1)
  })
})
